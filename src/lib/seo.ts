import { routing } from "@/i18n/routing";

/** URL canónica del sitio, sin barra final. Fallback seguro para no romper el build si falta env. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://pagaza.mx";

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
      "x-default": "/es",
    },
  } as const;
}

/** Mapa locale → URL absoluta, para el `alternates.languages` del sitemap. */
export function sitemapLanguages() {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
  );
}
