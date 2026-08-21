import type { SectorPage } from "@/lib/content/types";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";

/**
 * Source: Content/04-Page-Copy/sectors-tertiary-institutions.md (handover
 * workspace). Copy is verbatim from the approved file — do not reword.
 *
 * Three things in that document are deliberately NOT published here, because
 * they are notes to the delivery team rather than page copy:
 *   - the R5 proof-block exception note (Madonna University, uncleared — Q-011)
 *   - the claims-register citation under the engagement steps
 *   - the "(Proof block — reserved…)" parenthetical in Section 5
 * Internal-sounding copy leaking onto a client-facing page has happened once
 * on /sectors/regulated-businesses already; this file is where it gets caught.
 *
 * `proof` is absent by design (R5 exception). The template omits the block
 * entirely rather than rendering an empty shell, so a cleared Madonna item can
 * drop in later without a rewrite.
 */
export const sectorsTertiaryInstitutionsContent: SectorPage = {
  contentType: "sector-page",
  slug: "sectors/tertiary-institutions",
  title: "NDPA Compliance for Universities & Tertiary Institutions",
  summary:
    "Every higher institution is an EHL organisation under the NDPC, by name, not by size. Here's what that means and how Thanelinc handles it.",
  audience: ["tertiary-institution"],
  sector: "education",
  featuredServices: [
    "/services/ndpc-registration",
    "/services/data-mapping-ropa",
    "/services/compliance-audit-filing",
    "/services/outsourced-dpo",
  ],
  proofItems: [],
  regulatoryDriver: [
    { claimId: "C-012", instrument: "NDPA 2023 s.49" },
    { claimId: "C-014", instrument: "GAID 2025 Art.10(14)" },
    { claimId: "C-014", instrument: "GAID 2025 Art.10(7)" },
  ],
  owner: "Unassigned — see Q-009",
  lastReviewed: "2026-08-15",
  nextReviewDue: "2027-02-15",
};

