import type { SectorId } from "@/lib/validation";

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

/** Sector / industria (12 en total). Sin `numero`: el orden es el de la nota del cliente, no una
 *  jerarquía real — un marcador secuencial prometería un orden que no existe (auditoría de diseño,
 *  1-ago-2026).
 *
 *  `id` se tipa contra `SECTOR_IDS` (la lista que valida el formulario) a propósito: hasta ahora
 *  eran dos listas paralelas mantenidas a mano, y añadir un sector aquí sin añadirlo allá hacía que
 *  el `z.enum` rechazara la opción y que el submit se cayera EN SILENCIO. Ahora es un error de
 *  compilación. El enum es el superconjunto (incluye "otro", que no es una industria). */
export interface Sector {
  id: SectorId;
  nombre: LocalizedText;
  resumen: LocalizedText;
  casos: CasoExito[];
}

/** Alianza estratégica por materia (9 en total). */
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
  /** Declaración de cierre: la especialización única como argumento. */
  cierre: LocalizedText;
}

/**
 * Lo que queda de la antigua sección Metodología: solo el alcance de la defensa (los tres niveles
 * de gobierno), que cierra la sección Pilares. Ver `content/metodologia.ts`.
 */
export interface MetodologiaContent {
  esferaDefensa: LocalizedText;
}

/** Bloque de un documento legal: encabezado, párrafos y, opcionalmente, una lista. */
export interface SeccionLegal {
  titulo: LocalizedText;
  parrafos: LocalizedText[];
  lista?: LocalizedText[];
  /** Párrafo(s) que cierran la sección después de la lista, si la hay. */
  cierre?: LocalizedText[];
}

/** Documento legal bilingüe (aviso de privacidad, aviso legal). */
export interface DocumentoLegal {
  titulo: LocalizedText;
  intro: LocalizedText;
  secciones: SeccionLegal[];
}

/**
 * Integrante del equipo. Ver `content/equipo.ts` para las reglas de qué se puede escribir aquí:
 * el nombre, el cargo y la semblanza salen de un documento del cliente, nunca de una redacción
 * propia.
 */
export interface MiembroEquipo {
  id: string;
  /** Nombre propio: no se traduce. */
  nombre: string;
  /** Del documento del cliente. */
  cargo: LocalizedText;
  /** Semblanza del documento del cliente (`work/COMENTARIOS 070926/003. Bios.docx`). */
  bio: LocalizedText;
  /** Monograma que ocupa el retrato mientras el cliente no manda la fotografía. */
  iniciales: string;
  /** Alimenta el `founder` del JSON-LD; sólo uno debería tenerlo. */
  fundador?: boolean;
  /**
   * Retrato. Obligatoriamente un archivo local en `public/`: la CSP es `img-src 'self' data: blob:`
   * y `next.config.ts` no declara `remotePatterns`, así que una URL externa no cargaría. El cliente
   * no ha entregado fotografías (7-sep-2026: "no van a llevar fotos por el momento").
   */
  retrato?: { src: string; alt: LocalizedText; width: number; height: number };
}

/** Sección "Nuestro equipo". */
export interface EquipoContent {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  intro: LocalizedText;
  miembros: MiembroEquipo[];
}

/**
 * Una pieza de la muestra del boletín. NO lleva fecha a propósito: ver `content/newsletter.ts`.
 */
export interface PiezaNewsletter {
  id: string;
  categoria: LocalizedText;
  titular: LocalizedText;
}

/** Muestra ilustrativa de un envío del boletín (sección Newsletter). */
export interface NewsletterMuestra {
  etiqueta: LocalizedText;
  /** Ranura de fecha: se pinta el FORMATO, no un valor. Ver `content/newsletter.ts`. */
  formatoFecha: LocalizedText;
  piezas: PiezaNewsletter[];
}

/** Una sede del despacho. `ciudad` sólo se pinta cuando hay más de una. */
export interface Oficina {
  ciudad: LocalizedText;
  direccion: LocalizedText;
  /**
   * El mismo domicilio, desglosado para el JSON-LD (schema.org PostalAddress). Se guarda aparte en
   * vez de trocear `direccion` con una expresión regular: el texto visible cambia de forma y de
   * idioma, el desglose no. `addressCountry` no vive aquí porque las dos sedes son MX.
   */
  postal: {
    calle: string;
    localidad: string;
    region: string;
    cp: string;
  };
}

/**
 * Redes sociales del despacho. Se modela como `Partial<Record<...>>` y no como lista para que la
 * AUSENCIA sea el estado por defecto: una red sin URL simplemente no existe en `site.ts` y no se
 * renderiza. Nada de `"#"` ni de enlaces a la home como relleno — un icono que no lleva a ningún
 * lado se lee peor que no tenerlo. Añadir una red es una línea en `site.ts` y nada más.
 */
export type RedSocial = "instagram" | "facebook" | "x";

/** Datos globales del sitio / contacto. */
export interface SiteInfo {
  slogan: LocalizedText;
  /** Razón social. Sustituye al antiguo `socio`: el contacto del sitio es institucional. */
  nombre: string;
  telefono: string;
  email: string;
  /**
   * Sedes, en orden de aparición. Era una `direccion` única hasta que el cliente pidió sumar
   * Ciudad Juárez (nota del 27-jul-2026). Footer y Contacto recorren la lista y muestran la
   * etiqueta de ciudad sólo a partir de la segunda entrada, así que agregar una sede es añadir
   * un objeto aquí y nada más.
   */
  oficinas: Oficina[];
  /** Sólo URLs de perfil reales y verificadas. Ver `RedSocial`. */
  redes?: Partial<Record<RedSocial, string>>;
}
