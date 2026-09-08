import type { EquipoContent } from "./types";

/**
 * Sección "Nuestro equipo".
 *
 * El cliente entregó las semblanzas de seis integrantes el 7-sep-2026
 * (`work/COMENTARIOS 070926/003. Bios.docx`). El texto en español es SUYO, transcrito literal;
 * la versión en inglés es traducción con registro legal formal (docs/glosario-es-en.md:
 * Socio Fundador → Founding Partner, Pasante → Law Clerk, Abogado/a → Associate).
 *
 * ⚠️ REGLA DURA AL EDITAR ESTE ARCHIVO ⚠️
 * Nombre, cargo y semblanza salen de un documento del cliente. Está PROHIBIDO añadir años de
 * experiencia, cargos previos, membresías o reconocimientos que no estén en ese documento: es un
 * despacho fiscal y una credencial inventada es un riesgo profesional real.
 *
 * El documento no traía cargo explícito salvo el del socio fundador. Los demás se derivan de la
 * propia semblanza ("se desempeña como pasante" → Pasante; egresado con posgrado y práctica
 * propia → Abogado/a) y están PENDIENTES DE QUE ALFONSO LOS CONFIRME.
 *
 * Fotografías: el cliente indicó que "no van a llevar fotos por el momento" (7-sep-2026). Cada
 * tarjeta pinta el monograma. Cuando lleguen los retratos se añade `retrato` por persona.
 */
