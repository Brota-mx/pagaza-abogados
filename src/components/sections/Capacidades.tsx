import { capacidades } from "@/content/capacidades";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Capacidades" — las 11 áreas de práctica.
 *
 * Alfonso anotó al margen de este bloque "todo esto se puede resumir", y aquí se resuelve por
 * presentación: la retícula muestra solo los títulos y cada descripción se abre bajo demanda. Así
 * la sección se lee de un vistazo pero el texto completo sigue en el HTML — cuenta para SEO y está
 * a un clic.
 *
 * Se usa `<details>/<summary>` nativo en vez de un acordeón con estado: no necesita JavaScript ni
 * `"use client"`, ya es accesible por teclado y anuncia su estado expandido/colapsado sin ARIA
 * adicional. El marcador nativo se sustituye por un signo propio (`marker:hidden` + span).
 */
export function Capacidades({ locale }: { locale: Locale }) {
  return (
    <section id="capacidades" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(capacidades.eyebrow, locale)}
          title={t(capacidades.titulo, locale)}
          intro={t(capacidades.intro, locale)}
        />

        <ul className="mt-16 grid gap-x-10 gap-y-2 md:grid-cols-2">
          {capacidades.areas.map((area, i) => (
            <li key={area.id}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <details className="group border-line border-t py-4">
                  <summary className="focus-visible:ring-brand flex cursor-pointer list-none items-start gap-4 rounded-[2px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden
                      className="text-brand mt-1 shrink-0 font-serif text-sm tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-navy flex-1 font-serif text-lg md:text-xl">
                      {t(area.titulo, locale)}
                    </h3>
                    {/* El signo cambia de + a − al abrir; el estado real lo anuncia <details>. */}
                    <span
                      aria-hidden
                      className="text-brand mt-1 shrink-0 text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-muted mt-3 pr-8 pl-9 text-sm leading-relaxed">
                    {t(area.descripcion, locale)}
                  </p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
