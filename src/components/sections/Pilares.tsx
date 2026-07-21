import { pilares, pilaresIntro } from "@/content/pilares";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Pilares — los 3 pilares de servicio. Sobre navy-ink (contraste con Compromiso, que es claro).
 * Los pilares llevan `numero` (01/02/03) en el contenido y se presentan como un catálogo
 * ordenado de servicios. Regla bronce sobre hairline por columna (signature de la marca).
 */
export function Pilares({ locale }: { locale: Locale }) {
  return (
    <section
      id="pilares"
      className="bg-navy-ink scroll-mt-20 py-24 text-white md:py-32"
    >
      <Container>
        <SectionHeading
          tone="light"
          eyebrow={t(pilaresIntro.eyebrow, locale)}
          title={t(pilaresIntro.titulo, locale)}
          intro={t(pilaresIntro.intro, locale)}
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {pilares.map((pilar, i) => (
            <Reveal key={pilar.id} delay={i * 80}>
              <article className="relative flex h-full flex-col border-t border-white/15 pt-6">
                <span
                  aria-hidden
                  className="bg-steel absolute -top-px left-0 h-px w-12"
                />
                <span
                  aria-hidden
                  className="text-steel-soft font-serif text-3xl"
                >
                  {pilar.numero}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-white">
                  {t(pilar.titulo, locale)}
                </h3>
                <p className="prose-justificado mt-3 leading-relaxed text-white/70">
                  {t(pilar.descripcion, locale)}
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {pilar.puntos.map((punto, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed text-white/80"
                    >
                      <span
                        aria-hidden
                        className="bg-steel mt-2.5 h-px w-3 shrink-0"
                      />
                      {t(punto, locale)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