export const equipo: EquipoContent = {
  eyebrow: { es: "Nuestro equipo", en: "Our team" },
  titulo: {
    es: "Quien lleva tu asunto, desde el primer día.",
    en: "The people handling your matter, from day one.",
  },
  intro: {
    es: "En una boutique el socio no supervisa el asunto de lejos: lo diseña y lo defiende, con un equipo especializado en materia fiscal y administrativa.",
    en: "At a boutique the partner does not supervise your matter from a distance: they design and defend it, backed by a team focused on tax and administrative law.",
  },
  miembros: [
    {
      id: "alfonso-pagaza",
      nombre: "Alfonso Pagaza",
      cargo: { es: "Socio Fundador", en: "Founding Partner" },
      iniciales: "AP",
      fundador: true,
      bio: {
        es: "Alfonso es abogado egresado de la Escuela Libre de Derecho con honores y especialista en Derecho Tributario por la misma institución. Tiene experiencia en la asesoría y representación de empresas, inversionistas y grupos empresariales en asuntos nacionales e internacionales de alta complejidad. Su práctica comprende controversia y consultoría tributaria, litigio estratégico, seguridad social, responsabilidad patrimonial del Estado y procedimientos regulatorios y de prevención de lavado de dinero (PLD), así como asuntos de comercio exterior y tributación internacional. Su enfoque combina el análisis técnico-fiscal con el diseño de estrategias jurídicas orientadas a proteger el patrimonio y la operación de sus clientes.",
        en: "Alfonso holds a law degree with honors from Escuela Libre de Derecho and a specialization in Tax Law from the same institution. He advises and represents companies, investors, and business groups in complex domestic and international matters. His practice spans tax controversy and advisory, strategic litigation, social security, State liability, and regulatory and anti–money laundering (AML) proceedings, as well as foreign trade and international taxation. His approach combines technical–tax analysis with legal strategies designed to protect his clients' assets and operations.",
      },
    },
    {
      id: "jorge-diaz-galindo",
      nombre: "Jorge Díaz-Galindo",
      cargo: { es: "Abogado", en: "Associate" },
      iniciales: "JD",
      bio: {
        es: "Jorge es egresado de la Universidad de las Américas Puebla (UDLAP), institución en la que también concluyó el posgrado en Derecho Fiscal. Se especializa en litigio fiscal y administrativo, con dominio en temas de seguridad social tanto para empresas como para particulares. Su práctica se distingue por un enfoque humano orientado a la protección de los derechos de los contribuyentes frente a autoridades administrativas y jurisdiccionales. Asimismo, cuenta con experiencia en consultoría fiscal, brindando soluciones personalizadas desde una perspectiva eficiente, estratégica y segura para los intereses de nuestros clientes.",
        en: "Jorge holds a law degree and a graduate degree in Tax Law, both from Universidad de las Américas Puebla (UDLAP). He specializes in tax and administrative litigation, with command of social security matters for both companies and individuals. His practice is marked by a client-centered approach to protecting taxpayers' rights before administrative and judicial authorities. He also has experience in tax advisory, delivering tailored solutions that are efficient, strategic, and secure for his clients' interests.",
      },
    },
    {
      id: "dafne-sanchez",
      nombre: "Dafne Sánchez",
      cargo: { es: "Abogada", en: "Associate" },
      iniciales: "DS",
      bio: {
        es: "Dafne es Licenciada en Derecho por la Facultad de Derecho de la Universidad Nacional Autónoma de México (UNAM). Se especializa en Derecho Fiscal y cumplimiento regulatorio, con especial énfasis en prevención de lavado de dinero. Su práctica comprende la atención de procedimientos de verificación y sancionadores, así como el diseño y revisión de estrategias de cumplimiento para empresas sujetas a obligaciones regulatorias.",
        en: "Dafne holds a law degree from the School of Law of the Universidad Nacional Autónoma de México (UNAM). She specializes in Tax Law and regulatory compliance, with particular emphasis on anti–money laundering. Her practice covers audit and enforcement proceedings, as well as the design and review of compliance programs for companies subject to regulatory obligations.",
      },
    },
    {
      id: "maria-jose-nunez",
      nombre: "María José Núñez",
      cargo: { es: "Pasante", en: "Law Clerk" },
      iniciales: "MN",
      bio: {
        es: "María José es estudiante de octavo semestre de Derecho en la Universidad Anáhuac México, Campus Norte, y actualmente se desempeña como pasante en las áreas fiscal y administrativa, con enfoque en litigio. Su trabajo se centra en apoyar la defensa de los intereses de contribuyentes frente a autoridades fiscales. Cuenta con experiencia en la elaboración y seguimiento de juicios de amparo, recursos de revocación y procedimientos ante tribunales administrativos y fiscales.",
        en: "María José is an eighth-semester law student at Universidad Anáhuac México, Campus Norte, currently working as a law clerk in the tax and administrative areas with a litigation focus. Her work supports the defense of taxpayers' interests before the tax authorities. She has experience preparing and following amparo proceedings, administrative appeals (recursos de revocación), and matters before administrative and tax courts.",
      },
    },
    {
      id: "patricio-duarte",
      nombre: "Patricio Duarte",
      cargo: { es: "Pasante", en: "Law Clerk" },
      iniciales: "PD",
      bio: {
        es: "Patricio es estudiante de Derecho en la Escuela Libre de Derecho y actualmente se desempeña como pasante en las áreas fiscal y administrativa. Su práctica se concentra en controversia fiscal y procedimientos administrativos, participando en la defensa de contribuyentes frente a actos de fiscalización, determinación de créditos fiscales y procedimientos sancionadores ante autoridades administrativas.",
        en: "Patricio is a law student at Escuela Libre de Derecho, currently working as a law clerk in the tax and administrative areas. His practice focuses on tax controversy and administrative proceedings, taking part in the defense of taxpayers against audits, tax assessments, and enforcement proceedings before administrative authorities.",
      },
    },
    {
      id: "david-reyes-jains",
      nombre: "David Reyes-Jains",
      cargo: { es: "Pasante", en: "Law Clerk" },
      iniciales: "DR",
      bio: {
        es: "David es estudiante de Derecho en la UNAM, Campus Aragón, y se especializa en materia fiscal y administrativa. Su práctica se concentra en consultoría tributaria y en procedimientos de acuerdos conclusivos, participando en el análisis de contingencias fiscales y en la atención de procedimientos de fiscalización ante autoridades tributarias.",
        en: "David is a law student at UNAM, Campus Aragón, focusing on tax and administrative matters. His practice centers on tax advisory and conclusive agreement (acuerdo conclusivo) proceedings, contributing to the analysis of tax contingencies and to audit proceedings before the tax authorities.",
      },
    },
  ],
};
