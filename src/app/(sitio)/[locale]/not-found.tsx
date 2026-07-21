"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

/**
 * 404 dentro de un locale. Renderiza dentro del layout (hereda fuentes, provider y chrome), por lo
 * que usa useTranslations vía contexto del NextIntlClientProvider. Sobre navy para que el Header en
 * estado transparente sea legible (mismo criterio que el hero).
 */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="bg-navy flex min-h-screen items-center text-white">
      <Container className="py-32 text-center md:py-40">
        <p className="text-steel-soft mb-4 text-xs font-medium tracking-[0.18em] uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
          {t("description")}
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="text-navy hover:bg-steel-soft focus-visible:ring-offset-navy inline-flex cursor-pointer items-center rounded-[2px] bg-white px-7 py-3.5 text-sm font-medium tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("back")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
