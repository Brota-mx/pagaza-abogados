import { Plus } from "lucide-react";

export type ResolvedCaso = {
  descripcion: string;
  cifra?: { valor: string; etiqueta: string };
};

export type ResolvedSector = {
  id: string;
  numero: string;
  nombre: string;
  resumen: string;
  casos: ResolvedCaso[];
  destacado: boolean;
};

/**
 * Acordeón de sectores. Cada fila: número + nombre + badge de cifra (en los destacados) + control
 * "+". Al abrir muestra el resumen y los casos; los casos con cifra reciben tratamiento destacado.
 *
 * Usa `<details>/<summary>` nativo en lugar del acordeón de Radix que había antes. El motivo es de
 * fondo, no de estilo: Radix no monta el contenido cerrado, así que TODOS los casos de éxito —la
 * prueba más valiosa del sitio, incluidas las cifras de $55M, 98% y $12M— quedaban fuera del HTML
 * servido y eran invisibles para los buscadores. Con `<details>` el contenido siempre está en el
 * DOM (Google indexa lo que hay dentro de un `details` cerrado), la navegación por teclado y el
 * estado expandido/colapsado los aporta el navegador, y el componente deja de necesitar
 * `"use client"`.
 *
 * El atributo `name` compartido hace el acordeón exclusivo (solo uno abierto) de forma nativa.
 * Donde el navegador no lo soporte, la degradación es que se puedan abrir varios: aceptable.
 */
export function SectoresAccordion({
  sectores,
}: {
  sectores: ResolvedSector[];
}) {
  const abiertoPorDefecto =
    sectores.find((s) => s.destacado)?.id ?? sectores[0]?.id;

  return (
    <div className="border-line mt-14 border-t">
      {sectores.map((sector) => {
        const badge = sector.destacado
          ? sector.casos.find((c) => c.cifra)?.cifra?.valor
          : undefined;

        return (
          <details
            key={sector.id}
            name="sectores"
            open={sector.id === abiertoPorDefecto}
            className="group border-line border-b"
          >
            <summary className="focus-visible:ring-brand flex cursor-pointer list-none items-center gap-4 rounded-[2px] py-6 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              <span className="text-brand/80 w-6 shrink-0 font-serif text-sm tabular-nums">
                {sector.numero}
              </span>
              <h3 className="text-navy group-hover:text-brand flex-1 font-serif text-xl transition-colors md:text-2xl">
                {sector.nombre}
              </h3>
              {badge && (
                <span className="bg-brand/10 text-brand hidden shrink-0 rounded-[2px] px-2.5 py-1 text-xs font-medium sm:inline-block">
                  {badge}
                </span>
              )}
              <Plus
                size={18}
                aria-hidden
                className="text-brand shrink-0 transition-transform duration-200 group-open:rotate-45"
              />
            </summary>

            <div className="grid gap-6 pb-9 md:grid-cols-[1fr_1.4fr] md:gap-12 md:pl-10">
              <p className="prose-justificado text-muted leading-relaxed">
                {sector.resumen}
              </p>
              <ul className="space-y-6">
                {sector.casos.map((caso, i) => (
                  <li key={i}>
                    {caso.cifra ? (
                      <div className="border-brand/40 border-l-2 pl-4">
                        <p className="text-brand font-serif text-3xl leading-none md:text-4xl">
                          {caso.cifra.valor}
                        </p>
                        <p className="text-muted mt-1.5 text-xs tracking-[0.1em] uppercase">
                          {caso.cifra.etiqueta}
                        </p>
                        <p className="prose-justificado text-ink/80 mt-3 text-sm leading-relaxed">
                          {caso.descripcion}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <span
                          aria-hidden
                          className="bg-brand mt-2.5 h-px w-3 shrink-0"
                        />
                        <p className="prose-justificado text-muted text-sm leading-relaxed">
                          {caso.descripcion}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        );
      })}
    </div>
  );
}
