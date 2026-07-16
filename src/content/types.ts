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

/** Datos globales del sitio / contacto. */
export interface SiteInfo {
  slogan: LocalizedText;
  socio: string;
  telefono: string;
  email: string;
  direccion: LocalizedText;
}
