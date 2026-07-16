import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EB_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { SITE_URL, localeAlternates } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/content/types";
import "@/styles/globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    alternates: localeAlternates(locale),
    openGraph: {
      type: "website",
      siteName: t("brand"),
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      images: ["/og-image.png"], // placeholder; OG real en el Paso 8.
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
  // Mensajes explícitos al cliente (resuelve M7: no dependemos de la herencia automática v4).
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${ebGaramond.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#contenido"
            className="bg-navy focus:ring-bronze sr-only rounded-[2px] px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
