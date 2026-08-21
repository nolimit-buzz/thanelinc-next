import type { SectorPage } from "@/lib/content/types";

/**
 * Source: Content/04-Page-Copy/sectors-regulated-businesses.md (handover workspace).
 * No v5 markup exists for this page — v5 only built the homepage and the
 * tertiary-institutions drawer. Copy below is verbatim from the approved file;
 * do not reword (same discipline as a v5 port, just from a different source).
 */
export const sectorsRegulatedBusinessesContent: SectorPage = {
  contentType: "sector-page",
  slug: "sectors/regulated-businesses",
  title: "NDPA Compliance for Regulated Businesses",
  summary:
    "Fintech, telecoms, insurance, retail, health, and logistics companies — find out your NDPC category, your exposure, and how fast this can be done.",
  audience: ["regulated-business"],
  sector: "fintech",
  featuredServices: [
    "/services/outsourced-dpo",
    "/services/compliance-audit-filing",
    "/services/gap-assessment-dpia",
    "/services/ndpc-registration",
  ],
  proofItems: [
    {
      clientName: "Levitate",
      disclosureStatus: "cleared",
      sector: "fintech",
      servicesDelivered: ["Full NDPA engagement — letter of engagement through delivery"],
      engagementStatus: "delivered",
    },
  ],
  regulatoryDriver: [
    { claimId: "C-012", instrument: "NDPA 2023 s.49" },
    { claimId: "C-014", instrument: "GAID 2025 Art.10(14)" },
    { claimId: "C-014", instrument: "GAID 2025 Art.10(7)" },
  ],
  owner: "Unassigned — see Q-009",
  lastReviewed: "2026-08-15",
  nextReviewDue: "2027-02-15",
};

export const hero = {
  h1: "Are you actually in scope — or is this for bigger companies?",
  subhead:
    "Fintech, telecoms, insurance, retail, health, and logistics businesses are named UHL categories under the NDPC's own schedule. Most companies asking this question already are. Find out in two minutes, no commitment.",
  primaryCta: { label: "Check if you're in scope", href: "/am-i-covered" },
  secondaryCta: { label: "Talk to us", href: "/contact" },
};

export const credentialBlock = {
  body: "Thanelinc is licensed by the NDPC as a Data Protection Compliance Organization (DPCO) — the licence category the NDPC requires UHL organisations to file through. Not a consultancy offering an opinion: the firm that files on your behalf.",
  cta: { label: "View the credential", href: "/about/credentials" },
};

export const turnaroundsIntro =
  "Every stage below comes with a stated deliverable and a confirmed turnaround, so you know exactly what to expect and when.";

export const turnarounds = [
  { step: "Scoping", deliverable: "Agreed scope of work", turnaround: "48 hours" },
  { step: "NDPC registration", deliverable: "Certificate of registration", turnaround: "3 working days" },
  { step: "Data mapping", deliverable: "Data Map & ROPA", turnaround: "24 hours" },
  { step: "Gap assessment", deliverable: "Gap Assessment Report", turnaround: "24 hours" },
  { step: "DPIA", deliverable: "DPIA Report", turnaround: "72 hours" },
  { step: "Remediation", deliverable: "Full policy suite", turnaround: "96 hours" },
];

export const reasons = [
  {
    title: "Penalty exposure",
    body: "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year.",
  },
  {
    title: "Due diligence",
    body: "An investor, acquirer, or enterprise customer has asked for NDPA evidence — and “we're working on it” is not an answer that survives a data room.",
  },
  {
    title: "Contractual demand",
    body: "A partner or enterprise contract now carries NDPA warranties you need to be able to stand behind.",
  },
  {
    title: "A breach, or a near-miss",
    body: "If this is you right now, go straight to breach response — this page is for everyone else.",
    cta: { label: "Go to breach response", href: "/services/breach-response" },
  },
];

export const categorySection = {
  heading: "Are you UHL by category or by volume?",
  body: "Banks, mortgage banks, telecoms, fintech and payments companies, insurers, and oil & gas companies are named UHL categories outright under GAID Schedule 3 — the classification applies regardless of how many customer records you hold. Other companies reach UHL by volume: over 5,000 people's data handled in a rolling six months.\n\nEither way, UHL carries the same obligation: annual Compliance Audit Returns filed through an NDPC-licensed DPCO, due 31 March each year (or within 15 months of establishment, for newer entities).",
  cta: { label: "Get your exact category", href: "/am-i-covered" },
};

export const dpoSection = {
  heading: "We need a DPO but can't justify a hire",
  body: "Most companies at this stage don't need a full-time Data Protection Officer — they need the role covered, credibly, without adding headcount. Thanelinc's outsourced DPO service places a qualified DPO of record against your organisation, handling reporting, oversight, and NDPC liaison.",
  cta: { label: "See the outsourced DPO service", href: "/services/outsourced-dpo" },
};

export const filingSection = {
  heading: "Can you file with the NDPC for us, or do we do that ourselves?",
  body: "We file. Thanelinc's DPCO licence exists precisely so a UHL or EHL organisation doesn't have to navigate NDPC filing alone or through an unlicensed intermediary. This is the difference between hiring a consultant who hands you a document, and hiring the firm that can submit on your behalf.",
};

export const proof = {
  clientName: "Levitate",
  body: "a full NDPA engagement, from letter of engagement through to the compliance work itself.",
  cta: { label: "Read how we work", href: "/how-we-work" },
};

export const closingCta = {
  h2: "How long would this take for a company like yours?",
  primary: { label: "Run the self-check", detail: "category, obligation, and deadline in under two minutes", href: "/am-i-covered" },
  secondary: { label: "Book a consultation", detail: "most first conversations run 20–30 minutes", href: "/contact" },
};
