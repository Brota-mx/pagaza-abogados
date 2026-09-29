import type { PaginaServicio } from "../types";

export const amparoFiscal: PaginaServicio = {
  id: "amparo-fiscal",
  slug: { es: "/amparo-fiscal", en: "/tax-amparo" },
  titulo: {
    es: "Amparo fiscal y defensa constitucional",
    en: "Tax Amparo and constitutional defense",
  },
  metaDescription: {
    es: "Análisis y representación en amparo fiscal frente a actos de autoridad. Revisión de procedencia, argumentos constitucionales y suspensión con Pagaza Abogados.",
    en: "Assessment and representation in tax Amparo proceedings against acts of authority. Review of admissibility, constitutional arguments and stays with Pagaza.",
  },
  keywordPrincipal: "amparo fiscal",
  keywordsSecundarias: [
    "abogado amparo fiscal",
    "amparo contra SAT",
    "amparo contra autoridad fiscal",
    "suspensión amparo fiscal",
    "litigio fiscal",
  ],
  capacidadRelacionada: "litigio",
  intro: [
    {
      es: "El amparo fiscal permite plantear la protección constitucional frente a actos o normas en los supuestos que admite la ley. Analizamos su procedencia dentro de la estrategia de defensa, junto con los antecedentes del caso y los medios ordinarios que puedan corresponder.",
      en: "Tax Amparo proceedings seek constitutional protection against acts or rules in the circumstances permitted by law. We assess admissibility within the defense strategy, alongside the case background and any ordinary remedies that may apply.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Procedencia y construcción del planteamiento constitucional",
        en: "Admissibility and the constitutional case",
      },
      parrafos: [
        {
          es: "El análisis comienza por identificar el acto o la norma que afecta al contribuyente y la forma en que esa afectación se produjo. Revisamos notificaciones, resoluciones y actuaciones previas para determinar la posición de quien pretende promover el juicio. El amparo tiene requisitos propios de procedencia; su utilidad debe evaluarse en el contexto del expediente y no como una respuesta automática a cualquier desacuerdo fiscal.",
          en: "The analysis begins by identifying the act or rule affecting the taxpayer and how that effect arose. We review notices, decisions and previous proceedings to determine the position of the proposed claimant. Amparo has its own admissibility requirements; its usefulness must be assessed in the context of the file rather than treated as an automatic response to every tax disagreement or adverse decision.",
        },
        {
          es: "Distinguimos los cuestionamientos de legalidad de los argumentos constitucionales que puedan sostenerse. Esa separación ayuda a definir el objeto del juicio y a coordinarlo con recursos administrativos o procedimientos contenciosos que formen parte del caso. La estrategia examina las vías disponibles, sus condiciones y las consecuencias de las actuaciones previas, para evitar planteamientos incompatibles o que desconozcan el recorrido procesal del contribuyente.",
          en: "We distinguish legality issues from constitutional arguments that may be supported. That distinction helps define the proceedings' subject and coordinate it with administrative appeals or court challenges forming part of the case. The strategy examines available routes, their conditions and the consequences of earlier steps, avoiding inconsistent positions or arguments that overlook the taxpayer's procedural history and the scope of decisions already issued.",
        },
        {
          es: "Construimos el planteamiento con los hechos acreditados y con una explicación de los derechos que se estiman afectados. La documentación debe permitir comprender el vínculo entre el acto de autoridad y la situación del promovente. El trabajo incluye revisar qué constancias resultan necesarias y qué aspectos exigen seguimiento durante el juicio, con atención al alcance de la protección que se solicita y a sus límites.",
          en: "We build the case from established facts and an explanation of the rights alleged to be affected. The records should show the connection between the authority's act and the claimant's position. The work includes reviewing which documents are needed and which matters require attention during the proceedings, with regard to the scope of protection sought, its limits and the actual circumstances of the claimant.",
        },
      ],
    },
    {
      titulo: {
        es: "Suspensión y coordinación con la defensa fiscal",
        en: "Stays and coordination with the tax defense",
      },
      parrafos: [
        {
          es: "La suspensión requiere un análisis separado del fondo del amparo. Estudiamos el acto, sus efectos y los requisitos que correspondan para solicitar una medida cautelar. También explicamos las obligaciones o garantías que puedan resultar necesarias y los límites de la medida. La presentación de una demanda no permite asumir que desaparecen las consecuencias del acto o que la autoridad debe detener cualquier actuación relacionada.",
          en: "A stay requires analysis separate from the merits of the Amparo claim. We study the act, its effects and the relevant requirements for requesting interim relief. We also explain obligations or security that may be needed and the measure's limits. Filing a claim does not mean that the act's consequences disappear or that the authority must stop every related step against the taxpayer.",
        },
        {
          es: "Cuando hay créditos fiscales, restricciones de sellos digitales u otras medidas que afectan la operación, revisamos cómo se conecta la solicitud de suspensión con los expedientes administrativos. Esa coordinación permite mantener argumentos consistentes y conocer qué actos continúan vigentes. La empresa necesita información sobre los efectos concretos de las decisiones judiciales, además del seguimiento de notificaciones y requerimientos que se produzcan durante la defensa.",
          en: "Where tax assessments, digital seal restrictions or other measures affect operations, we review how the stay request connects with administrative files. That coordination maintains consistent arguments and identifies which acts remain in force. The business needs information about the actual effects of court decisions, alongside monitoring notices and requests received during the defense, so its operational choices reflect the relief that was actually granted.",
        },
        {
          es: "Acompañamos el desarrollo del juicio y el análisis de las resoluciones que se emitan. El alcance de una sentencia se estudia conforme a lo discutido y a sus efectos sobre el caso; también revisamos las actuaciones necesarias para su cumplimiento. El objetivo es sostener una defensa constitucional vinculada con el problema tributario real, sin ofrecer el amparo como garantía de cancelación de impuestos, multas o procedimientos.",
          en: "We assist throughout the proceedings and analyze the decisions issued. The scope of a judgment is considered against the issues litigated and its effects on the case; we also review steps needed for compliance. The aim is to maintain a constitutional defense connected with the actual tax issue, without presenting Amparo as a guarantee that taxes, penalties or proceedings will be canceled for the claimant.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿El amparo sustituye cualquier recurso fiscal?",
        en: "Does Amparo replace every tax remedy?",
      },
      respuesta: {
        es: "No. Su procedencia depende del acto, la afectación y los requisitos legales, incluidos los que puedan relacionarse con medios ordinarios de defensa. Debe revisarse el recorrido del expediente antes de elegir la vía.",
        en: "No. Admissibility depends on the act, the effect and legal requirements, including those related to ordinary remedies. The procedural history must be reviewed before choosing a route.",
      },
    },
    {
      pregunta: {
        es: "¿Presentar un amparo suspende el cobro de un crédito fiscal?",
        en: "Does filing an Amparo claim stay collection of a tax assessment?",
      },
      respuesta: {
        es: "No de forma automática. La suspensión tiene requisitos y efectos propios que deben analizarse según el acto y el expediente, incluyendo las garantías que puedan exigirse.",
        en: "Not automatically. A stay has its own requirements and effects, which must be assessed against the act and case file, including any security that may be required.",
      },
    },
  ],
  serviciosRelacionados: [
    "creditos-fiscales",
    "sellos-digitales",
    "defensa-imss",
  ],
};
