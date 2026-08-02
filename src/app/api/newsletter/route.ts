import { newsletterSchema } from "@/lib/validation";
import { getClientIp, limitNewsletter } from "@/lib/ratelimit";
import { hasHeaderInjection, subscribeToNewsletter } from "@/lib/resend";
import { report } from "@/lib/reporter";
import { crearRespuestas, detectLocale, leerCuerpo } from "@/lib/api-form";

// Runtime Node (Resend vive mejor en Node, no Edge). Solo POST → resto 405 auto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 4 * 1024; // el cuerpo es un correo y dos flags: 4 KB sobran.

const { fail, succeed } = crearRespuestas({
  es: {
    VALIDATION_ERROR: "Revisa tu correo y acepta el aviso de privacidad.",
    INTERNAL_ERROR: "No pudimos completar tu suscripción. Inténtalo más tarde.",
  },
  en: {
    VALIDATION_ERROR:
      "Please check your email address and accept the privacy notice.",
    INTERNAL_ERROR:
      "We couldn't complete your subscription. Please try again later.",
  },
});

/**
 * Alta en el newsletter. Mismo pipeline de defensa que /api/contact y en el mismo orden
 * (tamaño → parseo → rate-limit → honeypot → Zod → anti-injection → proveedor), para que las dos
 * superficies dinámicas del sitio se auditen como una sola.
 */
export async function POST(req: Request) {
  const cuerpo = await leerCuerpo(req, MAX_BODY);
  if (!cuerpo.ok) return fail(cuerpo.status, "BAD_REQUEST", "es");
  const raw = cuerpo.raw;
  const locale = detectLocale(raw);

  const ip = getClientIp(req);
  let rl;
  try {
    rl = await limitNewsletter(ip);
  } catch {
    report("ratelimit_error");
    // Ver /api/contact: sin límite aplicable no se acepta el alta.
    return fail(503, "INTERNAL_ERROR", locale);
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
