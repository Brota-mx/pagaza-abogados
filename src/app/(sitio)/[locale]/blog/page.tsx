import type { ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogPosts } from "@/content/blog";
import { blogHref } from "@/content/blog/routes";
import type { Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { generateBlogMetadata, blogDate } from "@/lib/blog-seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const { locale } = await params;
  const ui = await getTranslations({ locale, namespace: "blog" });
  return generateBlogMetadata(
    locale as Locale,
    ui("titulo"),
    ui("descripcion"),
    parent,
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const ui = await getTranslations("blog");
  return (
    <div className="bg-bg pt-28 pb-16 md:pt-36 md:pb-24">
      <Container>
        <header className="max-w-3xl pb-12">
          <p className="text-brand mb-5 text-xs font-medium tracking-[0.14em] uppercase">
            {ui("eyebrow")}
          </p>
          <h1 className="text-navy font-serif text-4xl leading-tight md:text-6xl">
            {ui("titulo")}
          </h1>
          <p className="text-muted mt-6 text-lg leading-relaxed">
            {ui("descripcion")}
          </p>
        </header>
        <ul className="max-w-3xl">
          {blogPosts.map((post) => (
            <li key={post.id} className="border-line border-t py-10">
              <article>
                {post.ejemplo && (
                  <p className="text-brand mb-4 text-sm font-medium">
                    {ui("ejemplo")}
                  </p>
                )}
                <h2 className="text-navy font-serif text-3xl leading-tight md:text-4xl">
                  <Link
                    href={blogHref(post, loc)}
                    className="focus-visible:ring-brand rounded-[2px] hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {post.titulo[loc]}
                  </Link>
                </h2>
                {post.fecha && (
                  <time
                    dateTime={post.fecha}
                    className="text-muted mt-4 block text-sm"
                  >
                    {blogDate(post.fecha, loc)}
                  </time>
                )}
                {post.autor && (
                  <p className="text-muted mt-2 text-sm">{post.autor}</p>
                )}
                <p className="text-muted mt-5 leading-relaxed">
                  {post.metaDescription[loc]}
                </p>
                <Link
                  href={blogHref(post, loc)}
                  className="text-brand focus-visible:ring-brand mt-6 inline-flex min-h-11 items-center rounded-[2px] underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                >
                  {ui("leer")}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
