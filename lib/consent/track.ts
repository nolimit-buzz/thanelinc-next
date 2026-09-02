"use client";

import { track } from "@vercel/analytics";
import { getConsent } from "@/lib/consent/store";

/**
 * Every call site stays simple; consent-gating lives here once. Silently
 * no-ops without analytics consent — never queues or defers, so nothing
 * fires retroactively if consent is granted later.
 */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined") return;
  if (!getConsent().analytics) return;
  track(name, props);
}
