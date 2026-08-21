import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/** Source: Content/04-Page-Copy/services/ongoing-monitoring.md. */
export const ongoingMonitoringContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Ongoing Reviews",
    h1: "Ongoing Monitoring",
    subhead: "A gap assessment and policy suite are a snapshot. Your organisation, your vendors, and the regulation itself keep moving — ongoing monitoring keeps your compliance current instead of aging out.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Ongoing Reviews",
    h1: "Ongoing",
    h1Accent: "Monitoring",
    bannerImage: "/hero-hologram.jpg",
    bannerAlt: "",
    bannerPosition: "50% 46%",
  },
  features: [
    { number: "01", title: "Review New Processing", body: "New processing activities are reviewed against your existing ROPA." },
    { number: "02", title: "Check Third Parties", body: "Vendor and third-party processing is checked for newly introduced risk." },
    { number: "03", title: "Keep Policies Current", body: "Policies are kept current as your organisation or the NDPC's guidance changes." },
    { number: "04", title: "Prepare for Filing", body: "The quarter ahead of 31 March focuses on documentation for that year's CAR filing." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "A quarterly review of your data protection practices, updated documentation where your processing has changed, and support ahead of your annual Compliance Audit Returns deadline.",
    deliverable: "Quarterly compliance review and updated documentation",
    turnaround: "Quarterly reviews",
  },
  bodyBlocks: [
    {
      heading: "What happens each quarter",
      steps: [
        "Reviewing new processing activities against your existing ROPA",
        "Checking vendor and third-party processing hasn't introduced new risk",
        "Keeping policies current as your organisation or the NDPC's guidance changes",
        "Preparing documentation for that year's CAR filing in the quarter ahead of 31 March",
      ],
      links: [{ label: "Read Vendor Due Diligence", href: "/resources/vendor-due-diligence" }],
    },
    {
      heading: "Where this fits",
      body: "This is the final step in the engagement, following Compliance Audit & Filing — see the full sequence in How We Work, Step 10.",
      links: [
        { label: "Explore Compliance Audit & Filing", href: "/services/compliance-audit-filing" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Universities with an annual filing obligation", href: "/sectors/tertiary-institutions" },
    { label: "Regulated businesses with an annual filing obligation", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Keep your compliance current as your organisation changes.",
    primary: { label: "Talk to us", href: "/contact" },
    secondary: { label: "Run the self-check", href: "/am-i-covered" },
    backgroundImage: "/services-banner-glass-architecture.jpg",
    cutoutImage: "/services-hero-cutout.png",
  },
};
