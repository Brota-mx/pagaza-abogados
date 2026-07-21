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
 * claro). Server component.
 *
 * Las materias van SOLO con su nombre. Antes cada una llevaba una línea de descripción y sumaban
 * 176 palabras —el 16% del texto visible de la home— para explicar lo que el nombre ya dice
 * ("Laboral individual y colectivo" no necesita glosa). Quitarlas responde al "se ve muy cargada"
 * del cliente y de paso a la auditoría, que señalaba que una parrilla de diez descripciones hace
 * que un despacho boutique lea como full-service. El texto completo sigue en `alianzas.ts` por si
 * el cliente lo pide de vuelta.
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

        <ul className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {alianzas.map((alianza, i) => {
            const Icon = ICONS[alianza.id] ?? Scale;
            return (
              <Reveal key={alianza.id} delay={(i % 3) * 60}>
                <li className="flex items-center gap-3 border-b border-white/10 py-3">
                  <Icon
                    aria-hidden
                    size={18}
                    strokeWidth={1.5}
                    className="text-steel-soft shrink-0"
                  />
                  <span className="font-serif text-base text-white/90">
                    {t(alianza.nombre, locale)}
                  </span>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-16">
          <CoverageMap cobertura={resolvedCobertura} labels={labels} />
        </div>
      </Container>
    </section>
  );
}
