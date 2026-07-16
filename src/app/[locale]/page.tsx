import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {t("eyebrow")}
        </p>

        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-navy md:text-7xl">
          {t("headline")}
        </h1>

        <p className="mt-6 font-serif text-2xl italic text-navy-2">
          {t("subhead")}
        </p>

        <div className="mt-12 flex flex-col gap-10 border-t border-line pt-10 sm:flex-row sm:gap-16">
          <div className="max-w-xs">
            <p className="font-serif text-5xl text-bronze-ink">{t("stat1Value")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("stat1Label")}
            </p>
          </div>
          <div className="max-w-xs">
            <p className="font-serif text-5xl text-bronze-ink">{t("stat2Value")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("stat2Label")}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <span className="inline-block bg-navy px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white">
            {t("cta")}
          </span>
        </div>

        <p className="mt-16 text-xs text-muted/70">{t("scaffoldNote")}</p>
      </div>
    </main>
  );
}
