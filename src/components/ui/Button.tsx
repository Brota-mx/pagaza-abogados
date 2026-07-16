import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] text-sm font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "cursor-pointer bg-navy px-7 py-3.5 text-white hover:bg-navy-2",
  ghost:
    "cursor-pointer border border-line px-7 py-3.5 text-navy hover:border-navy",
  // A2: bronce como TEXTO sobre fondo claro usa bronze-ink (WCAG AA); #b0894e se reserva a navy/decoración.
  link: "cursor-pointer text-bronze-ink underline-offset-4 hover:underline",
};

/**
 * Devuelve solo las clases de una variante, para reutilizar el estilo del botón sobre otros
 * elementos (p. ej. el `Link` localizado de next-intl, que no debe envolverse en <a>).
 */
export function buttonClasses(
  variant: Variant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Botón presentacional (sin hooks) → sirve en RSC y en cliente. Con `href` renderiza <a> para
 * anclas (#contacto), `tel:` y `mailto:`; sin `href`, un <button>.
 */
export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...rest
}: Props) {
  const cls = buttonClasses(variant, className);
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
