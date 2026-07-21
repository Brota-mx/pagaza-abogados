import {
  Building2,
  Calculator,
  FileText,
  FlaskConical,
  Gavel,
  Languages,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  alianzas,
  alianzasIntro,
  cobertura,
  coberturaLabels,
} from "@/content/alianzas";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CoverageMap } from "@/components/ui/CoverageMap";

/** Icono por materia (concern presentacional → vive aquí, no en el contenido). */
const ICONS: Record<string, LucideIcon> = {
  contable: Calculator,
  laboral: Users,
  corporativo: Building2,
  lifesciences: FlaskConical,
  penal: Gavel,
  compliance: ShieldCheck,
  preciostransferencia: Scale,
  traduccion: Languages,
  civil: FileText,
  financiero: TrendingUp,
};

/**
 * Alianzas y cobertura — núcleo fiscal + red 360°. Sobre navy (contraste con Sectores, que es
 * claro). Grid de 10 materias con iconos lucide + el CoverageMap. Server component.
 */
export function Alianzas({ locale }: { locale: Locale }) {
  const resolvedCobertura = cobertura.map((c) => ({
    region: t(c.region, locale),
    tipo: c.tipo,
  }));
  const labels = {
    titulo: t(coberturaLabels.titulo, locale),
    nacional: t(coberturaLabels.nacional, locale),
    internacional: t(coberturaLabels.internacional, locale),
    nota: t(coberturaLabels.nota, locale),
  };

  return (
    <section
      id="alianzas"
      className="bg-navy scroll-mt-20 py-24 text-white md:py-32"
    >
      <Container>
        <SectionHeading
          tone="light"
          eyebrow={t(alianzasIntro.eyebrow, locale)}
          title={t(alianzasIntro.titulo, locale)}
          intro={t(alianzasIntro.intro, locale)}
        />

        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {alianzas.map((alianza, i) => {
            const Icon = ICONS[alianza.id] ?? Scale;
            return (
              <Reveal key={alianza.id} delay={(i % 2) * 80}>
                <div className="flex gap-4">
                  <Icon
                    aria-hidden
                    size={22}
                    strokeWidth={1.5}
                    className="text-steel-soft mt-0.5 shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-lg text-white">
                      {t(alianza.nombre, locale)}
                    </h3>
                    {alianza.descripcion && (
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {t(alianza.descripcion, locale)}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20">
          <CoverageMap cobertura={resolvedCobertura} labels={labels} />
        </div>
      </Container>
    </section>
  );
}
