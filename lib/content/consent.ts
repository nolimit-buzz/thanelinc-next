export interface ConsentBannerContent {
  heading: string;
  body: string;
  acceptLabel: string;
  necessaryOnlyLabel: string;
  privacyLink: { label: string; href: "/privacy" };
  cookiePolicyLink: { label: string; href: "/cookie-policy" };
}

/**
 * Operational draft, same status as legalDocuments in lib/content/legal.ts —
 * review before treating as final. Necessary-only remains equally prominent
 * to accept; analytics defaults off and only turns on after an explicit choice.
 * Links both the Privacy Policy (how the site handles data generally) and the
 * Cookie Policy (this specific analytics choice) — the banner is the point of
 * collection for both, per NDPC practice.
 */
export const consentBanner: ConsentBannerContent = {
  heading: "Cookies and privacy",
  body: "We use essential technical storage to run this site, and optional, cookieless analytics to understand how visitors use it. Analytics is off unless you choose to allow it. No personal data is sold to third parties.",
  acceptLabel: "Allow analytics",
  necessaryOnlyLabel: "Necessary only",
  privacyLink: { label: "Privacy Policy", href: "/privacy" },
  cookiePolicyLink: { label: "Cookie Policy", href: "/cookie-policy" },
};
