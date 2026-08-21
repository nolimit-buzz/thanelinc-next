/**
 * Thanelinc content model — the contract between this frontend and the CMS.
 *
 * Derived from the Content Re-Anchoring Model (§2 taxonomy, §3 content types)
 * held in the handover workspace. That document is already a CMS specification;
 * this file is its executable form.
 *
 * WHY THIS FILE MATTERS
 * Strapi is connected later, by the client's own team (W-025). Components take
 * these types as props and know nothing about where content comes from. Swapping
 * local modules for the Strapi API therefore changes only the data-fetch layer.
 * These types are the schema contract for whoever builds that Strapi model.
 *
 * Two rules below are enforcement, not documentation. They exist because both
 * have already been breached once:
 *   - `deliverable` and `turnaround` are REQUIRED on every service (W-005).
 *     They are the compensating certainty for publishing no pricing.
 *   - `disclosureStatus` must BLOCK publication at "pending-clearance" (W-008).
 */

// ---------------------------------------------------------------------------
// Taxonomy
// ---------------------------------------------------------------------------

export type Audience =
  | "tertiary-institution"
  | "regulated-business"
  | "compliance-owner"
  | "public-sector";

/**
 * Maps 1:1 onto Thanelinc's 6-stage client journey (2026-08-20, DECISIONS.md
 * W-029 — supersedes the earlier 9-step granular set below). Not currently
 * consumed anywhere — `Service`/`Explainer` below are unused; the pages that
 * actually ship use their own simpler content shapes
 * (`ServicePageContent`/`SectorPageContent`). Kept in sync as documentation
 * rather than wired up, since fixing that drift is a separate piece of work.
 */
export type ComplianceStage =
  | "engage-register-assess"
  | "discover"
  | "build-remediate"
  | "train-embed"
  | "audit-demonstrate"
  | "ongoing-compliance";

export type Sector =
  | "education"
  | "fintech"
  | "retail"
  | "health"
  | "insurance"
  | "telecoms"
  | "public-sector"
  | "professional-bodies"
  | "general";

export type ContentType =
  | "service"
  | "sector-page"
  | "explainer"
  | "case-evidence"
  | "tool"
  | "template"
  | "article"
  | "credential";

/**
 * Any content asserting a statutory obligation MUST carry at least one of these,
 * tied to an ID in the claims register. Never publish a regulatory statement
 * without one.
 */
export type RegulationReference = {
  /** Claims register ID, e.g. "C-012", "C-022". */
  claimId: string;
  /** e.g. "NDPA 2023 s.49", "GAID 2025 Art.10(14)". */
  instrument: string;
};

// ---------------------------------------------------------------------------
// Base
// ---------------------------------------------------------------------------

export interface ContentBase {
  title: string;
  /** ≤200 chars — used in cards, search results, and meta description. */
  summary: string;
  audience: Audience[];
  contentType: ContentType;
  /** Named internal owner. Required for the review cycle to have an addressee. */
  owner: string;
  /** ISO date. Surfaced publicly on resource cards as "Reviewed <date>". */
  lastReviewed: string;
  /** ISO date. 12 months from lastReviewed; 6 months for regulatory content. */
  nextReviewDue: string;
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

export interface Service extends ContentBase {
  contentType: "service";
  slug: string;
  complianceStage: ComplianceStage;
  /** REQUIRED (W-005) — what the client receives. */
  deliverable: string;
  /**
   * REQUIRED (W-005) — how long it takes.
   * Not every service has a true turnaround figure: some carry a deadline
   * (audit filing → 31 March) and some a deliverable (outsourced DPO, where
   * Q-017 is still open). Label these "What you get" in the UI rather than
   * "Turnaround", so no timing commitment is implied that Thanelinc has not made.
   */
  turnaround: string;
  relatedSectors: Sector[];
  journeyStep?: number;
  regulationReferences?: RegulationReference[];
}

export interface SectorPage extends ContentBase {
  contentType: "sector-page";
  slug: string;
  sector: Sector;
  /** 3–4 services featured on this page (cross-linking rule R4). */
  featuredServices: string[];
  proofItems: CaseEvidence[];
  regulatoryDriver: RegulationReference[];
}

export interface Explainer extends ContentBase {
  contentType: "explainer" | "article";
  slug: string;
  complianceStage?: ComplianceStage;
  /** Required on anything asserting a statutory obligation. */
  regulationReferences: RegulationReference[];
  sectors?: Sector[];
}

/**
 * Client proof. `disclosureStatus` is the technical enforcement of the clearance
 * process (W-008) — the CMS must refuse to publish "pending-clearance".
 *
 * A working relationship is NOT the same as consent to publish. Contract terms
 * bind regardless of what any permissions file records.
 */
export interface CaseEvidence {
  clientName: string;
  disclosureStatus: "cleared" | "pending-clearance" | "anonymised";
  /** Used in place of clientName when status is "anonymised". */
  anonymisedAlternate?: string;
  sector: Sector;
  servicesDelivered: string[];
  outcome?: string;
  /**
   * Distinct from clearance. A proposal is not an engagement — publishing a
   * prospect as delivered work misrepresents the record.
   */
  engagementStatus: "delivered" | "awarded" | "proposed";
}

export interface Credential {
  contentType: "credential";
  title: string;
  issuer: string;
  /** Path to the certificate. It must be viewable, not merely described. */
  certificateFile?: string;
  verifiable: boolean;
  description: string;
}

// ---------------------------------------------------------------------------
// Page composition
// ---------------------------------------------------------------------------

export interface CtaLink {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

export interface PageSection<T = unknown> {
  id: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  body?: string;
  cta?: CtaLink[];
  items?: T[];
}
