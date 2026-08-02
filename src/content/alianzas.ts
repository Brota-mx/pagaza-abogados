import type { Alianza, Cobertura, SectionIntro } from "./types";

/**
 * Alianzas estratégicas por materia (9) + cobertura geográfica.
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
  },
  {
    id: "laboral",
    nombre: {
      es: "Laboral individual y colectivo",
      en: "Individual & collective labor",
    },
  },
  {
    id: "corporativo",
    nombre: {
      es: "Corporativo y societario",
      en: "Corporate & M&A",
    },
  },
  {
    id: "lifesciences",
    nombre: {
      es: "Ciencias de la vida y publicidad",
      en: "Life sciences & advertising",
    },
  },
  {
    id: "penal",
    nombre: {
      es: "Penal (enfoque penal-fiscal)",
      en: "Criminal (tax-crime focus)",
    },
  },
  {
    id: "compliance",
    nombre: {
      es: "Regulatorio y compliance",
      en: "Regulatory & compliance",
    },
  },
  {
    id: "preciostransferencia",
    nombre: {
      es: "Precios de transferencia y avalúos",
      en: "Transfer pricing & appraisals",
    },
  },
  // Aquí iba "Servicios de traducción" (traductores peritos certificados). El cliente pidió
  // retirarlo de la red de alianzas (nota del 27-jul-2026): "Quitar servicios de traducciones".
  {
    id: "civil",
    nombre: {
      es: "Civil y mercantil",
      en: "Civil & commercial",
    },
  },
  {
    id: "financiero",
    nombre: {
      es: "Financiero y mercado de capitales",
      en: "Finance & capital markets",
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
