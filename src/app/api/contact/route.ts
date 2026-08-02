import { contactSchema } from "@/lib/validation";
import { getClientIp, limit } from "@/lib/ratelimit";
import { turnstileBypassed, verifyTurnstile } from "@/lib/turnstile";
import { hasHeaderInjection, sendContactEmail } from "@/lib/resend";
import { report } from "@/lib/reporter";
import { crearRespuestas, detectLocale, leerCuerpo } from "@/lib/api-form";

// Runtime Node (Resend + sanitización viven mejor en Node, no Edge). Solo POST → resto 405 auto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16 * 1024; // ~16 KB: defensa cheap contra mensaje gigante / bomba JSON.

const { fail, succeed } = crearRespuestas({
  es: {
    VALIDATION_ERROR: "Revisa los campos del formulario.",
    INTERNAL_ERROR:
      "No pudimos enviar tu mensaje. Escríbenos directo a a@pagaza.mx.",
  },
  en: {
    VALIDATION_ERROR: "Please review the form fields.",
    INTERNAL_ERROR:
      "We couldn't send your message. Please email us directly at a@pagaza.mx.",
  },
});

export async function POST(req: Request) {
  // Modo A — tope de tamaño + parseo defensivo.
  const cuerpo = await leerCuerpo(req, MAX_BODY);
  if (!cuerpo.ok) return fail(cuerpo.status, "BAD_REQUEST", "es");
  const raw = cuerpo.raw;
  const locale = detectLocale(raw);

  // Modo B / J — rate-limit por IP (fail-cheap primero). Si Upstash cae estando configurado → 503.
  const ip = getClientIp(req);
  let rl;
  try {
    rl = await limit(ip);
  } catch {
    report("ratelimit_error");
    // Upstash caído, o producción sin credenciales: en ambos casos no podemos aplicar el límite,
    // y sin límite no se acepta el envío (503, no 500: es indisponibilidad, no un bug).
    return fail(503, "INTERNAL_ERROR", locale);
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
