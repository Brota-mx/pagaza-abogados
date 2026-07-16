/**
 * Reporter fail-open a la Torre de Control (Regla #9). Reporta rechazos/usos relevantes del
 * endpoint sin bloquear ni tumbar el sitio si la Torre falla: no se espera la promesa y los errores
 * se tragan. Si no hay TORRE_REPORTER_URL, es no-op. NUNCA incluir PII del prospecto.
 */
export function report(event: string, meta?: Record<string, unknown>): void {
  const url = process.env.TORRE_REPORTER_URL;
  if (!url) return;

  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "pagaza-contact",
      event,
      ...meta,
    }),
    // Evita que la petición cuelgue la función serverless.
    signal: AbortSignal.timeout(3000),
  }).catch(() => {
    // fail-open: el correo ya se procesó; la observabilidad no puede tumbar el flujo.
  });
}
