import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import {
  getClientIp,
  limitNewsletter,
  rateLimitConfigured,
} from "@/lib/ratelimit";
import { turnstileBypassed, verifyTurnstile } from "@/lib/turnstile";
import { hasHeaderInjection, subscribeToNewsletter } from "@/lib/resend";
import { report } from "@/lib/reporter";

// Runtime Node (Resend vive mejor en Node, no Edge). Solo POST → resto 405 auto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 4 * 1024; // el cuerpo es un correo y dos flags: 4 KB sobran.

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
    VALIDATION_ERROR: "Revisa tu correo y acepta el aviso de privacidad.",
    INTERNAL_ERROR: "No pudimos completar tu suscripción. Inténtalo más tarde.",
  },
  en: {
    BAD_REQUEST: "Invalid request.",
    RATE_LIMITED: "Too many attempts. Please wait a few minutes and try again.",
    CAPTCHA_FAILED:
      "We couldn't verify you're human. Please reload and try again.",
    CAPTCHA_UNAVAILABLE:
      "Verification is unavailable right now. Please try again later.",
    VALIDATION_ERROR:
      "Please check your email address and accept the privacy notice.",
    INTERNAL_ERROR:
      "We couldn't complete your subscription. Please try again later.",
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

/**
 * Alta en el newsletter. Mismo pipeline de defensa que /api/contact y en el mismo orden
 * (tamaño → parseo → rate-limit → honeypot → Zod → anti-injection → Turnstile → proveedor), para
 * que las dos superficies dinámicas del sitio se auditen como una sola.
 */
export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY) {
    return fail(413, "BAD_REQUEST", "es");
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail(400, "BAD_REQUEST", "es");
  }
  const locale = detectLocale(raw);

  const ip = getClientIp(req);
  let rl;
  try {
    rl = await limitNewsletter(ip);
  } catch {
    report("ratelimit_error");
    return fail(rateLimitConfigured ? 503 : 500, "INTERNAL_ERROR", locale);
  }
  if (!rl.success) {
    report("newsletter_rate_limited");
    const retryAfter = Math.max(0, Math.ceil((rl.reset - Date.now()) / 1000));
    return fail(429, "RATE_LIMITED", locale, {
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": String(rl.reset),
      },
    });
  }

  // Honeypot ANTES de Zod: si viene lleno, 200 falso-positivo (el bot cree que funcionó).
  const hp = (raw as { _hp?: unknown })?._hp;
  if (typeof hp === "string" && hp.length > 0) {
    report("honeypot_hit");
    return succeed(); // nunca revelar la detección
  }

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    report("validation_error");
    return fail(400, "VALIDATION_ERROR", locale, {
      details: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    });
  }
  const data = parsed.data;

  // El correo acaba en cabeceras o en la API del proveedor: segunda barrera anti-injection.
  if (hasHeaderInjection([data.email])) {
    report("header_injection_attempt");
    return fail(400, "VALIDATION_ERROR", locale); // genérico, no confirmar el vector
  }

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

  try {
    await subscribeToNewsletter(data);
  } catch {
    report("resend_error");
    return fail(500, "INTERNAL_ERROR", locale);
  }

  // Reporter fail-open. Sin el correo: es un dato personal y la Torre no lo necesita.
  report("newsletter_success", { locale: data.locale });
  return succeed();
}
