import Image from "next/image";
import { Plus } from "lucide-react";
import { t, type Locale, type MiembroEquipo } from "@/content/types";

/**
 * Tarjeta de un integrante, plegable. El cliente pidió (7-sep-2026) que **solo la del socio
 * fundador** venga desplegada y el resto se abra al hacer clic — la sección tenía seis bios largas
 * y se leía como un muro de texto.
 *
 * `<details>/<summary>` nativo, como el acordeón de Sectores: sin `"use client"`, el contenido
 * cerrado sigue en el DOM (indexable), y el teclado lo aporta el navegador. `open` lo decide
 * `Equipo.tsx` (true para el fundador).
 *
 * Mientras no hay fotografía se pinta un monograma sobre navy. Va `aria-hidden` porque el nombre
 * está inmediatamente al lado. `items-start` evita que el flex lo estire a lo alto de la bio.
 */
export function EquipoMiembro({
  miembro,
  open,
  locale,
}: {
  miembro: MiembroEquipo;
  open: boolean;
  locale: Locale;
}) {
  return (
    <details open={open} className="group border-line border-b">
      <summary className="focus-visible:ring-brand flex cursor-pointer list-none items-start gap-6 rounded-[2px] py-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        {miembro.retrato ? (
          <Image
            src={miembro.retrato.src}
            alt={t(miembro.retrato.alt, locale)}
            width={miembro.retrato.width}
            height={miembro.retrato.height}
            className="w-20 shrink-0 rounded-[4px] object-cover grayscale sm:w-24"
          />
        ) : (
          <div
            aria-hidden
            className="bg-navy flex aspect-[4/5] w-20 shrink-0 items-center justify-center rounded-[4px] sm:w-24"
          >
            <span className="text-steel-soft font-serif text-2xl">
              {miembro.iniciales}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span aria-hidden className="bg-brand mb-3 block h-px w-4" />
          <h3 className="text-navy group-hover:text-brand font-serif text-xl transition-colors">
            {miembro.nombre}
          </h3>
          <p className="text-brand mt-1 text-xs font-medium tracking-[0.14em] uppercase">
            {t(miembro.cargo, locale)}
          </p>
        </div>

        <Plus
          size={18}
          aria-hidden
          className="text-brand mt-1 shrink-0 transition-transform duration-200 group-open:rotate-45"
        />
      </summary>

      <p className="text-muted pb-8 text-sm leading-relaxed sm:pl-[calc(6rem+1.5rem)]">
        {t(miembro.bio, locale)}
      </p>
    </details>
  );
}
