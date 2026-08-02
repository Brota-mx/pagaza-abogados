"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Envoltura fade-up on-scroll (IntersectionObserver). Respeta prefers-reduced-motion leyéndolo en
 * JS: si el usuario lo pide, muestra el contenido de inmediato sin translate/opacity animados
 * (el CSS global de reduced-motion no bastaría para lógica basada en estado — ver M8).
 *
 * `as` existe porque dentro de una lista el envoltorio NO puede ser un <div>: `<ul> → <div> → <li>`
 * es HTML inválido y rompe la relación lista/ítem, así que el lector de pantalla anuncia la lista
 * vacía (auditoría del 1-ago-2026: 15 <li> desconectados en Compromiso, Pilares y Alianzas).
 * Cuando el envoltorio ES el hijo directo de un <ul>/<ol>, pásale `as="li"`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Elemento = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Elemento
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </Elemento>
  );
}
