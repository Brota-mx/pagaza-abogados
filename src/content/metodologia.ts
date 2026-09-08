import type { MetodologiaContent } from "./types";

/**
 * Resto de la antigua sección "Metodología". El cliente nunca la listó como sección propia: sus
 * tres disciplinas (análisis / estrategia / litigio) se mostraban como una fila numerada al pie
 * del Hero y de Pilares, y el 7-sep-2026 pidió quitar esa fila en ambos sitios ("Quitar esta
 * barra que está hasta arriba, no me gusta"). Lo único que se conserva es el alcance de la
 * defensa, que sigue cerrando la sección Pilares.
 *
 * Fuente: docs/contenido-fuente.md §2 (Pilar III: esfera de defensa). El historial de las tres
 * disciplinas —incluido el cambio del 27-jul-2026, "03 litigio estratégico en lugar de gestión
 * documental"— queda en git (commit anterior a esta rama) por si el cliente lo pide de vuelta.
 */
export const metodologia: MetodologiaContent = {
  esferaDefensa: {
    es: "Acompañamiento y representación directa ante autoridades de los tres niveles de gobierno: federales, estatales y municipales.",
    en: "Direct guidance and representation before authorities at all three levels of government: federal, state, and municipal.",
  },
};
