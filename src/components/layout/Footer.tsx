import { getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { siteInfo, NAV_SECTIONS } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { RedesSociales } from "@/components/ui/RedesSociales";
import { Wordmark } from "@/components/ui/Wordmark";
import type { Locale } from "@/content/types";
import { serviciosSeo } from "@/content/servicios-seo";

/**
 * Footer institucional sobre navy. Signature de marca: la "P" de gran tamaño como marca de agua de
 * fondo (en la sans del logo, no serif). Datos de contacto en <address> real con tel:/mailto:.
 *
 * El footer es global, así que sus enlaces de sección se emiten absolutos (`/es#servicios`): con
 * anclas crudas los siete quedaban muertos en las páginas legales, donde esos ids no existen
 * (auditoría del 1-ago-2026). Estando en la home el navegador los trata como fragmento y hace
 * scroll suave, sin recargar.
 */
export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tel = siteInfo.telefono.replace(/[^\d]/g, "");
  const year = new Date().getFullYear();
  const home = getPathname({ href: "/", locale });

  return (
    <footer className="bg-navy relative overflow-hidden text-white">
      {/*
        Marca de agua "P" de fondo, en la sans del logo (no serif). El cliente pidió que se lea
        COMPLETA (antes salía recortada por el borde derecho e inferior): ahora queda contenida
        dentro del footer, centrada verticalmente y con margen respecto al borde. `flex` en el
        contenedor evita depender del leading para el centrado óptico de una sola letra.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[4%] flex items-center select-none"
      >
        <span className="font-wordmark text-[clamp(12rem,32vw,26rem)] leading-none font-semibold text-white/[0.05]">
          P
        </span>
      </span>

      <Container className="relative grid gap-12 py-16 md:grid-cols-2 md:py-20 xl:grid-cols-4">
        <div>
          <Wordmark className="text-2xl" sublabel />
          <p className="mt-5 max-w-xs font-serif text-lg leading-relaxed text-white/80 italic">
            {siteInfo.slogan[locale]}
          </p>
        </div>

        <nav aria-label={t("sections")} className="flex flex-col gap-2.5">
          <p className="text-steel-soft mb-2 text-xs font-medium tracking-[0.14em] uppercase">
            {t("sections")}
          </p>
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`${home}#${s.id}`}
              className="hover:text-steel-soft focus-visible:ring-offset-navy w-fit rounded-[2px] text-sm text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {tNav(s.key)}
            </a>
          ))}
        </nav>

        <nav aria-label={t("servicios")} className="flex flex-col gap-3">
          <p className="text-steel-soft mb-2 text-xs font-medium tracking-[0.14em] uppercase">
            {t("servicios")}
          </p>
          {serviciosSeo.map((servicio) => (
            <Link
              key={servicio.id}
              href={servicio.slug.es}
              className="hover:text-steel-soft focus-visible:ring-offset-navy w-fit rounded-[2px] text-sm text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {servicio.titulo[locale]}
            </Link>
          ))}
        </nav>

        <address className="not-italic">
          <p className="text-steel-soft mb-2 text-xs font-medium tracking-[0.14em] uppercase">
            {t("contact")}
          </p>
          <p className="text-sm text-white/80">{siteInfo.nombre}</p>
          <a
            href={`tel:+52${tel}`}
            className="hover:text-steel-soft focus-visible:ring-offset-navy mt-1 block w-fit rounded-[2px] text-sm text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {siteInfo.telefono}
          </a>
          <a
            href={`mailto:${siteInfo.email}`}
            className="hover:text-steel-soft focus-visible:ring-offset-navy block w-fit rounded-[2px] text-sm text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {siteInfo.email}
          </a>
          {siteInfo.oficinas.map((o) => (
            <p
              key={o.ciudad.es}
              className="mt-3 max-w-xs text-sm leading-relaxed text-white/60"
            >
              {/* Ver Contacto.tsx: la ciudad se etiqueta sólo a partir de la segunda sede. */}
              {siteInfo.oficinas.length > 1 ? (
                <span className="block font-medium text-white/80">
                  {o.ciudad[locale]}
                </span>
              ) : null}
              {o.direccion[locale]}
            </p>
          ))}

          {/* Al final de la columna de canales, que es donde el visitante busca a la firma. Aparece
              en todas las páginas, incluidas las legales. */}
          <RedesSociales
            tone="light"
            className="mt-5 border-t border-white/10 pt-4"
          />
        </address>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Pagaza Abogados Tributarios. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/aviso-de-privacidad"
              className="focus-visible:ring-offset-navy w-fit rounded-[2px] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t("avisoPrivacidad")}
            </Link>
            <Link
              href="/aviso-legal"
              className="focus-visible:ring-offset-navy w-fit rounded-[2px] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t("avisoLegal")}
            </Link>
            <p>{t("brotaBy")}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
