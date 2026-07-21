import { servicios } from "@/content/servicios";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "Servicios" — el posicionamiento de la firma en dos párrafos. Sección deliberadamente breve y
 * sobre superficie blanca: es un respiro entre el compromiso y el detalle de los pilares, y una de
 * las respuestas al "se ve muy cargada" del cliente. Sin tarjetas, sin listas, sin iconos.
 */
export function Servicios({ locale }: { locale: Locale }) {
  return (
    <section id="servicios" className="bg-surface scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(servicios.eyebrow, locale)}
          title={t(servicios.titulo, locale)}
        />

        {/* max-w-2xl, no 3xl: a 18px son ~75 caracteres por línea en vez de ~95. */}
        <div className="mt-8 max-w-2xl space-y-6">
          {servicios.parrafos.map((parrafo, i) => (
            <p
              key={i}
              className="prose-justificado text-muted text-base leading-relaxed md:text-lg"
            >
              {t(parrafo, locale)}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
