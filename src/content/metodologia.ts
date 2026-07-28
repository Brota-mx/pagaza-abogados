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
    es: "Ningún asunto se aborda de forma aislada. Cada defensa integra de manera sinérgica el análisis, la estrategia y el litigio para blindar el resultado.",
    en: "No matter is handled in isolation. Each defense synergistically integrates analysis, strategy, and litigation to safeguard the outcome.",
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
    /**
     * Era "Gestión documental". El cliente pidió el cambio (nota del 27-jul-2026): "03 litigio
     * estratégico en lugar de gestión documental". La disciplina que se va era la única que
     * hablaba del control de la prueba, así que ese trabajo se conserva dentro de la descripción
     * nueva en vez de perderse; la `intro` de la sección se ajustó en el mismo sentido.
     */
    {
      numero: "03",
      titulo: {
        es: "Litigio estratégico",
        en: "Strategic litigation",
      },
      descripcion: {
        es: "Cuando la negociación se agota, sostenemos la defensa en recursos, juicio contencioso y amparo, con la prueba ordenada desde el primer día para blindar el resultado.",
        en: "When negotiation is exhausted, we sustain the defense through administrative appeals, contentious proceedings, and amparo, with the evidence organized from day one to fortify the outcome.",
      },
    },
  ],
  esferaDefensa: {
    es: "Acompañamiento y representación directa ante autoridades de los tres niveles de gobierno: federales, estatales y municipales.",
    en: "Direct guidance and representation before authorities at all three levels of government: federal, state, and municipal.",
  },
};
