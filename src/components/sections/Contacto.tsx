import { getTranslations } from "next-intl/server";
import { siteInfo } from "@/content/site";
import { sectores } from "@/content/sectores";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Contacto — formulario seguro + canales directos. Sección clara. El dropdown de sector se puebla
 * desde content/sectores.ts (excluye "social": es pro-bono, no una industria del prospecto).
 * Server component; el formulario interactivo es client (ContactForm).
 */
export async function Contacto({ locale }: { locale: Locale }) {
  const tForm = await getTranslations("form");
  const tel = siteInfo.telefono.replace(/[^\d]/g, "");
  const sectorOptions = sectores
    .filter((s) => s.id !== "social")
    .map((s) => ({ value: s.id, label: t(s.nombre, locale) }));

  return (
    <section id="contacto" className="bg-bg scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={tForm("eyebrow")}
              title={tForm("title")}
              intro={tForm("intro")}
            />

            <div className="border-line mt-10 border-t pt-8">
              <p className="text-brand mb-4 text-xs font-medium tracking-[0.14em] uppercase">
                {tForm("directTitle")}
              </p>
              <address className="space-y-1 not-italic">
                <p className="text-navy font-serif text-lg">{siteInfo.socio}</p>
                <a
                  href={`tel:+52${tel}`}
                  className="text-muted hover:text-brand focus-visible:ring-brand block w-fit rounded-[2px] transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {siteInfo.telefono}
                </a>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="text-muted hover:text-brand focus-visible:ring-brand block w-fit rounded-[2px] transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {siteInfo.email}
                </a>
                <p className="text-muted max-w-xs pt-2 text-sm leading-relaxed">
                  {siteInfo.direccion[locale]}
                </p>
              </address>
            </div>
          </div>

          <ContactForm sectorOptions={sectorOptions} />
        </div>
      </Container>
    </section>
  );
}
