import { capacidades } from "@/content/capacidades";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { serviciosSeo } from "@/content/servicios-seo";
import { getTranslations } from "next-intl/server";

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
export async function Capacidades({ locale }: { locale: Locale }) {
  const ui = await getTranslations("servicioPage");
  return (
    <section id="capacidades" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t(capacidades.eyebrow, locale)}
          title={t(capacidades.titulo, locale)}
          intro={t(capacidades.intro, locale)}
        />
        <Link
          href="/abogado-fiscalista"
          className="text-brand focus-visible:ring-brand mt-6 inline-block rounded-[2px] underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          {ui("explorar")}
        </Link>

        <ul className="mt-16 grid gap-x-10 gap-y-2 md:grid-cols-2">
          {capacidades.areas.map((area, i) => (
            <li key={area.id}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <details className="group border-line border-t py-4">
                  <summary className="focus-visible:ring-brand flex cursor-pointer list-none items-start gap-4 rounded-[2px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                    {/* Hairline en vez de número: las 11 áreas no tienen un orden jerárquico real
                        (a diferencia de Pilares), así que no se marcan como si lo tuvieran. */}
                    <span
                      aria-hidden
                      className="bg-brand mt-3 h-px w-4 shrink-0"
                    />
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
                  {serviciosSeo.some(
                    (servicio) => servicio.capacidadRelacionada === area.id,
                  ) && (
                    <ul className="mt-4 space-y-3 pr-8 pl-9">
                      {serviciosSeo
                        .filter(
                          (servicio) =>
                            servicio.capacidadRelacionada === area.id,
                        )
                        .map((servicio) => (
                          <li key={servicio.id}>
                            <Link
                              href={servicio.slug.es}
                              className="text-brand focus-visible:ring-brand rounded-[2px] text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                            >
                              {ui("conocerMas")}: {t(servicio.titulo, locale)}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
