import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/** Source: Content/04-Page-Copy/services/gap-assessment-dpia.md. */
export const gapAssessmentDpiaContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Risk Assessment",
    h1: "Gap Assessment & DPIA",
    subhead: "Two deliverables, two clear timelines: a Gap Assessment Report within 24 hours, and where new or high-risk processing is involved, a Data Protection Impact Assessment (DPIA) within 72 hours.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Risk Assessment",
    h1: "Gap Assessment",
    h1Accent: "& DPIA",
    bannerImage: "/hero-hologram.jpg",
    bannerAlt: "",
    bannerPosition: "50% 48%",
  },
  features: [
    { number: "01", title: "Compare Current Practice", body: "Current data-handling practices are compared against NDPA requirements." },
    { number: "02", title: "Rank Every Gap", body: "The Gap Assessment Report names exactly where you fall short, ranked by risk." },
    { number: "03", title: "Assess New Risk", body: "Sensitive-data and high-risk processing is documented before it starts, not after." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "A structured comparison of your current data-handling practices against NDPA requirements, plus a Data Protection Impact Assessment where new or high-risk processing is involved.",
    deliverable: "Gap Assessment Report and DPIA Report",
    turnaround: "24 hours / 72 hours",
  },
  bodyBlocks: [
    {
      heading: "Gap Assessment",
      body: "A structured comparison of your current data-handling practices against NDPA requirements — built on your Data Map & ROPA. The report names exactly where you fall short, ranked by risk, so remediation work is targeted rather than guessed at.",
      links: [{ label: "Explore Data Mapping & ROPA", href: "/services/data-mapping-ropa" }],
    },
    {
      heading: "DPIA — when it's needed",
      body: "If you're introducing new sensitive-data processing, deploying monitoring technology, or combining datasets in a way that raises risk, a DPIA documents that risk and how it's managed — before the processing starts, not after.",
      links: [{ label: "Read the ROPA, DPIA and LIA explainer", href: "/resources/ropa-dpia-lia-explained" }],
    },
    {
      heading: "Where this fits",
      body: "This step feeds directly into Policies & Remediation — see the full sequence in How We Work, Steps 4–5.",
      links: [
        { label: "Explore Policies & Remediation", href: "/services/policies-remediation" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Organisations past the data-mapping stage", href: "/services/data-mapping-ropa" },
    { label: "Regulated businesses introducing new products or systems", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Ready to know exactly where your gaps are?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Talk to us", href: "/contact" },
    backgroundImage: "/hero-portrait-sectors.jpg",
    cutoutImage: "/services-hero-cutout-bust.png",
  },
};
