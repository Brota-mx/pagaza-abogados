import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getClientIp, limit, rateLimitConfigured } from "@/lib/ratelimit";
import { turnstileBypassed, verifyTurnstile } from "@/lib/turnstile";
import { hasHeaderInjection, sendContactEmail } from "@/lib/resend";
import { report } from "@/lib/reporter";

// Runtime Node (Resend + sanitización viven mejor en Node, no Edge). Solo POST → resto 405 auto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16 * 1024; // ~16 KB: defensa cheap contra mensaje gigante / bomba JSON.

type ErrCode =
  | "BAD_REQUEST"
  | "RATE_LIMITED"
  | "CAPTCHA_FAILED"
  | "CAPTCHA_UNAVAILABLE"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

// Mensajes genéricos localizables. NUNCA stack traces, envs ni respuestas de proveedores.
const MESSAGES: Record<"es" | "en", Record<ErrCode, string>> = {
  es: {
    BAD_REQUEST: "Solicitud inválida.",
    RATE_LIMITED:
      "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
    CAPTCHA_FAILED:
      "No pudimos verificar que eres humano. Recarga e inténtalo de nuevo.",
    CAPTCHA_UNAVAILABLE:
      "La verificación no está disponible por el momento. Inténtalo más tarde.",
    VALIDATION_ERROR: "Revisa los campos del formulario.",
    INTERNAL_ERROR:
      "No pudimos enviar tu mensaje. Escríbenos directo a a@pagaza.mx.",
  },
  en: {
    BAD_REQUEST: "Invalid request.",
    RATE_LIMITED: "Too many attempts. Please wait a few minutes and try again.",
    CAPTCHA_FAILED:
      "We couldn't verify you're human. Please reload and try again.",
    CAPTCHA_UNAVAILABLE:
      "Verification is unavailable right now. Please try again later.",
    VALIDATION_ERROR: "Please review the form fields.",
    INTERNAL_ERROR:
      "We couldn't send your message. Please email us directly at a@pagaza.mx.",
  },
};

const noStore = { "Cache-Control": "no-store" };

function fail(
  status: number,
  code: ErrCode,
  locale: "es" | "en",
  extra?: {
    details?: Record<string, string[]>;
    headers?: Record<string, string>;
  },
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message: MESSAGES[locale][code],
        ...(extra?.details ? { details: extra.details } : {}),
      },
    },
    { status, headers: { ...noStore, ...(extra?.headers ?? {}) } },
  );
}

function succeed() {
  return NextResponse.json({ success: true }, { headers: noStore });
}

/** Locale defensivo para los mensajes, leído del cuerpo crudo antes de validar. */
function detectLocale(raw: unknown): "es" | "en" {
  if (
    raw &&
    typeof raw === "object" &&
    (raw as { locale?: unknown }).locale === "en"
  ) {
    return "en";
  }
  return "es";
}

export async function POST(req: Request) {
  // Modo A — límite de tamaño antes de parsear.
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY) {
    return fail(413, "BAD_REQUEST", "es");
  }

  // Modo A — parseo defensivo.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail(400, "BAD_REQUEST", "es");
  }
  const locale = detectLocale(raw);

  // Modo B / J — rate-limit por IP (fail-cheap primero). Si Upstash cae estando configurado → 503.
  const ip = getClientIp(req);
  let rl;
  try {
    rl = await limit(ip);
  } catch {
    report("ratelimit_error");
    // Solo puede fallar si el limitador real está configurado (Upstash caído).
    return fail(rateLimitConfigured ? 503 : 500, "INTERNAL_ERROR", locale);
  }
  if (!rl.success) {
    report("rate_limited");
    const retryAfter = Math.max(0, Math.ceil((rl.reset - Date.now()) / 1000));
    return fail(429, "RATE_LIMITED", locale, {
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": String(rl.reset),
      },
    });
  }

  // Modo C — honeypot ANTES de Zod: si viene lleno, 200 falso-positivo (el bot cree que funcionó).
  const hp = (raw as { _hp?: unknown })?._hp;
  if (typeof hp === "string" && hp.length > 0) {
    report("honeypot_hit");
    return succeed(); // nunca revelar la detección
  }

  // Modo F — validación Zod (shape + límites + anti-injection por regex).
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    report("validation_error");
    return fail(400, "VALIDATION_ERROR", locale, {
      details: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    });
  }
  const data = parsed.data;

  // Modo G — segunda barrera anti header-injection sobre los campos de cabecera.
  if (hasHeaderInjection([data.nombre, data.email, data.empresa ?? ""])) {
    report("header_injection_attempt");
    return fail(400, "VALIDATION_ERROR", locale); // genérico, no confirmar el vector
  }

  // Modo D / E — Turnstile server-side (salvo bypass de dev sin secret).
  if (!turnstileBypassed()) {
    const verdict = await verifyTurnstile(data.turnstileToken, ip);
    if (!verdict.ok) {
      if (verdict.reason === "failed") {
        report("captcha_failed");
        return fail(400, "CAPTCHA_FAILED", locale);
      }
      report("captcha_unavailable");
      return fail(503, "CAPTCHA_UNAVAILABLE", locale); // fail-CLOSED
    }
  }

  // Modo H — Resend. Falla → 500 genérico (sin filtrar detalles del proveedor).
  try {
    await sendContactEmail(data);
  } catch {
    report("resend_error");
    return fail(500, "INTERNAL_ERROR", locale);
  }

  // Modo I — reporter fail-open; el correo ya se envió.
  report("contact_success", {
    sector: data.sector ?? null,
    locale: data.locale,
  });
  return succeed();
}
