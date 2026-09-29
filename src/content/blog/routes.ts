import type { LocalizedText, Locale } from "../types";

/** Identidad y rutas: el selector no carga el contenido de los artículos. */
export const blogRoutes = [
  {
    id: "auditoria-sat",
    slug: {
      es: "que-hacer-si-el-sat-me-esta-auditando",
      en: "what-to-do-if-the-sat-is-auditing-me",
    },
  },
] satisfies { id: string; slug: LocalizedText }[];

export function blogHref(post: { slug: LocalizedText }, locale: Locale) {
  return {
    pathname: "/blog/[slug]",
    params: { slug: post.slug[locale] },
  } as const;
}
