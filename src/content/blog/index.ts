import { auditoriaSat } from "./auditoria-sat";
import type { BlogPost, Locale } from "../types";

/** Registro editorial estático en el orden del índice. */
export const blogPosts: BlogPost[] = [auditoriaSat];

export function getBlogPost(slug: string, locale: Locale) {
  return blogPosts.find((post) => post.slug[locale] === slug);
}
