import { cn } from "@/lib/utils";

/**
 * Encabezado de sección: eyebrow (Inter uppercase tracking) + título serif + intro.
 * `tone="dark"` para uso sobre fondo claro (por defecto); `tone="light"` sobre navy.
 * Signature de marca: una regla bronce corta bajo el eyebrow (hairline, no caja).
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
            // A2: bronze-ink sobre claro; bronze-soft (más claro) sobre navy.
            light ? "text-bronze-soft" : "text-bronze-ink",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-8",
              light ? "bg-bronze-soft/60" : "bg-bronze/60",
            )}
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
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/80" : "text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
