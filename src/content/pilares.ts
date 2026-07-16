import type { Pilar, SectionIntro } from "./types";

/**
 * Los 3 pilares de servicio. Fuente: docs/contenido-fuente.md §2.
 * Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const pilaresIntro: SectionIntro = {
  eyebrow: { es: "Servicios", en: "Services" },
  titulo: {
    es: "Tres pilares para blindar el patrimonio.",
    en: "Three pillars to shield your wealth.",
  },
  intro: {
    es: "Una práctica estrictamente fiscal, ejercida con la profundidad técnica que exigen los patrimonios y las operaciones de alto perfil.",
    en: "A strictly tax-focused practice, exercised with the technical depth that high-profile estates and operations demand.",
  },
};

export const pilares: Pilar[] = [
  {
    id: "proteccion",
    numero: "01",
    titulo: { es: "Protección Patrimonial", en: "Wealth Protection" },
    descripcion: {
      es: "Diseño y análisis exhaustivo de estructuras fiscales a la medida de las operaciones de cada representado, para anticipar el riesgo antes de que se convierta en contingencia.",
      en: "Design and exhaustive analysis of tax structures tailored to each client's operations, anticipating risk before it becomes a contingency.",
    },
    puntos: [
      {
        es: "Optimización de los resultados financieros y operativos de la organización.",
        en: "Optimization of the organization's financial and operational results.",
      },
      {
        es: "Mitigación proactiva de riesgos legales derivados de interpretaciones normativas.",
        en: "Proactive mitigation of legal risks arising from regulatory interpretation.",
      },
      {
        es: "Cumplimiento regulatorio estricto con las leyes fiscales vigentes.",
        en: "Strict regulatory compliance with current tax law.",
      },
    ],
  },
  {
    id: "consultoria",
    numero: "02",
    titulo: {
      es: "Consultoría y Transaccional",
      en: "Advisory & Transactional",
    },
    descripcion: {
      es: "Asesoría patrimonial y consultoría fiscal para personas físicas y corporativos. Ante un acto de autoridad, priorizamos la planeación y la negociación técnica; mantenemos lista una defensa de litigio implacable.",
      en: "Wealth and tax advisory for individuals and corporations. Faced with an act of authority, we prioritize planning and technical negotiation, while keeping a relentless litigation defense ready.",
    },
    puntos: [
      {
        es: "Planeación jurídica y estrategias de negociación técnica como vía principal de solución.",
        en: "Legal planning and technical negotiation strategies as the primary route to resolution.",
      },
      {
        es: "Evaluación de riesgos en transacciones y decisiones corporativas críticas.",
        en: "Risk assessment in transactions and critical corporate decisions.",
      },
      {
        es: "Administración de patrimonio familiar y empresarial dentro del marco de la legalidad.",
        en: "Administration of family and corporate wealth within the bounds of the law.",
      },
    ],
  },
  {
    id: "litigio",
    numero: "03",
    titulo: {
      es: "Controversia y Litigio Público y Fiscal",
      en: "Tax & Public Litigation",
    },
    descripcion: {
      es: "Sólida práctica de litigio administrativo y constitucional (Juicio de Amparo) para combatir arbitrariedades del poder: ponemos límites al poder público para proteger la propiedad y posesiones de nuestros clientes.",
      en: "A robust administrative and constitutional litigation practice (Amparo) to counter arbitrary uses of power — placing limits on public authority to protect our clients' property and possessions.",
    },
    puntos: [
      {
        es: "Auditorías y revisiones de gabinete de impuestos federales y locales.",
        en: "Audits and desk reviews of federal and local taxes.",
      },
      {
        es: "Fiscalización de aportaciones de seguridad social (IMSS, INFONAVIT).",
        en: "Audits of social security contributions (IMSS, INFONAVIT).",
      },
      {
        es: "Procedimientos aduaneros (PAMA) y controversias de comercio exterior.",
        en: "Customs proceedings (PAMA) and foreign-trade disputes.",
      },
      {
        es: "Defensa ante los tres niveles de gobierno: federal, estatal y municipal.",
        en: "Defense before all three levels of government: federal, state, and municipal.",
      },
    ],
  },
];
