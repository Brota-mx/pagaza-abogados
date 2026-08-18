import Image from "next/image";
import { t, type Locale, type MiembroEquipo } from "@/content/types";

/**
 * Tarjeta de un integrante. Vive junto a su sección (regla de organización 4).
 *
 * Mientras no hay fotografía se pinta un monograma sobre navy. Va `aria-hidden` porque el nombre
 * está inmediatamente al lado: anunciar "AP" antes de "Alfonso Pagaza" sería ruido duplicado.
 */
export function EquipoMiembro({
  miembro,
  semblanzaPendiente,
  etiquetaProvisional,
  locale,
}: {
  miembro: MiembroEquipo;
  semblanzaPendiente: string;
  etiquetaProvisional: string;
  locale: Locale;
}) {
  return (
    <div className="flex gap-6">
      {miembro.retrato ? (
        <Image
          src={miembro.retrato.src}
          alt={t(miembro.retrato.alt, locale)}
          width={miembro.retrato.width}
          height={miembro.retrato.height}
          className="h-auto w-28 shrink-0 rounded-[4px] object-cover grayscale"
        />
      ) : (
        <div
          aria-hidden
          className="bg-navy flex aspect-[4/5] w-28 shrink-0 items-center justify-center rounded-[4px]"
        >
          <span className="text-steel-soft font-serif text-3xl">
            {miembro.iniciales}
          </span>
        </div>
      )}

      <div className="min-w-0">
        <span aria-hidden className="bg-brand mb-3 block h-px w-4" />
        <h3 className="text-navy font-serif text-xl">{miembro.nombre}</h3>
        <p className="text-brand mt-1 text-xs font-medium tracking-[0.14em] uppercase">
          {t(miembro.cargo, locale)}
        </p>

        {miembro.provisional ? (
          <>
            {/* El indicador es la PALABRA, no el color: sin esto el marcador dependería de un matiz
                y fallaría el criterio de "el color nunca como único indicador". */}
            <p className="border-line text-muted mt-4 inline-block rounded-[2px] border px-1.5 py-0.5 text-[10px] font-medium tracking-[0.14em] uppercase">
              {etiquetaProvisional}
            </p>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {semblanzaPendiente}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
