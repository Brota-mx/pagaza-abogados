import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Compromiso } from "@/components/sections/Compromiso";
import { Pilares } from "@/components/sections/Pilares";
import { Metodologia } from "@/components/sections/Metodologia";
import { Sectores } from "@/components/sections/Sectores";
import type { Locale } from "@/content/types";

/**
 * Home one-page. El <main> lo aporta el layout; aquí se componen las secciones en orden.
 * Fase 3-5: Hero → Compromiso → Pilares → Metodología → Sectores. Alianzas/Contacto se añaden
 * en las fases siguientes. El ritmo navy → claro → navy → claro da jerarquía institucional.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <>
      <Hero />
      <Compromiso locale={loc} />
      <Pilares locale={loc} />
      <Metodologia locale={loc} />
      <Sectores locale={loc} />
    </>
  );
}
