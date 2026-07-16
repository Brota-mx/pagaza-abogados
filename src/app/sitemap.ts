import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, sitemapLanguages } from "@/lib/seo";

/** Una entrada por locale (es/en), cada una con sus alternates hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = sitemapLanguages();
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
