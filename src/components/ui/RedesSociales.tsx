import { getTranslations } from "next-intl/server";
import { Facebook, Instagram, type LucideIcon } from "lucide-react";
import { listaRedes } from "@/lib/redes";
import type { RedSocial } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * La marca X no tiene icono correcto en lucide: su export `X` es la cruz de cerrar (la que usa el
 * menú móvil del Header) y `Twitter` es el pájaro anterior al rebranding. Se dibuja aquí en el
 * mismo registro de trazo que el resto de iconos del sitio, en vez de incrustar el glifo sólido
 * oficial: mezclar una marca sólida con iconos de trazo rompe el sistema visual, y el trazo
 * transmite igual de bien de qué red se trata cuando el enlace ya lleva su nombre accesible.
 * `strokeWidth={2}` no es arbitrario: es el valor por defecto de lucide, así que la X pesa lo
 * mismo que los iconos de Instagram y Facebook que tiene al lado.
 */
function IconoX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M4 3l16 18M20 3L4 21" />
    </svg>
  );
}

/**
 * Icono por red: concern presentacional, así que vive aquí y no en `content/*` — misma convención
 * que el mapa de materias de `Alianzas.tsx`. El contenido sólo aporta la URL.
 */
const ICONOS: Record<RedSocial, LucideIcon | typeof IconoX> = {
  instagram: Instagram,
  facebook: Facebook,
  x: IconoX,
};

/** Nombre propio de cada red: no se traduce, así que no pasa por `messages`. */
const NOMBRES: Record<RedSocial, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
};

/**
 * Enlaces a las redes del despacho. Renderiza SÓLO las que tienen URL real en `site.ts` (hoy sólo
 * Instagram) y no devuelve nada si no hay ninguna, para que el bloque no deje un hueco vacío.
 *
 * `tone="light"` = sobre navy (mismo vocabulario que `SectionHeading`), que decide el anillo de
 * foco: blanco sobre oscuro, brand sobre claro.
 */
export async function RedesSociales({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const redes = listaRedes();
  if (redes.length === 0) return null;

  const t = await getTranslations("redes");
  const light = tone === "light";

  return (
    <div className={className}>
      <p
        className={cn(
          "mb-1 text-xs font-medium tracking-[0.14em] uppercase",
          light ? "text-steel-soft" : "text-brand",
        )}
      >
        {t("titulo")}
      </p>
      {/* El -ml-3 va en la lista, no en cada enlace: recupera una sola vez la alineación óptica
          con el texto de arriba, que el padding del área táctil rompería. Estaba como
          `first:-ml-3` en el <a>, pero el <a> es hijo ÚNICO de su <li>, así que `first:` casaba
          con todos y el desplazamiento se aplicaba a cada icono — invisible con una sola red,
          roto en cuanto se añadiera Facebook o X. */}
      <ul className="-ml-3 flex items-center">
        {redes.map(({ red, url }) => {
          const Icono = ICONOS[red];
          return (
            <li key={red}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("enlace", { red: NOMBRES[red] })}
                /* h-11 w-11 = 44px de área táctil: el commit e264ef7 ya tuvo que corregir
                   objetivos por debajo de ese mínimo en el menú móvil. */
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  light
                    ? "focus-visible:ring-offset-navy text-white/80 hover:text-white focus-visible:ring-white"
                    : "text-muted hover:text-brand focus-visible:ring-brand",
                )}
              >
                <Icono className="h-5 w-5" aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
