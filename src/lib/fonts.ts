import { Inter, Montserrat } from "next/font/google";
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

// Sans geométrico para el WORDMARK (iguala el logo real: "PAGAZA" sans, tracking amplio).
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Las tres variables CSS, para el `className` del <html>. */
export const fontVariables = `${pagella.variable} ${inter.variable} ${montserrat.variable}`;
