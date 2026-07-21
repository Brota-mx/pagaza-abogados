import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Compromiso } from "@/components/sections/Compromiso";
import { Servicios } from "@/components/sections/Servicios";
import { Pilares } from "@/components/sections/Pilares";
import { Capacidades } from "@/components/sections/Capacidades";
import { Sectores } from "@/components/sections/Sectores";
import { Alianzas } from "@/components/sections/Alianzas";
import { Contacto } from "@/components/sections/Contacto";
import type { Locale } from "@/content/types";

/**
 * Home one-page. El <main> lo aporta el layout; aquí se componen las secciones en orden.
 *
 * El orden es el que el cliente listó en su nota del 19-jul-2026: Pagaza (hero) → Nuestro
 * compromiso → Servicios → ¿Cómo lo hacemos? (Pilares) → Capacidades → Experiencias e industrias
 * (Sectores) → Alianzas → Contacto. Metodología ya no es sección propia: vive dentro de Pilares.
 * El ritmo navy → claro alternado da jerarquía institucional.
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
      <Servicios locale={loc} />
      <Pilares locale={loc} />
      <Capacidades locale={loc} />
      <Sectores locale={loc} />
      <Alianzas locale={loc} />
      <Contacto locale={loc} />
    </>
  );
}
