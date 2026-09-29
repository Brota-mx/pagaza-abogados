import type { PaginaServicio } from "../types";

export const materialidad: PaginaServicio = {
  id: "materialidad",
  slug: { es: "/materialidad-fiscal", en: "/fiscal-materiality" },
  titulo: {
    es: "Materialidad fiscal y prueba de las operaciones",
    en: "Fiscal materiality and evidence of actual transactions",
  },
  metaDescription: {
    es: "Defensa ante rechazo de deducciones y acreditamiento de IVA por materialidad fiscal. Revisión de contratos, pagos y evidencia de operaciones con Pagaza.",
    en: "Defense against denied deductions and VAT credits based on disputed transaction substance. Review of contracts, payments and evidence of performance with Pagaza.",
  },
  keywordPrincipal: "materialidad fiscal",
  keywordsSecundarias: [
    "materialidad de operaciones",
    "acreditar materialidad SAT",
    "rechazo de deducciones SAT",
    "razón de negocios",
    "sustancia económica fiscal",
  ],
  capacidadRelacionada: "auditorias",
  intro: [
    {
      es: "Cuando el SAT cuestiona la materialidad, la discusión se centra en si las operaciones ocurrieron y cómo puede demostrarse. Revisamos la evidencia contable, contractual y operativa para sostener la realidad de los bienes o servicios y su tratamiento tributario.",
      en: "When the SAT questions transaction substance, the dispute concerns whether the transactions occurred and how they can be proved. We review accounting, contractual and operational evidence to support the actual supply of goods or services and its tax treatment.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Construir la trazabilidad de cada operación",
        en: "Building a traceable record of each transaction",
      },
      parrafos: [
        {
          es: "Un expediente de materialidad debe explicar qué se contrató, quién lo ejecutó, cómo se entregó y qué relación tiene con la actividad de la empresa. Revisamos los documentos desde esa secuencia, buscando que contratos, CFDI, pagos y registros operativos se correspondan. El contenido de la prueba depende de la operación: un servicio especializado deja rastros distintos a la compra y traslado de mercancías.",
          en: "A transaction-substance file should explain what was contracted, who performed it, how it was delivered and how it relates to the company's activity. We review records in that sequence, checking that contracts, CFDI invoices, payments and operational records correspond. The evidence depends on the transaction: a specialized service leaves different records from the purchase and transport of goods through a supply chain.",
        },
        {
          es: "Identificamos entregables, comunicaciones, reportes, bitácoras y demás constancias que ya existen en las áreas responsables. Después analizamos qué demuestra cada documento y dónde hay vacíos o contradicciones. El trabajo consiste en ordenar y explicar evidencia auténtica; generar papeles que aparenten hechos no ocurridos comprometería la defensa y la situación jurídica de la empresa, además de desviar el análisis del problema real.",
          en: "We identify deliverables, communications, reports, logs and other records already held by the responsible departments. We then assess what each document proves and where gaps or contradictions exist. The work is to organize and explain authentic evidence; producing records that suggest events which never occurred would compromise the defense and the company's legal position, while diverting attention from the actual issue.",
        },
        {
          es: "También revisamos el vínculo entre las operaciones, su registro y los efectos fiscales aplicados. La materialidad, la razón de negocios y los requisitos de una deducción o un acreditamiento plantean preguntas diferentes. Separarlas ayuda a responder la observación concreta de la autoridad y a identificar si el desacuerdo es sobre la ejecución, el propósito de la operación o su tratamiento en la declaración.",
          en: "We also review the relationship between transactions, their recording and the tax effects claimed. Transaction substance, business purpose and the requirements for a deduction or tax credit raise different questions. Separating them helps answer the authority's actual observation and identify whether the disagreement concerns performance, the transaction's purpose or its treatment in the return, rather than combining distinct issues into one assertion.",
        },
      ],
    },
    {
      titulo: {
        es: "Atender el rechazo de deducciones o IVA",
        en: "Addressing denied deductions or VAT credits",
      },
      parrafos: [
        {
          es: "Cuando existe un requerimiento o una observación del SAT, estudiamos los motivos por los que la autoridad considera insuficiente la prueba. Comparamos esa explicación con lo entregado por la empresa y con la documentación que aún puede aportarse en la etapa correspondiente. La respuesta debe identificar las operaciones, describir su ejecución y relacionar cada afirmación con las constancias que la sostienen.",
          en: "When the SAT issues a request or observation, we study why the authority considers the evidence insufficient. We compare that explanation with what the company submitted and with records that may still be provided at the relevant stage. The response should identify the transactions, describe their performance and connect each statement with the records supporting it, so the dispute remains tied to specific facts.",
        },
        {
          es: "Las objeciones sobre capacidad del proveedor, entregables o relación con la actividad requieren respuestas diferenciadas. Examinamos si la autoridad está atribuyendo hechos concretos y si valoró la información de forma completa. Una defensa basada únicamente en exhibir facturas puede dejar sin resolver la cuestión operativa; del mismo modo, aportar documentación sin explicar su vínculo puede impedir que se comprenda su alcance probatorio.",
          en: "Objections concerning the supplier's capacity, deliverables or connection with the business need distinct responses. We examine whether the authority alleges specific facts and whether it evaluated the information as a whole. A defense relying only on invoices may leave the operational question unresolved; likewise, providing records without explaining their connection can prevent their evidentiary value from being understood in the case.",
        },
        {
          es: "Si el cuestionamiento deriva en una resolución, evaluamos los medios de impugnación disponibles con el expediente que se formó durante la revisión. También acompañamos la organización preventiva de documentos para operaciones futuras, utilizando la información que la empresa produce en su actividad ordinaria. La finalidad es conservar una explicación verificable de cada operación y reducir la dependencia de reconstrucciones hechas años después.",
          en: "If the issue leads to a decision, we assess the available challenges using the file formed during the examination. We also assist with organizing records for future transactions, drawing on information the business produces in its ordinary activity. The aim is to retain a verifiable account of each transaction and reduce reliance on reconstructions attempted years later, when the people and records may have changed.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Qué hacer si el SAT rechazó la materialidad de mis operaciones?",
        en: "What if the SAT denies the substance of my transactions?",
      },
      respuesta: {
        es: "Revisa qué operaciones cuestiona y qué motivos expone. Reúne los documentos de contratación, ejecución, entrega y pago para analizar la prueba disponible y la respuesta que corresponde a la etapa del procedimiento.",
        en: "Review which transactions are questioned and the reasons given. Gather contracting, performance, delivery and payment records to assess the available evidence and the response suited to the procedural stage.",
      },
    },
    {
      pregunta: {
        es: "¿La factura y el pago bastan para acreditar materialidad?",
        en: "Are an invoice and payment enough to prove transaction substance?",
      },
      respuesta: {
        es: "Deben valorarse junto con el resto de la evidencia. Según el bien o servicio, pueden resultar relevantes entregables, registros de recepción, comunicaciones o constancias que expliquen cómo se realizó la operación.",
        en: "They should be assessed with the remaining evidence. Depending on the goods or services, deliverables, receipt records, communications or other records explaining performance may be relevant.",
      },
    },
  ],
  serviciosRelacionados: ["art-69b", "auditorias-sat", "devolucion-iva"],
};
