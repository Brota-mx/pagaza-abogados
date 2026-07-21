"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Separa "98%" → {prefix:"", num:98, suffix:"%"} y "$55M" → {prefix:"$", num:55, suffix:"M"}. */
function parseValue(value: string) {
  const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m)
    return {
      prefix: "",
      target: null as number | null,
      suffix: value,
      decimals: 0,
    };
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return {
    prefix,
    target: parseFloat(num.replace(",", ".")),
    suffix,
    decimals,
  };
}

/**
 * Cifra de impacto con count-up al entrar al viewport — el diferenciador del sitio.
 * M8: la animación se hace con requestAnimationFrame, que el CSS global de reduced-motion NO
 * frena; por eso se lee `matchMedia` en JS y, si el usuario lo pide, se muestra el valor final
 * sin animar. El número animado es aria-hidden; el valor final va sr-only para lectores de pantalla.
 */
export function StatBlock({
  value,
  label,
  tone = "dark",
  className,
}: {
  value: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const { prefix, target, suffix, decimals } = parseValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(
    target === null ? value : `${prefix}0${suffix}`,
  );

  useEffect(() => {
    const final =
      target === null ? value : `${prefix}${target.toFixed(decimals)}${suffix}`;
    if (target === null) {
      setDisplay(final);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(final);
      return;
    }

    let raf = 0;
    let startTime = 0;
    const duration = 1400;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(final);
    };

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const light = tone === "light";
  return (
    <div ref={ref} className={className}>
      <p
        aria-hidden
        className={cn(
          "font-serif text-5xl leading-none md:text-6xl",
          light ? "text-brand" : "text-steel-soft",
        )}
      >
        {display}
      </p>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          light ? "text-muted" : "text-white/70",
        )}
      >
        <span className="sr-only">{value} — </span>
        {label}
      </p>
    </div>
  );
}
