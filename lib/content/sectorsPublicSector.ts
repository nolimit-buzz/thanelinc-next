import type { SectorPage } from "@/lib/content/types";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";

/**
 * Capability-led by design. Delta State MDA proposals are not proof and must
 * never be added here. The NBA item is disclosed accurately as professional-
 * body evidence, not as a government/MDA engagement.
 */
export const sectorsPublicSectorContent: SectorPage = {
  contentType: "sector-page",
  slug: "sectors/public-sector",
  title: "NDPA Compliance for Public Sector & MDAs",
  summary: "A verifiable compliance route for Ministries, Departments and Agencies under the NDPC's EHL category.",
  audience: ["public-sector"],
  sector: "public-sector",
  featuredServices: [
    "/services/ndpc-registration",
    "/services/data-mapping-ropa",
    "/services/compliance-audit-filing",
    "/services/ongoing-monitoring",
  ],
  proofItems: [
    {
      clientName: "Nigerian Bar Association",
      disclosureStatus: "cleared",
      sector: "professional-bodies",
      servicesDelivered: ["Registered Data Protection Organization for NBA Election 2026"],
      engagementStatus: "awarded",
    },
  ],
  regulatoryDriver: [
    { claimId: "C-007", instrument: "GAID 2025 Sch.3 ¶3(c)(i)" },
    { claimId: "C-022", instrument: "GAID 2025 Art.10(14)" },
  ],
  owner: "Unassigned — see Q-009",
  lastReviewed: "2026-08-23",
  nextReviewDue: "2027-02-23",
};

export const publicSectorPage: SectorPageContent = {
  badge: "PUBLIC SECTOR & MDAS — GAID 2025 SCH.3 ¶3(C)(I)",
  guidedLabels: {
    credential: "Licensed DPCO",
    sequence: "The engagement sequence",
    questions: "Public-sector questions, answered",
    reasonsFallback: "Why this matters",
  },
  hero: {
    h1: "A clear compliance route for public-sector teams.",
    subhead: "Government Ministries, Departments and Agencies are listed in the GAID 2025 Schedule as an EHL category. The practical question is how to evidence the work, use the right filing route, and give decision-makers something they can verify.",
    primaryCta: { label: "View our credentials", href: "/about/credentials" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
  },
  credentialBlock: {
    body: "Thanelinc is licensed by the NDPC as a Data Protection Compliance Organization. For UHL and EHL organisations, annual Compliance Audit Returns are filed through a DPCO licensed by the Commission, except as otherwise approved by the Commission.",
    cta: { label: "Inspect the licence", href: "/about/credentials" },
    backgroundImage: "/hero-portrait-sectors.jpg",
  },
  reasonsId: "ministries-agencies",
  reasonsHeading: { lead: "For Ministries", accent: "& Agencies" },
  reasons: [
    {
      title: "An EHL category by organisation type",
      body: "GAID 2025 lists MDAs of government as an EHL category. The organisation's position and filing circumstances should be confirmed at scoping, rather than assumed from a generic checklist.",
      cta: { label: "Check your category", href: "/am-i-covered" },
    },
    {
      title: "A route that procurement can verify",
      body: "The DPCO licence is available to inspect directly, so a procurement or compliance team can verify the category of firm involved before work begins.",
      cta: { label: "View the credential", href: "/about/credentials" },
    },
    {
      title: "Evidence before the annual filing",
      body: "The work begins with the data and governance evidence that supports compliance: registration, mapping, audit preparation and an ongoing review rhythm where required.",
      cta: { label: "See how we work", href: "/how-we-work" },
    },
  ],
  accordion: [
    {
      number: "01",
      heading: "Does this apply to Ministries and Agencies?",
      body: "GAID 2025 Schedule 3 lists MDAs of government as an EHL category. That is the regulatory starting point; the organisation's precise circumstances and filing position are confirmed during scoping.",
      cta: { label: "Check your category", href: "/am-i-covered" },
    },
    {
      number: "02",
      heading: "What can the engagement include?",
      body: "The route is built around the evidence and filing work a public-sector organisation needs to manage, rather than a generic advisory retainer. The relevant services can be assessed together at scoping.",
      links: [
        { label: "NDPC registration", href: "/services/ndpc-registration" },
        { label: "Data mapping & ROPA", href: "/services/data-mapping-ropa" },
        { label: "Compliance audit & filing", href: "/services/compliance-audit-filing" },
        { label: "Ongoing monitoring", href: "/services/ongoing-monitoring" },
      ],
    },
    {
      number: "03",
      heading: "Can a procurement team verify the licence?",
      body: "Yes. The DPCO licence and the separate Data Controller/Processor registration are available to view directly. They are distinct credentials and are presented separately so the verification is clear.",
      cta: { label: "Inspect the credentials", href: "/about/credentials" },
    },
    {
      number: "04",
      heading: "What public-interest proof can Thanelinc show?",
      body: "Thanelinc was appointed the registered Data Protection Organization for the Nigerian Bar Association Election 2026. This is a national professional-body engagement, not an MDA engagement.",
      cta: { label: "See how the work is structured", href: "/how-we-work" },
    },
  ],
  proof: {
    clientName: "Nigerian Bar Association — NBA Election 2026",
    body: "Thanelinc was appointed the registered Data Protection Organization for a national professional body's election. This is professional-body evidence, not an MDA engagement.",
    cta: { label: "View our credentials", href: "/about/credentials" },
  },
  closingCta: {
    headingLead: "Need a compliance route your team can",
    headingAccent: "verify and carry forward?",
    eyebrow: "Public Sector & MDAs",
    primary: { label: "View credentials", href: "/about/credentials" },
    secondary: { label: "Get in touch", href: "/contact" },
    cutoutImage: "/services-hero-cutout.png",
  },
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "ministries-agencies", label: "Ministries & Agencies" },
    { id: "questions", label: "Common Questions" },
    { id: "get-started", label: "Get Started" },
  ],
};
