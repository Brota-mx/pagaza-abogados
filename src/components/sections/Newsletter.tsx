import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * Newsletter — franja sobre navy entre Alianzas y Contacto. Es el destino del enlace "Newsletter"
 * que el cliente pidió en la primera pantalla, y se mantiene deliberadamente breve: un titular,
 * una línea de contexto y el formulario. Contacto sigue cerrando la página, como en la lista de
 * secciones del cliente.
 */
export async function Newsletter() {
  const t = await getTranslations("newsletter");

  return (
    <section
      id="newsletter"
      className="bg-navy scroll-mt-20 py-20 text-white md:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-steel-soft mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase">
              <span aria-hidden className="bg-steel h-px w-8" />
              {t("eyebrow")}
            </p>
            <h2 className="font-serif text-2xl leading-snug md:text-3xl">
              {t("titulo")}
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-white/70">
              {t("intro")}
            </p>
          </div>

          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
