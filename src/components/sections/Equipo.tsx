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
 * Seis integrantes con semblanza real del cliente (`work/COMENTARIOS 070926/003. Bios.docx`,
 * 7-sep-2026). Sin fotografía por ahora ("no van a llevar fotos por el momento"): cada tarjeta
 * pinta el monograma. Lista plegable en una columna (como Sectores): solo el socio fundador viene
 * abierto, el resto se abre al hacer clic — lo pidió el cliente el 7-sep-2026.
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

        <ul className="border-line mt-14 border-t">
          {equipo.miembros.map((miembro, i) => (
            <li key={miembro.id}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <EquipoMiembro
                  miembro={miembro}
                  open={miembro.fundador === true}
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
