"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TurnstileAction } from "@/lib/security/submissionProtection";

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: TurnstileAction;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({
  action,
  resetSignal,
  unavailableMessage,
  onTokenChange,
}: {
  action: TurnstileAction;
  resetSignal: number;
  unavailableMessage: string;
  onTokenChange: (token: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [scriptReady, setScriptReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!siteKey || !scriptReady || !window.turnstile || !containerRef.current) return;
    if (widgetIdRef.current) return;

    const invalidateToken = () => {
      onTokenChangeRef.current(null);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    };

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      callback: (token) => onTokenChangeRef.current(token),
      "expired-callback": invalidateToken,
      "error-callback": invalidateToken,
    });
  }, [action, scriptReady, siteKey]);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChangeRef.current(null);
    }
  }, [resetSignal]);

  useEffect(
    () => () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    },
    [],
  );

  if (!siteKey) {
    return (
      <p role="status" style={{ color: "#B3261E", margin: 0 }}>
        {unavailableMessage}
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
