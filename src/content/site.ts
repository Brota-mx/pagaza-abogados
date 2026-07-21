import type { SiteInfo } from "./types";

/**
 * Datos globales del sitio / contacto. Fuente: docs/contenido-fuente.md §5.
 * `whatsapp` queda sin poblar hasta confirmar que el tel es un canal de WhatsApp (M9).
 *
 * ⚠️ Ya no existe `socio`. El cliente pidió expresamente que su nombre no aparezca en el sitio
 * ("contacto → no pongan mi nombre solo el despacho", nota del 19-jul-2026): el contacto es
 * institucional. Está preparando una sección de equipo con fotos; cuando llegue, el nombre
 * volverá ahí y no como firmante del formulario.
 */
export const siteInfo: SiteInfo = {
  slogan: {
    es: "La estrategia correcta siempre gana. Con esta definición de éxito, nunca perdemos.",
    en: "The right strategy always wins. With this definition of success, we never lose.",
  },
  nombre: "Pagaza Abogados Tributarios",
  telefono: "(55) 78-91-88-65",
  email: "a@pagaza.mx",
  direccion: {
    es: "Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, CDMX",
    en: "Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, Mexico City",
  },
};

/**
 * Secciones de navegación de la home one-page. `id` = ancla (#id); `key` = clave en messages.nav.
 * El orden define el orden del navbar y del footer.
 */
export const NAV_SECTIONS = [
  { id: "compromiso", key: "compromiso" },
  { id: "servicios", key: "servicios" },
  { id: "pilares", key: "pilares" },
  { id: "capacidades", key: "capacidades" },
  { id: "sectores", key: "sectores" },
  { id: "alianzas", key: "alianzas" },
  { id: "contacto", key: "contacto" },
] as const;
