import { Landmark } from "lucide-react";
import { metodologia } from "@/content/metodologia";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Metodología — la atención integral en cada expediente. A diferencia de Compromiso, las tres
 * disciplinas SÍ son una secuencia (análisis → estrategia → gestión), marcada por los números
 * grandes 01/02/03. Cierra con la esfera de defensa (los tres niveles de gobierno). Sección clara.
 */
export function Metodologia({ locale }: { locale: Locale }) {
  return (
    <section id="metodologia" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(metodologia.eyebrow, locale)}
          title={t(metodologia.titulo, locale)}
          intro={t(metodologia.intro, locale)}
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {metodologia.disciplinas.map((disciplina, i) => (
            <Reveal key={disciplina.numero} delay={i * 80}>
              <article className="border-line relative border-t pt-6">
                <span
                  aria-hidden
                  className="bg-brand absolute -top-px left-0 h-px w-12"
                />
                <span
                  aria-hidden
                  className="text-brand/25 font-serif text-5xl leading-none"
                >
                  {disciplina.numero}
                </span>
                <h3 className="text-navy mt-4 font-serif text-xl md:text-2xl">
                  {t(disciplina.titulo, locale)}
                </h3>
                <p className="prose-justificado text-muted mt-3 leading-relaxed">
                  {t(disciplina.descripcion, locale)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-line mt-16 flex items-start gap-4 border-t pt-8">
            <Landmark
              aria-hidden
              className="text-brand mt-1 shrink-0"
              size={22}
            />
            <p className="text-navy max-w-3xl font-serif text-lg leading-snug italic md:text-xl">
              {t(metodologia.esferaDefensa, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
