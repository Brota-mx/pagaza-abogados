import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // `always`: /es y /en siempre llevan prefijo, así la raíz queda libre para la puerta de entrada.
  localePrefix: "always",
  // El idioma lo elige la persona en `/` (ENTRAR / ENTER), no la cabecera Accept-Language.
  // Requisito del cliente: "si se elige español deberá desplegarse todo en español".
  localeDetection: false,
  // Rutas traducidas: la URL también está en el idioma del visitante. La clave es la ruta interna
  // que se usa en el código (`<Link href="/aviso-de-privacidad">`); next-intl la reescribe según
  // el locale activo.
  pathnames: {
    "/": "/",
    "/aviso-de-privacidad": {
      es: "/aviso-de-privacidad",
      en: "/privacy-notice",
    },
    "/aviso-legal": {
      es: "/aviso-legal",
      en: "/legal-notice",
    },
    "/abogado-fiscalista": { es: "/abogado-fiscalista", en: "/tax-attorney" },
    "/auditorias-sat": { es: "/auditorias-sat", en: "/sat-audits" },
    "/acuerdos-conclusivos-prodecon": {
      es: "/acuerdos-conclusivos-prodecon",
      en: "/prodecon-settlement-agreements",
    },
    "/creditos-fiscales": {
      es: "/creditos-fiscales",
      en: "/tax-credits-defense",
    },
    "/materialidad-fiscal": {
      es: "/materialidad-fiscal",
      en: "/fiscal-materiality",
    },
    "/69-b-operaciones-inexistentes": {
      es: "/69-b-operaciones-inexistentes",
      en: "/article-69b-defense",
    },
    "/restriccion-sellos-digitales": {
      es: "/restriccion-sellos-digitales",
      en: "/digital-seal-restrictions",
    },
    "/devolucion-iva": { es: "/devolucion-iva", en: "/vat-refund" },
    "/defensa-imss": { es: "/defensa-imss", en: "/imss-defense" },
    "/comercio-exterior": { es: "/comercio-exterior", en: "/foreign-trade" },
    "/pld": { es: "/pld", en: "/anti-money-laundering" },
    "/amparo-fiscal": { es: "/amparo-fiscal", en: "/tax-amparo" },
  },
});
