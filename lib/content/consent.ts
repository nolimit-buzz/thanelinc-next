export interface ConsentBannerContent {
  heading: string;
  body: string;
  acceptLabel: string;
  necessaryOnlyLabel: string;
  cookiePolicyLink: { label: string; href: "/cookie-policy" };
}

/**
 * Operational draft, same status as legalDocuments in lib/content/legal.ts —
 * review before treating as final. Necessary-only remains equally prominent
 * to accept; analytics defaults off and only turns on after an explicit choice.
 */
export const consentBanner: ConsentBannerContent = {
  heading: "Cookies and analytics",
  body: "We'd like to use privacy-friendly, cookieless analytics to understand how visitors use this site. It's off unless you say yes, and nothing else on this site sets tracking cookies.",
  acceptLabel: "Allow analytics",
  necessaryOnlyLabel: "Necessary only",
  cookiePolicyLink: { label: "Cookie Policy", href: "/cookie-policy" },
};
