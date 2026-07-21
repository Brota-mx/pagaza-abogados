import type { Pilar, SectionIntro } from "./types";

/**
 * Sección "¿Cómo lo hacemos?" — los 3 pilares del servicio, por grado de prioridad.
 *
 * Los tres textos vienen de la lámina que envió el cliente (nota del 19-jul-2026), PARAFRASEADOS
 * con su permiso expreso: "Esto se puede usar parafraseado o con una estrategia diversa". Se
 * conserva íntegra la sustancia jurídica y el registro; se comprime la redacción (93 → 60
 * palabras). El original de cada uno queda en el comentario de su `descripcion` por si lo pide de
 * vuelta.
 *
 * Ojo: respecto a la versión anterior del sitio, las descripciones de Protección Patrimonial y de
 * Consultoría estaban intercambiadas; ésta es la asignación que el cliente da por buena.
 *
 * Ya no llevan lista de puntos: ese detalle vive ahora en `capacidades.ts`, y repetirlo aquí era
 * parte de lo que el cliente señaló como "se ve muy cargada".
 *
 * La sección absorbe además las tres disciplinas de `metodologia.ts` como sub-bloque: el cliente
 * no lista Metodología como sección propia y conceptualmente responde a la misma pregunta.
 */
export const pilaresIntro: SectionIntro = {
  eyebrow: { es: "¿Cómo lo hacemos?", en: "How we work" },
  titulo: {
    es: "Tres pilares, en orden de prioridad.",
    en: "Three pillars, in order of priority.",
  },
  intro: {
    es: "Nuestro servicio se basa en tres pilares subsecuentes: prevenir antes que corregir, negociar antes que litigar y litigar sin concesiones cuando hace falta.",
    en: "Our practice rests on three sequential pillars: prevent before correcting, negotiate before litigating, and litigate without concessions when it is required.",
  },
};

export const pilares: Pilar[] = [
  {
    id: "proteccion",
    numero: "01",
    titulo: { es: "Protección Patrimonial", en: "Wealth Protection" },
    // Original: "Ante un contexto de alta incertidumbre legal y económica, diseñamos estrategias
    // jurídicas orientadas a proteger el patrimonio de nuestros clientes frente a potenciales
    // actos de fiscalización." (28 palabras)
    descripcion: {
      es: "En un entorno legal y económico incierto, diseñamos estrategias para blindar el patrimonio antes de que llegue el acto de fiscalización.",
      en: "In an uncertain legal and economic environment, we design strategies to shield our clients' wealth before enforcement arrives.",
    },
  },
  {
    id: "consultoria",
    numero: "02",
    titulo: {
      es: "Consultoría y Transaccional",
      en: "Advisory & Transactional",
    },
    // Original: "Diseñamos y analizamos estructuras fiscales aplicables a las operaciones de
    // nuestros representados, con el objetivo de optimizar resultados, mitigar riesgos legales y
    // asegurar el cumplimiento normativo." (28 palabras)
    descripcion: {
      es: "Analizamos y diseñamos la estructura fiscal de cada operación: optimizar el resultado, contener el riesgo legal y sostener el cumplimiento.",
      en: "We analyze and design the tax structure of each transaction: optimize the outcome, contain legal risk, and sustain compliance.",
    },
  },
  {
    id: "litigio",
    numero: "03",
    titulo: {
      es: "Controversia y Litigio Público y Fiscal",
      en: "Tax & Public Litigation",
    },
    // Original: "Frente a actos de autoridad, nuestro enfoque se basa en la planeación jurídica y
    // la estrategia, priorizando la negociación efectiva como vía principal de solución, sin dejar
    // de lado la defensa sólida en litigio cuando es necesaria." (37 palabras)
    descripcion: {
      es: "Frente a un acto de autoridad priorizamos la negociación técnica como vía de solución, con el litigio preparado para cuando hace falta.",
      en: "Faced with an act of authority we prioritize technical negotiation as the route to resolution, with litigation ready for when it is needed.",
    },
  },
];
