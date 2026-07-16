/**
 * Verificación server-side de Cloudflare Turnstile (BUILD-NOTES §3.5). El site key del cliente NO
 * verifica nada; la fuente de verdad es esta llamada con el secret. Token de un solo uso; el
 * cliente resetea el widget tras cada submit. Fail-CLOSED ante caída de Cloudflare (503), nunca
 * fail-open (sería un relay de spam abierto).
 */
export type TurnstileResult =
  { ok: true } | { ok: false; reason: "failed" | "unavailable" };

/**
 * Bypass SOLO en dev cuando no hay secret configurado (A3): permite verificar el pipeline sin
 * llaves. En producción, sin secret, NO hay bypass (se tratará como config error).
 */
export function turnstileBypassed(): boolean {
  return (
    !process.env.TURNSTILE_SECRET_KEY && process.env.NODE_ENV !== "production"
  );
}

export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, reason: "unavailable" };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        signal: ctrl.signal,
      },
    );
    if (!res.ok) return { ok: false, reason: "unavailable" }; // 5xx de CF → 503
    const data = (await res.json()) as { success: boolean };
    return data.success ? { ok: true } : { ok: false, reason: "failed" }; // 400
  } catch {
    return { ok: false, reason: "unavailable" }; // timeout/red → 503, fail-CLOSED
  } finally {
    clearTimeout(timer);
  }
}
