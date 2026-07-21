import { routing } from "@/i18n/routing";
import { siteInfo } from "@/content/site";
import type { Locale } from "@/content/types";

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
  return {
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
    founder: {
      "@type": "Person",
      name: siteInfo.socio,
      jobTitle: "Socio Fundador",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prado Sur 525, Lomas de Chapultepec",
      addressLocality: "Miguel Hidalgo",
      addressRegion: "Ciudad de México",
      postalCode: "11000",
      addressCountry: "MX",
    },
  } as const;
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
