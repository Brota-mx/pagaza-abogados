import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // `always`: /es y /en siempre llevan prefijo, así la raíz queda libre para la puerta de entrada.
  localePrefix: "always",
  // El idioma lo elige la persona en `/` (ENTRAR / ENTER), no la cabecera Accept-Language.
  // Requisito del cliente: "si se elige español deberá desplegarse todo en español".
  localeDetection: false,
});
