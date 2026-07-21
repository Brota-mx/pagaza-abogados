import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { AVISO_ACTUALIZADO, avisoPrivacidad } from "@/content/legal";
import { t, type Locale } from "@/content/types";
import { DocumentoLegalView } from "@/components/sections/DocumentoLegalView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  // Las URLs están traducidas (routing.pathnames), así que canonical y hreflang se derivan de
  // getPathname y no de concatenar el locale a una ruta fija.
  const href = (l: Locale) =>
    getPathname({ href: "/aviso-de-privacidad", locale: l });

  return {
    title: t(avisoPrivacidad.titulo, loc),
    description: t(avisoPrivacidad.intro, loc).slice(0, 155),
    alternates: {
      canonical: href(loc),
      languages: { es: href("es"), en: href("en"), "x-default": "/" },
    },
    // Es una página de servicio: útil para quien la busca, pero no debe competir con la home.
    robots: { index: true, follow: true },
  };
}

export default async function AvisoDePrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <DocumentoLegalView
      doc={avisoPrivacidad}
      actualizado={AVISO_ACTUALIZADO[loc]}
      locale={loc}
    />
  );
}
