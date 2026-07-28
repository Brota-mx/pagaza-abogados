import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { metodologia } from "@/content/metodologia";
import { siteInfo } from "@/content/site";
import { t as localize, type Locale } from "@/content/types";

/**
 * Hero — la tesis del sitio: el slogan completo de la firma, y nada más que lo sostenga.
 *
 * Reescrito con la nota del cliente del 27-jul-2026, que tocó las dos mitades del bloque:
 *
 * 1. "Quitar lo de defensa y blindaje…. Frase completa que [va] hasta el pie de pagina y en la
 *    misma tipografía toda." → fuera el subhead ("Defensa y blindaje patrimonial ante el SAT…",
 *    que era el copy funcional del PR #16) y el titular pasa a ser el slogan ÍNTEGRO, las dos
 *    oraciones. Al quedar un solo elemento de texto desaparece el contraste redonda/cursiva que
 *    había entre titular y subhead: "misma tipografía toda", literalmente.
 * 2. "Quitar estos datos, las cifras no nos encantan, poner alguno otro elemento de interés." →
 *    fuera el par 98% / $55M (y con él `StatBlock`, que ya no usaba nadie). En su lugar van las
 *    tres disciplinas de `metodologia`, que dicen qué hace la firma sin recurrir a un número.
 *
 * El slogan se lee de `content/site.ts` en vez de `messages/home.headline`: ya vivía ahí (lo usa
 * el Footer) y tenerlo duplicado en dos fuentes era una invitación a que se desincronizaran.
 *
 * ⚠️ Las tres disciplinas se repiten dentro de Pilares, y el slogan se repite en el Footer. Es
 * consecuencia directa de lo que pidió el cliente; si al verlo le pesa, lo que sobra es el
 * sub-bloque de Pilares, no esto.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations("home");

  return (
    <section
      id="inicio"
      className="bg-navy relative flex min-h-screen flex-col overflow-hidden text-white"
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

      {/* `justify-between` reparte los tres bloques de arriba abajo: es lo que hace que la frase
          "llegue hasta el pie de la página" en lugar de quedar centrada con hueco debajo. El
          padding es asimétrico a propósito: arriba tiene que despejar el Header fijo (81px), abajo
          se recorta para que la fila de disciplinas quede pegada al pie y el bloque entre en una
          pantalla de 720px de alto. */}
      <Container className="relative flex flex-1 flex-col justify-between gap-16 pt-28 pb-16 md:pt-32 md:pb-20">
        <p className="text-steel-soft flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase">
          <span aria-hidden className="bg-steel h-px w-10" />
          {t("eyebrow")}
        </p>

        <div>
          <h1 className="max-w-5xl font-serif text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl md:text-6xl lg:text-7xl">
            {localize(siteInfo.slogan, locale)}
          </h1>

          <div className="mt-10">
            <a
              href="#contacto"
              className="text-navy hover:bg-steel-soft focus-visible:ring-offset-navy inline-flex cursor-pointer items-center rounded-[2px] bg-white px-7 py-3.5 text-sm font-medium tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3">
          {metodologia.disciplinas.map((d) => (
            <li key={d.numero} className="flex items-baseline gap-3">
              <span aria-hidden className="text-steel font-serif text-sm">
                {d.numero}
              </span>
              <span className="font-serif text-lg leading-snug text-white/90 md:text-xl">
                {localize(d.titulo, locale)}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
