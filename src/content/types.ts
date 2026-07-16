/** Texto bilingüe. Toda cadena de contenido del dominio usa este tipo. */
export type LocalizedText = { es: string; en: string };

export type Locale = "es" | "en";

/** Resuelve un LocalizedText al idioma dado. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

/** Pilar de servicio (3 en total). */
export interface Pilar {
  id: "proteccion" | "consultoria" | "litigio";
  numero: "01" | "02" | "03";
  titulo: LocalizedText;
  descripcion: LocalizedText;
  puntos: LocalizedText[];
}

/** Caso de éxito dentro de un sector. */
export interface CasoExito {
  descripcion: LocalizedText;
  cifra?: { valor: string; etiqueta: LocalizedText };
}

/** Sector / industria (10 en total). */
export interface Sector {
  id: string;
  numero: string;
  nombre: LocalizedText;
  resumen: LocalizedText;
  casos: CasoExito[];
  /** Marca los sectores con cifra destacada (Textil, Retail). */
  destacado?: boolean;
}

/** Alianza estratégica por materia (10 en total). */
export interface Alianza {
  id: string;
  nombre: LocalizedText;
}

/** Cobertura geográfica. */
export interface Cobertura {
  region: LocalizedText;
  tipo: "nacional" | "internacional";
}

/** Valor / principio de la filosofía de la firma (sección Compromiso). */
export interface Valor {
  id: "excelencia" | "atencion" | "practico";
  titulo: LocalizedText;
  descripcion: LocalizedText;
}

/** Contenido de la sección Compromiso (filosofía / propuesta de valor). */
export interface CompromisoContent {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  intro: LocalizedText;
  valores: Valor[];
}

/** Disciplina de la metodología de atención integral (3 en total). */
export interface Disciplina {
  numero: "01" | "02" | "03";
  titulo: LocalizedText;
  descripcion: LocalizedText;
}

/** Contenido de la sección Metodología (atención integral en cada expediente). */
export interface MetodologiaContent {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  intro: LocalizedText;
  disciplinas: Disciplina[];
  /** Alcance de la defensa: los tres niveles de gobierno. */
  esferaDefensa: LocalizedText;
}

/** Datos globales del sitio / contacto. */
export interface SiteInfo {
  slogan: LocalizedText;
  socio: string;
  telefono: string;
  email: string;
  direccion: LocalizedText;
  /**
   * Link WhatsApp normalizado (p.ej. "https://wa.me/525578918865"). Opcional: el número de
   * atención está en formato fijo local, por lo que aún NO se confirma que sea WhatsApp (M9).
   * Poblar solo cuando el cliente lo confirme.
   */
  whatsapp?: string;
}
