import { cn } from "@/lib/utils";

/**
 * Wordmark de la marca — iguala el logo REAL (`work/LOGO.jpeg`): "PAGAZA" en sans geométrico
 * (Montserrat) con tracking amplio, opcionalmente con la bajada "ABOGADOS TRIBUTARIOS". SIN punto,
 * SIN bronce (esos eran una invención; ver auditoría de diseño). Hereda el color por `currentColor`
 * (blanco sobre navy, `text-brand` sobre claro) y el tamaño del contenedor (font-size en em).
 */
export function Wordmark({
  className,
  sublabel = false,
}: {
  className?: string;
  sublabel?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex flex-col items-start leading-none", className)}
    >
      <span className="font-wordmark font-semibold tracking-[0.2em] uppercase">
        PAGAZA
      </span>
      {sublabel && (
        <span className="font-wordmark mt-[0.5em] text-[0.32em] font-medium tracking-[0.36em] uppercase opacity-90">
          Abogados Tributarios
        </span>
      )}
    </span>
  );
}
