import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/** Source: Content/04-Page-Copy/services/policies-remediation.md. */
export const policiesRemediationContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Governance & Policy",
    h1: "Policies & Remediation",
    subhead: "Every gap the assessment found gets closed — a full policy suite, delivered within 96 hours.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Governance & Policy",
    h1: "Policies",
    h1Accent: "& Remediation",
    bannerImage: "/services-banner-glass-architecture.jpg",
    bannerAlt: "Modern glass office building",
  },
  features: [
    { number: "01", title: "Privacy Policy", body: "A privacy policy tailored directly to the gaps found in your assessment." },
    { number: "02", title: "Retention Schedule", body: "A documented data retention policy for the information your organisation holds." },
    { number: "03", title: "Response Procedure", body: "A breach response procedure and staff data-handling guidelines." },
    { number: "04", title: "Remediation Plan", body: "A plan for every gap that cannot be fixed with a policy alone." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "A complete set of data protection policies tailored to your gap assessment — plus a remediation plan for anything that can't be fixed with a policy alone.",
    deliverable: "Full data protection policy suite and remediation plan",
    turnaround: "96 hours",
  },
  bodyBlocks: [
    {
      heading: "What the policy suite covers",
      body: "Privacy policy, data retention policy, breach response procedure, staff data-handling guidelines, and whatever else your specific gaps require.",
    },
    {
      heading: "Why this stage matters most for due diligence",
      body: "If you're a regulated business or university fielding due-diligence questions, this is usually the deliverable that gets requested first; a documented, dated policy suite is what an investor, auditor, or governing council actually wants to see.",
    },
    {
      heading: "Where this fits",
      body: "This step precedes DPO appointment and staff training — see the full sequence in How We Work, Step 6.",
      links: [
        { label: "Explore Outsourced DPO", href: "/services/outsourced-dpo" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Universities fielding governance questions", href: "/sectors/tertiary-institutions" },
    { label: "Regulated businesses facing due diligence", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Ready to turn every identified gap into a clear action?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Talk to us", href: "/contact" },
    backgroundImage: "/hero-hologram.jpg",
    cutoutImage: "/services-hero-cutout.png",
  },
};
