import { NextResponse } from "next/server";
import type { Locale } from "@/content/types";

/**
 * Piezas compartidas por las dos superficies dinámicas del sitio (`/api/contact` y
 * `/api/newsletter`). Estaban copiadas carácter por carácter en ambas rutas —tabla de mensajes,
 * `fail`, `succeed`, detección de idioma y lectura del cuerpo, unas 80 líneas—, que es justo lo
 * contrario de lo que pedía el comentario de newsletter/route.ts: que las dos se auditen como una
 * sola. Ahora la forma de las respuestas y el tope del cuerpo se revisan en un único lugar.
 *
 * El PIPELINE de defensa (orden de las barreras) sigue escrito en cada route a propósito: es la
 * superficie que se audita, y leerla de corrido vale más que ahorrar veinte líneas.
 */

export type ErrCode =
  | "BAD_REQUEST"
  | "RATE_LIMITED"
  | "CAPTCHA_FAILED"
  | "CAPTCHA_UNAVAILABLE"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

/** Los cuatro mensajes que no dependen del formulario. Genéricos: nunca stacks, envs ni proveedores. */
const COMUNES = {
  es: {
    BAD_REQUEST: "Solicitud inválida.",
    RATE_LIMITED:
      "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
    CAPTCHA_FAILED:
      "No pudimos verificar que eres humano. Recarga e inténtalo de nuevo.",
    CAPTCHA_UNAVAILABLE:
      "La verificación no está disponible por el momento. Inténtalo más tarde.",
  },
  en: {
    BAD_REQUEST: "Invalid request.",
    RATE_LIMITED: "Too many attempts. Please wait a few minutes and try again.",
    CAPTCHA_FAILED:
      "We couldn't verify you're human. Please reload and try again.",
    CAPTCHA_UNAVAILABLE:
      "Verification is unavailable right now. Please try again later.",
  },
} as const;

/** Los dos mensajes que sí cambian entre formularios. */
type MensajesPropios = Record<
  Locale,
  { VALIDATION_ERROR: string; INTERNAL_ERROR: string }
>;

const noStore = { "Cache-Control": "no-store" };

/** Constructor de respuestas de un formulario, con sus dos mensajes propios. */
export function crearRespuestas(propios: MensajesPropios) {
  const mensajes: Record<Locale, Record<ErrCode, string>> = {
    es: { ...COMUNES.es, ...propios.es },
    en: { ...COMUNES.en, ...propios.en },
  };

  return {
    fail(
      status: number,
      code: ErrCode,
      locale: Locale,
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
            message: mensajes[locale][code],
            ...(extra?.details ? { details: extra.details } : {}),
          },
        },
        { status, headers: { ...noStore, ...(extra?.headers ?? {}) } },
      );
    },
    succeed() {
      return NextResponse.json({ success: true }, { headers: noStore });
    },
  };
}

/** Locale defensivo para los mensajes, leído del cuerpo crudo antes de validar. */
export function detectLocale(raw: unknown): Locale {
  return raw &&
    typeof raw === "object" &&
    (raw as { locale?: unknown }).locale === "en"
    ? "en"
    : "es";
}

/**
 * Lee y parsea el cuerpo aplicando el tope de tamaño. El chequeo por `content-length` es el barato,
 * pero esa cabecera NO viene en una petición chunked, así que por sí solo se evadía omitiéndola
 * (auditoría del 1-ago-2026: 60 KB pasaban el filtro). Por eso se mide también el cuerpo ya leído.
 *
 * ponytail: sigue bufferizando el cuerpo antes de medirlo; cortar de verdad exigiría consumir el
 * stream a mano, y el techo real ya lo pone la plataforma (4.5 MB en Vercel).
 */
export async function leerCuerpo(
  req: Request,
  maxBody: number,
): Promise<{ ok: true; raw: unknown } | { ok: false; status: 413 | 400 }> {
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBody) {
    return { ok: false, status: 413 };
  }
  try {
    const cuerpo = await req.text();
    if (Buffer.byteLength(cuerpo, "utf8") > maxBody) {
      return { ok: false, status: 413 };
    }
    return { ok: true, raw: JSON.parse(cuerpo) };
  } catch {
    return { ok: false, status: 400 };
  }
}
