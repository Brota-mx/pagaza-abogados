import { equipo } from "@/content/equipo";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EquipoMiembro } from "./EquipoMiembro";

/**
 * "Nuestro equipo" — la sección que el cliente pidió enlazada junto a "Newsletter" en la primera
 * pantalla (agosto de 2026).
 *
 * Está montada con el contenido a medias A PROPÓSITO: falta que el cliente entregue fotografías y
 * semblanzas, y se decidió publicar el borrador para que pueda revisar la maqueta. Las tarjetas
 * declaran en texto que su semblanza es provisional — ver la regla dura en `content/equipo.ts`.
 *
 * La retícula es de dos columnas y hoy sólo hay un integrante (no se inventan colegas para
 * rellenar): ocupa la mitad izquierda y lee como decisión, no como hueco.
 */
export function Equipo({ locale }: { locale: Locale }) {
  return (
    <section id="equipo" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(equipo.eyebrow, locale)}
          title={t(equipo.titulo, locale)}
          intro={t(equipo.intro, locale)}
        />

        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {equipo.miembros.map((miembro, i) => (
            <li key={miembro.id}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <EquipoMiembro
                  miembro={miembro}
                  semblanzaPendiente={t(equipo.semblanzaPendiente, locale)}
                  etiquetaProvisional={t(equipo.etiquetaProvisional, locale)}
                  locale={locale}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
