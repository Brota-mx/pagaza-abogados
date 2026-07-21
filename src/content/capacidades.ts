import type { CapacidadesContent } from "./types";

/**
 * Sección "Capacidades" — las 11 áreas de práctica, texto LITERAL del cliente (nota del
 * 19-jul-2026, "Capacidades → el siguiente texto").
 *
 * Sobre el comentario de Alfonso al margen de este bloque, "Todo esto se puede resumir": el
 * componente lo resuelve en la presentación, no en el contenido. Se muestra una retícula de
 * títulos y la descripción se despliega bajo demanda (`<details>`), de modo que la página se lee
 * ligera pero el texto completo sigue en el HTML — cuenta para SEO y está a un clic para quien
 * quiera el detalle. Si el cliente prefiere recortar la redacción, se hace aquí y en un solo sitio.
 *
 * Traducción EN con registro legal formal (docs/glosario-es-en.md).
 */
export const capacidades: CapacidadesContent = {
  eyebrow: { es: "Capacidades", en: "Capabilities" },
  titulo: {
    es: "Soluciones jurídicas para asuntos tributarios y regulatorios de alta complejidad.",
    en: "Legal solutions for highly complex tax and regulatory matters.",
  },
  intro: {
    es: "Nuestra práctica se concentra en la prevención, gestión y resolución de controversias tributarias y administrativas que afectan el patrimonio y la operación de empresas, inversionistas y grupos empresariales. Combinamos excelencia técnica, visión estratégica y experiencia en litigio para ofrecer soluciones jurídicas integrales en cada etapa de una contingencia.",
    en: "Our practice concentrates on preventing, managing, and resolving the tax and administrative disputes that affect the wealth and operations of companies, investors, and corporate groups. We combine technical excellence, strategic judgment, and litigation experience to deliver comprehensive legal solutions at every stage of a contingency.",
  },
  areas: [
    {
      id: "auditorias",
      titulo: {
        es: "Auditorías y procedimientos de fiscalización",
        en: "Audits and tax examination proceedings",
      },
      descripcion: {
        es: "Representamos a nuestros clientes durante auditorías y procedimientos de revisión iniciados por autoridades fiscales y administrativas, definiendo estrategias que reduzcan riesgos, preserven la continuidad operativa y otorguen certeza jurídica.",
        en: "We represent our clients through audits and review proceedings initiated by tax and administrative authorities, defining strategies that reduce risk, preserve operational continuity, and provide legal certainty.",
      },
    },
    {
      id: "controversias",
      titulo: {
        es: "Controversias tributarias",
        en: "Tax disputes",
      },
      descripcion: {
        es: "Asesoramos y representamos a nuestros clientes en controversias relacionadas con impuestos federales y locales, devoluciones, créditos fiscales, diferencias en materia de IVA e ISR, contribuciones de seguridad social y demás obligaciones tributarias.",
        en: "We advise and represent our clients in disputes involving federal and local taxes, refunds, tax assessments, VAT and income tax (ISR) discrepancies, social security contributions, and other tax obligations.",
      },
    },
    {
      id: "litigio",
      titulo: {
        es: "Litigio fiscal y constitucional",
        en: "Tax and constitutional litigation",
      },
      descripcion: {
        es: "Patrocinamos recursos administrativos, juicios contenciosos y juicios de amparo para la protección de los derechos de los contribuyentes frente a actos de autoridad, privilegiando siempre una estrategia jurídica técnicamente sólida.",
        en: "We handle administrative appeals, contentious proceedings, and Amparo (constitutional-relief proceeding) actions to protect taxpayers' rights against acts of authority, always on a technically sound legal strategy.",
      },
    },
    {
      id: "negociacion",
      titulo: {
        es: "Negociación y regularización fiscal",
        en: "Tax negotiation and regularization",
      },
      descripcion: {
        es: "Diseñamos estrategias de negociación frente a autoridades fiscales y administrativas mediante mecanismos institucionales que permitan reducir contingencias, regularizar situaciones jurídicas y brindar certeza a nuestros clientes.",
        en: "We design negotiation strategies before tax and administrative authorities through institutional mechanisms that reduce contingencies, regularize legal positions, and give our clients certainty.",
      },
    },
    {
      id: "planeacion",
      titulo: {
        es: "Planeación tributaria",
        en: "Tax planning",
      },
      descripcion: {
        es: "Analizamos operaciones nacionales e internacionales para estructurar alternativas fiscalmente eficientes, identificar riesgos y garantizar el cumplimiento de las obligaciones tributarias dentro del marco legal aplicable.",
        en: "We analyze domestic and cross-border transactions to structure tax-efficient alternatives, identify risks, and ensure compliance with tax obligations within the applicable legal framework.",
      },
    },
    {
      id: "comercioexterior",
      titulo: {
        es: "Comercio exterior y tributación internacional",
        en: "Foreign trade and international taxation",
      },
      descripcion: {
        es: "Asesoramos operaciones con componente internacional en materia de comercio exterior, tratados fiscales, IVA en operaciones transfronterizas, importaciones, exportaciones y demás aspectos tributarios relacionados con negocios internacionales.",
        en: "We advise on cross-border transactions in foreign trade, tax treaties, VAT on cross-border operations, imports, exports, and other tax aspects of international business.",
      },
    },
    {
      id: "seguridadsocial",
      titulo: {
        es: "Seguridad social",
        en: "Social security",
      },
      descripcion: {
        es: "Representamos a empresas en procedimientos relacionados con contribuciones de seguridad social, auditorías del IMSS, integración del salario base de cotización, clasificación de riesgos y demás obligaciones patronales.",
        en: "We represent companies in proceedings involving social security contributions, audits by the Mexican Social Security Institute (IMSS), the calculation of the contribution base salary, risk classification, and other employer obligations.",
      },
    },
    {
      id: "cumplimiento",
      titulo: {
        es: "Cumplimiento regulatorio",
        en: "Regulatory compliance",
      },
      descripcion: {
        es: "Asesoramos a empresas en el cumplimiento de obligaciones regulatorias y en la atención de procedimientos administrativos especializados, implementando estrategias preventivas orientadas a reducir riesgos legales y financieros.",
        en: "We advise companies on meeting regulatory obligations and on responding to specialized administrative proceedings, implementing preventive strategies aimed at reducing legal and financial risk.",
      },
    },
    {
      id: "patrimonial",
      titulo: {
        es: "Protección patrimonial",
        en: "Wealth protection",
      },
      descripcion: {
        es: "Diseñamos estructuras jurídicas para la organización y protección del patrimonio empresarial y familiar, incluyendo reorganizaciones corporativas, fideicomisos y mecanismos jurídicos con implicaciones tributarias.",
        en: "We design legal structures to organize and protect corporate and family wealth, including corporate reorganizations, trusts, and other legal mechanisms with tax implications.",
      },
    },
    {
      id: "consultoria",
      titulo: {
        es: "Consultoría estratégica",
        en: "Strategic advisory",
      },
      descripcion: {
        es: "Emitimos opiniones jurídicas especializadas sobre operaciones de alta complejidad, proporcionando certeza en la toma de decisiones mediante un análisis integral del marco tributario, administrativo y constitucional.",
        en: "We issue specialized legal opinions on highly complex transactions, providing certainty in decision-making through a comprehensive analysis of the tax, administrative, and constitutional framework.",
      },
    },
    {
      id: "pld",
      titulo: {
        es: "Prevención de Lavado de Dinero (PLD)",
        en: "Anti-Money Laundering (AML)",
      },
      descripcion: {
        es: "Asesoramos a empresas en el cumplimiento de obligaciones en materia de prevención de lavado de dinero, implementando estrategias de cumplimiento y representando a nuestros clientes en procedimientos de verificación y defensa frente a autoridades competentes.",
        en: "We advise companies on their anti-money-laundering obligations, implementing compliance programs and representing our clients in verification proceedings and in their defense before the competent authorities.",
      },
    },
  ],
};
