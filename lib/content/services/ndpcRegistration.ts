import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/**
 * Source: Content/04-Page-Copy/services/ndpc-registration.md.
 * Light hero variant (2026-08-20 design fork, paired with breach-response's dark variant).
 */
export const ndpcRegistrationContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Registration · Journey Step 2",
    h1: "NDPC Registration",
    subhead:
      "Whether you're registering for the first time or need your annual Compliance Audit Returns filed through a licensed DPCO, this is the step that puts you on record with the NDPC.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Registration",
    h1: "NDPC",
    h1Accent: "Registration",
    bannerImage: "/hero-portrait-audit.jpg",
    bannerAlt: "",
    bannerPosition: "50% 42%",
  },
  features: [
    { number: "01", title: "Confirm Your Category", body: "Confirm your category — named by type, or by data-subject volume." },
    { number: "02", title: "Prepare the Filing", body: "Prepare the registration or CAR filing, using existing data-mapping work where available." },
    { number: "03", title: "Submit to the NDPC", body: "Submit the registration or CAR filing through the NDPC's platform." },
    { number: "04", title: "Receive the Certificate", body: "The NDPC Certificate of Registration is issued and delivered to you." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "Your NDPC Certificate of Registration, delivered within 3 working days of scoping. If you're UHL or EHL, this includes filing your Compliance Audit Returns through Thanelinc's DPCO licence — a legal requirement for those categories, not an optional add-on.",
    deliverable: "NDPC Certificate of Registration",
    turnaround: "3 working days",
  },
  bodyBlocks: [
    {
      heading: "What's involved",
      steps: [
        "Confirm your category — named by type, or by data-subject volume",
        "Prepare the registration or CAR filing, using your existing data-mapping work where available",
        "Submit through the NDPC's platform",
        "Certificate issued and delivered to you",
      ],
    },
    {
      heading: "Where this fits",
      body: "If you haven't yet mapped your data or completed a gap assessment, this step usually runs alongside Data Mapping & ROPA — see the full sequence in How We Work, Step 2.",
      links: [
        { label: "Explore Data Mapping & ROPA", href: "/services/data-mapping-ropa" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Universities and tertiary institutions — EHL by name", href: "/sectors/tertiary-institutions" },
    { label: "Regulated businesses — UHL by category or volume", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Ready to get on record with the NDPC?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Talk to us", href: "/contact" },
    // D2: rotated from the three cut-outs already in the repo. No new portrait
    // is introduced here — image provenance is an open launch gate.
    backgroundImage: "/hero-portrait-audit.jpg",
    cutoutImage: "/services-hero-cutout.png",
  },
};
