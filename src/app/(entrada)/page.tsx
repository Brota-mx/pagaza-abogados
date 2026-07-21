import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Puerta de entrada (`/`) — el logo se abre y el visitante elige idioma, al estilo de las
 * referencias que envió el cliente (ritch.com.mx, cyma-mx.com). Sustituye al redirect automático
 * a `/es`: elegir idioma es ahora un acto deliberado, no una negociación de cabeceras.
 *
 * SEO: los dos destinos son <a> reales con hreflang, así que el crawler entra al sitio desde aquí;
 * el canónico de esta página es la raíz y x-default apunta a ella.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pagaza Abogados Tributarios",
  description:
    "Despacho fiscalista boutique en Lomas de Chapultepec, CDMX. Elige idioma para entrar. / Boutique tax law firm in Mexico City. Choose a language to enter.",
  alternates: {
    canonical: "/",
    languages: { es: "/es", en: "/en", "x-default": "/" },
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export default function EntradaPage() {
  return (
    <main className="bg-bg flex min-h-screen flex-col items-center justify-center px-6 py-16">
      {/*
        El "logo que se abre": el tracking se expande y la opacidad sube. La animación vive en
        clases utilitarias definidas en globals.css (`animate-entrada-*`), que el bloque global de
        `prefers-reduced-motion` neutraliza dejando el estado final visible.
      */}
      {/* `items-center` gana sobre el `items-start` del Wordmark vía tailwind-merge: aquí la
          bajada es más ancha que "PAGAZA" y alinear a la izquierda descentraría el conjunto. */}
      <div className="animate-entrada-marca text-brand">
        <Wordmark
          className="items-center text-[clamp(2.5rem,9vw,5.5rem)]"
          sublabel
        />
      </div>

      <span
        aria-hidden
        className="bg-steel animate-entrada-regla mt-12 h-px w-16 origin-center"
      />

      <nav
        aria-label="Idioma / Language"
        className="animate-entrada-acceso mt-12 flex items-center gap-4 text-sm font-medium tracking-[0.18em] uppercase"
      >
        {/*
          Anclas nativas, no next/link. La puerta y el sitio son root layouts distintos, así que
          entrar es una navegación de documento y no una transición de cliente: con `Link` el
          router no resolvía el destino y el clic se quedaba en la propia puerta (lo cazó un E2E).
          De paso evita prefetchear la home de un idioma que quizá no sea el elegido.
        */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/es"
          lang="es"
          hrefLang="es"
          className="text-brand focus-visible:ring-brand rounded-[2px] px-2 py-1 underline-offset-8 transition-opacity hover:underline focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          Entrar
        </a>
        <span aria-hidden className="text-muted/40">
          /
        </span>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/en"
          lang="en"
          hrefLang="en"
          className="text-brand focus-visible:ring-brand rounded-[2px] px-2 py-1 underline-offset-8 transition-opacity hover:underline focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          Enter
        </a>
      </nav>
    </main>
  );
}
