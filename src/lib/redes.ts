import { siteInfo } from "@/content/site";
import type { RedSocial } from "@/content/types";

/** Orden de presentación, fijo. No depende del orden de las claves en `site.ts`. */
const REDES_ORDEN: readonly RedSocial[] = ["instagram", "facebook", "x"];

/**
 * Las redes que EXISTEN, en orden estable. Fuente única para los dos consumidores: los iconos del
 * footer y el `sameAs` del JSON-LD. Duplicar el filtro "omitir las vacías" en ambos sitios es como
 * se acaba publicando en datos estructurados un perfil que la interfaz no muestra (o al revés).
 */
export function listaRedes(): { red: RedSocial; url: string }[] {
  return REDES_ORDEN.flatMap((red) => {
    const url = siteInfo.redes?.[red];
    return url ? [{ red, url }] : [];
  });
}
