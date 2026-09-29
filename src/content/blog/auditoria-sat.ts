import type { BlogPost } from "../types";
import { blogRoutes } from "./routes";

/** Ejemplo de Codex: no es una publicación ni una opinión firmada por el despacho. */
export const auditoriaSat: BlogPost = {
  ...blogRoutes[0],
  ejemplo: true,
  titulo: {
    es: "¿Qué hacer si el SAT me está auditando?",
    en: "What should I do if the SAT is auditing me?",
  },
  metaDescription: {
    es: "Entrada de ejemplo: cómo organizar la notificación, los documentos y la respuesta ante una auditoría del SAT. Pendiente de revisión del despacho.",
    en: "Sample article: organizing the notice, records and response to a SAT audit. Pending review by the firm.",
  },
  fuentes: [
    {
      titulo: {
        es: "PRODECON: documentación ante facultades de comprobación",
        en: "PRODECON: records for tax audits",
      },
      url: "https://www.gob.mx/prodecon/articulos/prodecon-te-informa-acerca-de-la-documentacion-que-debes-tener-disponible-en-caso-de-que-la-autoridad-ejerza-sus-facultades-de-comprobacion?idiom=es",
    },
    {
      titulo: { es: "PRODECON: asesoría", en: "PRODECON: taxpayer guidance" },
      url: "https://www.gob.mx/prodecon/acciones-y-programas/asesoria-27466",
    },
  ],
  servicioRelacionado: "auditorias-sat",
  tags: [{ es: "Auditorías SAT", en: "SAT audits" }],
  secciones: [
    {
      parrafos: [
        {
          es: "Recibir un documento del SAT exige identificar qué solicita la autoridad antes de responder. Una carta invitación y el inicio de una auditoría no deben tratarse como el mismo procedimiento. El primer paso es reunir el documento completo y la constancia de cómo y cuándo se recibió.",
          en: "Receiving a document from the SAT requires identifying what the authority is requesting before responding. An invitation letter and the start of an audit should not be treated as the same procedure. Begin by gathering the complete document and the record of how and when it was received.",
        },
      ],
    },
    {
      titulo: {
        es: "Lee el acto y registra los plazos",
        en: "Read the notice and record the deadlines",
      },
      parrafos: [
        {
          es: "Revisa la autoridad emisora, el contribuyente al que se dirige, los periodos y las contribuciones señaladas. Conserva los anexos y el acuse. El plazo de respuesta depende del acto y de su notificación; no conviene asumir una fecha a partir de una guía general. Solicita que un profesional revise el documento y determine el calendario aplicable.",
          en: "Check the issuing authority, the taxpayer addressed, the periods and the taxes identified. Keep the attachments and acknowledgment of receipt. The response deadline depends on the notice and its service; a general guide cannot establish that date. Ask a professional to review the document and determine the applicable timetable.",
        },
      ],
    },
    {
      titulo: {
        es: "Organiza el expediente de la operación",
        en: "Organize the transaction file",
      },
      parrafos: [
        {
          es: "Relaciona lo solicitado con la contabilidad y las declaraciones. Reúne contratos, comprobantes, estados de cuenta y evidencia de la entrega de bienes o la prestación de servicios, según la operación. PRODECON recomienda conservar documentación física y digital que permita acreditar la materialidad y atender requerimientos de la autoridad. Evita entregar archivos sin un índice que explique su relación con cada punto solicitado.",
          en: "Match the request to the accounting records and tax returns. Gather contracts, invoices, bank statements and evidence of goods delivered or services performed, as appropriate to the transaction. PRODECON recommends keeping physical and digital records that substantiate transactions and support responses to authority requests. Avoid submitting files without an index explaining how they address each requested item.",
        },
      ],
    },
    {
      titulo: {
        es: "Prepara una respuesta coherente",
        en: "Prepare a consistent response",
      },
      parrafos: [
        {
          es: "Coordina la revisión contable y jurídica antes de presentar información. La respuesta debe corresponder al alcance del requerimiento y a los documentos disponibles. Si hay diferencias con la autoridad, revisa con tu asesor qué alternativas proceden en esa etapa. PRODECON ofrece asesoría sobre actos de autoridades fiscales federales; la vía adecuada depende de los hechos y del procedimiento concreto.",
          en: "Coordinate the accounting and legal review before submitting information. The response should address the scope of the request and the available records. If disagreements arise with the authority, review the options available at that stage with your adviser. PRODECON provides guidance on acts of federal tax authorities; the appropriate approach depends on the facts and the specific procedure.",
        },
      ],
    },
  ],
};
