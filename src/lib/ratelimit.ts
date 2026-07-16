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

/**
 * Instanciación perezosa: solo se crea el limitador real si ambas envs existen (trap 6.2). En dev
 * sin credenciales devolvemos un limitador no-op que PERMITE (fail-open por config ausente). Nunca
 * fail-closed por falta de credenciales locales. `analytics: false` evita la promesa `pending` que
 * se pierde en serverless (trap 6.4).
 */
const limiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "pagaza:contact",
      analytics: false,
    })
  : null;

/** ¿Está configurado el rate-limit real? Si no, el route sabe que un fallo NO debe ser 503. */
export const rateLimitConfigured = hasUpstash;

/**
 * Aplica el rate-limit por IP. Si no hay Upstash configurado → permite (fail-open, dev).
 * Si está configurado y Upstash cae, `limiter.limit` lanza y el route responde 503 (no fail-open).
 */
export async function limit(ip: string): Promise<LimitResult> {
  if (!limiter) {
    return {
      success: true,
      limit: 5,
      remaining: 5,
      reset: Date.now() + 600_000,
    };
  }
  return limiter.limit(ip);
}

/** IP del cliente. En Vercel el primer valor de x-forwarded-for es el cliente real (trap 6.3). */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (
    xff?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1"
  );
}
