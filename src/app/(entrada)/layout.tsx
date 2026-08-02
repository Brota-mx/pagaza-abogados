import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

/**
 * Root layout de la puerta de entrada (`/`). Es un root layout INDEPENDIENTE del sitio: Next
 * permite varios cuando toda página vive dentro de un route group, y aquí es justo lo que
 * queremos — navegar de `/` a `/es` es una recarga completa, no una transición de cliente.
 *
 * Se declaran las mismas familias que el sitio para que el wordmark y los enlaces no salten al
 * entrar, pero sin Header, Footer, providers de i18n ni analítica: la puerta es solo la puerta.
 */
export default function EntradaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `lang="es"` porque el contenido visible por defecto es español; el par ENTRAR/ENTER lleva
    // su propio `lang` y `hreflang` en cada enlace.
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
