import type { Alianza, SectionIntro } from "./types";

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
  // El cliente pidió (nota del 7-sep-2026) separar esta entrada en dos: "Ponerle Penal. Solo
  // penal y otro que diga penal fiscal". Antes era una sola ("Penal (enfoque penal-fiscal)").
  {
    id: "penal",
    nombre: {
      es: "Penal",
      en: "Criminal",
    },
  },
  {
    id: "penalfiscal",
    nombre: {
      es: "Penal fiscal",
      en: "Tax crime",
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
 * Encabezado del bloque bajo las alianzas (CoverageMap). El cliente pidió (nota del 7-sep-2026)
 * quitar el texto de "Cobertura / Nacional / Internacional" y en su lugar decir que el despacho
 * tiene dos oficinas en México, con las dos direcciones. Las direcciones se leen de
 * `siteInfo.oficinas` — no se duplican aquí — y el mapa con los dos pines se conserva.
 */
export const coberturaLabels = {
  titulo: { es: "Nuestras oficinas", en: "Our offices" },
  nota: {
    es: "Tenemos dos oficinas en México.",
    en: "We have two offices in Mexico.",
  },
} as const;
