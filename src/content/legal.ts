import type { DocumentoLegal } from "./types";

/**
 * ⚠️ BORRADOR PARA VALIDACIÓN DEL DESPACHO ⚠️
 *
 * Redactado desde el lado técnico: describe con exactitud qué datos recaba este sitio, por qué
 * medios y qué encargados los tratan — eso sí es verificable contra el código
 * (`api/contact/route.ts`, `api/newsletter/route.ts`, `lib/ratelimit.ts`, `lib/turnstile.ts`,
 * `lib/resend.ts`, `lib/reporter.ts` y la analítica de Vercel en el layout).
 *
 * Lo que NO está verificado y debe revisar y firmar Alfonso Pagaza antes de publicar:
 *  · En marzo de 2025 se publicó una nueva Ley Federal de Protección de Datos Personales en
 *    Posesión de los Particulares y la autoridad garante dejó de ser el INAI. Aquí se habla de
 *    "la autoridad competente" para no fijar un nombre que pueda quedar obsoleto; el despacho
 *    debe precisarlo.
 *  · Plazos de respuesta a las solicitudes ARCO.
 *  · Denominación y domicilio fiscal exactos del responsable.
 *  · Si el despacho quiere ofrecer finalidades secundarias distintas de las listadas.
 *
 * Publicar el sitio sin esta validación deja al despacho expuesto: el formulario ya recaba datos
 * personales.
 */
export const AVISO_ACTUALIZADO = {
  es: "21 de julio de 2026",
  en: "July 21, 2026",
};

