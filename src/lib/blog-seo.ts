import type { Metadata, ResolvingMetadata } from "next";
import type { BlogPost, Locale } from "@/content/types";
import { blogHref } from "@/content/blog/routes";
import { getPathname } from "@/i18n/navigation";
import { SITE_URL } from "./seo";
import { siteInfo } from "@/content/site";

export async function generateBlogMetadata(
  locale: Locale,
  title: string,
  description: string,
  parent: ResolvingMetadata,
  post?: BlogPost,
): Promise<Metadata> {
  const href = (l: Locale) =>
    getPathname({ href: post ? blogHref(post, l) : "/blog", locale: l });
  const images = (await parent).openGraph?.images;
  return {
    title,
    description,
    alternates: {
      canonical: href(locale),
      languages: { es: href("es"), en: href("en"), "x-default": href("es") },
    },
    openGraph: {
      type: post ? "article" : "website",
      title,
      description,
      siteName: siteInfo.nombre,
      url: href(locale),
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      images,
      ...(post?.fecha ? { publishedTime: post.fecha } : {}),
      ...(post?.autor ? { authors: [post.autor] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images },
    robots: { index: !post?.ejemplo, follow: true },
  };
}

export function blogJsonLd(post: BlogPost, locale: Locale, inicio: string) {
  const url = SITE_URL + getPathname({ href: blogHref(post, locale), locale });
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": url + "#article",
      headline: post.titulo[locale],
      description: post.metaDescription[locale],
      url,
      inLanguage: locale === "es" ? "es-MX" : "en",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(post.autor
        ? { author: { "@type": "Person", name: post.autor } }
        : {}),
      ...(post.fecha ? { datePublished: post.fecha } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: inicio,
          item: SITE_URL + "/" + locale,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: SITE_URL + "/" + locale + "/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.titulo[locale],
          item: url,
        },
      ],
    },
  ];
}

export function blogDate(fecha: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(fecha));
}
