"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Selector ES/EN. Crawlable y sin JS de navegación: cada idioma es un <Link> localizado que
 * conserva la ruta actual (usePathname devuelve el path SIN prefijo de locale).
 *
 * A2 + Regla #5: el idioma activo NO se distingue solo por color (el bronce sobre blanco reprueba
 * AA). Se marca con subrayado bronce + aria-current + texto a contraste pleno (color heredado del
 * header); el inactivo se atenúa por opacidad.
 */
export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase"
    >
      {routing.locales.map((loc, i) => {
        const isActive = loc === active;
        return (
          <span key={loc} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-current/30">
                /
              </span>
            )}
            <Link
              href={pathname}
              locale={loc}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "focus-visible:ring-bronze rounded-[2px] underline-offset-4 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
                isActive
                  ? "decoration-bronze underline decoration-2"
                  : "no-underline opacity-60 hover:opacity-100",
              )}
            >
              {loc}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
