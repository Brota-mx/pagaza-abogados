import { cn } from "@/lib/utils";

/** Ancho máximo del contenido (1280px) + padding lateral responsive. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8", className)}
    >
      {children}
    </div>
  );
}
