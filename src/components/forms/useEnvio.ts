"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

export type Estado = "idle" | "submitting" | "success" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Envío de un formulario al API: estado, honeypot, token de Turnstile y `fetch`. Los dos
 * formularios del sitio lo hacían con el mismo bloque de 35 líneas copiado, cambiando sólo la URL.
 *
 * El token es de un solo uso: tras cada intento —salga bien o mal— se limpia y se incrementa
 * `resetSignal` para que el widget se resetee.
 */
export function useEnvio<T extends object>(endpoint: string) {
  const locale = useLocale();
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorCode, setErrorCode] = useState<string>("INTERNAL_ERROR");
  const [token, setToken] = useState<string>("");
  const [resetSignal, setResetSignal] = useState(0);
  const [captchaMontado, setCaptchaMontado] = useState(false);
  const hpRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const captchaOn = SITE_KEY.length > 0;

  /**
   * El widget se monta cuando el formulario se acerca a la pantalla, no con la página. Antes los
   * dos formularios de la home pedían el script de Cloudflare y su reto en CADA visita, compitiendo
   * con el hero, para algo que la mayoría de visitantes no usa nunca (auditoría del 1-ago-2026).
   *
   * El disparador es la cercanía y NO el primer foco: montarlo al enfocar dejaba el botón de envío
   * deshabilitado para quien pulsa "Enviar" sin tocar nada antes —un gesto normal para ver qué
   * campos son obligatorios—, y sin widget a la vista que explicara por qué. Lo cazó la suite E2E.
   * Con `rootMargin` el reto se resuelve antes de que el formulario termine de entrar en pantalla.
   */
  useEffect(() => {
    if (!captchaOn || captchaMontado) return;
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setCaptchaMontado(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [captchaOn, captchaMontado]);

  async function enviar(values: T, onExito: () => void) {
    setEstado("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _hp: hpRef.current?.value ?? "",
          turnstileToken: captchaOn ? token : "dev-bypass",
          locale,
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: { code?: string };
      } | null;

      if (res.ok && json?.success) {
        setEstado("success");
        onExito();
      } else {
        setErrorCode(json?.error?.code ?? "INTERNAL_ERROR");
        setEstado("error");
      }
    } catch {
      setErrorCode("NETWORK");
      setEstado("error");
    } finally {
      setToken("");
      setResetSignal((s) => s + 1);
    }
  }

  return {
    estado,
    setEstado,
    errorCode,
    enviar,
    hpRef,
    siteKey: SITE_KEY,
    captchaOn,
    captchaReady: !captchaOn || token.length > 0,
    setToken,
    resetSignal,
    captchaMontado,
    /** Va en el <form>: es el elemento que se observa para decidir cuándo montar el captcha. */
    formRef,
  };
}
