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
                <p className="mt-3 leading-relaxed text-white/70">
                  {t(pilar.descripcion, locale)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/*
          Cierre: el alcance de la defensa (los tres niveles de gobierno). Antes esto era el pie de
          un sub-bloque que además repetía las tres disciplinas de `metodologia.ts` como una fila
          numerada; el cliente pidió quitar esa fila (nota del 7-sep-2026, misma que en el Hero).
          Queda solo la frase, con el mismo hairline que las tarjetas de arriba, no una barra.
        */}
        <div className="relative mt-20 border-t border-white/15 pt-8">
          <span
            aria-hidden
            className="bg-steel absolute -top-px left-0 h-px w-12"
          />
          <p className="max-w-xl leading-relaxed text-white/70">
            {t(metodologia.esferaDefensa, locale)}
          </p>
        </div>
      </Container>
    </section>
  );
}
