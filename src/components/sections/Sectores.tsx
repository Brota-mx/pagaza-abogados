import { sectores, sectoresIntro } from "@/content/sectores";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectoresAccordion, type ResolvedSector } from "./SectoresAccordion";

/**
 * Sectores — el núcleo de credibilidad: 10 industrias con casos y cifras. El contenido se resuelve
 * al `locale` en el SERVER (bundle cliente en un solo idioma, per BUILD-NOTES) y se pasa al
 * acordeón interactivo (client). Sección clara (surface) para leer bien el dossier de casos.
 */
export function Sectores({ locale }: { locale: Locale }) {
  const resolved: ResolvedSector[] = sectores.map((s) => ({
    id: s.id,
    numero: s.numero,
    nombre: t(s.nombre, locale),
    resumen: t(s.resumen, locale),
    destacado: Boolean(s.destacado),
    casos: s.casos.map((c) => ({
      descripcion: t(c.descripcion, locale),
      cifra: c.cifra
        ? { valor: c.cifra.valor, etiqueta: t(c.cifra.etiqueta, locale) }
        : undefined,
    })),
  }));

  return (
    <section id="sectores" className="bg-surface scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(sectoresIntro.eyebrow, locale)}
          title={t(sectoresIntro.titulo, locale)}
          intro={t(sectoresIntro.intro, locale)}
        />
        <SectoresAccordion sectores={resolved} />
      </Container>
    </section>
  );
}
