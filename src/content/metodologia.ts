import type { MetodologiaContent } from "./types";

/**
 * Sección "Metodología" — atención integral en cada expediente.
 * Fuente: docs/contenido-fuente.md §2 (Pilar III: metodología de atención integral + esfera de
 * defensa). Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const metodologia: MetodologiaContent = {
  eyebrow: {
    es: "Metodología",
    en: "Methodology",
  },
  titulo: {
    es: "Tres disciplinas que convergen en cada expediente.",
    en: "Three disciplines converging in every case.",
  },
  intro: {
    es: "Ningún asunto se aborda de forma aislada. Cada defensa integra de manera sinérgica el análisis, la estrategia y el control de la prueba para blindar el resultado.",
    en: "No matter is handled in isolation. Each defense synergistically integrates analysis, strategy, and control of the evidence to safeguard the outcome.",
  },
  disciplinas: [
    {
      numero: "01",
      titulo: {
        es: "Análisis técnico-fiscal",
        en: "Technical–tax analysis",
      },
      descripcion: {
        es: "Estudio numérico e interpretativo profundo de la operación y de la posición de la autoridad, para identificar el terreno real de la controversia.",
        en: "In-depth numerical and interpretive study of the transaction and the authority's position, to map the real terrain of the dispute.",
      },
    },
    {
      numero: "02",
      titulo: {
        es: "Estrategia jurídica",
        en: "Legal strategy",
      },
      descripcion: {
        es: "Planteamiento de conceptos de impugnación robustos y de la ruta procesal —negociación técnica o litigio— con mayor probabilidad de éxito.",
        en: "Framing of robust grounds for challenge and the procedural route — technical negotiation or litigation — with the highest probability of success.",
      },
    },
    {
      numero: "03",
      titulo: {
        es: "Gestión documental",
        en: "Documentary management",
      },
      descripcion: {
        es: "Control estricto y ordenación de la prueba para blindar el juicio: cada afirmación jurídica queda respaldada por su soporte documental.",
        en: "Strict control and organization of the evidence to fortify the case: every legal assertion is backed by its documentary support.",
      },
    },
  ],
  esferaDefensa: {
    es: "Acompañamiento y representación directa ante autoridades de los tres niveles de gobierno: federales, estatales y municipales.",
    en: "Direct guidance and representation before authorities at all three levels of government: federal, state, and municipal.",
  },
};
