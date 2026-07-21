type Region = { region: string; tipo: "nacional" | "internacional" };

/**
 * Cobertura geográfica como gráfico vectorial limpio (no un mapa literal de México: sin datos de
 * silueta fiables, una forma inexacta se vería mal). México es el hub, conectado por hairlines a
 * los nodos internacionales dispuestos N/E/S (≈ EE.UU./Europa/LatAm). El SVG es decorativo
 * (aria-hidden); la lista de regiones a la izquierda es la fuente accesible. Server component.
 */
export function CoverageMap({
  cobertura,
  labels,
}: {
  cobertura: Region[];
  labels: {
    titulo: string;
    nacional: string;
    internacional: string;
    nota: string;
  };
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

      <svg
        aria-hidden
        viewBox="0 0 360 260"
        className="w-full max-w-md justify-self-center lg:justify-self-end"
        fill="none"
      >
        {/* Conectores hub → nodos */}
        <g stroke="var(--color-steel)" strokeWidth="1" strokeOpacity="0.5">
          <line x1="96" y1="132" x2="96" y2="52" />
          <line x1="96" y1="132" x2="300" y2="86" />
          <line x1="96" y1="132" x2="214" y2="212" />
        </g>
        {/* Nodos internacionales (bronce outline) */}
        <g stroke="var(--color-steel-soft)" strokeWidth="1.5">
          <circle cx="96" cy="52" r="5" />
          <circle cx="300" cy="86" r="5" />
          <circle cx="214" cy="212" r="5" />
        </g>
        {/* Hub México (bronce sólido + anillo) */}
        <circle
          cx="96"
          cy="132"
          r="16"
          fill="var(--color-steel)"
          fillOpacity="0.12"
        />
        <circle cx="96" cy="132" r="7" fill="var(--color-steel-soft)" />
      </svg>
    </div>
  );
}
