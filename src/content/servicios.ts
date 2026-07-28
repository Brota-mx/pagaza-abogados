import type { ServiciosContent } from "./types";

/**
 * Sección "Servicios" — qué hace la firma, en dos párrafos.
 *
 * Texto LITERAL del cliente (nota del 19-jul-2026, "Servicios → el siguiente texto"). Es el
 * posicionamiento de la práctica; el "cómo" lo desarrollan los pilares y el "qué" concreto, las
 * capacidades. Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const servicios: ServiciosContent = {
  eyebrow: { es: "Servicios", en: "Services" },
  titulo: {
    es: "Prevenir, gestionar y resolver.",
    en: "Prevent, manage, resolve.",
  },
  parrafos: [
    /**
     * El cliente subrayó "empresas, empresarios y personas" y anotó "Solo ayudamos a prevenir,…"
     * (nota del 27-jul-2026): fuera la enumeración de destinatarios, la frase arranca directo en
     * el verbo. Ojo: esto retira el único punto del sitio donde se decía explícitamente que
     * también atienden a personas físicas.
     */
    {
      es: "Ayudamos a prevenir, gestionar y resolver controversias tributarias y administrativas de alta complejidad.",
      en: "We help prevent, manage, and resolve highly complex tax and administrative disputes.",
    },
    /**
     * PARAFRASEADO. El original eran 52 palabras en una sola frase, con tres subordinadas
     * encadenadas — se lee dos veces para entenderla. Se parte en dos ideas y se conserva el
     * argumento completo, incluido el de la fiscalización tecnificada, que es el que distingue
     * su discurso. 52 → 33 palabras.
     *
     * Original: "Asesoramos a nuestros clientes durante auditorías, procedimientos de
     * fiscalización y litigios frente a autoridades fiscales y administrativas, diseñando
     * estrategias jurídicas que protejan su patrimonio y permitan la continuidad de sus
     * operaciones frente a los retos de la fiscalización moderna y la utilización de nuevas
     * tecnologías por parte de las autoridades públicas."
     *
     * ⚠️ A diferencia de Pilares y Capacidades, aquí el cliente NO dio permiso explícito de
     * parafrasear. Mostrarle este cambio junto con los otros.
     */
    {
      es: "Acompañamos auditorías, procedimientos de fiscalización y litigios ante autoridades fiscales y administrativas. La autoridad fiscaliza hoy con más tecnología y menos margen: la estrategia debe proteger el patrimonio sin detener la operación.",
      en: "We handle audits, tax examination proceedings, and litigation before tax and administrative authorities. Enforcement today runs on more technology and less margin: the strategy must protect the client's wealth without halting the business.",
    },
  ],
};
