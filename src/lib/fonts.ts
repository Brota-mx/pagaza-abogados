import { Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Las tres familias del sitio, en un solo sitio. Estaban declaradas por duplicado en los dos root
 * layouts —el del sitio y el de la puerta de entrada— y ya habían divergido: la puerta declaraba
 * dos pesos de Pagella y el sitio cuatro.
 *
 * Declararlas todas en ambas páginas no cuesta descargas: el navegador sólo pide el woff2 de una
 * familia cuando algún glifo la necesita, y en la puerta de entrada (que no usa `font-serif`)
 * Pagella no se descarga. Medido en build de producción.
 */

/**
 * Serif institucional — TeX Gyre Pagella (GUST Font License, ver public/fonts/LICENSE-GUST.txt).
 * Clon libre y métricamente compatible con Palatino, del que Book Antiqua también es clon: es la
 * tipografía que el despacho usa en sus notas profesionales (directriz del cliente, 19-jul-2026).
 * Solo existen 400 y 700 — no hay 500/600 como en la EB Garamond que sustituye.
 */
export const pagella = localFont({
  src: [
    {
      path: "../../public/fonts/pagella-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/pagella-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/pagella-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/pagella-bolditalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-pagella",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Sans geométrico para el WORDMARK (iguala el logo real: "PAGAZA" sans, tracking amplio).
 *
 * Va auto-alojada y RECORTADA a los 12 glifos que dibuja —ABDGIOPRSTUZ, o sea "PAGAZA",
 * "ABOGADOS TRIBUTARIOS" y la P de agua del footer—: vía next/font/google bajaban 35 kB del
 * subset latino completo para pintar doce letras (auditoría del 1-ago-2026). El recorte deja el
 * archivo en 3 kB, un 91% menos, conservando el eje variable de peso 100–900 para que sigan
 * funcionando el 500 de la bajada y el 600 del wordmark.
 *
 * Regenerar tras cambiar el texto de la marca:
 *   pyftsubset <montserrat-variable.ttf> --text="ABDGIOPRSTUZ" --flavor=woff2 \
 *     --output-file=public/fonts/montserrat-wordmark.woff2
 *
 * Licencia SIL OFL 1.1 — ver public/fonts/LICENSE-MONTSERRAT-OFL.txt (obligatorio conservarla al
 * redistribuir la fuente, y este repo es público).
 */
export const montserrat = localFont({
  src: "../../public/fonts/montserrat-wordmark.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

/** Las tres variables CSS, para el `className` del <html>. */
export const fontVariables = `${pagella.variable} ${inter.variable} ${montserrat.variable}`;
