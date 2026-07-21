import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Solo las rutas con prefijo de idioma. La raíz queda FUERA a propósito: `/` es la puerta de
  // entrada (route group `(entrada)`) y no debe redirigir a `/es`. Al no cubrir el resto, API,
  // assets de Next y archivos con extensión tampoco pasan por aquí.
  matcher: ["/(es|en)/:path*"],
};
