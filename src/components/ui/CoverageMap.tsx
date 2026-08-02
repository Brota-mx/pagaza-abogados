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
 */
const PINES_OFICINAS = [
  { x: 58.0, y: 74.3 }, // Ciudad de México
  { x: 35.9, y: 19.5 }, // Ciudad Juárez
];

/**
 * Cobertura geográfica: mapa real de México (tiles CARTO Positron sin etiquetas, dominio público/
 * uso libre, recorteados y recoloreados a duotono navy/brand una sola vez — ver
 * `public/images/mapa-mexico.png`) con un pin por sede física. Un mapa esquemático dibujado a mano
 * se descartó en una auditoría anterior por representar mal la silueta; este usa geografía real, no
 * inventada. El mapa + pines son decorativos (aria-hidden): la dirección completa de cada sede ya
 * vive como texto accesible en Footer y Contacto. La lista de la izquierda (corresponsalías por
 * región) es distinta del mapa: la red de aliados no son puntos en México. Server component.
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
    <div className="grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div>
        <p className="text-steel-soft mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase">
          <span aria-hidden className="bg-steel h-px w-8" />
          {labels.titulo}
        </p>
        <p className="max-w-md leading-relaxed text-white/70">{labels.nota}</p>

        <dl className="mt-8 grid grid-cols-2 gap-8">
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

      <div className="border-white/15 relative w-full overflow-hidden rounded-[4px] border">
        <div aria-hidden>
          <Image
            src="/images/mapa-mexico.png"
            alt=""
            width={900}
            height={678}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full"
          />
          {siteInfo.oficinas.map((oficina, i) => {
            const pin = PINES_OFICINAS[i];
            if (!pin) return null;
            return (
              <div
                key={oficina.ciudad.es}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <span className="bg-steel-soft ring-navy/60 h-2 w-2 rounded-full ring-2" />
                <span className="bg-navy-ink/80 rounded-[2px] px-1.5 py-0.5 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap text-white uppercase">
                  {localize(oficina.ciudad, locale)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Atribución de datos (ODbL): obligatoria aunque el mapa esté recoloreado y horneado
            como imagen estática — es la geometría de OpenStreetMap la que se reutiliza. */}
        <p className="absolute right-2 bottom-1.5 text-[9px] text-white/40">
          ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 underline underline-offset-2"
          >
            OpenStreetMap
          </a>
        </p>
      </div>
    </div>
  );
}
