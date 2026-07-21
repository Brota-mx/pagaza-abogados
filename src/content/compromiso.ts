import type { CompromisoContent } from "./types";

/**
 * Sección "Nuestro compromiso" — filosofía y propuesta de valor de la firma.
 *
 * `intro` y `cierre` son el texto LITERAL que entregó el cliente (nota del 19-jul-2026,
 * "Nuestro compromiso → debe de ir el siguiente texto"). No reescribir sin su visto bueno: la
 * nota admite sugerencias, pero "dentro de este marco".
 * Los tres valores desarrollan los principios que enuncia el primer párrafo.
 * Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const compromiso: CompromisoContent = {
  eyebrow: {
    es: "Nuestro compromiso",
    en: "Our commitment",
  },
  titulo: {
    es: "El ejercicio del Derecho Tributario, con criterio y sin concesiones.",
    en: "Tax law practiced with judgment and without concessions.",
  },
  intro: {
    es: "Pagaza Abogados surge de la convicción por ejercer el Derecho Tributario con excelencia técnica, atención humana y un enfoque práctico que permita ofrecer soluciones jurídicas eficientes y confiables para proteger el patrimonio de nuestros clientes.",
    en: "Pagaza Abogados was born of a conviction: to practice tax law with technical excellence, human attention, and a practical focus that delivers efficient, dependable legal solutions to protect our clients' wealth.",
  },
  cierre: {
    es: "Somos abogados expertos en derecho público como única rama de especialización, para brindar la mejor atención en los asuntos más complejos y de alto riesgo.",
    en: "We are lawyers specialized in public law as our single field of practice, so we can bring our full attention to the most complex, highest-risk matters.",
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
