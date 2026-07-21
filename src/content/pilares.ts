import type { Pilar, SectionIntro } from "./types";

/**
 * Sección "¿Cómo lo hacemos?" — los 3 pilares del servicio, por grado de prioridad.
 *
 * Los tres textos son LITERALES de la lámina que envió el cliente (nota del 19-jul-2026,
 * "¿Cómo lo hacemos? → el siguiente texto"). Ojo: respecto a la versión anterior del sitio, las
 * descripciones de Protección Patrimonial y de Consultoría estaban intercambiadas; ésta es la
 * asignación que el cliente da por buena.
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
    descripcion: {
      es: "Ante un contexto de alta incertidumbre legal y económica, diseñamos estrategias jurídicas orientadas a proteger el patrimonio de nuestros clientes frente a potenciales actos de fiscalización.",
      en: "In a context of high legal and economic uncertainty, we design legal strategies aimed at protecting our clients' wealth against potential acts of tax enforcement.",
    },
  },
  {
    id: "consultoria",
    numero: "02",
    titulo: {
      es: "Consultoría y Transaccional",
      en: "Advisory & Transactional",
    },
    descripcion: {
      es: "Diseñamos y analizamos estructuras fiscales aplicables a las operaciones de nuestros representados, con el objetivo de optimizar resultados, mitigar riesgos legales y asegurar el cumplimiento normativo.",
      en: "We design and analyze the tax structures that apply to our clients' transactions, seeking to optimize results, mitigate legal risk, and ensure regulatory compliance.",
    },
  },
  {
    id: "litigio",
    numero: "03",
    titulo: {
      es: "Controversia y Litigio Público y Fiscal",
      en: "Tax & Public Litigation",
    },
    descripcion: {
      es: "Frente a actos de autoridad, nuestro enfoque se basa en la planeación jurídica y la estrategia, priorizando la negociación efectiva como vía principal de solución, sin dejar de lado la defensa sólida en litigio cuando es necesaria.",
      en: "Faced with acts of authority, our approach rests on legal planning and strategy, prioritizing effective negotiation as the primary route to resolution — without setting aside a solid litigation defense when it becomes necessary.",
    },
  },
];
