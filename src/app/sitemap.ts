import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { SITE_URL, sitemapLanguages } from "@/lib/seo";
import type { Locale } from "@/content/types";

/** Rutas legales, con sus URLs traducidas resueltas por next-intl (routing.pathnames). */
const RUTAS_LEGALES = ["/aviso-de-privacidad", "/aviso-legal"] as const;

/**
 * La puerta de entrada (`/`) más una entrada por locale (es/en), cada una con sus alternates
 * hreflang. La raíz se lista porque ya no redirige: es una página propia y el punto de entrada
 * neutro del sitio (x-default).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = sitemapLanguages();
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      alternates: { languages },
    },
    ...routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    })),
    ...RUTAS_LEGALES.flatMap((href) => {
      const porIdioma = Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_URL}${getPathname({ href, locale: l as Locale })}`,
        ]),
      );
      return routing.locales.map((locale) => ({
        url: porIdioma[locale],
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: { languages: porIdioma },
      }));
    }),
  ];
}
