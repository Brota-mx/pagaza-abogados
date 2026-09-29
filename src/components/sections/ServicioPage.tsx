import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { getServicio } from "@/content/servicios-seo";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { servicioJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export async function ServicioPage({
  id,
  params,
}: {
  id: string;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const servicio = getServicio(id);
  const ui = await getTranslations("servicioPage");
  const home = getPathname({ href: "/", locale: loc });
  const schemas = [
    servicioJsonLd(servicio, loc),
    breadcrumbJsonLd(servicio, loc, ui("inicio")),
    ...(servicio.faq.length ? [faqJsonLd(servicio, loc)] : []),
  ];
  const enlace =
    "text-brand focus-visible:ring-brand rounded-[2px] underline underline-offset-4 hover:text-navy focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none";

  return (
    <article className="bg-bg pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas).replace(/</g, "\\u003c"),
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
            <li aria-current="page">{t(servicio.titulo, loc)}</li>
          </ol>
        </nav>
        <header className="max-w-3xl pb-14 md:pb-20">
          <p className="text-brand mb-5 text-xs font-medium tracking-[0.14em] uppercase">
            {ui("eyebrow")}
          </p>
          <h1 className="text-navy font-serif text-4xl leading-tight md:text-6xl">
            {t(servicio.titulo, loc)}
          </h1>
          {servicio.intro.map((parrafo, i) => (
            <p key={i} className="text-muted mt-6 text-lg leading-relaxed">
              {t(parrafo, loc)}
            </p>
          ))}
          <a
            href={`${home}#contacto`}
            className="bg-brand hover:bg-navy focus-visible:ring-brand mt-8 inline-flex min-h-11 items-center rounded-[2px] px-6 py-3 text-sm text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            {ui("consulta")}
          </a>
        </header>
        <div className="max-w-3xl">
          {servicio.secciones.map((seccion, i) => (
            <section key={i} className="border-line border-t py-12 md:py-14">
              <h2 className="text-navy font-serif text-3xl leading-tight md:text-4xl">
                {t(seccion.titulo, loc)}
              </h2>
              {seccion.parrafos.map((parrafo, j) => (
                <p key={j} className="text-muted mt-6 leading-relaxed">
                  {t(parrafo, loc)}
                </p>
              ))}
            </section>
          ))}
          {servicio.faq.length > 0 && (
            <section
              aria-labelledby="preguntas"
              className="border-line border-t py-12 md:py-14"
            >
              <h2
                id="preguntas"
                className="text-navy mb-8 font-serif text-3xl md:text-4xl"
              >
                {ui("faq")}
              </h2>
              {servicio.faq.map((faq, i) => (
                <details key={i} className="border-line border-b py-5">
                  <summary className="text-navy focus-visible:ring-brand cursor-pointer rounded-[2px] pr-4 font-medium focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none">
                    {t(faq.pregunta, loc)}
                  </summary>
                  <p className="text-muted mt-4 leading-relaxed">
                    {t(faq.respuesta, loc)}
                  </p>
                </details>
              ))}
            </section>
          )}
        </div>
        <nav
          aria-label={ui("relacionados")}
          className="border-line border-t py-12 md:py-16"
        >
          <h2 className="text-navy mb-6 font-serif text-3xl">
            {ui("relacionados")}
          </h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {servicio.serviciosRelacionados.map((idRelacionado) => {
              const relacionado = getServicio(idRelacionado);
              return (
                <li key={idRelacionado}>
                  <Link href={relacionado.slug.es} className={enlace}>
                    {t(relacionado.titulo, loc)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
      <section className="bg-navy py-16 text-white md:py-20">
        <Container>
          <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">
            {ui("contactoTitulo")}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            {ui("contactoIntro")}
          </p>
          <a
            href={`${home}#contacto`}
            className="focus-visible:ring-offset-navy mt-7 inline-flex min-h-11 items-center rounded-[2px] border border-white/50 px-6 py-3 text-sm transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            {ui("consulta")}
          </a>
        </Container>
      </section>
    </article>
  );
}
