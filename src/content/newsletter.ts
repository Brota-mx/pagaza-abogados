import type { NewsletterMuestra } from "./types";

/**
 * Muestra de un envío del boletín, para la sección Newsletter.
 *
 * ⚠️ CONTENIDO ILUSTRATIVO — NO SON PUBLICACIONES REALES. El despacho todavía no ha publicado
 * nada; esto enseña la FORMA de un envío, no su contenido. Al sustituirlo por material real hay
 * que quitar también la etiqueta de "ejemplo" que pinta la sección.
 *
 * Dos decisiones que evitan que la muestra se lea como información real:
 *
 * 1. **Sin fechas.** El ejemplo que mandó el cliente (la sección de publicaciones de Galicia) pone
 *    una fecha en cada tarjeta, pero una fecha concreta convierte la muestra en una noticia falsa
 *    en cuanto alguien la ve fuera de contexto. Se probó ocupar la ranura con el FORMATO
 *    (`DD.MM.AAAA`) a modo de wireframe tipográfico, pero el cliente lo leyó como algo sin
 *    terminar ("¿esto va así?", 7-sep-2026), así que la ranura se quitó del todo: la tarjeta va
 *    solo con la categoría.
 * 2. **Titulares formulados como TEMA, no como suceso.** Nada de cifras, autoridades concretas,
 *    números de criterio ni fechas de publicación. Son asuntos perennes de la práctica fiscal, del
 *    tipo que el despacho efectivamente cubriría.
 *
 * Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const newsletterMuestra: NewsletterMuestra = {
  etiqueta: {
    es: "Ejemplo de envío — contenido ilustrativo",
    en: "Sample issue — illustrative content",
  },
  piezas: [
    {
      id: "materialidad",
      categoria: { es: "Criterio", en: "Case law" },
      titular: {
        es: "Materialidad de las operaciones: qué expediente sostiene una revisión",
        en: "Substance of transactions: the file that holds up under audit",
      },
    },
    {
      id: "devoluciones",
      categoria: { es: "Práctica", en: "Practice" },
      titular: {
        es: "Devoluciones de IVA: dónde se atoran y cómo se documentan",
        en: "VAT refunds: where they stall and how to document them",
      },
    },
    {
      id: "comprobacion",
      categoria: { es: "Normativa", en: "Regulation" },
      titular: {
        es: "Facultades de comprobación: por qué los primeros días deciden el caso",
        en: "Audit powers: why the first days decide the case",
      },
    },
  ],
};
