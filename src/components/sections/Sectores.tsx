import { sectores, sectoresIntro } from "@/content/sectores";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectoresAccordion } from "./SectoresAccordion";

/**
 * Sectores — el núcleo de credibilidad: 12 industrias con casos reales. Sección clara (surface)
 * para leer bien el dossier de casos.
 */
export function Sectores({ locale }: { locale: Locale }) {
  return (
    <section id="sectores" className="bg-surface scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(sectoresIntro.eyebrow, locale)}
          title={t(sectoresIntro.titulo, locale)}
          intro={t(sectoresIntro.intro, locale)}
        />
        <SectoresAccordion sectores={sectores} locale={locale} />
      </Container>
    </section>
  );
}
