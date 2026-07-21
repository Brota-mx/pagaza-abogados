"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_SECTIONS } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

/**
 * Header fijo, scroll-aware: transparente sobre el hero (texto blanco) → superficie sólida con
 * hairline al hacer scroll (texto navy). El <main> compensa el header fijo con scroll-padding-top
 * (globals.css) para que las anclas no queden ocultas.
 *
 * A2/AA: los enlaces de nav mantienen el color heredado (contraste pleno en ambos estados) y el
 * hover se indica con un subrayado bronce que crece — no con un cambio de color de texto que
 * reprobaría AA sobre blanco. Solo transición de color/opacidad → seguro con reduced-motion.
 */
export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-line bg-surface/95 text-navy border-b backdrop-blur"
          : "border-b border-transparent bg-transparent text-white",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="Pagaza Abogados Tributarios — inicio"
          className={cn(
            "focus-visible:ring-brand rounded-[2px] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent focus-visible:outline-none",
            solid ? "text-brand" : "text-white",
          )}
        >
          <Wordmark className="text-lg" />
        </Link>

        <nav
          aria-label={t("menu")}
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative rounded-[2px] py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
            >
              {t(s.key)}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher />
          <a
            href="#contacto"
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
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-line bg-surface text-navy border-t lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="hover:text-brand rounded-[2px] py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
              >
                {t(s.key)}
              </a>
            ))}
            <div className="border-line mt-3 flex items-center justify-between border-t pt-4">
              <LocaleSwitcher />
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="bg-navy hover:bg-navy-2 cursor-pointer rounded-[2px] px-5 py-2.5 text-xs font-medium tracking-[0.1em] text-white uppercase transition-colors focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none"
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
