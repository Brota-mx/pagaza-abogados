/** Texto bilingüe. Toda cadena de contenido del dominio usa este tipo. */
export type LocalizedText = { es: string; en: string };

export type Locale = "es" | "en";

/** Resuelve un LocalizedText al idioma dado. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

/** Encabezado bilingüe reutilizable de una sección (eyebrow + título + intro). */
export interface SectionIntro {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  intro: LocalizedText;
}

/**
 * Pilar de servicio (3 en total) — el "¿Cómo lo hacemos?" del cliente.
 * Sin lista de puntos a propósito: el detalle operativo vive en `capacidades.ts`, y duplicarlo
 * aquí es justo lo que el cliente señaló como "se ve muy cargada".
 */
export interface Pilar {
  id: "proteccion" | "consultoria" | "litigio";
  numero: "01" | "02" | "03";
  titulo: LocalizedText;
  descripcion: LocalizedText;
}

/** Sección "Servicios": el posicionamiento de la firma en dos párrafos. */
export interface ServiciosContent {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  parrafos: LocalizedText[];
}

/** Área de práctica dentro de "Capacidades" (11 en total). */
export interface Capacidad {
  id: string;
  titulo: LocalizedText;
  descripcion: LocalizedText;
}

/** Sección "Capacidades": intro + las áreas de práctica. */
export interface CapacidadesContent {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  intro: LocalizedText;
  areas: Capacidad[];
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
  /** Descripción breve de la materia que cubre la alianza. */
  descripcion?: LocalizedText;
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
  /** Declaración de cierre: la especialización única como argumento. */
  cierre: LocalizedText;
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
  /** Razón social. Sustituye al antiguo `socio`: el contacto del sitio es institucional. */
  nombre: string;
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
