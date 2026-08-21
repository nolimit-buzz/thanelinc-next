import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/** Source: Content/04-Page-Copy/services/compliance-audit-filing.md. */
export const complianceAuditFilingContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Annual Filing",
    h1: "Compliance Audit & Filing",
    subhead: "If you're UHL or EHL, the NDPC requires your annual Compliance Audit Returns to be filed through a licensed DPCO. Thanelinc holds that licence.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Annual Filing",
    h1: "Compliance Audit",
    h1Accent: "& Filing",
    bannerImage: "/hero-portrait-audit.jpg",
    bannerAlt: "",
    bannerPosition: "50% 40%",
  },
  features: [
    { number: "01", title: "Licensed DPCO Filing", body: "UHL and EHL Compliance Audit Returns are filed through Thanelinc's DPCO licence." },
    { number: "02", title: "Automated Platform", body: "Your CAR is filed through the NDPC's automated platform." },
    { number: "03", title: "Annual Deadline", body: "Established organisations file ahead of the 31 March annual deadline." },
    { number: "04", title: "Newer Organisations", body: "Newer entities file within 15 months of establishment, then annually." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "Your CAR filed through the NDPC's automated platform, ahead of your deadline — 31 March each year if your organisation was established before 12 June 2023, or within 15 months of establishment if newer, then annually.",
    deliverable: "Compliance Audit Returns filed through the NDPC platform",
    turnaround: "Ahead of the applicable filing deadline",
  },
  bodyBlocks: [
    {
      heading: "What happens if you miss it",
      body: "Late CAR filing attracts an administrative penalty of 50% of the stipulated filing fee, in addition to the fee itself.",
    },
    {
      heading: "What filing may produce",
      body: "The Commission may issue a Compliance Audit Returns Certificate on filing — this is not guaranteed, so we don't promise it as a deliverable, but it's a possible outcome of a clean filing.",
    },
    {
      heading: "Who must file through a DPCO",
      steps: [
        "Universities and tertiary institutions — EHL by name, filing is mandatory",
        "Regulated businesses — UHL by category or volume, filing is mandatory",
        "OHL organisations renew registration annually and do not file CAR",
      ],
      links: [
        { label: "Confirm which category applies", href: "/am-i-covered" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Universities and tertiary institutions — EHL by name", href: "/sectors/tertiary-institutions" },
    { label: "Regulated businesses — UHL by category or volume", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Know your category before the next filing deadline.",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Talk to us", href: "/contact" },
    backgroundImage: "/hero-hologram.jpg",
    cutoutImage: "/services-hero-cutout-bust.png",
  },
};
