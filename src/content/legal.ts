import type { DocumentoLegal } from "./types";

/**
 * ⚠️ BORRADOR PARA VALIDACIÓN DEL DESPACHO ⚠️
 *
 * Alfonso Pagaza revisó este aviso (`work/COMENTARIOS NUEVOS/aviso de privacidad revisado.docx`,
 * 1-ago-2026) y marcó en negritas el texto que pidió agregar: nueva referencia normativa en la
 * intro, dos secciones nuevas (Medidas de seguridad, Conservación de los datos personales) en el
 * Aviso de Privacidad, tres secciones nuevas (Enlaces a sitios de terceros, Limitación de
 * responsabilidad, Legislación aplicable y jurisdicción) en el Aviso Legal, y varias frases
 * insertadas en párrafos existentes. Todo eso ya está incorporado abajo tal como lo redactó.
 *
 * Lo que sigue sin validar:
 *  · La intro ahora cita "la Ley Federal de Protección de Datos Personales en Posesión de los
 *    Particulares y su Reglamento" — es el nombre que él mismo escribió, pero es el nombre de la
 *    ley ANTERIOR a la reforma de marzo-2025 (cuando la autoridad garante dejó de ser el INAI).
 *    Confirmar con él que es el nombre vigente que quiere usar antes de publicar.
 *  · Plazos de respuesta a las solicitudes ARCO: sigue en términos genéricos ("la legislación
 *    aplicable"), sin un número de días.
 *  · Denominación y domicilio fiscal exactos del responsable.
 *
 * Publicar el sitio sin esta validación deja al despacho expuesto: el formulario ya recaba datos
 * personales.
 */
export const AVISO_ACTUALIZADO = {
  es: "1 de agosto de 2026",
  en: "August 1, 2026",
};

