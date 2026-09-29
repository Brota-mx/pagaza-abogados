import { getTranslations } from "next-intl/server";
import type { BlogPost, Locale } from "@/content/types";
import { getServicio } from "@/content/servicios-seo";
import { Container } from "@/components/ui/Container";
import { Link, getPathname } from "@/i18n/navigation";
import { blogJsonLd, blogDate } from "@/lib/blog-seo";

export async function BlogPostPage({
  post,
  locale,
}: {
  post: BlogPost;
  locale: Locale;
}) {
  const ui = await getTranslations("blog");
  const servicio = post.servicioRelacionado
    ? getServicio(post.servicioRelacionado)
    : undefined;
  const enlace =
    "text-brand rounded-[2px] underline underline-offset-4 hover:text-navy focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:outline-none";
  return (
    <article className="bg-bg pt-28 pb-16 md:pt-36 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogJsonLd(post, locale, ui("inicio")),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <nav aria-label={ui("breadcrumb")} className="text-muted mb-10 text-sm">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link href="/" className={enlace}>
                {ui("inicio")}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className={enlace}>
                {ui("eyebrow")}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">{post.titulo[locale]}</li>
          </ol>
        </nav>
        <div className="max-w-3xl">
          <header className="pb-10">
            {post.ejemplo && (
              <p className="text-brand mb-5 text-sm font-medium">
                {ui("ejemplo")}
              </p>
            )}
            <h1 className="text-navy font-serif text-4xl leading-tight md:text-6xl">
              {post.titulo[locale]}
            </h1>
            {(post.fecha || post.autor) && (
              <p className="text-muted mt-6 text-sm">
                {post.fecha && (
                  <time dateTime={post.fecha}>
                    {blogDate(post.fecha, locale)}
                  </time>
                )}
                {post.fecha && post.autor && " · "}
                {post.autor}
              </p>
            )}
            <ul
              aria-label={ui("tags")}
              className="text-muted mt-6 flex flex-wrap gap-3 text-sm"
            >
              {post.tags.map((tag) => (
                <li key={tag[locale]}>{tag[locale]}</li>
              ))}
            </ul>
            {post.ejemplo && (
              <p className="border-line text-muted mt-8 border-l-2 pl-5 text-sm leading-relaxed">
                {ui("avisoEjemplo")}
              </p>
            )}
          </header>
          {post.secciones.map((seccion, i) => (
            <section key={i} className="border-line border-t py-8 md:py-10">
              {seccion.titulo && (
                <h2 className="text-navy font-serif text-3xl leading-tight">
                  {seccion.titulo[locale]}
                </h2>
              )}
              {seccion.parrafos.map((parrafo, j) => (
                <p key={j} className="text-muted mt-5 leading-relaxed">
                  {parrafo[locale]}
                </p>
              ))}
            </section>
          ))}
          {post.fuentes && (
            <section className="border-line border-t py-8">
              <h2 className="text-navy mb-5 font-serif text-2xl">
                {ui("fuentes")}
              </h2>
              <ul className="space-y-3">
                {post.fuentes.map((fuente) => (
                  <li key={fuente.url}>
                    <a href={fuente.url} className={enlace}>
                      {fuente.titulo[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <nav
            aria-label={ui("volver")}
            className="border-line flex flex-col items-start gap-6 border-t pt-10"
          >
            {servicio && (
              <div>
                <h2 className="text-navy mb-3 font-serif text-2xl">
                  {ui("servicio")}
                </h2>
                <Link href={servicio.slug.es} className={enlace}>
                  {servicio.titulo[locale]}
                </Link>
              </div>
            )}
            <Link href="/blog" className={enlace}>
              {ui("volver")}
            </Link>
            <a
              href={getPathname({ href: "/", locale }) + "#contacto"}
              className="bg-brand hover:bg-navy focus-visible:ring-brand inline-flex min-h-11 items-center rounded-[2px] px-6 py-3 text-sm text-white focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {ui("consulta")}
            </a>
          </nav>
        </div>
      </Container>
    </article>
  );
}
