import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/**
 * Source: Content/04-Page-Copy/services/breach-response.md.
 *
 * W-007: phone number is the primary action, above the fold — nothing
 * competes with it. Dark hero variant (2026-08-20 design fork).
 * W-014: never state or imply 24/7 — checked, absent below.
 */
export const breachResponseContent: ServicePageContent = {
  heroVariant: "dark",
  hero: {
    eyebrow: "Breach Response",
    h1: "Think you've had a data breach?",
    subhead:
      "No form, no wait. Call now — we assess what's happened, help you meet any NDPC notification obligation, and support containment. Response guaranteed the same business day.",
    primaryCta: { label: "Call 0913 016 2558", href: "tel:09130162558" },
    secondaryCta: { label: "Not urgent? Message us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Incident Response",
    h1: "Think you've had",
    h1Accent: "a data breach?",
    bannerImage: "/hero-hologram.jpg",
    bannerAlt: "",
    bannerPosition: "50% 44%",
  },
  features: [
    { number: "01", title: "Assess the Incident", body: "We assess what's happened and how serious it is." },
    { number: "02", title: "Meet the Obligation", body: "If NDPC notification is required, we help you meet that obligation." },
    { number: "03", title: "Guide Communication", body: "We help you understand what you're required to tell affected individuals, and when." },
    { number: "04", title: "Contain and Respond", body: "We support containment and next steps." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "Same-day breach response and support meeting any NDPC notification obligation. Thanelinc's general company line handles the call — response is guaranteed the same business day, not around the clock.",
    deliverable: "Incident assessed same day",
    turnaround: "Same-day response",
  },
  bodyBlocks: [
    {
      heading: "What happens when you call",
      steps: [
        "We assess what's happened and how serious it is",
        "If NDPC notification is required, we help you meet that obligation",
        "We help you understand what you're required to tell affected individuals, and when",
        "We support containment and next steps",
      ],
    },
    {
      heading: "If you're not sure it's actually a breach",
      body: "A near-miss, a lost device, an email sent to the wrong person, a vendor reporting an incident on their end — call anyway. Working out whether something rises to a reportable breach is part of what this call is for.",
    },
    {
      heading: "After the immediate response",
      body: "Breach response connects into your ongoing compliance work — see Ongoing Monitoring and the full engagement in How We Work.",
      links: [
        { label: "Explore ongoing monitoring", href: "/services/ongoing-monitoring" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Regulated businesses", href: "/sectors/regulated-businesses" },
    { label: "Higher institutions", href: "/sectors/tertiary-institutions" },
  ],
  closingCta: {
    heading: "Not sure if this is reportable? Call anyway.",
    primary: { label: "Call 0913 016 2558", href: "tel:09130162558" },
    secondary: { label: "Explore ongoing monitoring", href: "/services/ongoing-monitoring" },
    // D2: a genuinely different person from registration's. Note that
    // services-hero-cutout.png and -bust.png are the SAME woman in two crops,
    // so only two distinct faces exist in the repo — per-page variety across
    // all eight service pages needs the commissioned set (launch gate 5).
    backgroundImage: "/hero-hologram.jpg",
    cutoutImage: "/regulated-businesses-cutout.png",
  },
};
