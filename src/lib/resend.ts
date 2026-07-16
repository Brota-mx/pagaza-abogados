import { Resend } from "resend";
import type { ContactInput } from "./validation";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Segunda barrera anti header-injection: verifica que los campos de cabecera no traigan \r\n. */
export function hasHeaderInjection(fields: string[]): boolean {
  return fields.some((v) => /[\r\n]|%0a|%0d/i.test(v));
}

/** Cuerpo del correo en texto plano (sin HTML → sin riesgo de HTML injection). */
function buildText(data: ContactInput): string {
  return [
    "Nuevo mensaje desde el formulario de pagaza.mx",
    "",
    `Nombre:   ${data.nombre}`,
    `Email:    ${data.email}`,
    data.empresa ? `Empresa:  ${data.empresa}` : null,
    data.telefono ? `Teléfono: ${data.telefono}` : null,
    data.sector ? `Sector:   ${data.sector}` : null,
    `Idioma:   ${data.locale}`,
    "",
    "Mensaje:",
    data.mensaje,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/**
 * Envía el lead por correo (BUILD-NOTES §Resend). `from` = dominio verificado (o sandbox de Resend
 * en dev); `reply_to` = email del prospecto (validado, sin saltos); `to` = CONTACT_TO_EMAIL; asunto
 * FIJADO por el servidor (nunca se interpola input en cabeceras). En dev sin RESEND_API_KEY se
 * simula el envío para que /verify funcione; en producción sin key, lanza (config error).
 */
export async function sendContactEmail(data: ContactInput): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL ?? "a@pagaza.mx";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[dev] Resend no configurado; correo simulado →", {
        to,
        nombre: data.nombre,
      });
      return;
    }
    throw new Error("resend_not_configured");
  }

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: "Nuevo contacto — Pagaza Abogados",
    text: buildText(data),
  });

  if (error) {
    // No filtrar el detalle del proveedor al cliente; el route responde 500 genérico.
    throw new Error("resend_error");
  }
}
