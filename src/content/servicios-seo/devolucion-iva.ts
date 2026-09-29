import type { PaginaServicio } from "../types";

export const devolucionIva: PaginaServicio = {
  id: "devolucion-iva",
  slug: { es: "/devolucion-iva", en: "/vat-refund" },
  titulo: {
    es: "Devolución de IVA y defensa de saldos a favor",
    en: "VAT refunds and defense of refundable balances",
  },
  metaDescription: {
    es: "Asesoría en devolución de IVA ante el SAT, atención de requerimientos y defensa frente a negativas. Revisión del saldo a favor y su evidencia con Pagaza.",
    en: "Advice on SAT VAT refunds, responses to information requests and defense against denials. Review of refundable balances and supporting evidence with Pagaza.",
  },
  keywordPrincipal: "devolución IVA SAT",
  keywordsSecundarias: [
    "negativa devolución IVA",
    "abogado devolución IVA",
    "saldo a favor IVA",
    "rechazo acreditamiento IVA",
    "devolución IVA exportadores",
  ],
  capacidadRelacionada: "controversias",
  intro: [
    {
      es: "La devolución de IVA puede enfrentar requerimientos, cuestionamientos al acreditamiento o una negativa del SAT. Analizamos el origen del saldo a favor y acompañamos la atención del procedimiento y la defensa de las resoluciones que lo afectan.",
      en: "A VAT refund may face information requests, challenges to input VAT credits or a SAT denial. We analyze the refundable balance and assist with the procedure and defense against decisions affecting it.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Revisión del saldo y de la documentación de soporte",
        en: "Reviewing the balance and supporting records",
      },
      parrafos: [
        {
          es: "El expediente debe explicar cómo se generó el saldo a favor y cómo se relaciona con las operaciones declaradas. Revisamos la integración del IVA, los comprobantes, los pagos y los registros contables para detectar diferencias antes de responder a la autoridad. También examinamos la documentación de solicitudes previas y los acuses, porque el historial del trámite ayuda a identificar lo que ya se acreditó y lo que sigue en discusión.",
          en: "The case file should explain how the refundable balance arose and how it relates to the declared transactions. We review the VAT calculation, invoices, payments and accounting records to identify discrepancies before responding. We also examine previous applications and filing receipts, since the procedural history helps establish what has already been supported and what remains in dispute with the authority.",
        },
        {
          es: "Las operaciones de exportación, los periodos preoperativos y las diferencias sobre tasa o acreditamiento requieren un análisis que atienda sus características. Separamos las cuestiones de cálculo de aquellas relacionadas con requisitos legales o prueba de la operación. Esa lectura permite definir qué información debe aportar la empresa y qué argumentos responden al motivo concreto por el que el SAT solicita una aclaración.",
          en: "Export transactions, pre-operating periods and disagreements over rates or input VAT crediting require analysis of their particular features. We separate calculation issues from legal requirements and evidence of the transaction. That approach identifies the information the company needs to provide and the arguments that address the actual reason for the SAT's request, rather than treating every refundable balance as the same case.",
        },
        {
          es: "Coordinamos el trabajo con las áreas que conservan contratos, entregables, pedimentos y demás registros relevantes. La información debe permitir vincular el saldo solicitado con operaciones identificables y documentadas. Cuando hay observaciones de materialidad, revisamos la ejecución de los bienes o servicios y su relación con el IVA acreditado, para que la respuesta atienda ambos aspectos con una explicación consistente.",
          en: "We coordinate with the departments holding contracts, deliverables, customs declarations and other relevant records. The information should connect the claimed balance with identifiable, documented transactions. Where transaction substance is questioned, we review the actual supply of goods or services and its connection with input VAT, so the response addresses both matters through a consistent account supported by the company's records.",
        },
      ],
    },
    {
      titulo: {
        es: "Requerimientos y defensa frente a una negativa",
        en: "Information requests and defense against a denial",
      },
      parrafos: [
        {
          es: "Cada requerimiento debe revisarse conforme al expediente: qué información solicita, a qué periodo corresponde y qué relación tiene con el saldo. Preparamos respuestas que expliquen las partidas y documenten lo entregado. Conservar acuses y constancias facilita el seguimiento, especialmente cuando intervienen varias áreas de la empresa o existen solicitudes de devolución de distintos periodos que deben mantenerse separadas.",
          en: "Each information request should be reviewed against the file: what is requested, which period it concerns and how it relates to the balance. We prepare responses explaining the items and recording what was submitted. Retaining receipts and procedural records supports follow-up, particularly when several departments are involved or refund applications for different periods need to be kept distinct and supported separately.",
        },
        {
          es: "Si el SAT niega total o parcialmente la devolución, estudiamos los fundamentos y la valoración de pruebas que contiene la resolución. Identificamos si el desacuerdo deriva de la integración del saldo, del acreditamiento o de la realidad de las operaciones. Sobre esa base evaluamos el recurso administrativo o el juicio que pueda proceder y la documentación necesaria para sostener cada argumento.",
          en: "If the SAT denies all or part of the refund, we study the decision's legal grounds and its assessment of evidence. We identify whether the disagreement concerns the balance calculation, input VAT crediting or whether the transactions occurred. On that basis, we assess the available administrative appeal or court proceedings and the records needed to support each argument in the challenge.",
        },
        {
          es: "El acompañamiento incluye revisar las actuaciones posteriores y la conexión con auditorías u otras controversias tributarias de la empresa. Una misma operación puede ser relevante en más de un procedimiento; mantener una explicación congruente evita contradicciones. La finalidad es defender el saldo que resulte sustentado por el expediente, con una lectura de los requisitos y efectos de cada vía, sin prometer la devolución de cualquier monto solicitado.",
          en: "Our assistance includes reviewing later steps and connections with audits or other tax disputes involving the company. The same transaction may matter in more than one proceeding; a consistent account avoids contradictions. The aim is to defend the balance supported by the file, with an understanding of each route's requirements and effects, without promising recovery of every amount claimed in the original application.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Qué hacer si el SAT rechazó mi devolución de IVA?",
        en: "What should I do if the SAT denied my VAT refund?",
      },
      respuesta: {
        es: "Reúne la resolución, su notificación, la solicitud y las respuestas a requerimientos. Esos documentos permiten identificar el motivo de la negativa y evaluar los argumentos y el medio de defensa aplicable.",
        en: "Gather the decision, proof of service, application and responses to information requests. Those records identify the reason for denial and allow assessment of arguments and the applicable remedy.",
      },
    },
    {
      pregunta: {
        es: "¿Un requerimiento significa que la devolución ya fue negada?",
        en: "Does an information request mean the refund has already been denied?",
      },
      respuesta: {
        es: "No equivale por sí mismo a una negativa. Es necesario atender lo solicitado conforme al procedimiento y revisar las decisiones posteriores para conocer el estado y los efectos del trámite.",
        en: "A request does not itself amount to a denial. It needs to be answered under the applicable procedure, and later decisions must be reviewed to establish the application's status and effects.",
      },
    },
  ],
  serviciosRelacionados: [
    "materialidad",
    "auditorias-sat",
    "comercio-exterior",
  ],
};
