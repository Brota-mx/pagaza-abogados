import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Compromiso } from "@/components/sections/Compromiso";
import type { Locale } from "@/content/types";

/**
 * Home one-page. El <main> lo aporta el layout; aquí se componen las secciones en orden.
 * Fase 3: Hero (navy, cifras con count-up) + Compromiso. Pilares/Metodología/Sectores/Alianzas/
 * Contacto se añaden en las fases siguientes.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Compromiso locale={locale as Locale} />
    </>
  );
}
