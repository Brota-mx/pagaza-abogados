import { compromiso } from "@/content/compromiso";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Nuestro compromiso" — filosofía y propuesta de valor. Server component.
 *
 * Los tres principios se enuncian, no se explican. El texto del cliente ya dice "con excelencia
 * técnica, atención humana y un enfoque práctico"; debajo los desarrollábamos en tres párrafos que
 * repetían la misma idea con otras palabras —75 palabras de redundancia pura. Ahora son una tríada
 * tipográfica: el ojo los lee de un golpe y el argumento lo carga el texto de Alfonso, que es el
 * que importa. Las descripciones siguen en `compromiso.ts`.
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

        <ul className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-3">
          {compromiso.valores.map((valor, i) => (
            <Reveal key={valor.id} delay={i * 80}>
              <li className="border-line relative border-t pt-5">
                <span
                  aria-hidden
                  className="bg-brand absolute -top-px left-0 h-px w-12"
                />
                <h3 className="text-navy font-serif text-xl md:text-2xl">
                  {t(valor.titulo, locale)}
                </h3>
              </li>
            </Reveal>
          ))}
        </ul>

        <p className="text-navy border-line mt-14 max-w-2xl border-t pt-8 font-serif text-xl leading-snug md:text-2xl">
          {t(compromiso.cierre, locale)}
        </p>
      </Container>
    </section>
  );
}
