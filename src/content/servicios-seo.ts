import { abogadoFiscalista } from "./servicios-seo/abogado-fiscalista";
import { auditoriasSat } from "./servicios-seo/auditorias-sat";
import { acuerdosConclusivos } from "./servicios-seo/acuerdos-conclusivos";
import { creditosFiscales } from "./servicios-seo/creditos-fiscales";
import { materialidad } from "./servicios-seo/materialidad";
import { art69b } from "./servicios-seo/art-69b";
import { sellosDigitales } from "./servicios-seo/sellos-digitales";
import { devolucionIva } from "./servicios-seo/devolucion-iva";
import { defensaImss } from "./servicios-seo/defensa-imss";
import { comercioExterior } from "./servicios-seo/comercio-exterior";
import { pld } from "./servicios-seo/pld";
import { amparoFiscal } from "./servicios-seo/amparo-fiscal";

/** Registro en el orden del estudio del cliente. El copy vive por servicio para facilitar su revisión. */
export const serviciosSeo = [
  abogadoFiscalista,
  auditoriasSat,
  acuerdosConclusivos,
  creditosFiscales,
  materialidad,
  art69b,
  sellosDigitales,
  devolucionIva,
  defensaImss,
  comercioExterior,
  pld,
  amparoFiscal,
];

export function getServicio(id: string) {
  const servicio = serviciosSeo.find((pagina) => pagina.id === id);
  if (!servicio) throw new Error(`Servicio SEO desconocido: ${id}`);
  return servicio;
}
