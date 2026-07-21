import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";

/**
 * Root layout de la puerta de entrada (`/`). Es un root layout INDEPENDIENTE del sitio: Next
 * permite varios cuando toda página vive dentro de un route group, y aquí es justo lo que
 * queremos — navegar de `/` a `/es` es una recarga completa, no una transición de cliente.
 *
 * Se declaran las mismas familias que el sitio para que el wordmark y los enlaces no salten al
 * entrar, pero sin Header, Footer, providers de i18n ni analítica: la puerta es solo la puerta.
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
  ],
  variable: "--font-pagella",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function EntradaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `lang="es"` porque el contenido visible por defecto es español; el par ENTRAR/ENTER lleva
    // su propio `lang` y `hreflang` en cada enlace.
    <html
      lang="es"
      className={`${pagella.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
