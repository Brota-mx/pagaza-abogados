"use client";

import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Widget de Cloudflare Turnstile (render explícito). Emite el token por `onToken`; ante expiración
 * o error emite token vacío (`onToken("")`) para invalidar el submit. El token es de un solo uso:
 * cuando `resetSignal` cambia (tras cada submit), el widget se resetea.
 */
export function TurnstileWidget({
  siteKey,
  onToken,
  resetSignal,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  resetSignal: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current)
      return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [siteKey, onToken]);

  useEffect(() => {
    if (window.turnstile) {
      renderWidget();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile"]',
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    const onLoad = () => renderWidget();
    script.addEventListener("load", onLoad);
    // Por si el script ya estaba cargándose entre chequeos.
    const poll = setInterval(() => {
      if (window.turnstile) {
        clearInterval(poll);
        renderWidget();
      }
    }, 200);
    return () => {
      script?.removeEventListener("load", onLoad);
      clearInterval(poll);
    };
  }, [renderWidget]);

  // Reset del widget tras cada submit (token de un solo uso).
  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onToken("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
