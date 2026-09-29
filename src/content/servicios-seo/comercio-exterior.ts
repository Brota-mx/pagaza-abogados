import type { PaginaServicio } from "../types";

export const comercioExterior: PaginaServicio = {
  id: "comercio-exterior",
  slug: { es: "/comercio-exterior", en: "/foreign-trade" },
  titulo: {
    es: "Abogado de comercio exterior y defensa aduanera",
    en: "Foreign trade counsel and customs defense",
  },
  metaDescription: {
    es: "Asesoría y defensa en comercio exterior: auditorías aduaneras, PAMA, padrón de importadores e IVA en operaciones transfronterizas con Pagaza Abogados.",
    en: "Foreign trade advice and defense: customs audits, PAMA proceedings, importer registry issues and VAT on cross-border transactions with Pagaza Abogados.",
  },
  keywordPrincipal: "abogado comercio exterior",
  keywordsSecundarias: [
    "auditoría comercio exterior SAT",
    "defensa aduanera",
    "PAMA",
    "padrón de importadores",
    "auditoría aduanera",
  ],
  capacidadRelacionada: "comercioexterior",
  intro: [
    {
      es: "Una controversia aduanera puede afectar mercancías, contribuciones y la continuidad de importaciones o exportaciones. Asesoramos operaciones de comercio exterior y acompañamos la defensa ante auditorías y procedimientos administrativos, con análisis de la documentación y del acto de autoridad.",
      en: "A customs dispute may affect goods, duties and the continuity of imports or exports. We advise on foreign trade transactions and assist with defense in audits and administrative proceedings, analyzing the records and the authority's act.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Revisión jurídica de importaciones y exportaciones",
        en: "Legal review of imports and exports",
      },
      parrafos: [
        {
          es: "El análisis de una operación internacional requiere relacionar su estructura comercial con la documentación aduanera y su tratamiento tributario. Revisamos contratos, facturas, pedimentos y soportes de traslado o recepción para entender qué se declaró y qué ocurrió en la práctica. Esa secuencia permite identificar diferencias entre la operación, sus registros y la posición que la empresa debe sostener frente a una revisión.",
          en: "Analyzing an international transaction requires connecting its commercial structure with customs records and tax treatment. We review contracts, invoices, customs declarations and transport or receipt records to understand what was declared and what occurred in practice. That sequence helps identify differences between the transaction, its records and the position the company needs to support when the authority examines the operation and its tax effects.",
        },
        {
          es: "Las observaciones sobre contribuciones, IVA u obligaciones relacionadas con el régimen aduanero deben atenderse conforme al expediente. Separamos los problemas documentales de las diferencias jurídicas y coordinamos la revisión con las áreas que conservan la información. También consideramos la conexión con devoluciones o acreditamiento, porque una misma operación puede tener efectos en expedientes fiscales distintos y necesitar una explicación consistente en todos ellos.",
          en: "Observations concerning duties, VAT or obligations linked to a customs regime should be addressed against the case file. We separate documentary issues from legal disagreements and coordinate with the departments holding the information. We also consider connections with refunds or input VAT crediting, since the same transaction can affect separate tax files and require a consistent explanation in each proceeding where it is reviewed.",
        },
        {
          es: "La asesoría preventiva parte de las operaciones que la empresa realiza o planea realizar, sin suponer que todos los negocios internacionales tienen los mismos riesgos. Identificamos qué documentos deben conservarse y qué aspectos requieren coordinación con otros participantes de la operación. El objetivo es que la información permita verificar los hechos y sostener el tratamiento aplicado cuando una autoridad solicite explicaciones sobre una importación o exportación.",
          en: "Preventive advice starts with the transactions the business carries out or plans, without assuming all international activity has the same risks. We identify records to retain and matters requiring coordination with other participants. The aim is to preserve information that verifies the facts and supports the treatment applied when an authority requests explanations about an import or export and its associated obligations.",
        },
      ],
    },
    {
      titulo: {
        es: "Auditorías aduaneras, PAMA y padrón de importadores",
        en: "Customs audits, PAMA and the importer registry",
      },
      parrafos: [
        {
          es: "Ante una auditoría de comercio exterior, revisamos la orden y los requerimientos para delimitar operaciones, periodos y obligaciones. Si existe un procedimiento administrativo en materia aduanera, analizamos el acta y los motivos de la actuación para determinar qué hechos deben aclararse y qué pruebas pueden aportarse. La respuesta se prepara conforme a ese procedimiento, con atención a la documentación y a sus efectos sobre las mercancías.",
          en: "In a foreign trade audit, we review the order and requests to define transactions, periods and obligations. Where customs administrative proceedings, known as PAMA, are involved, we analyze the report and grounds to determine which facts need clarification and what evidence may be submitted. The response is prepared for that procedure, with attention to the records and the effects on the goods concerned.",
        },
        {
          es: "Los problemas con el padrón de importadores requieren identificar la causa de la medida y los requisitos del trámite que corresponda. Examinamos comunicaciones, registros y antecedentes para evaluar la aclaración y, cuando resulte necesario, la defensa. Coordinar el trabajo jurídico con la operación ayuda a reunir la información pertinente y a valorar cómo las decisiones de la autoridad afectan las transacciones en curso.",
          en: "Importer registry issues require identifying the grounds for the measure and the requirements of the relevant procedure. We examine communications, records and background to assess clarification and, where needed, defense. Coordinating legal work with operations helps gather pertinent information and evaluate how the authority's decisions affect current transactions, without treating the business impact as a substitute for answering the specific legal grounds.",
        },
        {
          es: "Cuando se emite una resolución, estudiamos los medios de impugnación disponibles y la evidencia formada durante la revisión. También analizamos los requisitos de medidas cautelares que puedan corresponder al caso. El acompañamiento incluye seguimiento de actuaciones y revisión de los efectos que permanecen vigentes, para que la empresa conozca qué decisiones operativas requieren atención mientras se define el resultado de la controversia.",
          en: "When a decision is issued, we study available challenges and the evidence gathered during the examination. We also analyze requirements for interim measures relevant to the case. Our assistance includes tracking procedural steps and reviewing effects that remain in force, so the business understands which operational decisions need attention while the dispute is resolved and which matters remain subject to the authority's decision.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Qué hacer si iniciaron un PAMA?",
        en: "What should I do if PAMA proceedings have begun?",
      },
      respuesta: {
        es: "Conserva el acta, la notificación y los documentos de las mercancías. Su revisión permite identificar los motivos del procedimiento, las pruebas relevantes y las actuaciones que deben atenderse según el expediente.",
        en: "Retain the report, proof of service and records relating to the goods. Their review identifies the grounds for the proceedings, relevant evidence and the steps required by the case file.",
      },
    },
    {
      pregunta: {
        es: "¿Cómo atender una suspensión del padrón de importadores?",
        en: "How can an importer registry suspension be addressed?",
      },
      respuesta: {
        es: "Primero debe identificarse la causa comunicada por la autoridad. Con los antecedentes y documentos de cumplimiento se evalúa el trámite de aclaración o la vía de defensa que corresponda.",
        en: "First identify the grounds communicated by the authority. Background and compliance records allow assessment of the relevant clarification procedure or defense route.",
      },
    },
  ],
  serviciosRelacionados: [
    "devolucion-iva",
    "auditorias-sat",
    "creditos-fiscales",
  ],
};
