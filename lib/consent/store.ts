"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_NAME = "thanelinc-consent-v1";
const CHANGE_EVENT = "thanelinc-consent-change";

export interface ConsentState {
  /** Has the visitor made an explicit choice yet? */
  decided: boolean;
  /** Off by default — only true after an explicit opt-in, never pre-ticked. */
  analytics: boolean;
}

const DEFAULT_STATE: ConsentState = { decided: false, analytics: false };

function parseState(raw: string | null): ConsentState {
  if (!raw) return DEFAULT_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      decided: parsed.decided === true,
      analytics: parsed.analytics === true,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

// useSyncExternalStore requires a snapshot with a stable reference when the
// underlying value hasn't changed, or it re-renders forever. Cache by the
// raw string so re-reading localStorage with an unchanged value returns the
// same object.
let cachedRaw: string | null = null;
let cachedState: ConsentState = DEFAULT_STATE;

function getSnapshot(): ConsentState {
  const raw = window.localStorage.getItem(STORAGE_NAME);
  if (raw === cachedRaw) return cachedState;
  cachedRaw = raw;
  cachedState = parseState(raw);
  return cachedState;
}

function getServerSnapshot(): ConsentState {
  return DEFAULT_STATE;
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  return parseState(window.localStorage.getItem(STORAGE_NAME));
}

export function setConsent(analytics: boolean): void {
  if (typeof window === "undefined") return;
  const next: ConsentState = { decided: true, analytics };
  try {
    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(next));
  } catch {
    // Storage can throw in private-browsing/quota-exceeded contexts. The
    // dispatch below still lets the current tab behave correctly for this
    // session even if persistence failed.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Client-only hook. Re-renders when consent changes in this tab or another. */
export function useConsent(): { consent: ConsentState; accept: () => void; necessaryOnly: () => void } {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const accept = useCallback(() => setConsent(true), []);
  const necessaryOnly = useCallback(() => setConsent(false), []);
  return { consent, accept, necessaryOnly };
}
