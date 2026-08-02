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

const VENTANA_MS = 600_000; // 10 min, la ventana de las dos cuotas

/**
 * Instanciación perezosa: solo se crea el limitador compartido si ambas envs existen (trap 6.2).
 * Sin ellas se usa el de memoria (ver `aplicar`). `analytics: false` evita la promesa `pending`
 * que se pierde en serverless (trap 6.4).
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
 * Ventana deslizante en la memoria del proceso: el respaldo cuando no hay Upstash.
 *
 * ponytail: el límite es POR INSTANCIA y se pierde en cada arranque en frío. Con varias instancias
 * calientes, un atacante consigue la cuota multiplicada por el número de instancias; en un sitio
 * de este tráfico eso normalmente es una sola. Frena el abuso automatizado ordinario, no a alguien
 * decidido. Upgrade: poblar UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN y este respaldo deja
 * de usarse solo, sin tocar código.
 */
const memoria = new Map<string, number[]>();

function limitarEnMemoria(ip: string, cuota: number): LimitResult {
  const ahora = Date.now();
  // Cota del Map: una instancia longeva acumularía una entrada por IP vista. 5.000 sobra para este
  // sitio, y vaciarlo de golpe es aceptable —lo peor que pasa es regalar una ventana de cuota—.
  if (memoria.size > 5000) memoria.clear();

  const sellos = (memoria.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (sellos.length >= cuota) {
    return {
      success: false,
      limit: cuota,
      remaining: 0,
      reset: sellos[0] + VENTANA_MS,
    };
  }
  sellos.push(ahora);
  memoria.set(ip, sellos);
  return {
    success: true,
    limit: cuota,
    remaining: cuota - sellos.length,
    reset: ahora + VENTANA_MS,
  };
}

/**
 * Aplica el rate-limit por IP, con tres comportamientos según lo que haya:
 *
 *  · Upstash configurado → límite compartido de verdad, entre instancias y entre despliegues.
 *  · Producción sin Upstash → ventana en memoria. Parcial (ver arriba), pero un límite real.
 *  · Desarrollo sin Upstash → permite. Limitar en local sólo estorba y volvería los E2E
 *    dependientes de cuántas veces se corrieron en los últimos diez minutos.
 *
 * Antes permitía EN SILENCIO también en producción, así que un deploy sin las dos variables
 * publicaba el sitio sin ningún límite y sin una sola señal (auditoría del 1-ago-2026: 6 de 6
 * envíos aceptados con la cuota en 3). El primer arreglo fue lanzar en producción para que el
 * fallo fuera ruidoso, pero al retirarse Turnstile ese camino dejaba el formulario muerto en un
 * despliegue sin Upstash: sin captcha y sin límite, un 503 permanente. El respaldo en memoria
 * cubre el hueco sin fingir que la defensa está completa.
 *
 * Si Upstash está configurado y se cae, `limiter.limit` lanza y el route responde 503: ahí sí es
 * indisponibilidad de algo que debería estar.
 */
async function aplicar(
  instancia: Ratelimit | null,
  cuota: number,
  ip: string,
): Promise<LimitResult> {
  if (instancia) return instancia.limit(ip);
  if (!isProd) {
    return {
      success: true,
      limit: cuota,
      remaining: cuota,
      reset: Date.now() + VENTANA_MS,
    };
  }
  return limitarEnMemoria(ip, cuota);
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
