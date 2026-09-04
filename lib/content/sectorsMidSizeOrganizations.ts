import type { SectorPage } from "@/lib/content/types";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";

/**
 * Capability-led. No cleared client for this sector, so `proofItems` stays
 * empty and the page ships without a proof band — never add a name that is not
 * already cleared (AGENTS.md rule 2).
 *
 * UNREGISTERED CLAIMS — both need a claims register ID before sign-off:
 *   1. "Microfinance banks and mortgage banks are named EHL categories"
 *      (GAID 2025 Sch.7 ¶3(c)) — no ID issued; C-007 covers the MDA naming
 *      only.
 *   2. The 1,000-data-subject / rolling-six-month EHL volume threshold — no ID
 *      issued.
 * `regulatoryDriver` below therefore cites only the claims that already exist
 * and genuinely apply. Do not invent an ID to fill the gap.
 */
export const sectorsMidSizeOrganizationsContent: SectorPage = {
  contentType: "sector-page",
  slug: "sectors/mid-size-organizations",
  title: "NDPA Compliance for Mid-Size Organizations & Financial Institutions",
  summary:
    "Microfinance banks, mortgage banks, and growing organisations crossing the EHL data threshold - find out your NDPC category and filing route.",
  audience: ["mid-size-organisation", "compliance-owner"],
  sector: "financial-services",
  featuredServices: [
    "/services/ndpc-registration",
    "/services/data-mapping-ropa",
    "/services/gap-assessment-dpia",
    "/services/compliance-audit-filing",
  ],
  proofItems: [],
  regulatoryDriver: [
    { claimId: "C-012", instrument: "NDPA 2023 s.49" },
    { claimId: "C-014", instrument: "GAID 2025 Art.10(14)" },
    { claimId: "C-022", instrument: "GAID 2025 Art.10(7)" },
  ],
  owner: "Unassigned — see Q-009",
  lastReviewed: "2026-09-04",
  nextReviewDue: "2027-03-04",
};

export const midSizeOrganizationsPage: SectorPageContent = {
  badge: "MID-SIZE ORGANIZATIONS & FINANCIAL INSTITUTIONS — GAID 2025 SCH.7 ¶3(C)",
  guidedLabels: {
    credential: "Licensed DPCO",
    sequence: "What happens next",
    questions: "Questions, answered",
    reasonsFallback: "Why this matters",
  },
  hero: {
    h1: "You don't have to be a bank to be EHL.",
    subhead:
      "Microfinance banks and mortgage banks are named EHL categories outright. Other organisations, of any kind, reach EHL once processing crosses 1,000 data subjects in six months. Find out where you stand in two minutes, no commitment.",
    primaryCta: { label: "Check your category", href: "/am-i-covered" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },
  credentialBlock: {
    body: "Thanelinc is licensed by the NDPC as a Data Protection Compliance Organization. For EHL and UHL organisations, annual Compliance Audit Returns are filed through a DPCO licensed by the Commission, except as otherwise approved by the Commission.",
    cta: { label: "Verify on NDPC", href: "/about/credentials" },
    backgroundImage: "/hero-hologram.jpg",
  },
  reasonsId: "why-it-matters",
  reasonsHeading: { lead: "Why organisations land", accent: "on this page" },
  reasons: [
    {
      title: "Two routes, one obligation",
      body: "Microfinance and mortgage banks are EHL by name, the classification applies regardless of size. Other organisations reach the same tier by data volume alone, often without realising it.",
      cta: { label: "Check your category", href: "/am-i-covered" },
    },
    {
      title: "Penalty exposure",
      body: "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year.",
    },
    {
      title: "Growth outpaced compliance",
      body: "Many organisations cross the 1,000-data-subject threshold quietly while scaling. The obligation exists whether or not it was noticed at the time.",
    },
    {
      title: "A breach, or a near-miss",
      body: "If this is you right now, go straight to breach response. This page is for everyone else.",
      cta: { label: "Go to breach response", href: "/services/breach-response" },
    },
  ],
  turnarounds: {
    intro:
      "Every stage below comes with a stated deliverable and a confirmed turnaround, so you know exactly what to expect and when.",
    steps: [
      { step: "Scoping", deliverable: "Agreed scope of work", turnaround: "48 hours" },
      { step: "NDPC registration", deliverable: "Certificate of registration", turnaround: "3 working days" },
      { step: "Data mapping", deliverable: "Data Map & ROPA", turnaround: "24 hours" },
      { step: "Gap assessment", deliverable: "Gap Assessment Report", turnaround: "24 hours" },
      { step: "DPIA", deliverable: "DPIA Report", turnaround: "72 hours" },
      { step: "Remediation", deliverable: "Full policy suite", turnaround: "96 hours" },
    ],
  },
  accordion: [
    {
      number: "01",
      heading: "Are you EHL by name or by volume?",
      body: "Microfinance banks and mortgage banks are named EHL categories outright under GAID Schedule 7, the classification applies regardless of how many customer records you hold. Other organisations reach EHL by volume: over 1,000 people's data is handled in a rolling six-month period.\n\nEither way, EHL carries the same obligation: annual Compliance Audit Returns filed through an NDPC-licensed DPCO, due 31 March each year (or within 15 months of establishment, for newer entities).",
      cta: { label: "Get your exact category", href: "/am-i-covered" },
    },
    {
      number: "02",
      heading: "We're growing fast: how do we know if we've crossed the threshold?",
      body: "Most organisations don't track data-subject counts until it matters. The 1,000-person threshold is measured on a rolling six-month basis, not a fixed annual count, so it's easy to cross without noticing. The self-check tool below gives you a fast answer; a proper data-mapping exercise gives you a defensible one.",
      cta: { label: "Run the self-check", href: "/am-i-covered" },
    },
    {
      number: "03",
      heading: "Can you file with the NDPC for us, or do we do that ourselves?",
      body: "We file. Thanelinc's DPCO licence exists precisely so an EHL organisation doesn't have to navigate NDPC filing alone or through an unlicensed intermediary.",
    },
    {
      number: "04",
      heading: "What if we're not sure whether we're EHL or UHL?",
      body: "That's exactly what the self-check exists to resolve, most organisations asking this question are closer to an answer than they think. If you're right at the boundary, the exact figure (1,000 vs. 5,000 data subjects in six months) settles it.",
      cta: { label: "Get your exact category", href: "/am-i-covered" },
    },
  ],
  closingCta: {
    headingLead: "Ready to find out exactly where",
    headingAccent: "your organisation stands?",
    eyebrow: "Mid-Size Organisations & Financial Institutions",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
    cutoutImage: "/services-hero-cutout.png",
  },
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "why-it-matters", label: "Why It Matters" },
    { id: "timeline", label: "Timeline" },
    { id: "questions", label: "Common Questions" },
    { id: "get-started", label: "Get Started" },
  ],
};
