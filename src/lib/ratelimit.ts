import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type LimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // epoch ms
};

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const isProd = process.env.NODE_ENV === "production";

/**
 * Instanciación perezosa: solo se crea el limitador real si ambas envs existen (trap 6.2). En dev
 * sin credenciales se degrada a un no-op que PERMITE; en producción NO (ver `aplicar`).
 * `analytics: false` evita la promesa `pending` que se pierde en serverless (trap 6.4).
 */
const limiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "pagaza:contact",
      analytics: false,
    })
  : null;

/**
 * Limitador del newsletter, con su propio prefijo y cuota. Va aparte del de contacto a propósito:
 * suscribirse es una acción mucho más barata, y no queremos que unos cuantos intentos ahí
 * consuman la cuota de alguien que quiere escribir al despacho.
 */
const limiterNewsletter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "pagaza:newsletter",
      analytics: false,
    })
  : null;

/**
 * Aplica el rate-limit por IP. Sin Upstash configurado hay dos lecturas posibles, y el entorno
 * decide cuál:
 *
 *  · En desarrollo, no tener credenciales es lo normal → no-op que PERMITE.
 *  · En producción es un ERROR DE CONFIGURACIÓN → lanza, y el route responde 503.
 *
 * Antes permitía en silencio también en producción, así que un deploy sin las dos variables
 * publicaba el sitio SIN NINGÚN límite y sin una sola señal de que faltaba (lo confirmó la
 * auditoría del 1-ago-2026: 6 de 6 envíos aceptados con la cuota en 3). Mismo criterio que
 * `sendContactEmail` sin RESEND_API_KEY y que el fail-CLOSED de Turnstile: ante una defensa
 * ausente preferimos un fallo ruidoso, que se ve en el primer envío después de un deploy.
 *
 * Si Upstash está configurado y se cae, `limiter.limit` también lanza → mismo 503.
 */
async function aplicar(
  instancia: Ratelimit | null,
  cuota: number,
  ip: string,
): Promise<LimitResult> {
  if (instancia) return instancia.limit(ip);
  if (isProd) throw new Error("ratelimit_not_configured");
  return {
    success: true,
    limit: cuota,
    remaining: cuota,
    reset: Date.now() + 600_000,
  };
}

/** Rate-limit del formulario de contacto (5 / 10 min). */
export function limit(ip: string): Promise<LimitResult> {
  return aplicar(limiter, 5, ip);
}

/** Rate-limit del newsletter, con su cuota propia (3 / 10 min). */
export function limitNewsletter(ip: string): Promise<LimitResult> {
  return aplicar(limiterNewsletter, 3, ip);
}

/**
 * IP del cliente para el rate-limit. El ORDEN es lo que importa (auditoría del 1-ago-2026):
 *
 * `x-forwarded-for` es una cabecera que puede enviar el propio cliente, así que tomar su primer
 * valor deja el único control anti-abuso del sitio apoyado en que la plataforma reescriba lo que
 * llegue. Vercel publica la IP real en `x-vercel-forwarded-for` y `x-real-ip`, que el visitante no
 * puede falsificar; XFF queda de último recurso para entornos que no las emiten (incluido `pnpm
 * dev` en local, donde no hay proxy delante).
 */
export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-vercel-forwarded-for") ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1"
  );
}
