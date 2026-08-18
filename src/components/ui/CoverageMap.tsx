import Image from "next/image";
import { siteInfo } from "@/content/site";
import { t as localize, type Locale } from "@/content/types";

type Region = { region: string; tipo: "nacional" | "internacional" };

/**
 * Posición (% del ancho/alto de la imagen) de cada sede sobre `mapa-mexico.png`, en el mismo
 * orden que `siteInfo.oficinas`. Calculada por proyección Web Mercator de las coordenadas reales
 * de cada sede sobre el recorte final del mapa (script de un solo uso, no versionado: el mapa es
 * un asset estático, no se regenera en build). Si cambia el recorte de la imagen o el orden de
 * `oficinas`, hay que recalcular.
 *
 * ⚠️ ESTOS NÚMEROS SON CORRECTOS — verificados por Mercator inverso (el aspect-ratio que implican,
 * 1.344, cuadra con el real de la imagen, 1500×1130 = 1.327, dentro del 1.2%). El cliente reportó
 * en agosto de 2026 que el pin de Ciudad Juárez caía del lado estadounidense en móvil, pero el
 * error estaba en el ANCLA DEL RENDER, no aquí (ver el comentario del bloque de pines abajo).
 * Antes de recalcular nada, mide con `e2e/mapa.spec.ts`.
 */
const PINES_OFICINAS = [
  { x: 58.0, y: 74.3 }, // Ciudad de México
  { x: 35.9, y: 19.5 }, // Ciudad Juárez
];

/**
 * Cobertura geográfica: nota + lista de regiones (contenida, como el resto de la sección) seguida
 * de un mapa real de México a todo lo ancho de la pantalla (tiles CARTO Positron sin etiquetas,
 * dominio público/uso libre, recortados y recoloreados a duotono navy/brand una sola vez — ver
 * `public/images/mapa-mexico.png`) con un pin por sede física. Un mapa esquemático dibujado a mano
 * se descartó en una auditoría anterior por representar mal la silueta; este usa geografía real, no
 * inventada. El mapa rompe el `Container` con el truco estándar de full-bleed
 * (`w-screen` + márgenes negativos de 50vw): no depende del ancho del padre, solo de que ningún
 * ancestro tenga `overflow-x: hidden`. Mapa + pines son decorativos (aria-hidden): la dirección
 * completa de cada sede ya vive como texto accesible en Footer y Contacto. Server component.
 *
 * Anclaje de los pines: cada sede es un contenedor SIN dimensiones colocado exactamente en su
 * coordenada porcentual, del que cuelgan punto y etiqueta en posición absoluta. Antes el
 * contenedor era un flex column con `-translate-y-1/2`, que centraba el conjunto punto+etiqueta
 * (~37px de alto) sobre la coordenada y dejaba el punto ~14.5px por encima de su sitio. Ese offset
 * es en píxeles FIJOS mientras la coordenada es un PORCENTAJE, así que el error crecía al encoger
 * la pantalla: 1.4 puntos porcentuales a 1440px pero 5.1 a 375px, suficiente para empujar el pin
 * de Ciudad Juárez —que está a un paso de la frontera— al lado estadounidense. Medido en
 * `e2e/mapa.spec.ts`, que corre a tres anchos precisamente para fijar esa independencia.
 */
export function CoverageMap({
  cobertura,
  labels,
  locale,
}: {
  cobertura: Region[];
  labels: {
    titulo: string;
    nacional: string;
    internacional: string;
    nota: string;
  };
  locale: Locale;
}) {
  const nacional = cobertura.filter((c) => c.tipo === "nacional");
  const internacional = cobertura.filter((c) => c.tipo === "internacional");

  return (
    <>
      <div className="border-t border-white/15 pt-12">
        <p className="text-steel-soft mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase">
          <span aria-hidden className="bg-steel h-px w-8" />
          {labels.titulo}
        </p>
        <p className="max-w-md leading-relaxed text-white/70">{labels.nota}</p>

        <dl className="mt-8 grid max-w-md grid-cols-2 gap-8">
          <div>
            <dt className="text-steel-soft text-xs font-medium tracking-[0.14em] uppercase">
              {labels.nacional}
            </dt>
            <dd className="mt-2 space-y-1 font-serif text-lg text-white">
              {nacional.map((c) => (
                <p key={c.region}>{c.region}</p>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-steel-soft text-xs font-medium tracking-[0.14em] uppercase">
              {labels.internacional}
            </dt>
            <dd className="mt-2 space-y-1 font-serif text-lg text-white">
              {internacional.map((c) => (
                <p key={c.region}>{c.region}</p>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2">
        <div aria-hidden className="relative">
          <Image
            src="/images/mapa-mexico.png"
            alt=""
            width={1500}
            height={1130}
            sizes="100vw"
            className="w-full"
          />
          {siteInfo.oficinas.map((oficina, i) => {
            const pin = PINES_OFICINAS[i];
            if (!pin) return null;
            return (
              <div
                key={oficina.ciudad.es}
                className="absolute"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                {/* El punto se centra sobre el origen usando SU PROPIO tamaño (10px fijos), así que
                    su posición no depende ni del texto de la etiqueta ni del ancho de la pantalla.
                    `data-punto` es el gancho de `e2e/mapa.spec.ts`, que mide dónde cae de verdad:
                    no lo quites sin actualizar el test. */}
                <span
                  data-punto={i}
                  className="bg-steel-soft ring-navy/60 absolute top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
                />
                {/* La etiqueta también cuelga del origen en absoluto: por mucho que crezca —o que
                    cambie de idioma— no puede arrastrar al punto. Oculta bajo `md` porque sobre un
                    mapa de 375px una píldora ocupa ~24% del ancho; el bloque es decorativo
                    (aria-hidden) y las direcciones completas viven como texto en Footer y Contacto,
                    así que ocultarla no quita información, solo ruido. */}
                <span className="bg-navy-ink/80 absolute top-0 left-0 hidden -translate-x-1/2 translate-y-[9px] rounded-[2px] px-2 py-1 text-xs font-medium tracking-[0.08em] whitespace-nowrap text-white uppercase md:inline-block">
                  {localize(oficina.ciudad, locale)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Atribución de datos (ODbL): obligatoria aunque el mapa esté recoloreado y horneado
            como imagen estática — es la geometría de OpenStreetMap la que se reutiliza. */}
        <p className="absolute right-3 bottom-2 text-[10px] text-white/40">
          ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70"
          >
            OpenStreetMap
          </a>
        </p>
      </div>
    </>
  );
}
