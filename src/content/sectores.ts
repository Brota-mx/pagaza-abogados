import type { Sector, SectionIntro } from "./types";

/**
 * Los 12 sectores / industrias con casos de éxito. Fuente: docs/contenido-fuente.md §3, más los
 * dos sectores (Energético, Servicios Financieros) y el caso de PLD en Construcción que agregó el
 * cliente en su nota del 19-jul-2026.
 * Traducción EN con registro legal formal (docs/glosario-es-en.md).
 *
 * ⚠️ `SECTOR_IDS` en src/lib/validation.ts debe coincidir 1:1 con estos `id` (menos "social", que
 * es pro-bono y no es una opción del formulario de contacto). Añadir un sector aquí sin añadirlo
 * allá hace que el formulario rechace en silencio esa opción.
 */
export const sectoresIntro: SectionIntro = {
  eyebrow: { es: "Experiencias e industrias", en: "Experience & industries" },
  titulo: {
    es: "Resultados medibles en doce industrias.",
    en: "Measurable results across twelve industries.",
  },
  intro: {
    es: "La credibilidad se demuestra con cifras. Una selección de resultados reales, por sector.",
    en: "Credibility is proven with figures. A selection of real results, by sector.",
  },
};

export const sectores: Sector[] = [
  {
    id: "automotriz",
    numero: "01",
    nombre: { es: "Automotriz", en: "Automotive" },
    resumen: {
      es: "Asesoría a empresas tractoras y a la cadena de suministro en auditorías fiscales y de seguridad social, litigio local y operaciones internacionales bajo el T-MEC.",
      en: "Advisory to OEMs and their supply chains on tax and social-security audits, local litigation, and international operations under the USMCA.",
    },
    casos: [
      {
        descripcion: {
          es: "Cumplimiento de servicios especializados (REPSE) para evitar contingencias críticas ante el IMSS y las autoridades tributarias.",
          en: "Specialized-services (REPSE) compliance to avoid critical contingencies before the IMSS and the tax authorities.",
        },
      },
      {
        descripcion: {
          es: "Reducciones económicas sustanciales en controversias de impuestos locales mediante litigio y negociación técnica.",
          en: "Substantial reductions in local-tax disputes through litigation and technical negotiation.",
        },
      },
      {
        descripcion: {
          es: "Defensa constitucional (Amparo) frente a procedimientos del T-MEC y recuperación de saldos a favor de IVA por exportación de asistencia técnica.",
          en: "Constitutional defense (Amparo) against USMCA proceedings and recovery of VAT refund balances on exported technical assistance.",
        },
      },
    ],
  },
  {
    id: "manufactura",
    numero: "02",
    nombre: {
      es: "Manufactura y Transformación",
      en: "Manufacturing",
    },
    resumen: {
      es: "Representación en controversias fiscales transfronterizas complejas, con énfasis en el IVA del comercio internacional.",
      en: "Representation in complex cross-border tax disputes, with emphasis on VAT in international trade.",
    },
    casos: [
      {
        descripcion: {
          es: "Eliminación total de una contingencia millonaria por la supuesta omisión de retención de IVA a residentes en el extranjero, evitando un impacto de doble tributación.",
          en: "Complete elimination of a multi-million-peso contingency over an alleged failure to withhold VAT from foreign residents, averting a double-taxation impact.",
        },
      },
      {
        descripcion: {
          es: "Resolución favorable definitiva en sede administrativa sobre un criterio aún bajo estudio de la SCJN, dando certeza jurídica anticipada al cliente.",
          en: "A final favorable ruling at the administrative level on a criterion still under review by the Supreme Court (SCJN), granting the client anticipated legal certainty.",
        },
      },
    ],
  },
  {
    id: "inmobiliario",
    numero: "03",
    nombre: {
      es: "Inmobiliario y Construcción",
      en: "Real Estate & Construction",
    },
    resumen: {
      es: "Planeación fiscal integral, auditorías de seguridad social y estructuración de portafolios patrimoniales para desarrolladores y constructoras.",
      en: "Comprehensive tax planning, social-security audits, and estate-portfolio structuring for developers and construction firms.",
    },
    casos: [
      {
        descripcion: {
          es: "Correcta determinación de ingresos acumulables y aplicación de la deducción por costos estimados de la Ley del ISR en constructoras.",
          en: "Accurate determination of accruable income and application of the ISR estimated-cost deduction for construction firms.",
        },
      },
      {
        descripcion: {
          es: "Defensa en auditorías del IMSS de obra, previniendo la determinación presuntiva de cuotas obrero-patronales.",
          en: "Defense in IMSS construction audits, preventing the presumptive assessment of employer–employee contributions.",
        },
      },
      {
        descripcion: {
          es: "Fideicomisos familiares para aislar activos inmobiliarios de alta plusvalía y recuperación de impuestos traslativos de dominio pagados en demasía.",
          en: "Family trusts to isolate high-value real-estate assets and recovery of overpaid property-transfer taxes.",
        },
      },
      {
        // Caso aportado por el cliente en la nota del 19-jul-2026 ("En construcción agregar").
        descripcion: {
          es: "Reducción de multas por $12,000,000 de pesos a favor de una empresa, derivada de nuestra intervención en una auditoría de prevención de lavado de dinero.",
          en: "A $12,000,000 MXN reduction in penalties for a client, obtained through our intervention in an anti-money-laundering audit.",
        },
        cifra: {
          valor: "$12M",
          etiqueta: {
            es: "de multas reducidas — auditoría PLD",
            en: "in penalties reduced — AML audit",
          },
        },
      },
    ],
  },
  {
    id: "textil",
    numero: "04",
    nombre: { es: "Textil", en: "Textile" },
    destacado: true,
    resumen: {
      es: "Planeación fiscal para escenarios de contracción de mercado y defensa aduanera de alta especialidad.",
      en: "Tax planning for contracting-market scenarios and high-specialization customs defense.",
    },
    casos: [
      {
        cifra: {
          valor: "98%",
          etiqueta: {
            es: "de reducción sobre una contingencia fiscal estimada en $25M MXN",
            en: "reduction on a tax contingency estimated at $25M MXN",
          },
        },
        descripcion: {
          es: "Representación de un grupo comercializador de marcas internacionales: la autoridad aduanera pretendía incrementar la base gravable de importación sumando regalías pagadas a residentes en el extranjero.",
          en: "Representation of a group distributing international brands: customs authorities sought to raise the import tax base by adding royalties paid to foreign residents.",
        },
      },
      {
        descripcion: {
          es: "Reconocimiento y deducibilidad fiscal de pérdidas en inventarios derivadas de la competencia asiática y la volatilidad del sector.",
          en: "Recognition and tax deductibility of inventory losses driven by Asian competition and sector volatility.",
        },
      },
    ],
  },
  {
    id: "retail",
    numero: "05",
    nombre: {
      es: "Retail y Comercio",
      en: "Retail & Wholesale",
    },
    destacado: true,
    resumen: {
      es: "Corrección fiscal voluntaria, reestructuras contables de alta dirección y protección de activos familiares.",
      en: "Voluntary tax correction, executive-level accounting restructurings, and protection of family assets.",
    },
    casos: [
      {
        cifra: {
          valor: "$55M",
          etiqueta: {
            es: "de beneficio fiscal directo para un grupo papelero",
            en: "in direct tax benefit for a paper-industry group",
          },
        },
        descripcion: {
          es: "Reestructuración de fondo y reclasificación técnica de operaciones que devolvió viabilidad financiera a la operación en un ciclo crítico de alta demanda.",
          en: "A structural restructuring and technical reclassification of operations that restored financial viability during a critical high-demand cycle.",
        },
      },
      {
        descripcion: {
          es: "Fideicomisos patrimoniales para salvaguardar activos fijos e intangibles estratégicos de empresas familiares ante las facultades de comprobación del fisco.",
          en: "Asset-protection trusts to safeguard strategic fixed and intangible assets of family businesses against the tax authority's audit powers.",
        },
      },
    ],
  },
  {
    id: "educativo",
    numero: "06",
    nombre: { es: "Educativo", en: "Education" },
    resumen: {
      es: "Reestructuras patrimoniales para aislar la infraestructura escolar de los riesgos operativos, y regularización fiscal en materia de IVA.",
      en: "Estate restructurings to isolate school infrastructure from operational risk, and tax regularization on VAT matters.",
    },
    casos: [
      {
        descripcion: {
          es: "Aislamiento de activos inmobiliarios e infraestructura escolar (activos estratégicos) de los riesgos propios del servicio educativo.",
          en: "Isolation of real-estate assets and school infrastructure (strategic assets) from the risks inherent to the education service.",
        },
      },
      {
        descripcion: {
          es: "Saneamiento fiscal aplicando criterios de los Tribunales Colegiados sobre el IVA en servicios educativos y actividades conexas.",
          en: "Tax cleanup applying Federal Circuit Court criteria on VAT for educational services and related activities.",
        },
      },
    ],
  },
  {
    id: "peps",
    numero: "07",
    nombre: {
      es: "Defensa de PEPs",
      en: "PEP Defense",
    },
    resumen: {
      es: "Defensa de alto nivel para personas con cargos públicos o relevancia política frente a investigaciones del poder público.",
      en: "High-level defense for individuals holding public office or of political relevance against investigations by public authorities.",
    },
    casos: [
      {
        descripcion: {
          es: "Procedimientos de responsabilidad administrativa ante órganos internos de control y fiscalización de la Auditoría Superior de la Federación (ASF).",
          en: "Administrative-liability proceedings before internal control bodies and audits by the Federal Superior Audit Office (ASF).",
        },
      },
      {
        descripcion: {
          es: "Descongelamiento de cuentas bancarias y defensa constitucional patrimonial inmediata ante medidas cautelares extremas.",
          en: "Unfreezing of bank accounts and immediate constitutional wealth defense against extreme precautionary measures.",
        },
      },
    ],
  },
  {
    id: "consumo",
    numero: "08",
    nombre: {
      es: "Suplementos y Consumo",
      en: "Supplements & Consumer Goods",
    },
    resumen: {
      es: "Protección patrimonial y de propiedad intelectual para corporativos de bienes de consumo rápido.",
      en: "Wealth and intellectual-property protection for fast-moving consumer-goods corporations.",
    },
    casos: [
      {
        descripcion: {
          es: "Estructuración para la propiedad, explotación y licenciamiento de intangibles de alto valor (marcas y fórmulas).",
          en: "Structuring for the ownership, exploitation, and licensing of high-value intangibles (brands and formulas).",
        },
      },
      {
        descripcion: {
          es: "Mitigación de riesgos regulatorios ante autoridades sanitarias y de contingencias por transferencia de intangibles.",
          en: "Mitigation of regulatory risk before health authorities and of contingencies from intangible-asset transfers.",
        },
      },
    ],
  },
  {
    id: "farmaceutico",
    numero: "09",
    nombre: { es: "Farmacéutico", en: "Pharmaceutical" },
    resumen: {
      es: "Representación frente a regulaciones sanitarias complejas y auditorías del SAT.",
      en: "Representation against complex health regulations and SAT audits.",
    },
    casos: [
      {
        descripcion: {
          es: "Desahogo exprés ante la restricción de Certificados de Sello Digital (CSD), reactivando la facturación en plazos mínimos.",
          en: "Express resolution of Digital Seal Certificate (CSD) restrictions, restoring invoicing in minimal timeframes.",
        },
      },
      {
        descripcion: {
          es: "Coordinación y defensa de revisiones electrónicas, visitas domiciliarias y revisiones de gabinete de la autoridad fiscal federal.",
          en: "Coordination and defense of electronic reviews, on-site audits, and desk reviews by the federal tax authority.",
        },
      },
    ],
  },
  {
    id: "social",
    numero: "10",
    nombre: {
      es: "Dimensión Social",
      en: "Social Impact",
    },
    resumen: {
      es: "Práctica pro-bono de alto impacto para proteger los derechos fundamentales frente a los abusos del Estado.",
      en: "High-impact pro-bono practice to protect fundamental rights against abuses by the State.",
    },
    casos: [
      {
        descripcion: {
          es: "Restitución de pensiones y servicios médicos suspendidos ilegalmente por el IMSS o el ISSSTE, con pago retroactivo de prestaciones.",
          en: "Restoration of pensions and medical services unlawfully suspended by the IMSS or ISSSTE, with retroactive payment of benefits.",
        },
      },
      {
        descripcion: {
          es: "Indemnizaciones por responsabilidad patrimonial del Estado y defensa de comerciantes ante clausuras arbitrarias y el aseguramiento ilegal de mercancías.",
          en: "Compensation for State financial liability and defense of merchants against arbitrary closures and the unlawful seizure of goods.",
        },
      },
    ],
  },
  // Los dos siguientes los agregó el cliente en la nota del 19-jul-2026 ("Agregar:").
  {
    id: "energetico",
    numero: "11",
    nombre: { es: "Energético", en: "Energy" },
    resumen: {
      es: "Controversias tributarias de proyectos de infraestructura y análisis de incentivos fiscales aplicables a inversiones estratégicas.",
      en: "Tax disputes arising from infrastructure projects and analysis of the tax incentives available to strategic investments.",
    },
    casos: [
      {
        descripcion: {
          es: "Asesoría a empresas del sector energético en controversias tributarias relacionadas con proyectos de infraestructura, operaciones preoperativas y recuperación de impuestos.",
          en: "Advisory to energy-sector companies on tax disputes involving infrastructure projects, pre-operating activities, and tax recovery.",
        },
      },
      {
        descripcion: {
          es: "Análisis de incentivos fiscales aplicables a inversiones estratégicas del sector.",
          en: "Analysis of the tax incentives applicable to strategic investments in the sector.",
        },
      },
    ],
  },
  {
    id: "financiero",
    numero: "12",
    nombre: { es: "Servicios Financieros", en: "Financial Services" },
    resumen: {
      es: "Representación de instituciones financieras y grupos empresariales en controversias tributarias y administrativas de alta complejidad.",
      en: "Representation of financial institutions and corporate groups in highly complex tax and administrative disputes.",
    },
    casos: [
      {
        descripcion: {
          es: "Representación de instituciones financieras, sociedades financieras y grupos empresariales en controversias tributarias y administrativas de alta complejidad.",
          en: "Representation of banks, financial companies, and corporate groups in highly complex tax and administrative disputes.",
        },
      },
      {
        descripcion: {
          es: "Defensa en procedimientos sancionadores, actos de supervisión y medios de defensa frente a autoridades regulatorias y fiscales.",
          en: "Defense in sanctioning proceedings, supervisory actions, and appeals before regulatory and tax authorities.",
        },
      },
    ],
  },
];