export const avisoPrivacidad: DocumentoLegal = {
  titulo: {
    es: "Aviso de Privacidad Integral",
    en: "Privacy Notice",
  },
  intro: {
    es: "Pagaza Abogados Tributarios, con domicilio en Prado Sur 525, Lomas de Chapultepec, Alcaldía Miguel Hidalgo, C.P. 11000, Ciudad de México, es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio y del uso que se dé a los mismos.",
    en: "Pagaza Abogados Tributarios, with offices at Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, Mexico City, is the controller responsible for the personal data you provide through this website and for its use.",
  },
  secciones: [
    {
      titulo: {
        es: "Datos personales que recabamos",
        en: "Personal data we collect",
      },
      parrafos: [
        {
          es: "Recabamos únicamente los datos que decides proporcionarnos y los estrictamente necesarios para operar el sitio de forma segura:",
          en: "We collect only the data you choose to provide and what is strictly necessary to operate the site securely:",
        },
      ],
      lista: [
        {
          es: "Formulario de contacto: nombre completo y correo electrónico (obligatorios); empresa, teléfono y sector de la industria (opcionales); y el contenido del mensaje que redactes.",
          en: "Contact form: full name and email address (required); company, phone number, and industry sector (optional); and the content of the message you write.",
        },
        {
          es: "Suscripción al newsletter: correo electrónico y la constancia de tu consentimiento.",
          en: "Newsletter subscription: email address and a record of your consent.",
        },
        {
          es: "Datos técnicos de seguridad: dirección IP y datos del navegador, tratados de forma automática y transitoria para limitar el número de envíos y verificar que no se trata de un envío automatizado.",
          en: "Technical security data: IP address and browser information, processed automatically and transiently to rate-limit submissions and verify that they are not automated.",
        },
      ],
    },
    {
      titulo: {
        es: "No recabamos datos sensibles",
        en: "We do not collect sensitive data",
      },
      parrafos: [
        {
          es: "Este sitio no solicita datos personales sensibles, patrimoniales ni financieros. Te pedimos no incluirlos en el campo de mensaje: si tu asunto los requiere, los trataremos por los canales confidenciales que se establezcan una vez iniciada la relación profesional.",
          en: "This site does not request sensitive, financial, or asset-related personal data. Please do not include them in the message field: if your matter requires them, we will handle them through the confidential channels established once a professional relationship begins.",
        },
      ],
    },
    {
      titulo: {
        es: "Finalidades del tratamiento",
        en: "Purposes of processing",
      },
      parrafos: [
        {
          es: "Finalidades primarias, necesarias para la relación con el despacho: atender tu solicitud de contacto, evaluar el asunto que planteas, comunicarnos contigo para dar respuesta y, en su caso, agendar una consulta.",
          en: "Primary purposes, necessary for the relationship with the firm: to respond to your inquiry, assess the matter you raise, communicate with you, and, where applicable, schedule a consultation.",
        },
        {
          es: "Finalidad secundaria, que requiere tu consentimiento expreso: enviarte el newsletter con análisis en materia fiscal y administrativa. Puedes negarte a esta finalidad sin que ello afecte la atención de tu asunto, y darte de baja en cualquier momento desde el propio correo o escribiéndonos.",
          en: "Secondary purpose, which requires your express consent: sending you our newsletter with tax and administrative law analysis. You may decline this purpose without affecting how your matter is handled, and unsubscribe at any time from the email itself or by writing to us.",
        },
      ],
    },
    {
      titulo: {
        es: "Encargados y transferencias",
        en: "Processors and transfers",
      },
      parrafos: [
        {
          es: "No vendemos, cedemos ni comercializamos tus datos personales. Para operar el sitio nos apoyamos en proveedores tecnológicos que actúan como encargados, tratan los datos únicamente conforme a nuestras instrucciones y tienen servidores fuera de México:",
          en: "We do not sell, assign, or trade your personal data. To operate the site we rely on technology providers acting as processors, which handle data solely under our instructions and whose servers are located outside Mexico:",
        },
      ],
      lista: [
        {
          es: "Vercel Inc. (Estados Unidos): alojamiento del sitio y métricas de uso agregadas.",
          en: "Vercel Inc. (United States): website hosting and aggregate usage metrics.",
        },
        {
          es: "Resend (Estados Unidos): entrega del correo generado por el formulario y gestión de la lista del newsletter.",
          en: "Resend (United States): delivery of the email generated by the form and management of the newsletter list.",
        },
        {
          es: "Upstash (Estados Unidos): control del número de envíos por dirección IP.",
          en: "Upstash (United States): rate-limiting of submissions by IP address.",
        },
        {
          es: "Cloudflare, Inc. (Estados Unidos): verificación anti-automatización del formulario.",
          en: "Cloudflare, Inc. (United States): anti-automation verification of the form.",
        },
      ],
    },
    {
      titulo: {
        es: "Derechos ARCO y revocación del consentimiento",
        en: "Data subject rights and withdrawal of consent",
      },
      parrafos: [
        {
          es: "Tienes derecho a acceder a tus datos personales, a rectificarlos cuando sean inexactos, a cancelarlos cuando consideres que no son necesarios y a oponerte a su tratamiento para fines específicos, así como a revocar el consentimiento que nos hayas otorgado.",
          en: "You have the right to access your personal data, rectify it when inaccurate, cancel it when you consider it unnecessary, and object to its processing for specific purposes, as well as to withdraw any consent you have given us.",
        },
        {
          es: "Para ejercer cualquiera de estos derechos, escríbenos a a@pagaza.mx indicando tu nombre, el derecho que deseas ejercer y los datos concretos a que se refiere tu solicitud. También puedes presentarla en nuestro domicilio. Te responderemos dentro del plazo que establece la legislación aplicable.",
          en: "To exercise any of these rights, write to a@pagaza.mx stating your name, the right you wish to exercise, and the specific data your request refers to. You may also submit it at our offices. We will respond within the period established by applicable law.",
        },
        {
          es: "Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en la materia.",
          en: "If you believe your right to the protection of personal data has been infringed, you may file a complaint with the competent authority.",
        },
      ],
    },
    {
      titulo: {
        es: "Cookies y tecnologías similares",
        en: "Cookies and similar technologies",
      },
      parrafos: [
        {
          es: "Este sitio no utiliza cookies publicitarias ni de seguimiento entre sitios, ni construye perfiles de sus visitantes. La verificación anti-automatización del formulario y las métricas agregadas de uso pueden emplear identificadores técnicos temporales, necesarios para que esas funciones operen.",
          en: "This site does not use advertising or cross-site tracking cookies, and does not build profiles of its visitors. The form's anti-automation check and the aggregate usage metrics may use temporary technical identifiers necessary for those functions to work.",
        },
      ],
    },
    {
      titulo: {
        es: "Cambios al presente aviso",
        en: "Changes to this notice",
      },
      parrafos: [
        {
          es: "Este aviso puede modificarse por cambios legislativos, por requerimientos de la autoridad o por ajustes en nuestros procesos. Cualquier modificación se publicará en esta misma página, con su fecha de actualización.",
          en: "This notice may be amended due to legislative changes, requirements from the authorities, or adjustments to our processes. Any amendment will be published on this same page, along with its update date.",
        },
      ],
    },
  ],
};

