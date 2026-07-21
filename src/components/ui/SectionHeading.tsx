import { cn } from "@/lib/utils";

/**
 * Encabezado de sección: eyebrow (Inter uppercase tracking) + título serif + intro.
 * `tone="dark"` para uso sobre fondo claro (por defecto); `tone="light"` sobre navy.
 * Signature de marca: una regla azul corta junto al eyebrow (hairline, no caja).
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: React.ElementType;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase",
            align === "center" && "justify-center",
            // Contraste: brand (11.28:1) sobre claro; steel-soft (6.8:1) sobre navy.
            light ? "text-steel-soft" : "text-brand",
          )}
        >
          <span
            aria-hidden
            className={cn("h-px w-8", light ? "bg-steel" : "bg-brand")}
          />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-serif text-3xl leading-tight md:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {intro && (
        // Medido a 1440px: `max-w-2xl` (42rem) con Pagella a 18px da ~63 caracteres por línea,
        // dentro del rango legible de 55–80. Estrecharlo a `max-w-xl` lo bajaba a 54 y además
        // abría huecos en el justificado. No tocar sin volver a medir.
        <p
          className={cn(
            "prose-justificado mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/80" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
