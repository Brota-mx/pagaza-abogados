import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, sitemapLanguages } from "@/lib/seo";

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
  ];
}
