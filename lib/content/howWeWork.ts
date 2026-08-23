import type { Audience, RegulationReference } from "@/lib/content/types";
import type { SectionNavItem } from "@/components/sectors/SectionNav";

export interface JourneyStageRow {
  step: string;
  label: string;
  href?: string;
  deliverable: string;
  turnaround: string;
  claimIds?: string[];
}

export interface HowWeWorkPageContent {
  title: string;
  summary: string;
  audience: Audience[];
  regulationReferences: RegulationReference[];
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent?: string;
    summary: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  stages: Array<{
    number: string;
    label: string;
    title: string;
    introduction: string;
    rows: JourneyStageRow[];
  }>;
  involvement: { heading: string; body: string };
  breachAside: { heading: string; body: string; href: string; ctaLabel: string };
  closingCta: { heading: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
  sectionNav: SectionNavItem[];
}

export const howWeWorkContent: HowWeWorkPageContent = {
  title: "How We Work — The 6-Stage Compliance Journey",
  summary: "Every stage from first engagement to ongoing monitoring, with stated deliverables and turnarounds where confirmed.",
  audience: ["tertiary-institution", "regulated-business", "compliance-owner"],
  regulationReferences: [
    { claimId: "C-014", instrument: "GAID 2025 Art.10(7)" },
    { claimId: "C-022", instrument: "GAID 2025 Art.10(14)" },
  ],
  hero: {
    eyebrow: "The Compliance Journey",
    h1: "How we work, from first engagement",
    h1Accent: "to ongoing monitoring.",
    summary: "Six stages, from first engagement to ongoing monitoring. Whether you're checking what you're committing to, confirming how fast this moves, or simply trying to understand what NDPA compliance actually involves — this is the full sequence, as we run it.",
    primaryCta: { label: "Check your category", href: "/am-i-covered" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
  },
  stages: [
    {
      number: "01",
      label: "Start Now",
      title: "Engage, Register & Assess",
      introduction: "Confirm the engagement, validate classification and support registration.",
      rows: [
        { step: "1", label: "Scoping & intake", deliverable: "Agreed scope of work", turnaround: "48 hours", claimIds: ["C-024"] },
        { step: "2", label: "NDPC registration", href: "/services/ndpc-registration", deliverable: "Certificate of Registration", turnaround: "3 working days", claimIds: ["C-025"] },
      ],
    },
    {
      number: "02",
      label: "Foundation",
      title: "Discover",
      introduction: "Map processing, build the ROPA, assess gaps and complete the Data Protection Impact Assessment (DPIA).",
      rows: [
        { step: "3", label: "Data mapping & ROPA", href: "/services/data-mapping-ropa", deliverable: "Record of Processing Activities", turnaround: "24 hours", claimIds: ["C-026"] },
        { step: "4–5", label: "Gap assessment & DPIA", href: "/services/gap-assessment-dpia", deliverable: "Gap Report + DPIA Report", turnaround: "24 hrs / 72 hrs", claimIds: ["C-027", "C-028"] },
      ],
    },
    {
      number: "03",
      label: "Governance",
      title: "Build & Remediate",
      introduction: "Deliver the governance suite, vendor controls and an owned remediation plan.",
      rows: [
        { step: "6", label: "Policies & remediation", href: "/services/policies-remediation", deliverable: "Full policy suite", turnaround: "96 hours", claimIds: ["C-029"] },
      ],
    },
    {
      number: "04",
      label: "Train & Embed",
      title: "Activate Your People",
      introduction: "Equip leadership, the DPO, privacy champions and the wider workforce.",
      rows: [
        { step: "7", label: "DPO appointment", href: "/services/outsourced-dpo", deliverable: "Thanelinc appointed as DPO of record", turnaround: "Confirmed at scoping — timing figure still open" },
        { step: "8", label: "Staff training", deliverable: "Training delivered to your team", turnaround: "Scheduled at engagement" },
      ],
    },
    {
      number: "05",
      label: "Audit & Demonstrate",
      title: "Evidence Compliance",
      introduction: "Review implementation, close evidence gaps and prepare/support the required filing.",
      rows: [
        { step: "9", label: "Compliance audit & filing", href: "/services/compliance-audit-filing", deliverable: "CAR filed via licensed DPCO", turnaround: "Ahead of 31 March deadline", claimIds: ["C-014", "C-022"] },
      ],
    },
    {
      number: "06",
      label: "Ongoing Compliance",
      title: "Sustain & Improve",
      introduction: "Operate the outsourced DPO service, monitoring and annual readiness rhythm.",
      rows: [
        { step: "10", label: "Ongoing monitoring", href: "/services/ongoing-monitoring", deliverable: "Quarterly compliance review", turnaround: "Every quarter", claimIds: ["C-034"] },
      ],
    },
  ],
  involvement: {
    heading: "What we need from you",
    body: "Access to the systems and people who hold personal data — IT, HR, admissions or customer records, and whoever currently owns data protection internally, even informally. Most of the early steps (1–6) move on our side once intake is complete; what slows things down is usually access, not the work itself.",
  },
  breachAside: {
    heading: "If something goes wrong mid-process",
    body: "Breach response sits outside this sequence. If an incident occurs during or after the engagement, Thanelinc provides same-day response.",
    href: "/services/breach-response",
    ctaLabel: "Go to breach response",
  },
  closingCta: {
    heading: "Ready to see which obligations apply to your organisation?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "six-stages", label: "Six Stages" },
    { id: "what-we-need", label: "What We Need" },
    { id: "breach-response", label: "Breach Response" },
    { id: "get-started", label: "Get Started" },
  ],
};
