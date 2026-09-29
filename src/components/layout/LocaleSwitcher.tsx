"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { blogRoutes, blogHref } from "@/content/blog/routes";
import type { Locale } from "@/content/types";

/**
 * Selector ES/EN. Crawlable y sin JS de navegación: cada idioma es un <Link> localizado que
 * conserva la ruta actual (usePathname devuelve el path SIN prefijo de locale).
 *
 * A2 + Regla #5: el idioma activo NO se distingue solo por color. Se marca con subrayado acero +
 * aria-current + texto a contraste pleno (color heredado del header); el inactivo se atenúa por
 * opacidad — pero solo hasta donde AA lo permite: al 60% sobre el header sólido (navy sobre
 * blanco) el texto caía a 4.24:1, por debajo del 4.5:1 mínimo (auditoría de diseño, 1-ago-2026).
 * 70% da 5.83:1 en ese estado y de paso mejora el 6.46:1 que ya tenía sobre el hero transparente.
 */
export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const post =
    pathname === "/blog/[slug]"
      ? blogRoutes.find((entry) => entry.slug[active as Locale] === params.slug)
      : undefined;
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
              href={
                pathname === "/blog/[slug]"
                  ? post
                    ? blogHref(post, loc)
                    : "/blog"
                  : pathname
              }
              locale={loc}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded-[2px] underline-offset-4 transition-opacity focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
                isActive
                  ? "decoration-steel underline decoration-2"
                  : "no-underline opacity-70 hover:opacity-100",
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
