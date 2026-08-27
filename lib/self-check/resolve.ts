/**
 * Resolution logic for `/am-i-covered`, per
 * Content/05-Self-Check-Tool-Spec.md (handover workspace) — "the part most
 * likely to be implemented wrongly. Do not resolve on volume first."
 *
 * Category sources, verbatim from docs/CLAIMS_REGISTER.md:
 *   C-006 Higher institutions (university/polytechnic/college)         → EHL, named
 *   C-007 Government MDAs                                              → EHL, named
 *   C-008 Schools, corporate trainers, primary health centres,
 *         independent labs, hotels under 50 suites                    → OHL, named
 *   C-009 Banks, telecoms, insurance, oil & gas, fintech               → UHL, named
 *   C-016 Microfinance banks, mortgage banks, tertiary/secondary
 *         hospitals                                                   → EHL, named
 *   C-017 Traders/artisans not transmitting data commercially, traders
 *         under 15 employees, social-media communities                → not of major importance
 *
 * ASSUMPTION FLAGGED FOR REGULATORY REVIEW (owner: Q-009, unassigned):
 * the spec's step 3 says the four-factor test "can pull a low-volume
 * organisation into scope... regardless of the Q2 band" but does not state
 * which tier (UHL/EHL/OHL) that pulls it into. This implementation escalates
 * a sub-200 organisation with any four-factor trigger to OHL — the lowest
 * "major importance" tier — since nothing else in the answers justifies UHL
 * or EHL. Do not extend this default without confirming against GAID 2025
 * directly.
 */

export type OrgType =
  | "higher-institution"
  | "mda"
  | "bank-commercial"
  | "bank-microfinance-mortgage"
  | "telecoms-fintech-insurance"
  | "hospital-tertiary-secondary"
  | "ohl-named"
  | "other-private"
  | "sole-trader-artisan"
  | "social-media-community";

export type VolumeBand = "under-200" | "200-999" | "1000-4999" | "5000-plus";

export type YesNo = "yes" | "no";

export type EstablishmentDate = "before-2023-06-12" | "on-or-after-2023-06-12";

export interface SelfCheckAnswers {
  orgType: OrgType;
  volumeBand: VolumeBand;
  sensitiveData: YesNo;
  crossBorder: YesNo;
  thirdPartyProcessing: YesNo;
  establishmentDate: EstablishmentDate;
}

const ORG_TYPES: readonly OrgType[] = [
  "higher-institution",
  "mda",
  "bank-commercial",
  "bank-microfinance-mortgage",
  "telecoms-fintech-insurance",
  "hospital-tertiary-secondary",
  "ohl-named",
  "other-private",
  "sole-trader-artisan",
  "social-media-community",
];
const VOLUME_BANDS: readonly VolumeBand[] = [
  "under-200",
  "200-999",
  "1000-4999",
  "5000-plus",
];
const YES_NO: readonly YesNo[] = ["yes", "no"];
const ESTABLISHMENT_DATES: readonly EstablishmentDate[] = [
  "before-2023-06-12",
  "on-or-after-2023-06-12",
];

export function isSelfCheckAnswers(value: unknown): value is SelfCheckAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const answers = value as Record<string, unknown>;
  return (
    typeof answers.orgType === "string" &&
    ORG_TYPES.includes(answers.orgType as OrgType) &&
    typeof answers.volumeBand === "string" &&
    VOLUME_BANDS.includes(answers.volumeBand as VolumeBand) &&
    typeof answers.sensitiveData === "string" &&
    YES_NO.includes(answers.sensitiveData as YesNo) &&
    typeof answers.crossBorder === "string" &&
    YES_NO.includes(answers.crossBorder as YesNo) &&
    typeof answers.thirdPartyProcessing === "string" &&
    YES_NO.includes(answers.thirdPartyProcessing as YesNo) &&
    typeof answers.establishmentDate === "string" &&
    ESTABLISHMENT_DATES.includes(answers.establishmentDate as EstablishmentDate)
  );
}

export type Category = "UHL" | "EHL" | "OHL" | "not-of-major-importance";

export type ResolutionSource =
  | "named-higher-institution"
  | "named-mda"
  | "named-bank-commercial"
  | "named-bank-microfinance-mortgage"
  | "named-telecoms-fintech-insurance"
  | "named-hospital"
  | "named-ohl"
  | "volume-band"
  | "four-factor-escalation"
  | "default-not-of-major-importance";

export interface SelfCheckResult {
  category: Category;
  source: ResolutionSource;
  /** True only for UHL/EHL — drives whether CAR filing + C-012 penalty framing show. */
  mandatoryFiling: boolean;
  /** True only when a named-category match drove the result (used for sector-page cross-linking). */
  namedCategoryMatch: boolean;
}

const NAMED_CATEGORY: Partial<Record<OrgType, { category: Category; source: ResolutionSource }>> = {
  "higher-institution": { category: "EHL", source: "named-higher-institution" },
  mda: { category: "EHL", source: "named-mda" },
  "bank-commercial": { category: "UHL", source: "named-bank-commercial" },
  "bank-microfinance-mortgage": { category: "EHL", source: "named-bank-microfinance-mortgage" },
  "telecoms-fintech-insurance": { category: "UHL", source: "named-telecoms-fintech-insurance" },
  "hospital-tertiary-secondary": { category: "EHL", source: "named-hospital" },
  "ohl-named": { category: "OHL", source: "named-ohl" },
};

function volumeToCategory(band: VolumeBand): Category | null {
  switch (band) {
    case "5000-plus":
      return "UHL";
    case "1000-4999":
      return "EHL";
    case "200-999":
      return "OHL";
    case "under-200":
      return null; // provisional — subject to the four-factor test
  }
}

export function resolveSelfCheck(answers: SelfCheckAnswers): SelfCheckResult {
  // Step 1 — named category match wins outright, regardless of volume.
  const named = NAMED_CATEGORY[answers.orgType];
  if (named) {
    return {
      ...named,
      mandatoryFiling: named.category === "UHL" || named.category === "EHL",
      namedCategoryMatch: true,
    };
  }

  // Step 2 — no named match: resolve by volume band.
  const byVolume = volumeToCategory(answers.volumeBand);
  if (byVolume) {
    return {
      category: byVolume,
      source: "volume-band",
      mandatoryFiling: byVolume === "UHL" || byVolume === "EHL",
      namedCategoryMatch: false,
    };
  }

  // Step 3 — under 200: the four-factor test can still pull this into scope.
  const fourFactorTriggered =
    answers.sensitiveData === "yes" ||
    answers.crossBorder === "yes" ||
    answers.thirdPartyProcessing === "yes";

  if (fourFactorTriggered) {
    return {
      category: "OHL",
      source: "four-factor-escalation",
      mandatoryFiling: false,
      namedCategoryMatch: false,
    };
  }

  // Step 4 — C-017: genuinely not of major importance.
  return {
    category: "not-of-major-importance",
    source: "default-not-of-major-importance",
    mandatoryFiling: false,
    namedCategoryMatch: false,
  };
}

/** CAR deadline wording (C-014 vs C-018) — category-independent, only applies when filing is mandatory. */
export function carDeadlineCopy(establishmentDate: EstablishmentDate): string {
  return establishmentDate === "before-2023-06-12"
    ? "31 March each year"
    : "within 15 months of establishment, then annually";
}
