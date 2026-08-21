/**
 * Source: Content/04-Page-Copy/services-index.md — subhead rewritten
 * client-facing 2026-08-20 (same fix, same reasoning, as the sector page's
 * turnaround intro: the approved copy read "No pricing published... the
 * certainty a commercially-minded buyer needs" — internal positioning
 * reasoning, not client-facing language). Copy doc updated to match.
 */

export const servicesIndexHero = {
  eyebrow: "Compliance Services",
  h1: "Compliance services",
  subhead:
    "Every service ships with a stated deliverable and a confirmed turnaround, so you always know exactly what to expect.",
  primaryCta: { label: "Find your category", href: "/am-i-covered" },
};

export const servicesIndexProblem = {
  eyebrow: "The Problem",
  h2: "Most organisations don't know they're already exposed.",
  description:
    "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year — and most organisations don't find out they're exposed until it's already too late to fix quietly.",
  cards: [
    {
      title: "Named publicly",
      desc: "In a regulatory sweep, unprepared, in front of a governing council, the market, or international stakeholders.",
      icon: "alert-circle" as const,
    },
    {
      title: "No data map",
      desc: "Not knowing where student, staff, or customer records actually live, who has access, or who holds copies.",
      icon: "grid" as const,
    },
    {
      title: "Contracts questioned",
      desc: "A governing council, investor, or enterprise customer pushes back on what was signed with open-ended exposure.",
      icon: "shield-alert" as const,
    },
  ],
};

export const servicesIndexDirectory = {
  eyebrow: "Service Journey",
  h2: "Eight compliance services. One licensed DPCO partner.",
  subhead:
    "Every service comes with a stated deliverable and a confirmed turnaround, structured to take your organisation from exposure to full statutory standing.",
  groups: [
    {
      number: "01",
      label: "Start Now · Foundation",
      slugs: ["ndpc-registration", "data-mapping-ropa", "gap-assessment-dpia"],
    },
    {
      number: "02",
      label: "Governance · Train & Embed",
      slugs: ["policies-remediation", "outsourced-dpo"],
    },
    {
      number: "03",
      label: "Audit & Ongoing",
      slugs: ["compliance-audit-filing", "ongoing-monitoring", "breach-response"],
    },
  ],
};

export const servicesIndexAudience = {
  eyebrow: "Who We Serve",
  h2: "Solutions Across Every Sector",
  subhead:
    "Whether designated by statutory category or transaction volume, Thanelinc provides tailored compliance frameworks for Nigeria's highest-exposure sectors.",
  cards: [
    {
      title: "Higher Institutions (EHL)",
      body: "Universities and tertiary institutions — EHL by name, not by size.",
      href: "/sectors/tertiary-institutions",
      cta: "Explore tertiary institutions",
      icon: "graduation-cap" as const,
    },
    {
      title: "Regulated Businesses (UHL)",
      body: "Fintech, telecoms, insurance, retail, health, and logistics businesses.",
      href: "/sectors/regulated-businesses",
      cta: "Explore regulated businesses",
      icon: "building" as const,
    },
  ],
  selfCheck: {
    eyebrow: "Not sure which applies to you?",
    title: "Am I Covered?",
    body: "Confirm your exact category and deadline in under two minutes — no commitment.",
    href: "/am-i-covered",
    cta: "Run the check",
  },
};

export interface ServiceRow {
  slug: string;
  category: string;
  name: string;
  summary: string;
  bullets: string[];
  deliverable: string;
  turnaround: string;
  icon: "seal" | "map" | "search" | "document" | "shield" | "folder" | "refresh" | "alert";
  shade: string;
}

