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
    {
      es: "Ayudamos a empresas, empresarios y personas a prevenir, gestionar y resolver controversias tributarias y administrativas de alta complejidad.",
      en: "We help companies, business owners, and individuals prevent, manage, and resolve highly complex tax and administrative disputes.",
    },
    {
      es: "Asesoramos a nuestros clientes durante auditorías, procedimientos de fiscalización y litigios frente a autoridades fiscales y administrativas, diseñando estrategias jurídicas que protejan su patrimonio y permitan la continuidad de sus operaciones frente a los retos de la fiscalización moderna y la utilización de nuevas tecnologías por parte de las autoridades públicas.",
      en: "We advise our clients through audits, tax examination proceedings, and litigation before tax and administrative authorities, designing legal strategies that protect their wealth and keep their operations running against the challenges of modern tax enforcement and the authorities' growing use of new technologies.",
    },
  ],
};
