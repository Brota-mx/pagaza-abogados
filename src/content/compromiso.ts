import type { CompromisoContent } from "./types";

/**
 * Sección "Compromiso" — filosofía y propuesta de valor de la firma.
 * Fuente: docs/contenido-fuente.md §1.1 (tres pilares del compromiso + propuesta ante la
 * incertidumbre). Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const compromiso: CompromisoContent = {
  eyebrow: {
    es: "La firma",
    en: "The firm",
  },
  titulo: {
    es: "El ejercicio del Derecho Fiscal, con criterio y sin concesiones.",
    en: "Tax law practiced with judgment and without concessions.",
  },
  intro: {
    es: "En un entorno económico y legal de alta incertidumbre, diseñamos estrategias jurídicas sofisticadas para blindar el patrimonio empresarial y personal frente a cualquier acto de fiscalización. Nuestro compromiso se sostiene en tres principios.",
    en: "In an economic and legal environment defined by uncertainty, we design sophisticated legal strategies to shield corporate and personal wealth against any act of authority. Our commitment rests on three principles.",
  },
  valores: [
    {
      id: "excelencia",
      titulo: {
        es: "Excelencia técnica",
        en: "Technical excellence",
      },
      descripcion: {
        es: "Dominio profundo de la materia fiscal, administrativa y constitucional: análisis numérico e interpretativo riguroso detrás de cada estrategia.",
        en: "Deep command of tax, administrative, and constitutional matters: rigorous numerical and interpretive analysis behind every strategy.",
      },
    },
    {
      id: "atencion",
      titulo: {
        es: "Atención humana",
        en: "Human attention",
      },
      descripcion: {
        es: "Acompañamiento directo y confidencial. Entendemos que detrás de cada expediente hay un patrimonio, una empresa y una familia que proteger.",
        en: "Direct, confidential guidance. We understand that behind every case there is an estate, a company, and a family to protect.",
      },
    },
    {
      id: "practico",
      titulo: {
        es: "Enfoque práctico",
        en: "Practical focus",
      },
      descripcion: {
        es: "Priorizamos la planeación y la negociación técnica como la vía más eficiente; mantenemos lista una defensa de litigio implacable cuando se requiere.",
        en: "We prioritize planning and technical negotiation as the most efficient path, while keeping a relentless litigation defense ready when required.",
      },
    },
  ],
};