export const avisoPrivacidad: DocumentoLegal = {
  titulo: {
    es: "Aviso de Privacidad Integral",
    en: "Privacy Notice",
  },
  intro: {
    es: "Pagaza Abogados Tributarios, con domicilio en Prado Sur 525, Lomas de Chapultepec, Alcaldía Miguel Hidalgo, C.P. 11000, Ciudad de México, es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio y del uso que se dé a los mismos, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento.",
    en: "Pagaza Abogados Tributarios, with offices at Prado Sur 525, Lomas de Chapultepec, Miguel Hidalgo, 11000, Mexico City, is the controller responsible for the personal data you provide through this website and for its use, in accordance with the Federal Law on the Protection of Personal Data Held by Private Parties and its Regulations.",
  },
  secciones: [
    {
      titulo: {
        es: "Datos personales que recabamos",
        en: "Personal data we collect",
      },
      parrafos: [
        {
          es: "Los datos personales podrán ser obtenidos de manera directa cuando los proporcionas mediante este sitio web.",
          en: "Personal data may be obtained directly when you provide it through this website.",
        },
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
          // Se retiró "y verificar que no se trata de un envío automatizado": describía la
          // verificación de Turnstile, que salió del sitio el 1-ago-2026. Lo que queda tratando la
          // IP es el rate-limit. PENDIENTE DE VALIDACIÓN DE ALFONSO.
          es: "Datos técnicos de seguridad: dirección IP y datos del navegador, tratados de forma automática y transitoria para limitar el número de envíos.",
          en: "Technical security data: IP address and browser information, processed automatically and transiently to rate-limit submissions.",
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
          es: "Este sitio no solicita datos personales sensibles, patrimoniales ni financieros. Te pedimos no incluirlos en el campo de mensaje; si el asunto que planteas requiere el tratamiento de datos personales sensibles, estos únicamente serán tratados cuando resulte estrictamente necesario para la prestación de los servicios legales y conforme a la legislación aplicable, utilizando los canales confidenciales que se establezcan una vez iniciada la relación profesional.",
          en: "This site does not request sensitive, financial, or asset-related personal data. Please do not include them in the message field; if the matter you raise requires the processing of sensitive personal data, it will only be processed when strictly necessary to provide the legal services and in accordance with applicable law, using the confidential channels established once a professional relationship begins.",
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
          es: "Finalidades primarias, necesarias para la relación con el despacho: atender tu solicitud de contacto, evaluar el asunto que planteas, determinar la viabilidad de una posible relación profesional, comunicarnos contigo para dar respuesta y, en su caso, agendar una consulta.",
          en: "Primary purposes, necessary for the relationship with the firm: to respond to your inquiry, assess the matter you raise, determine the feasibility of a possible professional relationship, communicate with you, and, where applicable, schedule a consultation.",
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
          es: "No vendemos, cedemos ni comercializamos tus datos personales. Los datos personales podrán ser tratados por terceros que actúan como encargados del tratamiento, exclusivamente para prestar servicios tecnológicos necesarios para la operación del sitio y siempre conforme a nuestras instrucciones.",
          en: "We do not sell, assign, or trade your personal data. Personal data may be processed by third parties acting as data processors, exclusively to provide the technology services necessary to operate the site and always under our instructions.",
        },
        {
          es: "Para operar el sitio nos apoyamos en proveedores tecnológicos que actúan como encargados, tratan los datos únicamente conforme a nuestras instrucciones y tienen servidores fuera de México:",
          en: "To operate the site we rely on technology providers acting as processors, which handle data solely under our instructions and whose servers are located outside Mexico:",
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
      ],
      cierre: [
        {
          es: "Las transferencias internacionales derivadas del uso de estos proveedores se realizan con las medidas de seguridad y obligaciones contractuales necesarias para proteger tus datos personales, de conformidad con la legislación aplicable.",
          en: "International transfers resulting from the use of these providers are carried out with the security measures and contractual obligations necessary to protect your personal data, in accordance with applicable law.",
        },
      ],
    },
    {
      titulo: {
        es: "Medidas de seguridad",
        en: "Security measures",
      },
      parrafos: [
        {
          es: "Implementamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger tus datos personales contra daño, pérdida, alteración, destrucción o acceso, uso o tratamiento no autorizado. No obstante, ningún sistema de transmisión o almacenamiento de información es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de los datos transmitidos por Internet.",
          en: "We implement reasonable administrative, technical, and physical security measures to protect your personal data against damage, loss, alteration, destruction, or unauthorized access, use, or processing. However, no transmission or storage system is completely secure, so we cannot guarantee the absolute security of data transmitted over the Internet.",
        },
      ],
    },
    {
      titulo: {
        es: "Conservación de los datos personales",
        en: "Retention of personal data",
      },
      parrafos: [
        {
          es: "Los datos personales se conservarán únicamente durante el tiempo necesario para cumplir con las finalidades descritas en este aviso y con las obligaciones legales aplicables, tras lo cual serán eliminados o, en su caso, anonimizados conforme a nuestros procedimientos internos.",
          en: "Personal data will be retained only for as long as necessary to fulfill the purposes described in this notice and applicable legal obligations, after which it will be deleted or, where applicable, anonymized in accordance with our internal procedures.",
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
          es: "Para ejercer cualquiera de estos derechos, escríbenos a a@pagaza.mx indicando tu nombre, el derecho que deseas ejercer y los datos concretos a que se refiere tu solicitud. La solicitud deberá cumplir con los requisitos previstos por la legislación aplicable, incluyendo la documentación que acredite tu identidad o, en su caso, la representación legal correspondiente. También puedes presentarla en nuestro domicilio. Te responderemos dentro del plazo que establece la legislación aplicable y, de ser procedente, haremos efectiva tu solicitud dentro de los plazos previstos en dicha normativa.",
          en: "To exercise any of these rights, write to a@pagaza.mx stating your name, the right you wish to exercise, and the specific data your request refers to. The request must meet the requirements set by applicable law, including documentation proving your identity or, where applicable, the corresponding legal representation. You may also submit it at our offices. We will respond within the period established by applicable law and, where appropriate, will implement your request within the timeframes set by that law.",
        },
        {
          es: "Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en materia de protección de datos personales.",
          en: "If you believe your right to the protection of personal data has been infringed, you may file a complaint with the competent authority on personal data protection.",
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
          // Se retiraron dos fragmentos que describían Turnstile: "La verificación
          // anti-automatización del formulario y" e "incluido el formulario de contacto" (el
          // formulario ya no depende de identificadores técnicos, es un POST sin cookies).
          // PENDIENTE DE VALIDACIÓN DE ALFONSO.
          es: "Este sitio no utiliza cookies publicitarias ni de seguimiento entre sitios, ni construye perfiles de sus visitantes. Las métricas agregadas de uso pueden emplear identificadores técnicos temporales, necesarios para que esa función opere. Puedes configurar tu navegador para bloquear o eliminar estos identificadores técnicos; sin embargo, hacerlo puede afectar el funcionamiento de determinadas funcionalidades del sitio.",
          en: "This site does not use advertising or cross-site tracking cookies, and does not build profiles of its visitors. The aggregate usage metrics may use temporary technical identifiers necessary for that function to work. You can configure your browser to block or delete these technical identifiers; however, doing so may affect certain functionality on the site.",
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
 * resultados y esas afirmaciones necesitan el matiz de que son casos concretos y no una promesa.
 * Desde la nota del cliente del 27-jul-2026 queda una sola cifra publicada (el $12M de la
 * auditoría PLD, en Construcción); el $55M y el 98% se retiraron. El matiz sigue haciendo falta
 * mientras quede aunque sea una. También deja claro que navegar el sitio o escribir por el
 * formulario no crea una relación abogado-cliente.
 */
export const avisoLegal: DocumentoLegal = {
  titulo: {
    es: "Aviso Legal",
    en: "Legal Notice",
  },
  intro: {
    es: "El contenido de este sitio se publica con fines informativos sobre la práctica profesional de Pagaza Abogados Tributarios y no tiene por objeto sustituir el asesoramiento jurídico profesional.",
    en: "The content of this site is published for informational purposes about the professional practice of Pagaza Abogados Tributarios and is not intended to replace professional legal advice.",
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
          es: "El envío del formulario de contacto o de un correo electrónico o cualquier otra comunicación realizada a través de este sitio web no crea una relación abogado-cliente. Dicha relación se constituye únicamente mediante la aceptación expresa del asunto por parte del despacho y la formalización de los términos correspondientes. Te pedimos no enviarnos información confidencial hasta que esa relación exista.",
          en: "Submitting the contact form, sending an email, or any other communication made through this website does not create an attorney-client relationship. That relationship arises only upon the firm's express acceptance of the matter and the formalization of the corresponding terms. Please do not send us confidential information until that relationship exists.",
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
          es: "Los casos y las cifras que aparecen en este sitio corresponden a asuntos concretos, resueltos bajo circunstancias de hecho y de derecho particulares, y se publican de forma que no permite identificar a los clientes involucrados. Resultados anteriores no garantizan ni predicen el resultado de ningún asunto futuro. Asimismo, cualquier referencia a casos de éxito tiene fines exclusivamente ilustrativos y no constituye una promesa, garantía o expectativa de obtener resultados similares.",
          en: "The cases and figures shown on this site correspond to specific matters resolved under particular factual and legal circumstances, and are published in a way that does not identify the clients involved. Past results neither guarantee nor predict the outcome of any future matter. Likewise, any reference to successful cases is exclusively illustrative and does not constitute a promise, guarantee, or expectation of obtaining similar results.",
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
          es: "Los contenidos, la marca y los elementos gráficos de este sitio son propiedad de Pagaza Abogados Tributarios o se utilizan con la autorización correspondiente, y no pueden reproducirse, distribuirse, modificarse, comunicarse públicamente, almacenarse o explotarse de cualquier forma, total o parcialmente, sin la autorización previa y por escrito de Pagaza Abogados Tributarios, salvo en los casos expresamente permitidos por la legislación aplicable.",
          en: "The contents, trademarks, and graphic elements of this site are the property of Pagaza Abogados Tributarios or are used under the corresponding authorization, and may not be reproduced, distributed, modified, publicly communicated, stored, or exploited in any form, in whole or in part, without the prior written authorization of Pagaza Abogados Tributarios, except in cases expressly permitted by applicable law.",
        },
      ],
    },
    {
      titulo: {
        es: "Enlaces a sitios de terceros",
        en: "Links to third-party sites",
      },
      parrafos: [
        {
          es: "Este sitio puede contener enlaces a sitios web de terceros únicamente para fines informativos. Pagaza Abogados Tributarios no controla, respalda ni asume responsabilidad alguna por el contenido, disponibilidad, políticas de privacidad o prácticas de dichos sitios web. El acceso a los mismos es responsabilidad exclusiva del usuario.",
          en: "This site may contain links to third-party websites solely for informational purposes. Pagaza Abogados Tributarios does not control, endorse, or assume any responsibility for the content, availability, privacy policies, or practices of such websites. Accessing them is the sole responsibility of the user.",
        },
      ],
    },
    {
      titulo: {
        es: "Limitación de responsabilidad",
        en: "Limitation of liability",
      },
      parrafos: [
        {
          es: "Pagaza Abogados Tributarios realiza esfuerzos razonables para mantener la información de este sitio actualizada y precisa; sin embargo, no garantiza que el contenido se encuentre libre de errores, omisiones o desactualizaciones, ni será responsable por los daños o perjuicios que pudieran derivarse del uso o de la imposibilidad de uso de este sitio o de la información contenida en él, salvo en los casos previstos por la legislación aplicable.",
          en: "Pagaza Abogados Tributarios makes reasonable efforts to keep the information on this site current and accurate; however, it does not guarantee that the content is free of errors, omissions, or outdated information, and will not be liable for any damages arising from the use or inability to use this site or the information contained in it, except in cases provided for by applicable law.",
        },
      ],
    },
    {
      titulo: {
        es: "Legislación aplicable y jurisdicción",
        en: "Governing law and jurisdiction",
      },
      parrafos: [
        {
          es: "El presente Aviso Legal se rige por las leyes de los Estados Unidos Mexicanos. Para la interpretación y cumplimiento del mismo, las partes se someten a la legislación y jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro.",
          en: "This Legal Notice is governed by the laws of the United Mexican States. For the interpretation and enforcement of this notice, the parties submit to the legislation and jurisdiction of the competent courts of Mexico City, waiving any other jurisdiction that may correspond to them by reason of their present or future domicile.",
        },
      ],
    },
  ],
};
