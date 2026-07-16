"use client";

import * as Accordion from "@radix-ui/react-accordion";
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
 * Acordeón accesible de sectores (Radix). Cada fila: número + nombre + badge de cifra (en los
 * destacados) + control +. Al abrir muestra el resumen y los casos; los casos con cifra reciben un
 * tratamiento destacado (número bronce). Radix da navegación por teclado y aria correctos; la
 * animación de altura respeta prefers-reduced-motion vía el CSS global (globals.css).
 */
export function SectoresAccordion({
  sectores,
}: {
  sectores: ResolvedSector[];
}) {
  const defaultOpen = sectores.find((s) => s.destacado)?.id ?? sectores[0]?.id;

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className="border-line mt-14 border-t"
    >
      {sectores.map((sector) => {
        const badge = sector.destacado
          ? sector.casos.find((c) => c.cifra)?.cifra?.valor
          : undefined;

        return (
          <Accordion.Item
            key={sector.id}
            value={sector.id}
            className="border-line border-b"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="group focus-visible:ring-bronze flex flex-1 cursor-pointer items-center gap-4 rounded-[2px] py-6 text-left transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
                <span className="text-bronze-ink/80 w-6 shrink-0 font-serif text-sm tabular-nums">
                  {sector.numero}
                </span>
                <span className="text-navy group-hover:text-bronze-ink flex-1 font-serif text-xl transition-colors md:text-2xl">
                  {sector.nombre}
                </span>
                {badge && (
                  <span className="bg-bronze/10 text-bronze-ink hidden shrink-0 rounded-[2px] px-2.5 py-1 text-xs font-medium sm:inline-block">
                    {badge}
                  </span>
                )}
                <Plus
                  size={18}
                  aria-hidden
                  className="text-bronze-ink shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45"
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="accordion-content overflow-hidden">
              <div className="grid gap-6 pb-9 md:grid-cols-[1fr_1.4fr] md:gap-12 md:pl-10">
                <p className="text-muted leading-relaxed">{sector.resumen}</p>
                <ul className="space-y-6">
                  {sector.casos.map((caso, i) => (
                    <li key={i}>
                      {caso.cifra ? (
                        <div className="border-bronze/40 border-l-2 pl-4">
                          <p className="text-bronze-ink font-serif text-3xl leading-none md:text-4xl">
                            {caso.cifra.valor}
                          </p>
                          <p className="text-muted mt-1.5 text-xs tracking-[0.1em] uppercase">
                            {caso.cifra.etiqueta}
                          </p>
                          <p className="text-ink/80 mt-3 text-sm leading-relaxed">
                            {caso.descripcion}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <span
                            aria-hidden
                            className="bg-bronze mt-2.5 h-px w-3 shrink-0"
                          />
                          <p className="text-muted text-sm leading-relaxed">
                            {caso.descripcion}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
