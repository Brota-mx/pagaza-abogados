import { getTranslations } from "next-intl/server";
import { newsletterMuestra } from "@/content/newsletter";
import { t, type Locale } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * Newsletter — franja sobre navy entre Equipo y Contacto. Es el destino del enlace "Newsletter"
 * que el cliente pidió en la primera pantalla. Contacto sigue cerrando la página, como en la lista
 * de secciones del cliente.
 *
 * Debajo del par copy/formulario va una MUESTRA de un envío: el cliente pidió "un ejemplo de cómo
 * se vería" y mandó como referencia la sección de publicaciones de Galicia. Se toma de ahí el
 * lenguaje de tarjeta (categoría + titular) adaptado a navy/steel —sin el dorado, que se removió
 * del sistema— pero NO el archivo con pestañas y carrusel: el despacho aún no publica nada y unas
 * pestañas de "Actualizaciones / Comunicados / Entrevistas" prometerían un archivo inexistente.
 *
 * La muestra va DEBAJO y no en la mitad derecha del grid para no asfixiar al formulario, que es la
 * conversión de la franja.
 */
export async function Newsletter({ locale }: { locale: Locale }) {
  const tn = await getTranslations("newsletter");

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
              {tn("eyebrow")}
            </p>
            <h2 className="font-serif text-2xl leading-snug md:text-3xl">
              {tn("titulo")}
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-white/70">
              {tn("intro")}
            </p>
          </div>

          <NewsletterForm />
        </div>

        {/* <figure> + <figcaption> para que la advertencia de "esto es un ejemplo" quede asociada
            semánticamente a las tarjetas: quien llegue con un lector de pantalla recibe el contexto
            en el mismo grupo. El rótulo es TEXTO, no un matiz de color (WCAG: el color nunca como
            único indicador). */}
        <figure className="mt-16 border-t border-white/10 pt-12">
          {/* `items-start` + el margen del hairline, y no `items-center` como los demás eyebrows:
              este rótulo es largo y envuelve a dos líneas en móvil, donde centrar dejaba la raya
              flotando a media altura. */}
          <figcaption className="text-steel-soft mb-6 flex items-start gap-3 text-xs font-medium tracking-[0.14em] uppercase">
            <span aria-hidden className="bg-steel mt-1.5 h-px w-8 shrink-0" />
            {t(newsletterMuestra.etiqueta, locale)}
          </figcaption>

          <ul className="grid gap-4 md:grid-cols-3">
            {newsletterMuestra.piezas.map((pieza, i) => (
              <Reveal as="li" key={pieza.id} delay={i * 60}>
                {/* Tarjetas inertes a propósito: no hay destino al que enlazar, así que no se les
                    da apariencia de pulsables ni reciben foco. Un hover de elevación aquí sería
                    una promesa falsa. */}
                <div className="h-full rounded-[4px] border border-white/12 p-6">
                  <p className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
                    <span className="text-steel-soft">
                      {t(pieza.categoria, locale)}
                    </span>
                    <span aria-hidden className="text-white/25">
                      ·
                    </span>
                    <span className="text-white/40">
                      {t(newsletterMuestra.formatoFecha, locale)}
                    </span>
                  </p>
                  <p className="mt-3 font-serif text-lg leading-snug text-white">
                    {t(pieza.titular, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </figure>
      </Container>
    </section>
  );
}
