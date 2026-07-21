import { getTranslations } from "next-intl/server";
import { siteInfo, NAV_SECTIONS } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import type { Locale } from "@/content/types";

/**
 * Footer institucional sobre navy. Signature de marca: la "P" de gran tamaño como marca de agua de
 * fondo (en la sans del logo, no serif). Datos de contacto en <address> real con tel:/mailto:.
 */
export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tel = siteInfo.telefono.replace(/[^\d]/g, "");
  const year = new Date().getFullYear();

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

      <Container className="relative grid gap-12 py-16 md:grid-cols-3 md:py-20">
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
              href={`#${s.id}`}
              className="hover:text-steel-soft focus-visible:ring-offset-navy w-fit rounded-[2px] text-sm text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {tNav(s.key)}
            </a>
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
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            {siteInfo.direccion[locale]}
          </p>
        </address>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {year} Pagaza Abogados Tributarios. {t("rights")}
          </p>
          <p>{t("brotaBy")}</p>
        </Container>
      </div>
    </footer>
  );
}
