import { pilares, pilaresIntro } from "@/content/pilares";
import { metodologia } from "@/content/metodologia";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "¿Cómo lo hacemos?" — los 3 pilares de servicio, sobre navy-ink. El `numero` (01/02/03) marca
 * que son subsecuentes, no alternativas: se agota el primero antes de pasar al siguiente.
 * Al final, las tres disciplinas que convergen en cada expediente (antes sección Metodología,
 * que el cliente no lista por separado).
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
              </article>
            </Reveal>
          ))}
        </div>

        {/* Las tres disciplinas de la metodología, como cierre de la misma pregunta. */}
        <div className="mt-20 border-t border-white/15 pt-12">
          <h3 className="max-w-2xl font-serif text-2xl text-white md:text-3xl">
            {t(metodologia.titulo, locale)}
          </h3>
          <p className="prose-justificado mt-4 max-w-2xl leading-relaxed text-white/70">
            {t(metodologia.intro, locale)}
          </p>

          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {metodologia.disciplinas.map((d, i) => (
              <Reveal key={d.numero} delay={i * 80}>
                <li className="flex gap-4">
                  <span
                    aria-hidden
                    className="text-steel-soft font-serif text-lg"
                  >
                    {d.numero}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg text-white">
                      {t(d.titulo, locale)}
                    </h4>
                    <p className="prose-justificado mt-2 text-sm leading-relaxed text-white/70">
                      {t(d.descripcion, locale)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <p className="text-steel-soft mt-12 max-w-2xl border-t border-white/10 pt-6 text-sm leading-relaxed">
            {t(metodologia.esferaDefensa, locale)}
          </p>
        </div>
      </Container>
    </section>
  );
}
