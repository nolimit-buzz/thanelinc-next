import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/**
 * Source: `servicesIndex.ts`'s `data-mapping-ropa` row (summary, bullets,
 * deliverable, turnaround) — no new claim introduced. Pilot for the new
 * banner/feature-row template (`PLAN-2026-08-21-service-page-banner-template.md`),
 * built alongside — not instead of — `ndpcRegistration.ts`'s existing
 * `TwoTonedHero` pattern, which stays untouched (D4: eventual migration is a
 * separate, later plan).
 */
export const dataMappingRopaContent: ServicePageContent = {
  heroVariant: "light",
  // `hero`/`heroVariant` stay populated even though `bannerHero` renders
  // instead — required by the ServicePageContent contract so this file works
  // unmodified if `bannerHero` is ever removed for this page.
  hero: {
    eyebrow: "Data Mapping",
    h1: "Data Mapping & ROPA",
    subhead:
      "You can't assess a risk you haven't mapped. This is the inventory everything else is built on — delivered within 24 hours.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Data Mapping",
    h1: "Data Mapping",
    h1Accent: "& ROPA",
    bannerImage: "/services-banner-glass-architecture.jpg",
    bannerAlt: "Modern glass office building",
  },
  features: [
    {
      number: "01",
      title: "Structured Intake",
      body: "Structured intake covers every system and department that touches personal data.",
    },
    {
      number: "02",
      title: "Data Flow Tracing",
      body: "Collection, storage, sharing, cross-border transfer and third-party processing are mapped.",
    },
    {
      number: "03",
      title: "ROPA Compilation",
      body: "The findings are compiled into a Record of Processing Activities.",
    },
    {
      number: "04",
      title: "Ready to Move",
      body: "The ROPA is ready to support your gap assessment and NDPC filing.",
    },
  ],
  whatYouGet: {
    label: "What you get",
    body: "A complete Record of Processing Activities (ROPA) — every place personal data enters your organisation, what happens to it, who else sees it, where it's stored, and how long you keep it.",
    deliverable: "Data Map & Record of Processing Activities",
    turnaround: "24 hours",
  },
  bodyBlocks: [
    {
      heading: "What's involved",
      steps: [
        "Structured intake covering every system and department that touches personal data",
        "Mapping data flows — collection, storage, sharing, cross-border transfer, third-party processing",
        "Delivery of the ROPA, ready to support your gap assessment and NDPC filing",
      ],
    },
    {
      heading: "Where this fits",
      body: "This step feeds directly into Gap Assessment & DPIA — see the full sequence in How We Work, Step 3.",
      links: [
        { label: "Explore Gap Assessment & DPIA", href: "/services/gap-assessment-dpia" },
        { label: "See how we work", href: "/how-we-work" },
        { label: "Read the ROPA, DPIA and LIA explainer", href: "/resources/ropa-dpia-lia-explained" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Any organisation registering or filing CAR", href: "/am-i-covered" },
    { label: "Universities with data across disconnected systems", href: "/sectors/tertiary-institutions" },
  ],
  closingCta: {
    heading: "Ready to see your complete data map?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Talk to us", href: "/contact" },
    // D2 (prior plan): rotate existing assets, no new portrait — image
    // provenance is an open launch gate. Sectors' own background photo and
    // the one cutout crop not yet used by another service page.
    backgroundImage: "/hero-portrait-sectors.jpg",
    cutoutImage: "/services-hero-cutout-bust.png",
  },
};