/**
 * Aviso legal. Importa especialmente el segundo bloque: el sitio publica cifras concretas de
 * resultados ($55M, 98%, $12M) y esas afirmaciones necesitan el matiz de que son casos concretos
 * y no una promesa. También deja claro que navegar el sitio o escribir por el formulario no crea
 * una relación abogado-cliente.
 */
export const avisoLegal: DocumentoLegal = {
  titulo: {
    es: "Aviso Legal",
    en: "Legal Notice",
  },
  intro: {
    es: "El contenido de este sitio se publica con fines informativos sobre la práctica profesional de Pagaza Abogados Tributarios.",
    en: "The content of this site is published for informational purposes about the professional practice of Pagaza Abogados Tributarios.",
  },
  secciones: [
    {
      titulo: {
        es: "No constituye asesoría jurídica",
        en: "Not legal advice",
      },
      parrafos: [
        {
          es: "La información de este sitio es de carácter general y no constituye asesoría jurídica sobre ningún caso concreto. Cada asunto depende de sus hechos, sus plazos y su marco normativo aplicable. No actúes ni dejes de actuar con base en este contenido sin consultar previamente a un profesional.",
          en: "The information on this site is general in nature and does not constitute legal advice on any specific matter. Every case depends on its own facts, deadlines, and applicable legal framework. Do not act or refrain from acting based on this content without first consulting a professional.",
        },
        {
          es: "El envío del formulario de contacto o de un correo electrónico no crea una relación abogado-cliente. Dicha relación se constituye únicamente mediante la aceptación expresa del asunto por parte del despacho y la formalización de los términos correspondientes. Te pedimos no enviarnos información confidencial hasta que esa relación exista.",
          en: "Submitting the contact form or sending an email does not create an attorney-client relationship. That relationship arises only upon the firm's express acceptance of the matter and the formalization of the corresponding terms. Please do not send us confidential information until that relationship exists.",
        },
      ],
    },
    {
      titulo: {
        es: "Sobre los resultados descritos",
        en: "About the results described",
      },
      parrafos: [
        {
          es: "Los casos y las cifras que aparecen en este sitio corresponden a asuntos concretos, resueltos bajo circunstancias de hecho y de derecho particulares, y se publican de forma que no permite identificar a los clientes involucrados. Resultados anteriores no garantizan ni predicen el resultado de ningún asunto futuro.",
          en: "The cases and figures shown on this site correspond to specific matters resolved under particular factual and legal circumstances, and are published in a way that does not identify the clients involved. Past results neither guarantee nor predict the outcome of any future matter.",
        },
      ],
    },
    {
      titulo: {
        es: "Propiedad intelectual",
        en: "Intellectual property",
      },
      parrafos: [
        {
          es: "Los contenidos, la marca y los elementos gráficos de este sitio son propiedad de Pagaza Abogados Tributarios o se utilizan con la autorización correspondiente, y no pueden reproducirse sin consentimiento previo por escrito.",
          en: "The contents, trademarks, and graphic elements of this site are the property of Pagaza Abogados Tributarios or are used under the corresponding authorization, and may not be reproduced without prior written consent.",
        },
      ],
    },
  ],
};
