import type { PaginaServicio } from "../types";

export const auditoriasSat: PaginaServicio = {
  id: "auditorias-sat",
  slug: { es: "/auditorias-sat", en: "/sat-audits" },
  titulo: {
    es: "Defensa en auditorías y revisiones del SAT",
    en: "Defense in SAT tax audits and examinations",
  },
  metaDescription: {
    es: "Defensa en auditorías SAT, visitas domiciliarias y revisiones de gabinete o electrónicas. Análisis del expediente y atención de observaciones con Pagaza.",
    en: "Defense in SAT audits, on-site inspections, desk reviews and electronic examinations. Case-file analysis and responses to tax observations with Pagaza.",
  },
  keywordPrincipal: "auditoría SAT",
  keywordsSecundarias: [
    "defensa auditoría SAT",
    "visita domiciliaria SAT",
    "revisión de gabinete SAT",
    "revisión electrónica SAT",
    "oficio de observaciones SAT",
  ],
  capacidadRelacionada: "auditorias",
  intro: [
    {
      es: "Una auditoría del SAT puede cuestionar operaciones de varios ejercicios y exigir información de distintas áreas de la empresa. Acompañamos el procedimiento de fiscalización para ordenar la respuesta, sostener los hechos con pruebas y evaluar las vías de solución o defensa.",
      en: "A SAT audit may question transactions across several tax years and require records from different business departments. We assist throughout the examination, organizing responses, supporting the facts with evidence and assessing resolution or defense options.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Atención de la revisión desde la primera notificación",
        en: "Handling the audit from the first notice",
      },
      parrafos: [
        {
          es: "Revisamos la orden, el requerimiento y la constancia de notificación para identificar la autoridad actuante, las contribuciones y los periodos comprendidos. El alcance de una visita domiciliaria, una revisión de gabinete o una revisión electrónica determina cómo debe atenderse el procedimiento. A partir de esos datos organizamos las actuaciones pendientes y la documentación que la empresa necesita localizar.",
          en: "We review the order, information request and proof of service to identify the authority involved, the taxes and the periods covered. The scope of an on-site inspection, desk review or electronic examination determines how the procedure should be handled. From those details, we organize pending steps and identify the records that the business needs to locate and explain.",
        },
        {
          es: "La entrega de información requiere consistencia entre la contabilidad, las declaraciones y la realidad operativa. Coordinamos el análisis jurídico con las áreas que generan los documentos para explicar las operaciones cuestionadas y advertir diferencias antes de responder. Una carpeta de archivos sin relación entre sí dificulta la defensa; el expediente debe permitir seguir cada hecho, sus comprobantes y su tratamiento fiscal.",
          en: "Information submitted during an audit must be consistent with accounting records, tax returns and business activity. We coordinate legal analysis with the departments producing the records to explain questioned transactions and identify discrepancies before responding. A collection of unrelated files makes a defense harder; the case file should trace each fact, its supporting documents and the tax treatment applied.",
        },
        {
          es: "También examinamos las actuaciones de la autoridad y la forma en que solicita o valora información. Documentar lo que se entregó, cuándo se recibió y qué observaciones permanecen abiertas ayuda a conservar una defensa ordenada. Ese control resulta útil tanto durante la auditoría como al evaluar una resolución posterior y los medios para controvertirla.",
          en: "We also examine the authority's procedural steps and how it requests or evaluates information. Recording what was submitted, when it was received and which observations remain unresolved helps maintain an organized defense. That record matters during the audit and when assessing any later decision and the remedies that may be available to challenge it on procedural or substantive grounds.",
        },
      ],
    },
    {
      titulo: {
        es: "Observaciones, prueba y alternativas de cierre",
        en: "Observations, evidence and resolution options",
      },
      parrafos: [
        {
          es: "Un oficio de observaciones o una última acta parcial requiere revisar qué hechos atribuye el SAT y con qué elementos los sostiene. Separamos las objeciones documentales de las diferencias sobre interpretación jurídica. La respuesta debe atender cada punto con información pertinente y argumentos que correspondan al procedimiento, sin confiar en que un volumen mayor de documentos sustituya una explicación clara.",
          en: "An observations notice or a final partial audit report requires checking which facts the SAT alleges and what supports them. We separate documentary objections from disagreements over legal interpretation. Each point needs relevant evidence and arguments suited to the procedure, without assuming that a larger volume of records can replace a clear account of the transaction and its treatment.",
        },
        {
          es: "Evaluamos si existen condiciones para solicitar un acuerdo conclusivo ante PRODECON o para regularizar aspectos concretos de la situación fiscal. La selección depende de la etapa de revisión, el tipo de desacuerdo y las pruebas disponibles. Antes de elegir una alternativa explicamos su alcance y las consecuencias que tendría para los hechos o partidas que se encuentran bajo revisión.",
          en: "We assess whether the conditions exist for a PRODECON settlement agreement or for regularizing specific aspects of the tax position. The choice depends on the audit stage, the nature of the disagreement and the available evidence. Before selecting a route, we explain its scope and the consequences for the facts or items being examined, including matters that remain disputed.",
        },
        {
          es: "Si la autoridad determina un crédito fiscal, el expediente de auditoría se convierte en la base para evaluar su impugnación. Por eso la estrategia se prepara desde la revisión: identificar omisiones, conservar constancias y aportar las pruebas en la etapa correspondiente evita reconstruir el caso únicamente cuando llega la resolución. Acompañamos esa transición entre atención administrativa y defensa contenciosa.",
          en: "If the authority issues a tax assessment, the audit file becomes the basis for considering a challenge. The strategy therefore begins during the examination: identifying omissions, retaining procedural records and submitting evidence at the appropriate stage avoids having to reconstruct the case only after the decision arrives. We assist with that transition from the administrative review to dispute proceedings.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Qué hacer si recibí un oficio de observaciones del SAT?",
        en: "What should I do after receiving a SAT observations notice?",
      },
      respuesta: {
        es: "Conserva el oficio y la constancia de notificación. Revisa las operaciones señaladas y reúne sus soportes para analizar el plazo y la forma de respuesta aplicables al expediente.",
        en: "Retain the notice and proof of service. Review the transactions identified and gather their supporting records so the applicable response period and procedure can be assessed from the case file.",
      },
    },
    {
      pregunta: {
        es: "¿Qué hacer después de una última acta parcial?",
        en: "What should I do after a final partial audit report?",
      },
      respuesta: {
        es: "Identifica los hechos u omisiones asentados y la evidencia con que pueden aclararse. La revisión jurídica permite definir qué aportar y si procede explorar un acuerdo conclusivo antes de que avance la auditoría.",
        en: "Identify the facts or omissions recorded and the evidence that may clarify them. Legal review helps determine what to submit and whether a settlement agreement may be available before the audit progresses.",
      },
    },
  ],
  serviciosRelacionados: [
    "acuerdos-conclusivos",
    "materialidad",
    "creditos-fiscales",
  ],
};
