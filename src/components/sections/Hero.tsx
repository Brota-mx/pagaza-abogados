import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { StatBlock } from "@/components/ui/StatBlock";

/**
 * Hero — la tesis del sitio: el slogan de la firma respaldado por dos cifras de impacto reales.
 * Sobre navy (primera sección) para que el Header en estado transparente sea legible. El texto
 * carga la personalidad; la prueba (98% / $55M) hace el trabajo pesado con count-up (StatBlock).
 */
export async function Hero() {
  const t = await getTranslations("home");

  return (
    <section
      id="inicio"
      className="bg-navy relative flex min-h-screen items-center overflow-hidden text-white"
    >
      {/* Fotografía de fondo (arquitectura clásica) tratada B/N-duotono navy. Decorativa. */}
      <Image
        src="/images/hero-arquitectura.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-55 grayscale"
      />
      {/* Scrim navy en duotono: más denso a la izquierda (texto legible sobre ~90% navy → AA) y
          abajo, dejando ver la arquitectura B/N en el centro/derecha. */}
      <div
        aria-hidden
        className="from-navy via-navy/70 to-navy/45 pointer-events-none absolute inset-0 bg-gradient-to-r"
      />
      <div
        aria-hidden
        className="from-navy-ink/70 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent to-60%"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-10 font-serif text-[26rem] leading-none text-white/[0.025] select-none md:text-[34rem]"
      >
        P
      </span>

      <Container className="relative py-32 md:py-40">
        <p className="text-steel-soft mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase">
          <span aria-hidden className="bg-steel h-px w-10" />
          {t("eyebrow")}
        </p>

        <h1 className="max-w-4xl font-serif text-5xl leading-[1.04] tracking-[-0.01em] md:text-7xl">
          {t("headline")}
        </h1>

        <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-white/80 italic md:text-3xl">
          {t("subhead")}
        </p>

        <div className="mt-10">
          <a
            href="#contacto"
            className="text-navy hover:bg-steel-soft focus-visible:ring-offset-navy inline-flex cursor-pointer items-center rounded-[2px] bg-white px-7 py-3.5 text-sm font-medium tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("cta")}
          </a>
        </div>

        <div className="mt-16 grid max-w-2xl gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 sm:gap-16">
          <StatBlock value={t("stat1Value")} label={t("stat1Label")} />
          <StatBlock value={t("stat2Value")} label={t("stat2Label")} />
        </div>
      </Container>
    </section>
  );
}
