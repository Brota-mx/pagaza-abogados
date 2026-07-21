import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { AVISO_ACTUALIZADO, avisoLegal } from "@/content/legal";
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
  const href = (l: Locale) => getPathname({ href: "/aviso-legal", locale: l });

  return {
    title: t(avisoLegal.titulo, loc),
    description: t(avisoLegal.intro, loc).slice(0, 155),
    alternates: {
      canonical: href(loc),
      languages: { es: href("es"), en: href("en"), "x-default": "/" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function AvisoLegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <DocumentoLegalView
      doc={avisoLegal}
      actualizado={AVISO_ACTUALIZADO[loc]}
      locale={loc}
    />
  );
}
