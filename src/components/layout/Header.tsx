"use client";

import { Fragment, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { NAV_SECTIONS } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

/** Enlace de nav: subrayado que crece en hover, foco heredando el color del texto. */
const enlaceNav =
  "group relative rounded-[2px] py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none";
const subrayadoNav =
  "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100";

/**
 * Enlaces de la primera pantalla (estado transparente). Se mapean en vez de escribirlos a mano:
 * "Nuestro equipo" se sumó en agosto de 2026 y triplicar el literal `<a>` + separador es
 * exactamente como se desincronizan. Las claves son de `messages.nav`.
 */
const ENLACES_PORTADA = ["inicio", "newsletter", "equipo"] as const;

/**
 * Header fijo de dos capas (petición del cliente, 19-jul-2026):
 *
 * - Arriba del todo, sobre el hero: solo `Inicio | Newsletter` y el selector de idioma. Sin
 *   wordmark (el hero ya carga la marca) y sin el icono de hamburguesa, que el cliente pidió
 *   quitar expresamente de la primera pantalla — también en móvil.
 * - Al bajar: la barra se vuelve superficie sólida con hairline y aparece el menú completo
 *   (wordmark, secciones, idioma, CTA; hamburguesa en móvil).
 *
 * El <main> compensa el header fijo con scroll-padding-top (globals.css) para que las anclas no
 * queden ocultas.
 *
 * ⚠️ El estado transparente SOLO es legible sobre el hero navy, así que está atado a la home. En
 * las páginas legales, que abren sobre fondo claro, el header nace sólido: antes heredaba el texto
 * blanco sobre #F5F6F8 y quedaba en un contraste de 1.08:1 —invisible— hasta que el visitante
 * bajaba (auditoría del 1-ago-2026).
 *
 * AA: los enlaces mantienen el color heredado (contraste pleno en ambos estados) y el hover se
 * marca con un subrayado que crece, no con un cambio de color. Solo transición de
 * color/opacidad → seguro con reduced-motion.
 */
export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // `usePathname` de next-intl devuelve la ruta INTERNA, sin prefijo de idioma: la home es "/".
  const enHome = pathname === "/";
  /**
   * Las secciones viven en la home, así que las anclas se emiten absolutas (`/es#contacto`) y
   * funcionan igual desde una página legal. Estando ya en la home, el navegador las trata como
   * navegación de fragmento: hace scroll suave sin recargar.
   */
  const home = getPathname({ href: "/", locale });
  const ancla = (id: string) => `${home}#${id}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !enHome || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-line bg-surface/95 text-navy border-b backdrop-blur"
          : "border-b border-transparent bg-transparent text-white",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-3">
        {solid ? (
          <>
            <Link
              href="/"
              aria-label="Pagaza Abogados Tributarios — inicio"
              className="text-brand focus-visible:ring-brand rounded-[2px] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent focus-visible:outline-none"
            >
              <Wordmark className="text-lg" />
            </Link>

            <nav
              aria-label={t("menu")}
              className="hidden items-center gap-4 xl:flex"
            >
              {NAV_SECTIONS.map((s) => (
                <a key={s.id} href={ancla(s.id)} className={enlaceNav}>
                  {t(s.key)}
                  <span aria-hidden className={subrayadoNav} />
                </a>
              ))}
              <Link href="/abogado-fiscalista" className={enlaceNav}>
                {t("defensaFiscal")}
                <span aria-hidden className={subrayadoNav} />
              </Link>
            </nav>

            <div className="hidden items-center gap-4 xl:flex">
              <LocaleSwitcher />
              <a
                href={ancla("contacto")}
                className="bg-brand hover:bg-navy cursor-pointer rounded-[2px] px-5 py-2.5 text-xs font-medium tracking-[0.1em] text-white uppercase transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
              >
                {tCta("consulta")}
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("open")}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none xl:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        ) : (
          <>
            {/* Primera pantalla: unos pocos enlaces y el idioma. Nada más — ni marca ni
                hamburguesa. El gap se aprieta en el breakpoint base porque al sumar el tercer
                enlace la fila va justa en pantallas estrechas; medido hasta 320px, donde con
                `gap-7` el rótulo chocaba con el selector de idioma. */}
            <nav
              aria-label={t("menu")}
              className="flex items-center gap-3 text-sm sm:gap-7"
            >
              {ENLACES_PORTADA.map((clave, i) => (
                <Fragment key={clave}>
                  {i > 0 && (
                    <span aria-hidden className="text-current/30">
                      |
                    </span>
                  )}
                  <a href={ancla(clave)} className={enlaceNav}>
                    {t(clave)}
                    <span aria-hidden className={subrayadoNav} />
                  </a>
                </Fragment>
              ))}
            </nav>
            <LocaleSwitcher />
          </>
        )}
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-line bg-surface text-navy max-h-[calc(100dvh-5rem)] overflow-y-auto border-t xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={ancla(s.id)}
                onClick={() => setOpen(false)}
                className="hover:text-brand rounded-[2px] py-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
              >
                {t(s.key)}
              </a>
            ))}
            <Link
              href="/abogado-fiscalista"
              onClick={() => setOpen(false)}
              className="hover:text-brand rounded-[2px] py-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
            >
              {t("defensaFiscal")}
            </Link>
            <div className="border-line mt-3 flex items-center justify-between border-t pt-4">
              <LocaleSwitcher />
              <a
                href={ancla("contacto")}
                onClick={() => setOpen(false)}
                className="bg-navy hover:bg-navy-2 cursor-pointer rounded-[2px] px-5 py-3.5 text-xs font-medium tracking-[0.1em] text-white uppercase transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {tCta("consulta")}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
