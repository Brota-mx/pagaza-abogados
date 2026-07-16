import { z } from "zod";

/**
 * IDs de sector — coinciden 1:1 con los `id` de src/content/sectores.ts (BUILD-NOTES §3.1).
 * "social" (pro-bono) es válido en el enum pero no se ofrece en el dropdown del formulario.
 */
export const SECTOR_IDS = [
  "automotriz",
  "manufactura",
  "inmobiliario",
  "textil",
  "retail",
  "educativo",
  "peps",
  "consumo",
  "farmaceutico",
  "social",
] as const;

/**
 * Rechaza caracteres de control (anti header-injection) en los campos que van a cabeceras del
 * correo. `\p{Cc}` = categoría Unicode "Control" (C0 0x00–0x1F incl. \r \n \t, C1, y DEL 0x7F).
 * Permite espacios, acentos y demás imprimibles.
 */
const noControlChars = /^[^\p{Cc}]*$/u;

/** Campos que llena el usuario (para validación de UX en el cliente con RHF). */
const userFields = {
  nombre: z.string().trim().min(2).max(120).regex(noControlChars),
  empresa: z
    .string()
    .trim()
    .max(160)
    .regex(noControlChars)
    .optional()
    .or(z.literal("")),
  email: z.string().trim().toLowerCase().email().max(160).regex(noControlChars),
  telefono: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()\s-]*$/)
    .optional()
    .or(z.literal("")),
  sector: z.enum(SECTOR_IDS).optional(),
  mensaje: z.string().trim().min(10).max(2000), // saltos de línea permitidos (cuerpo, no cabecera)
};

/** Esquema para el cliente (RHF): solo los campos visibles del formulario. */
export const contactFormSchema = z.object(userFields);
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Esquema del servidor (fuente de verdad). `.strict()` rechaza campos extra. */
export const contactSchema = z
  .object({
    ...userFields,
    _hp: z.string().max(0).optional().or(z.literal("")), // honeypot: DEBE venir vacío
    turnstileToken: z.string().min(1).max(2048),
    locale: z.enum(["es", "en"]),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