export const services: ServiceRow[] = [
  {
    slug: "ndpc-registration",
    category: "REGISTRATION",
    name: "NDPC Registration",
    summary: "Whether you're registering for the first time or need your annual Compliance Audit Returns filed through a licensed DPCO, this is the step that puts you on record with the NDPC.",
    bullets: [
      "Confirm your category — named by type, or by data-subject volume",
      "Prepare the registration or CAR filing using existing data-mapping work",
      "Submit through the NDPC platform for official certificate issuance",
    ],
    deliverable: "Certificate of Registration",
    turnaround: "3 working days",
    icon: "seal",
    shade: "#1D4B50",
  },
  {
    slug: "data-mapping-ropa",
    category: "DATA MAPPING",
    name: "Data Mapping & ROPA",
    summary: "You can't assess a risk you haven't mapped. This is the inventory everything else is built on — delivered within 24 hours.",
    bullets: [
      "Structured intake covering every system and department that touches personal data",
      "Mapping data flows — collection, storage, sharing, cross-border transfer, third-party processing",
      "Delivery of the ROPA, ready to support your gap assessment and NDPC filing",
    ],
    deliverable: "Record of Processing Activities",
    turnaround: "24 hours",
    icon: "map",
    shade: "#153C40",
  },
  {
    slug: "gap-assessment-dpia",
    category: "RISK ASSESSMENT",
    name: "Gap Assessment & DPIA",
    summary: "Two deliverables, two clear timelines: a Gap Assessment Report within 24 hours, and where new or high-risk processing is involved, a Data Protection Impact Assessment (DPIA) within 72 hours.",
    bullets: [
      "Structured comparison of your current data-handling practices against NDPA requirements",
      "Gap Assessment Report naming exactly where you fall short, ranked by risk, in 24 hours",
      "DPIA documenting sensitive-data and high-risk processing before launch in 72 hours",
    ],
    deliverable: "Gap report + DPIA",
    turnaround: "24 hrs / 72 hrs",
    icon: "search",
    shade: "#0E2325",
  },
  {
    slug: "policies-remediation",
    category: "GOVERNANCE & POLICY",
    name: "Policies & Remediation",
    summary: "Every gap the assessment found gets closed — a full policy suite, delivered within 96 hours.",
    bullets: [
      "Complete set of data protection policies tailored directly to your gap assessment",
      "Privacy policy, retention schedule, breach response procedure, and staff guidelines",
      "Remediation plan for items that cannot be solved by policy alone",
    ],
    deliverable: "Full policy suite",
    turnaround: "96 hours",
    icon: "document",
    shade: "#7C918F",
  },
  {
    slug: "outsourced-dpo",
    category: "OVERSIGHT",
    name: "Outsourced DPO",
    summary: "Most organisations at this stage don't need a full-time Data Protection Officer — they need the role covered, credibly, without adding headcount.",
    bullets: [
      "Thanelinc itself formally appointed as your organisation's DPO of record",
      "Direct point of contact for the NDPC and internal compliance status reporting",
      "Oversight of ongoing data protection obligations and incident escalation",
    ],
    deliverable: "Thanelinc appointed as DPO of record",
    turnaround: "Confirmed at scoping",
    icon: "shield",
    shade: "#1D4B50",
  },
  {
    slug: "compliance-audit-filing",
    category: "ANNUAL FILING",
    name: "Compliance Audit & Filing",
    summary: "If you're UHL or EHL, the NDPC requires your annual Compliance Audit Returns to be filed through a licensed DPCO. Thanelinc holds that licence.",
    bullets: [
      "Your CAR filed through the NDPC's automated platform ahead of your deadline",
      "Filed ahead of 31 March annually, or within 15 months of establishment for newer entities",
      "Protection against statutory late CAR filing administrative penalties",
    ],
    deliverable: "CAR filed via licensed DPCO",
    turnaround: "Ahead of 31 March deadline",
    icon: "folder",
    shade: "#153C40",
  },
  {
    slug: "ongoing-monitoring",
    category: "ONGOING REVIEWS",
    name: "Ongoing Monitoring",
    summary: "A gap assessment and policy suite are a snapshot. Your organisation, your vendors, and the regulation itself keep moving — ongoing monitoring keeps your compliance current instead of aging out.",
    bullets: [
      "Quarterly review of data protection practices and new processing activities",
      "Vendor and third-party risk verification to prevent new exposure",
      "Documentation preparation and readiness in the quarter ahead of annual CAR filing",
    ],
    deliverable: "Quarterly compliance review",
    turnaround: "Every quarter",
    icon: "refresh",
    shade: "#0E2325",
  },
  {
    slug: "breach-response",
    category: "INCIDENT RESPONSE",
    name: "Breach Response",
    summary: "Think you've had a data breach? Call now on 0913 016 2558. Same-day response.",
    bullets: [
      "Same-day assessment on 0913 016 2558 to evaluate incident severity",
      "Expert assistance in meeting statutory NDPC breach notification obligations",
      "Containment support and guidance on communicating with affected individuals",
    ],
    deliverable: "Same-day response",
    turnaround: "Same day, on 0913 016 2558",
    icon: "alert",
    shade: "#7C918F",
  },
];

/**
 * The 4 sector cards themselves are no longer sourced from here — the
 * archive page reuses `components/v5/SectorAccordion.tsx`'s cards verbatim
 * (same copy, images, W-026) instead of this page's own invented sector
 * descriptions, which included content that was never approved. Only the
 * section heading survives from the original build.
 */
export const servicesIndexIndustry = {
  eyebrow: "Industry",
  h2: "Solutions Across Every Sector",
  subhead:
    "Whether designated by statutory category or transaction volume, Thanelinc provides tailored compliance frameworks for Nigeria's highest-exposure sectors.",
};

export const servicesIndexClosing = {
  heading: "Not sure where to start?",
  body: "Find out your category first — six questions, two minutes, no commitment.",
  primary: { label: "Find out your category", href: "/am-i-covered" },
};
