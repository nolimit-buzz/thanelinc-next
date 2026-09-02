"use client";

import { Analytics } from "@vercel/analytics/react";
import { useConsent } from "@/lib/consent/store";

/** Mounts Vercel Analytics only after explicit opt-in; unmounts if consent is withdrawn. */
export function AnalyticsGate() {
  const { consent } = useConsent();
  if (!consent.analytics) return null;
  return <Analytics />;
}
