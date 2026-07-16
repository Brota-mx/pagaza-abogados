import type { Alianza, Cobertura, SectionIntro } from "./types";

/**
 * Alianzas estratégicas por materia (10) + cobertura geográfica.
 * Fuente: docs/contenido-fuente.md §4. La firma no diluye su núcleo (estrictamente fiscal): ofrece
 * soluciones 360° vía una red selecta. Traducción EN legal (docs/glosario-es-en.md).
 */
export const alianzasIntro: SectionIntro = {
  eyebrow: { es: "Alianzas y cobertura", en: "Alliances & coverage" },
  titulo: {
    es: "Un núcleo fiscal, una red 360°.",
    en: "A tax core, a 360° network.",
  },
  intro: {
    es: "No diluimos nuestra especialidad. Cuando un asunto lo exige, conectamos con una red selecta de expertos por materia y con corresponsalías dentro y fuera de México.",
    en: "We never dilute our specialty. When a matter demands it, we connect with a select network of experts by practice area and with correspondents inside and outside Mexico.",
  },
};

export const alianzas: Alianza[] = [
  {
    id: "contable",
    nombre: {
      es: "Contable y financiero",
      en: "Accounting & finance",
    },
    descripcion: {
      es: "Auditorías de estados financieros y dictámenes contables.",
      en: "Financial-statement audits and accounting opinions.",
    },
  },
  {
    id: "laboral",
    nombre: {
      es: "Laboral individual y colectivo",
      en: "Individual & collective labor",
    },
    descripcion: {
      es: "Litigio laboral corporativo y relaciones con sindicatos.",
      en: "Corporate labor litigation and union relations.",
    },
  },
  {
    id: "corporativo",
    nombre: {
      es: "Corporativo y societario",
      en: "Corporate & M&A",
    },
    descripcion: {
      es: "Constitución, fusiones, adquisiciones y actas de asambleas.",
      en: "Incorporation, mergers, acquisitions, and shareholder resolutions.",
    },
  },
  {
    id: "lifesciences",
    nombre: {
      es: "Ciencias de la vida y publicidad",
      en: "Life sciences & advertising",
    },
    descripcion: {
      es: "Cumplimiento COFEPRIS y normas de etiquetado y anuncios.",
      en: "COFEPRIS compliance and labeling and advertising rules.",
    },
  },
  {
    id: "penal",
    nombre: {
      es: "Penal (enfoque penal-fiscal)",
      en: "Criminal (tax-crime focus)",
    },
    descripcion: {
      es: "Prevención y defensa en delitos fiscales y de cuello blanco.",
      en: "Prevention and defense in tax and white-collar crimes.",
    },
  },
  {
    id: "compliance",
    nombre: {
      es: "Regulatorio y compliance",
      en: "Regulatory & compliance",
    },
    descripcion: {
      es: "Gobierno corporativo y mitigación de riesgos operativos.",
      en: "Corporate governance and operational-risk mitigation.",
    },
  },
  {
    id: "preciostransferencia",
    nombre: {
      es: "Precios de transferencia y avalúos",
      en: "Transfer pricing & appraisals",
    },
    descripcion: {
      es: "Estudios de operaciones entre partes relacionadas y valuaciones comerciales.",
      en: "Related-party transaction studies and commercial valuations.",
    },
  },
  {
    id: "traduccion",
    nombre: {
      es: "Servicios de traducción",
      en: "Translation services",
    },
    descripcion: {
      es: "Traductores peritos certificados para contratos e información financiera internacional.",
      en: "Certified expert translators for contracts and international financial information.",
    },
  },
  {
    id: "civil",
    nombre: {
      es: "Civil y mercantil",
      en: "Civil & commercial",
    },
    descripcion: {
      es: "Disputas contractuales, juicios ejecutivos y arrendamientos.",
      en: "Contract disputes, enforcement suits, and leasing matters.",
    },
  },
  {
    id: "financiero",
    nombre: {
      es: "Financiero y mercado de capitales",
      en: "Finance & capital markets",
    },
    descripcion: {
      es: "Estructuración de deuda, emisiones y asesoría bancaria.",
      en: "Debt structuring, securities issuances, and banking advisory.",
    },
  },
];

/**
 * Cobertura geográfica: red nacional en los estados clave + alianzas transfronterizas.
 * Fuente: docs/contenido-fuente.md §4.2.
 */
export const cobertura: Cobertura[] = [
  { region: { es: "México", en: "Mexico" }, tipo: "nacional" },
  {
    region: { es: "Estados Unidos", en: "United States" },
    tipo: "internacional",
  },
  { region: { es: "Europa", en: "Europe" }, tipo: "internacional" },
  {
    region: { es: "Latinoamérica", en: "Latin America" },
    tipo: "internacional",
  },
];

/** Etiquetas del bloque de cobertura (CoverageMap). */
export const coberturaLabels = {
  titulo: { es: "Cobertura", en: "Coverage" },
  nacional: { es: "Nacional", en: "Nationwide" },
  internacional: { es: "Internacional", en: "International" },
  nota: {
    es: "Red de corresponsalías y despachos aliados en los estados clave de la República, con alianzas transfronterizas de prestigio.",
    en: "A network of correspondents and allied firms across Mexico's key states, with prestigious cross-border alliances.",
  },
} as const;
