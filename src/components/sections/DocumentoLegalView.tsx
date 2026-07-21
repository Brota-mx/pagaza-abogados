import { t, type DocumentoLegal, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";

/**
 * Render de un documento legal (aviso de privacidad, aviso legal). Una sola columna estrecha:
 * son textos para leer, no para hojear. El `pt` extra compensa el header fijo, porque estas
 * páginas no empiezan con el hero navy que lo absorbe en la home.
 */
export function DocumentoLegalView({
  doc,
  actualizado,
  locale,
}: {
  doc: DocumentoLegal;
  actualizado: string;
  locale: Locale;
}) {
  return (
    <article className="bg-bg pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-navy font-serif text-3xl leading-tight md:text-4xl">
            {t(doc.titulo, locale)}
          </h1>
          <p className="text-muted mt-3 text-sm">
            {locale === "es" ? "Última actualización:" : "Last updated:"}{" "}
            {actualizado}
          </p>

          <p className="prose-justificado text-muted mt-8 leading-relaxed">
            {t(doc.intro, locale)}
          </p>

          {doc.secciones.map((seccion, i) => (
            <section key={i} className="border-line mt-12 border-t pt-8">
              <h2 className="text-navy font-serif text-xl md:text-2xl">
                {t(seccion.titulo, locale)}
              </h2>
              {seccion.parrafos.map((parrafo, j) => (
                <p
                  key={j}
                  className="prose-justificado text-muted mt-4 leading-relaxed"
                >
                  {t(parrafo, locale)}
                </p>
              ))}
              {seccion.lista && (
                <ul className="mt-5 space-y-3">
                  {seccion.lista.map((item, k) => (
                    <li key={k} className="flex gap-3">
                      <span
                        aria-hidden
                        className="bg-brand mt-3 h-px w-3 shrink-0"
                      />
                      <span className="prose-justificado text-muted leading-relaxed">
                        {t(item, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