export const tertiaryInstitutionsPage: SectorPageContent = {
  // Traceable to the page copy's own regulatory_driver and Section 1:
  // "Section 3(c)(iii) of the GAID 2025 Schedule 3 names Higher Institutions
  // as an EHL category outright."
  badge: "EHL BY NAME — GAID 2025 SCH.3 ¶3(C)(III)",
  guidedLabels: {
    credential: "Licensed DPCO",
    sequence: "What happens next",
    questions: "Your questions, answered",
    reasonsFallback: "Why this matters",
  },
  hero: {
    h1: "Your institution is an EHL organisation. Not by size — by name.",
    subhead:
      "Under the NDPC's own schedule, every higher institution — university, polytechnic, or college — is classed Enhanced High Level, regardless of student numbers. That means an annual filing obligation, and a legal requirement to file through a licensed Data Protection Compliance Organization.",
    primaryCta: { label: "Check your exact filing deadline", href: "/am-i-covered" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
  },
  credentialBlock: {
    body: "Thanelinc is licensed by the NDPC as a Data Protection Compliance Organization (DPCO) — the licence category the NDPC requires EHL organisations to file through.",
    cta: { label: "View the credential", href: "/about/credentials" },
    backgroundImage: "/hero-portrait-sectors.jpg",
  },
  // No dedicated "why you're here" section exists in the approved copy doc for
  // this page (unlike Regulated Businesses' own doc, which has one). Client
  // direction 2026-08-20: don't just re-skin the business page's cards — write
  // for this audience. Cards 1–2 are verbatim from this page's own Section 2
  // (so the penalty paragraph and the regulatory-sweep sentence do appear
  // twice on the page — once here, once in the "What happens if we don't?"
  // accordion row — an accepted trade-off). Cards 3–4 are new: adapted from
  // the internal Dennis Osadebay University proposal deck's "Relevance" and
  // "Reframe" slides (Proposals/Dennis Osadebe University/Presentation/), with
  // two things deliberately left out of that adaptation — its 21-day
  // response-window claim (not in CLAIMS_REGISTER.md, unverified) and its
  // "NDPA s.48" penalty citation (the wrong section; AGENTS.md requires s.49,
  // which cards 1 already uses correctly). DOU itself is not named anywhere
  // below — it's a proposal-stage engagement, not an awarded one (Q-011), so
  // it isn't cleared for publication.
  reasonsHeading: { lead: "Why Universities land", accent: "on this page" },
  reasons: [
    {
      title: "Penalty exposure",
      body: "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year.",
    },
    {
      title: "A regulatory sweep already under way",
      body: "A public regulatory sweep on universities is already under way. Being named in it, unprepared, in front of a governing council, is the risk that brings most registrars to this page.",
    },
    {
      title: "Your data footprint is wider than it looks",
      body: "Admissions and biodata, academic and exam records, staff and payroll, alumni records, health and biometric data — a university holds more categories of personal data, in more systems, than most regulated businesses ever do.",
    },
    {
      title: "Trust with students, parents and accreditors",
      body: "The audience that matters here isn't an investor or an enterprise customer — it's a governing council, an accreditation body, and the families entrusting you with their children's data. That's what this protects.",
    },
  ],
  // Wider than the 780px default — row 3's StageTable needs the room; the
  // other rows' prose reads fine at this width too (2026-08-20).
  accordionMaxWidth: "980px",
  accordion: [
    {
      number: "01",
      heading: "Does this actually apply to us?",
      body: "Yes. Section 3(c)(iii) of the GAID 2025 Schedule 3 names Higher Institutions as an EHL category outright. This is not a volume threshold you might sit under — it is a category assignment by what your institution is. A 400-student college and a 40,000-student federal university are both EHL.\n\nThat means:\n• You're required to file annual Compliance Audit Returns (CAR) through an NDPC-licensed DPCO (GAID Art.10(14)). Thanelinc holds that licence.\n• If your institution was established before 12 June 2023, your CAR is due 31 March every year. If established after, it's due within 15 months of establishment, then annually.",
      cta: { label: "Confirm your exact category and deadline", href: "/am-i-covered" },
    },
    {
      number: "02",
      heading: "What happens if we don't?",
      body: "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year.\n\nMore immediately: a public regulatory sweep on universities is already under way. Being named in it, unprepared, in front of a governing council, is the risk that brings most registrars to this page.",
    },
    {
      number: "03",
      heading: "Where would we even start?",
      body: "Institutions typically arrive holding student, staff, and alumni data across a dozen disconnected systems — admissions, HR, the LMS, the library, alumni relations — with no single map of where it all sits or who can access it.\n\nThanelinc's engagement starts there:",
      // 6-stage model, client direction 2026-08-20 (superseded the earlier
      // 9-step numbered list; see changelog and DECISIONS.md W-029). Each
      // stage groups 1–3 of the original granular steps — none were dropped,
      // just re-narrated at a higher level; the underlying deliverable/
      // turnaround claims (C-024–C-034) still live on /how-we-work and on
      // each service's own page.
      stages: [
        {
          step: "01",
          category: "START NOW",
          title: "Engage, Register & Assess",
          description: "Confirm the engagement, validate classification and support registration.",
        },
        {
          step: "02",
          category: "FOUNDATION",
          title: "Discover",
          description: "Map processing, build the ROPA, assess gaps and complete the Data Protection Impact Assessment (DPIA).",
        },
        {
          step: "03",
          category: "GOVERNANCE",
          title: "Build & Remediate",
          description: "Deliver the governance suite, vendor controls and an owned remediation plan.",
        },
        {
          step: "04",
          category: "TRAIN & EMBED",
          title: "Activate Your People",
          description: "Equip leadership, the DPO, privacy champions and the wider workforce.",
        },
        {
          step: "05",
          category: "AUDIT & DEMONSTRATE",
          title: "Evidence Compliance",
          description: "Review implementation, close evidence gaps and prepare/support the required filing.",
        },
        {
          step: "06",
          category: "ONGOING COMPLIANCE",
          title: "Sustain & Improve",
          description: "Operate the outsourced DPO service, monitoring and annual readiness rhythm.",
        },
      ],
      cta: { label: "See the full 6-stage process", href: "/how-we-work" },
    },
    {
      number: "04",
      heading: "Can this fit around our academic calendar?",
      body: "Engagements are scoped around your term structure — admissions cycles, examination periods, and ICT capacity are accounted for at intake, not discovered mid-project. This is confirmed at the scoping call, not promised generically here.",
    },
    {
      number: "05",
      heading: "Will this survive procurement and council scrutiny?",
      body: "Thanelinc is a licensed DPCO — not a consultancy offering an opinion, but the category of firm the NDPC requires EHL organisations to use. The certificate is viewable, not just described.\n\nRequest the Thanelinc company profile — a procurement-ready document you can circulate to your committee.",
      cta: { label: "View the credential", href: "/about/credentials" },
    },
  ],
  closingCta: {
    headingLead: "Ready to find out exactly where",
    headingAccent: "your institution stands?",
    eyebrow: "Tertiary Institutions",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
    cutoutImage: "/services-hero-cutout.png",
  },
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "why-it-matters", label: "Why It Matters" },
    { id: "questions", label: "Common Questions" },
    { id: "get-started", label: "Get Started" },
  ],
};
