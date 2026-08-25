import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

/** Source: Content/04-Page-Copy/services/outsourced-dpo.md. */
export const outsourcedDpoContent: ServicePageContent = {
  heroVariant: "light",
  hero: {
    eyebrow: "Oversight",
    h1: "Outsourced DPO",
    subhead: "Most organisations at this stage don't need a full-time Data Protection Officer — they need the role covered, credibly, without adding headcount.",
    primaryCta: { label: "Run the self-check", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  bannerHero: {
    eyebrow: "Oversight",
    h1: "Outsourced",
    h1Accent: "DPO",
    bannerImage: "/hero-portrait-sectors.jpg",
    bannerAlt: "",
    bannerPosition: "50% 34%",
  },
  features: [
    { number: "01", title: "DPO of Record", body: "Thanelinc itself is formally appointed as your organisation's DPO of record." },
    { number: "02", title: "NDPC Contact", body: "The same team running your engagement is your direct point of contact for the NDPC." },
    { number: "03", title: "Internal Reporting", body: "Thanelinc reports to your leadership every six months, in line with NDPC requirements; plus updates whenever something needs your attention sooner." },
    { number: "04", title: "Ongoing Oversight", body: "New obligations are tracked as they arise, and incidents are escalated the same day, feeding directly into our breach response process." },
  ],
  whatYouGet: {
    label: "What you get",
    body: "Thanelinc is formally appointed as your organisation's Data Protection Officer of record; not an individual name outsourced to you, but the licensed firm itself, accountable for the role.",
    deliverable: "DPO appointment letter, NDPC liaison and reporting",
    turnaround: "Confirmed at scoping",
  },
  bodyBlocks: [
    {
      heading: "What the role actually covers",
      steps: [
        "Point of contact for the NDPC",
        "Internal reporting on your compliance status",
        "Oversight of ongoing data protection obligations",
        "Escalation point if something goes wrong",
      ],
      links: [{ label: "Explore Breach Response", href: "/services/breach-response" }],
    },
    {
      heading: "Where this fits",
      body: "This step follows Policies & Remediation — see the full sequence in How We Work, Step 7.",
      links: [
        { label: "Explore Policies & Remediation", href: "/services/policies-remediation" },
        { label: "See how we work", href: "/how-we-work" },
      ],
    },
  ],
  whoThisIsFor: [
    { label: "Businesses that need a DPO without a full-time hire", href: "/sectors/regulated-businesses" },
    { label: "Organisations facing due-diligence or contractual demands", href: "/sectors/regulated-businesses" },
  ],
  closingCta: {
    heading: "Need the DPO role covered without adding headcount?",
    primary: { label: "Talk to us", href: "/contact" },
    secondary: { label: "Run the self-check", href: "/am-i-covered" },
    backgroundImage: "/hero-portrait-audit.jpg",
    cutoutImage: "/regulated-businesses-cutout.png",
  },
};
