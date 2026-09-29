import type { PaginaServicio } from "../types";

export const creditosFiscales: PaginaServicio = {
  id: "creditos-fiscales",
  slug: { es: "/creditos-fiscales", en: "/tax-credits-defense" },
  titulo: {
    es: "Defensa de créditos fiscales y multas del SAT",
    en: "Defense against SAT tax assessments and penalties",
  },
  metaDescription: {
    es: "Defensa frente a créditos fiscales y multas del SAT. Revisión de resoluciones, recursos de revocación y juicio de nulidad fiscal con Pagaza Abogados.",
    en: "Defense against SAT tax assessments and penalties. Review of decisions, administrative appeals and tax annulment proceedings with Pagaza Abogados.",
  },
  keywordPrincipal: "crédito fiscal SAT",
  keywordsSecundarias: [
    "defensa crédito fiscal",
    "impugnar crédito fiscal",
    "multa SAT",
    "recurso de revocación SAT",
    "juicio de nulidad fiscal",
  ],
  capacidadRelacionada: "controversias",
  intro: [
    {
      es: "La determinación de un crédito fiscal exige revisar tanto el cálculo del adeudo como los fundamentos y el procedimiento que lo originaron. Analizamos resoluciones del SAT y multas para definir las vías de impugnación y las medidas que requiera la situación del contribuyente.",
      en: "A tax assessment requires reviewing the liability calculation, its legal basis and the procedure behind it. We analyze SAT decisions and penalties to identify available challenges and any measures needed in the taxpayer's circumstances.",
    },
  ],
  secciones: [
    {
      titulo: {
        es: "Revisión de la resolución y del origen del adeudo",
        en: "Reviewing the decision and the basis of the liability",
      },
      parrafos: [
        {
          es: "Comenzamos por la resolución completa y la constancia de notificación. Identificamos los impuestos, periodos, actualizaciones, recargos y multas incluidos, así como las operaciones que la autoridad cuestiona. El análisis distingue errores en la cuantificación de problemas de fundamentación, motivación o procedimiento. Esa separación permite construir argumentos concretos y evita tratar el monto total como si tuviera una sola causa.",
          en: "We start with the complete decision and proof of service. We identify the taxes, periods, inflation adjustments, late payment charges and penalties included, together with the transactions the authority questions. The analysis distinguishes calculation errors from issues concerning legal grounds, reasoning or procedure. This separation supports specific arguments and avoids treating the total amount as though it arose from a single cause.",
        },
        {
          es: "Contrastamos los hechos que afirma la autoridad con el expediente de auditoría, las declaraciones y los soportes de la empresa. Revisamos qué pruebas se aportaron, cómo fueron valoradas y si existen observaciones que quedaron sin respuesta. La defensa debe explicar por qué una partida resulta improcedente o por qué el acto presenta un defecto jurídico, con referencias al caso y no únicamente a fórmulas generales.",
          en: "We compare the authority's factual findings with the audit file, tax returns and the company's supporting records. We examine what evidence was submitted, how it was assessed and whether observations remained unanswered. The defense must explain why an item is unjustified or why the act has a legal defect, with references to the case rather than general wording or an unsupported disagreement with the amount.",
        },
        {
          es: "La fecha y la forma de notificación son parte del diagnóstico. También revisamos si existen actuaciones de cobro y qué obligaciones se han cumplido o continúan pendientes. Reunir esas constancias desde el inicio permite evaluar los plazos y los efectos de cada alternativa sin confundir la controversia sobre el adeudo con las medidas necesarias para enfrentar su exigibilidad.",
          en: "The date and method of service are part of the diagnosis. We also check for collection steps and which obligations have been met or remain outstanding. Gathering these records at the outset allows us to assess time limits and the effects of each option without confusing the dispute over the liability with the steps required to address its enforceability.",
        },
      ],
    },
    {
      titulo: {
        es: "Impugnación y atención de los efectos del crédito",
        en: "Challenging the assessment and addressing its effects",
      },
      parrafos: [
        {
          es: "Estudiamos la procedencia del recurso de revocación y del juicio contencioso administrativo ante el Tribunal Federal de Justicia Administrativa. La elección depende del acto, los antecedentes y la estrategia probatoria. Explicamos qué puede discutirse en cada vía y qué requisitos deben atenderse, para que la empresa valore su defensa con conocimiento de las implicaciones del procedimiento y de los documentos necesarios.",
          en: "We examine whether an administrative appeal or proceedings before the Federal Court of Administrative Justice are available. The choice depends on the act, the background and the evidence strategy. We explain which issues can be disputed through each route and the requirements to meet, so the business can assess its defense with an understanding of the procedure and the records needed.",
        },
        {
          es: "Las multas requieren una revisión propia, aunque acompañen una determinación de impuestos. Analizamos la conducta atribuida, la disposición aplicada y la explicación de la sanción para identificar argumentos de defensa. Cuando hay varias resoluciones relacionadas, coordinamos su estudio para conservar una posición consistente y evitar que la atención de una deje fuera otras actuaciones que también afectan al contribuyente.",
          en: "Penalties need a separate review even when they accompany a tax assessment. We analyze the alleged conduct, the provision applied and the reasoning behind the sanction to identify defense arguments. Where several decisions are connected, we coordinate their review to maintain a consistent position and prevent attention to one decision from overlooking other acts that also affect the taxpayer.",
        },
        {
          es: "La presentación de un medio de defensa y la suspensión del cobro son cuestiones que deben examinarse por separado. Valoramos los requisitos de garantía y las medidas cautelares que correspondan al expediente. La estrategia incluye seguimiento de las actuaciones posteriores, revisión de requerimientos y comunicación con la empresa sobre los efectos que siguen vigentes mientras se resuelve la controversia.",
          en: "Filing a challenge and obtaining a stay of collection are matters that need separate assessment. We evaluate security requirements and interim measures relevant to the case file. The strategy includes monitoring later procedural steps, reviewing information requests and keeping the business informed of effects that remain in force while the dispute is decided, so operational decisions reflect the actual legal position.",
        },
      ],
    },
  ],
  faq: [
    {
      pregunta: {
        es: "¿Qué hacer si me determinaron un crédito fiscal?",
        en: "What should I do after receiving a tax assessment?",
      },
      respuesta: {
        es: "Conserva la resolución completa, su notificación y el expediente que la originó. Con esos documentos se revisan los plazos, los argumentos y la vía de defensa, además de cualquier actuación de cobro.",
        en: "Retain the complete decision, proof of service and the file behind it. Those records allow review of time limits, arguments and the defense route, as well as any collection action.",
      },
    },
    {
      pregunta: {
        es: "¿Cómo impugnar una multa del SAT?",
        en: "How can a SAT penalty be challenged?",
      },
      respuesta: {
        es: "Se debe analizar la resolución, la infracción atribuida y su notificación para determinar el medio de defensa procedente. El recurso o juicio elegido necesita atender los requisitos y las circunstancias de esa sanción.",
        en: "The decision, alleged violation and proof of service must be analyzed to identify the available remedy. The chosen appeal or court proceeding must address the requirements and circumstances of that penalty.",
      },
    },
  ],
  serviciosRelacionados: [
    "auditorias-sat",
    "amparo-fiscal",
    "sellos-digitales",
  ],
};
