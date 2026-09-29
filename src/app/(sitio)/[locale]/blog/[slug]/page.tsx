import type { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { blogPosts, getBlogPost } from "@/content/blog";
import type { Locale } from "@/content/types";
import { generateBlogMetadata } from "@/lib/blog-seo";
import { BlogPostPage } from "@/components/sections/BlogPostPage";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return blogPosts.map((post) => ({
    slug: post.slug[params.locale as Locale],
  }));
}
export const dynamicParams = false;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = getBlogPost(slug, loc);
  if (!post) notFound();
  return generateBlogMetadata(
    loc,
    post.titulo[loc],
    post.metaDescription[loc],
    parent,
    post,
  );
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const post = getBlogPost(slug, loc);
  if (!post) notFound();
  return <BlogPostPage post={post} locale={loc} />;
}
