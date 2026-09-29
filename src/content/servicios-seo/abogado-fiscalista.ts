import type { PaginaServicio } from "../types";

export const abogadoFiscalista: PaginaServicio = {
  id: "abogado-fiscalista",
  slug: { es: "/abogado-fiscalista", en: "/tax-attorney" },
  titulo: {
    es: "Abogado fiscalista para empresas en México",
    en: "Tax attorney for businesses in Mexico",
  },
  metaDescription: {
    es: "Asesoría y defensa fiscal para empresas: auditorías SAT, créditos fiscales, devoluciones y amparo. Pagaza Abogados, en CDMX y Ciudad Juárez.",
    en: "Tax advice and defense for businesses in Mexico: SAT audits, tax assessments, refunds and constitutional litigation. Offices in Mexico City and Ciudad Juárez.",
  },
  keywordPrincipal: "abogado fiscalista",
  keywordsSecundarias: [
    "abogado fiscalista CDMX",
    "abogado fiscalista Ciudad Juárez",
    "despacho fiscal",
    "defensa fiscal",
    "litigio fiscal",
  ],
  intro: [
    {
      es: "Una contingencia tributaria exige entender tanto la operación que la originó como el procedimiento que sigue la autoridad. En Pagaza Abogados Tributarios asesoramos y representamos a empresas en asuntos fiscales, administrativos y constitucionales, desde la prevención hasta el litigio.",
      en: "A tax dispute requires understanding both the transaction behind it and the procedure followed by the authority. At Pagaza Abogados Tributarios, we advise and represent businesses in tax, administrative and constitutional matters, from prevention through litigation.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Una estrategia fiscal a partir del expediente",
        en: "A tax strategy built on the case file",
      },
      parrafos: [
        {
          es: "El primer paso es identificar qué está en discusión: una operación, una deducción, el acreditamiento de IVA, una devolución o el cumplimiento de una obligación. Revisamos el acto de autoridad, su notificación y los antecedentes para ubicar el asunto en su etapa real. Una respuesta útil necesita distinguir los hechos que pueden acreditarse de las interpretaciones jurídicas que deben controvertirse.",
          en: "The first step is to identify what is being questioned: a transaction, a deduction, VAT crediting, a refund or compliance with an obligation. We review the authority's notice, its service and the background to establish the actual procedural stage. An effective response must distinguish facts that can be proved from legal interpretations that need to be challenged.",
        },
        {
          es: "Trabajamos con la documentación contable y operativa del cliente para construir un expediente coherente. Contratos, comprobantes, pagos y evidencia de ejecución deben explicar la misma operación. La coordinación con quienes administran esa información permite detectar faltantes, atender requerimientos y evitar que distintas áreas de la empresa presenten versiones incompatibles sobre un mismo hecho.",
          en: "We work with the client's accounting and operational records to build a coherent case file. Contracts, invoices, payments and evidence of performance must explain the same transaction. Coordination with the people responsible for those records helps identify missing material, answer information requests and prevent different departments from giving inconsistent accounts of the same event.",
        },
        {
          es: "A partir de ese análisis definimos las alternativas de atención, regularización o defensa. Explicamos qué persigue cada vía, qué información requiere y cómo puede afectar la operación. La decisión incluye el costo de sostener la controversia y las consecuencias de aceptar una observación, sin prometer resultados ni reducir el asunto a una sola cifra.",
          en: "That analysis allows us to assess response, regularization and defense options. We explain the objective of each route, the information it requires and its potential effect on the business. The decision considers the cost of pursuing the dispute alongside the consequences of accepting an observation, without promising outcomes or reducing the matter to a single figure.",
        },
      ],
    },
    {
      titulo: {
        es: "Defensa ante autoridades fiscales y tribunales",
        en: "Representation before tax authorities and courts",
      },
      parrafos: [
        {
          es: "Nuestra práctica comprende auditorías del SAT, controversias sobre créditos fiscales, devoluciones, seguridad social y operaciones de comercio exterior. Cada procedimiento exige una estrategia propia: contestar un oficio de observaciones durante una revisión no equivale a impugnar una resolución definitiva. El trabajo jurídico debe responder al acto concreto y al momento en que se encuentra el contribuyente.",
          en: "Our practice covers SAT audits, tax assessment disputes, refunds, social security and foreign trade transactions. Each procedure calls for its own strategy: responding to an observations notice during an audit is different from challenging a final decision. Legal work must address the specific act and the taxpayer's current position in the proceedings, with the underlying records ready for review.",
        },
        {
          es: "Cuando la controversia requiere litigio, analizamos los recursos administrativos, el juicio contencioso y el amparo que puedan resultar procedentes. Revisamos las condiciones de acceso a cada medio, las pruebas disponibles y los efectos de las medidas cautelares. La defensa del fondo y la protección de la continuidad operativa se estudian juntas, aunque pueden exigir actuaciones distintas.",
          en: "When litigation is required, we assess the administrative appeals, administrative court proceedings and Amparo actions that may be available. We review the requirements for each remedy, the evidence and the effects of interim measures. The merits of the defense and protection of business continuity are considered together, although they may require separate procedural steps and different supporting documents.",
        },
        {
          es: "Contamos con oficinas en Ciudad de México y Ciudad Juárez. Para una primera revisión conviene reunir la resolución o requerimiento recibido, la constancia de notificación y los documentos de la operación cuestionada. Esa información permite delimitar el problema y plantear los siguientes pasos con base en el expediente, en lugar de una descripción general del conflicto.",
          en: "We have offices in Mexico City and Ciudad Juárez. For an initial review, gather the decision or request received, proof of service and records of the transaction being questioned. This information helps define the issue and identify next steps from the case file, rather than relying on a general description of the dispute or an isolated account of events.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Cuándo conviene acudir a un abogado fiscalista?",
        en: "When should a business consult a tax attorney?",
      },
      respuesta: {
        es: "Desde que se recibe un requerimiento, una orden de revisión o una resolución que afecta la situación fiscal. También antes de una operación compleja, para revisar sus implicaciones y la documentación que debe conservarse.",
        en: "As soon as a business receives an information request, an audit order or a decision affecting its tax position. Advice is also useful before a complex transaction, to review its implications and the records to retain.",
      },
    },
    {
      pregunta: {
        es: "¿Qué documentos necesito para revisar un problema con el SAT?",
        en: "What documents are needed to review a SAT dispute?",
      },
      respuesta: {
        es: "El acto recibido y su constancia de notificación son el punto de partida. Según el asunto, se revisan declaraciones, contabilidad, contratos, CFDI, pagos y comunicaciones previas con la autoridad.",
        en: "The notice or decision and proof of service are the starting point. Depending on the issue, the review may include tax returns, accounting records, contracts, CFDI invoices, payments and previous communications with the authority.",
      },
    },
  ],
  serviciosRelacionados: [
    "auditorias-sat",
    "creditos-fiscales",
    "devolucion-iva",
    "amparo-fiscal",
  ],
};
