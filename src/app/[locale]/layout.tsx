import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import {
  SITE_URL,
  SEO_KEYWORDS,
  legalServiceJsonLd,
  localeAlternates,
} from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/content/types";
import "@/styles/globals.css";

/**
 * Serif institucional — TeX Gyre Pagella (GUST Font License, ver public/fonts/LICENSE-GUST.txt).
 * Clon libre y métricamente compatible con Palatino, del que Book Antiqua también es clon: es la
 * tipografía que el despacho usa en sus notas profesionales (directriz del cliente, 19-jul-2026).
 * Solo existen 400 y 700 — no hay 500/600 como en la EB Garamond que sustituye.
 */
const pagella = localFont({
  src: [
    {
      path: "../../../public/fonts/pagella-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/pagella-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/pagella-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/pagella-bolditalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-pagella",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Sans geométrico para el WORDMARK (iguala el logo real: "PAGAZA" sans, tracking amplio).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Cero render dinámico: rechaza locales fuera de la lista en build.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // En generateMetadata NO corre setRequestLocale → locale explícito a getTranslations.
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s · ${t("brand")}` },
    description: t("description"),
    keywords: SEO_KEYWORDS,
    alternates: localeAlternates(locale),
    openGraph: {
      // La imagen OG la aporta app/[locale]/opengraph-image.tsx (convención de Next).
      type: "website",
      siteName: t("brand"),
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations("a11y");
  const tMeta = await getTranslations("metadata");
  // Mensajes explícitos al cliente (resuelve M7: no dependemos de la herencia automática v4).
  const messages = await getMessages();
  const jsonLd = legalServiceJsonLd(locale as Locale, tMeta("description"));

  return (
    <html
      lang={locale}
      className={`${pagella.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // JSON-LD (LegalService/LocalBusiness) — datos controlados, sin input de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#contenido"
            className="bg-navy sr-only rounded-[2px] px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="contenido">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
