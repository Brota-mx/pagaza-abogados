import type { EquipoContent } from "./types";

/**
 * Sección "Nuestro equipo" — BORRADOR. El cliente la pidió en agosto de 2026 y todavía NO ha
 * entregado las fotografías ni las semblanzas.
 *
 * ⚠️ REGLA DURA AL EDITAR ESTE ARCHIVO ⚠️
 * Está PROHIBIDO escribir años de experiencia, formación, cargos previos (ex-SAT, ex-PRODECON),
 * membresías (IFA, ANADE), reconocimientos (Chambers, Legal 500) o cualquier semblanza sin un
 * documento del cliente que lo respalde. Es un despacho fiscal: una credencial inventada no es un
 * detalle de maqueta, es un riesgo profesional real para ellos. Si no hay dato, se deja el
 * marcador — que es visible y dice lo que es.
 *
 * Cómo está construido para que el marcador NO pueda pasar por dato real:
 *
 * 1. `semblanzaPendiente` es UNA SOLA constante compartida, no un campo `bio` por persona. Para
 *    escribir un texto propio hay que añadir un campo y quitar `provisional`, y eso se ve en el
 *    diff. Con un `bio` por persona, alguien podría rellenar una semblanza "plausible" sin que
 *    nadie lo notara.
 * 2. `provisional: true` hace que la tarjeta pinte un rótulo visible de texto provisional.
 * 3. El e2e comprueba que ese rótulo está presente: cuando lleguen las semblanzas reales el test se
 *    pondrá rojo y forzará a quitarlo a conciencia, en vez de que el marcador se quede olvidado en
 *    producción.
 *
 * Qué SÍ está verificado y por eso se publica: el nombre y el cargo del socio fundador
 * (docs/contenido-fuente.md §5, "Socio fundador / director: Alfonso Pagaza"). El cliente había
 * pedido el 19-jul-2026 que su nombre no apareciera "en contacto, sólo el despacho" mientras
 * definía esta sección; en agosto confirmó que aquí sí va. El contacto sigue siendo institucional.
 *
 * Sólo hay una tarjeta a propósito: no se inventan colegas ni plazas anónimas para llenar la
 * retícula. El layout lee bien con una y escala a N sin cambios.
 *
 * Traducción EN con registro legal formal (docs/glosario-es-en.md: Socio Fundador → Founding
 * Partner).
 */
export const equipo: EquipoContent = {
  eyebrow: { es: "Nuestro equipo", en: "Our team" },
  titulo: {
    es: "Quien lleva tu asunto, desde el primer día.",
    en: "The person handling your matter, from day one.",
  },
  /* La intro NO afirma tamaño ni composición del equipo ("un equipo de N especialistas" sería un
     dato inventado): sólo enmarca la sección. */
  intro: {
    es: "En una boutique el socio no supervisa el asunto de lejos: lo diseña y lo defiende.",
    en: "At a boutique the partner does not supervise your matter from a distance: they design and defend it.",
  },
  etiquetaProvisional: { es: "Texto provisional", en: "Placeholder text" },
  semblanzaPendiente: {
    es: "Semblanza pendiente. El despacho proporcionará el texto definitivo.",
    en: "Biography pending. The firm will provide the final text.",
  },
  miembros: [
    {
      id: "alfonso-pagaza",
      nombre: "Alfonso Pagaza",
      cargo: { es: "Socio Fundador", en: "Founding Partner" },
      iniciales: "AP",
      fundador: true,
      provisional: true,
      // retrato: pendiente de que el cliente entregue el archivo → public/images/equipo/.
    },
  ],
};
