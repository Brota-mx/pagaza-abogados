import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

/**
 * Catch-all del segmento de idioma. No pinta nada: existe para que una URL inexistente bajo /es o
 * /en ENTRE al layout localizado, y así el 404 se sirva en el idioma del visitante (`not-found.tsx`)
 * dentro del chrome del sitio.
 *
 * Sin esta ruta, `/es/loquesea` no coincidía con ningún segmento y moría en el router antes de
 * llegar al layout, así que Next respondía con su 404 interno —en inglés, "This page could not be
 * found", verificado en build de producción— y `not-found.tsx` junto con sus ocho claves de
 * traducción eran código muerto (auditoría del 1-ago-2026).
 *
 * Va SIN `generateStaticParams` a propósito: las URLs que no existen no se pueden enumerar, de modo
 * que esta rama se renderiza bajo demanda. Es la única página no estática del sitio y solo se toca
 * cuando alguien pide algo que no está.
 */
export default async function RutaInexistente({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // El 404 se pinta con las traducciones del idioma de la URL, no con las del locale por defecto.
  setRequestLocale(locale);
  notFound();
}
