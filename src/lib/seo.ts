import { routing } from "@/i18n/routing";
import { siteInfo } from "@/content/site";
import { equipo } from "@/content/equipo";
import { listaRedes } from "./redes";
import { t, type Locale } from "@/content/types";

/** URL canónica del sitio, sin barra final. Fallback seguro para no romper el build si falta env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://pagaza.mx";

/** Keywords del brief (SEO local + temático). */
export const SEO_KEYWORDS = [
  "abogados tributarios CDMX",
  "litigio fiscal México",
  "protección patrimonial empresarial",
  "defensa fiscal IMSS",
  "T-MEC comercio exterior",
  "estrategia fiscal Lomas de Chapultepec",
  "despacho fiscalista boutique",
  "juicio de amparo fiscal",
];

/**
 * JSON-LD LegalService + LocalBusiness. Solo datos verificables (docs/contenido-fuente.md §5):
 * nombre, descripción, contacto, dirección postal exacta, fundador, idiomas, área servida. Se omiten
 * geo-coordenadas y horarios por no tener el dato exacto (mejor omitir que inventar).
 */
export function legalServiceJsonLd(locale: Locale, description: string) {
  const perfiles = listaRedes().map((r) => r.url);
  const fundador = equipo.miembros.find((m) => m.fundador);

  const datos = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Pagaza Abogados Tributarios",
    url: `${SITE_URL}/${locale}`,
    description,
    telephone: `+52${siteInfo.telefono.replace(/[^\d]/g, "")}`,
    email: siteInfo.email,
    priceRange: "$$$$",
    knowsLanguage: ["es-MX", "en"],
    areaServed: [
      { "@type": "Country", name: "México" },
      { "@type": "Country", name: "Estados Unidos" },
    ],
    // `founder` vuelve: se había retirado porque el cliente pidió (19-jul-2026) que su nombre no
    // figurara mientras definía la sección de equipo, y no se quería publicar por la puerta de
    // atrás lo que se había quitado de la interfaz. En agosto de 2026 confirmó la sección, así que
    // se cumple la condición. Se deriva de `content/equipo.ts` para que el dato estructurado no
    // pueda divergir de lo que la página muestra.
    //
    // Nombre, cargo y semblanza: los tres del documento del cliente (`003. Bios.docx`, 7-sep-2026).
    // Hasta esa fecha la semblanza era un marcador y se omitía a propósito; ahora es texto suyo.
    ...(fundador
      ? {
          founder: {
            "@type": "Person",
            name: fundador.nombre,
            jobTitle: t(fundador.cargo, locale),
            description: t(fundador.bio, locale),
          },
        }
      : {}),
    // Una entrada por sede, derivadas de `siteInfo.oficinas`: el domicilio estaba hardcodeado y se
    // quedó en CDMX cuando el cliente sumó Ciudad Juárez, así que Google seguía viendo un despacho
    // de una sola sede (auditoría del 1-ago-2026). Ahora agregar una sede al contenido la publica
    // también en los datos estructurados.
    address: siteInfo.oficinas.map((oficina) => ({
      "@type": "PostalAddress",
      streetAddress: oficina.postal.calle,
      addressLocality: oficina.postal.localidad,
      addressRegion: oficina.postal.region,
      postalCode: oficina.postal.cp,
      addressCountry: "MX",
    })),
  } as const;

  // `sameAs` sólo si hay perfiles de verdad: un array vacío contradiría la política de arriba
  // ("mejor omitir que inventar"). Se deriva de `listaRedes()`, la misma fuente que pinta los
  // iconos del footer, para que los datos estructurados no puedan anunciar un perfil que la
  // interfaz no muestra.
  return perfiles.length > 0 ? { ...datos, sameAs: perfiles } : datos;
}

/**
 * Alternates (canonical + hreflang) para la home bilingüe.
 * Con `metadataBase` en la metadata, las rutas relativas se resuelven contra SITE_URL.
 */
export function localeAlternates(locale: string) {
  return {
    canonical: `/${locale}`,
    languages: {
      es: "/es",
      en: "/en",
      // x-default es la puerta de entrada: la raíz no elige idioma por el visitante, se lo ofrece.
      "x-default": "/",
    },
  } as const;
}

/** Mapa locale → URL absoluta, para el `alternates.languages` del sitemap. */
export function sitemapLanguages() {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
  );
}
