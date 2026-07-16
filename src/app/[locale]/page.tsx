import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

/**
 * Home one-page. El <main> lo aporta el layout; aquí se devuelven las secciones.
 * Placeholder del hero (Paso 3 lo sustituye por el hero real con StatBlocks + foto B/N). Se
 * renderiza sobre navy para que el Header en su estado transparente (texto blanco) sea legible.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <section className="bg-navy relative flex min-h-screen items-center text-white">
      <Container className="py-32 md:py-40">
        <p className="text-bronze-soft mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase">
          <span aria-hidden className="bg-bronze/60 h-px w-8" />
          {t("eyebrow")}
        </p>

        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] md:text-7xl">
          {t("headline")}
        </h1>

        <p className="mt-6 max-w-2xl font-serif text-2xl text-white/80 italic">
          {t("subhead")}
        </p>

        <div className="mt-12 flex flex-col gap-10 border-t border-white/10 pt-10 sm:flex-row sm:gap-16">
          <div className="max-w-xs">
            <p className="text-bronze-soft font-serif text-5xl md:text-6xl">
              {t("stat1Value")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {t("stat1Label")}
            </p>
          </div>
          <div className="max-w-xs">
            <p className="text-bronze-soft font-serif text-5xl md:text-6xl">
              {t("stat2Value")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {t("stat2Label")}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <a
            href="#contacto"
            className="bg-bronze text-navy-ink hover:bg-bronze-soft focus-visible:ring-bronze focus-visible:ring-offset-navy inline-flex cursor-pointer items-center rounded-[2px] px-7 py-3.5 text-sm font-medium tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("cta")}
          </a>
        </div>

        <p className="mt-16 text-xs text-white/40">{t("scaffoldNote")}</p>
      </Container>
    </section>
  );
}
