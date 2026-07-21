import { compromiso } from "@/content/compromiso";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Nuestro compromiso" — filosofía y propuesta de valor. Los tres principios (excelencia técnica,
 * atención humana, enfoque práctico) son paralelos, no una secuencia: se marcan con una regla
 * sobre hairline, no con numeración. Cierra con la declaración de especialización única.
 * Server component; resuelve el contenido por `locale` (prop).
 */
export function Compromiso({ locale }: { locale: Locale }) {
  return (
    <section id="compromiso" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(compromiso.eyebrow, locale)}
          title={t(compromiso.titulo, locale)}
          intro={t(compromiso.intro, locale)}
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {compromiso.valores.map((valor, i) => (
            <Reveal key={valor.id} delay={i * 80}>
              <div className="border-line relative border-t pt-6">
                <span
                  aria-hidden
                  className="bg-brand absolute -top-px left-0 h-px w-12"
                />
                <h3 className="text-navy font-serif text-xl md:text-2xl">
                  {t(valor.titulo, locale)}
                </h3>
                <p className="prose-justificado text-muted mt-3 leading-relaxed">
                  {t(valor.descripcion, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-navy border-line mt-16 max-w-3xl border-t pt-8 font-serif text-xl leading-snug md:text-2xl">
          {t(compromiso.cierre, locale)}
        </p>
      </Container>
    </section>
  );
}
