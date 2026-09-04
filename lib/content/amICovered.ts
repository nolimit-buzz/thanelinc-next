import type { OrgType, VolumeBand, YesNo, EstablishmentDate, Category } from "@/lib/self-check/resolve";

/**
 * Source: Content/04-Page-Copy/am-i-covered.md (on-page copy) and
 * Content/05-Self-Check-Tool-Spec.md (question logic) in the handover
 * workspace. No v5 markup exists for this tool.
 *
 * DEVIATION FROM THE LITERAL SPEC COPY, FLAGGED: the spec's abridged Q1
 * option list bundles "Bank, mortgage bank, or microfinance bank" as ONE
 * choice. Per the Claims Register, C-009 classifies commercial/deposit banks
 * as UHL while C-016 classifies microfinance and mortgage banks as EHL — two
 * different tiers. A single bundled option cannot resolve correctly, so this
 * splits it into two. Everything else follows the spec verbatim.
 */

export const hero = {
  h1: "Am I covered by the NDPC?",
  subhead:
    "Six questions. No jargon, no guessing. Find out your compliance category, whether you're required to file through a licensed DPCO, and your deadline — free, right now.",
  trustLine: "Thanelinc is a licensed Data Protection Compliance Organization.",
  trustLineCta: { label: "What that means", href: "/about#credentials" },
  primaryCta: "Start the check",
};

export interface QuestionOption<T extends string> {
  value: T;
  label: string;
}

export interface Question<T extends string> {
  id: string;
  number: number;
  prompt: string;
  whyWeAsk?: string;
  options: QuestionOption<T>[];
}

export const q1: Question<OrgType> = {
  id: "orgType",
  number: 1,
  prompt: "What kind of organisation are you?",
  options: [
    { value: "higher-institution", label: "University or tertiary institution" },
    { value: "mda", label: "Government ministry, department or agency" },
    { value: "bank-commercial", label: "Commercial or deposit bank" },
    { value: "bank-microfinance-mortgage", label: "Microfinance bank or mortgage bank" },
    { value: "telecoms-fintech-insurance", label: "Telecoms, fintech, payments or insurance" },
    { value: "hospital-tertiary-secondary", label: "Hospital (tertiary or secondary care)" },
    { value: "ohl-named", label: "School, training provider, health centre, lab or small hotel" },
    { value: "other-private", label: "Other private company" },
    { value: "sole-trader-artisan", label: "Sole trader or artisan" },
    { value: "social-media-community", label: "Community group" },
  ],
};

export const q2: Question<VolumeBand> = {
  id: "volumeBand",
  number: 2,
  prompt: "In the last 6 months, roughly how many people's personal data have you handled?",
  whyWeAsk: "This decides your category if your organisation type alone doesn't.",
  options: [
    { value: "under-200", label: "Under 200" },
    { value: "200-999", label: "200–999" },
    { value: "1000-4999", label: "1,000–4,999" },
    { value: "5000-plus", label: "5,000 or more" },
  ],
};

export const q3: Question<YesNo> = {
  id: "sensitiveData",
  number: 3,
  prompt: "Do you handle sensitive personal data?",
  whyWeAsk: "Health, biometric, financial, or similarly sensitive information.",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};

export const q4: Question<YesNo> = {
  id: "crossBorder",
  number: 4,
  prompt: "Do you send personal data outside Nigeria?",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};

export const q5: Question<YesNo> = {
  id: "thirdPartyProcessing",
  number: 5,
  prompt: "Does a third party or cloud provider process personal data on your behalf?",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};

export const q6: Question<EstablishmentDate> = {
  id: "establishmentDate",
  number: 6,
  prompt: "When was your organisation established?",
  whyWeAsk: "This decides which filing deadline applies to you.",
  options: [
    { value: "before-2023-06-12", label: "Before 12 June 2023" },
    { value: "on-or-after-2023-06-12", label: "On or after 12 June 2023" },
  ],
};

export const questions = [q1, q2, q3, q4, q5, q6];

export const penaltyFraming =
  "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year.";

interface ResultCopy {
  headline: string;
  body: string;
  whatThisMeans: string[];
  nextStepLabel: string;
  sectorLink?: { label: string; href: string };
  secondaryCta: string;
}

export const resultCopy: Record<Category, ResultCopy> = {
  UHL: {
    headline: "You're in the UHL category — the NDPC's highest compliance tier.",
    body: "Organisations like yours — high transaction volumes, sensitive data, or regulated sectors like banking, telecoms, fintech, and insurance — sit in the Ultra-High Level (UHL) category.",
    whatThisMeans: [
      "You're required to file your annual Compliance Audit Returns (CAR) through a Data Protection Compliance Organization licensed by the NDPC. Thanelinc is one.",
    ],
    nextStepLabel: "See how we work with regulated businesses, or request a call back",
    sectorLink: { label: "See how we work with regulated businesses", href: "/sectors/regulated-businesses" },
    secondaryCta: "Request a call back",
  },
  EHL: {
    headline: "You're in the EHL category — and if you're a university, this applies by name, not by size.",
    body: "Higher institutions sit in the Extra-High Level (EHL) category under the NDPC's own schedule — every university, regardless of student numbers. Other organisations reach EHL by volume (1,000–4,999 people's data handled in six months), or fall into EHL categories such as MDAs, microfinance and mortgage banks, or hospitals providing tertiary or secondary care.",
    whatThisMeans: [
      "You're required to file your annual Compliance Audit Returns (CAR) through a Data Protection Compliance Organization licensed by the NDPC. Thanelinc is one.",
    ],
    nextStepLabel: "See how we work with tertiary institutions, or request a call back",
    sectorLink: { label: "See how we work with tertiary institutions", href: "/sectors/tertiary-institutions" },
    secondaryCta: "Request a call back",
  },
  OHL: {
    headline: "You're in the OHL category.",
    body: "Your organisation type or data volumes place you in the Ordinary High Level (OHL) category.",
    whatThisMeans: [
      "OHL organisations renew their NDPC registration annually. You are not required to file annual Compliance Audit Returns.",
      "You should still confirm your registration is current and that your data-handling practices meet NDPA requirements — the four-factor test (sensitive data, cross-border transfer, third-party processing, and volume trend) can move an organisation into a higher category if circumstances change.",
    ],
    nextStepLabel: "Request a call back to confirm your registration status.",
    secondaryCta: "Request a call back",
  },
  "not-of-major-importance": {
    headline: "Based on your answers, you're not currently classed as an organisation of major importance.",
    body: "This typically applies to sole traders and artisans who don't transmit personal data commercially, organisations with fewer than 15 employees, or community groups of common interest.",
    whatThisMeans: [
      "You don't currently carry NDPC registration or CAR filing obligations.",
      "This can change — if your data volumes grow, you take on sensitive-data processing, or you begin cross-border transfers, revisit this check.",
    ],
    nextStepLabel: "Bookmark this page and re-check if your circumstances change, or request a call back to talk it through.",
    secondaryCta: "Request a call back",
  },
};

export const categoryDisplayName: Record<Category, string> = {
  UHL: "UHL — Ultra-High Level",
  EHL: "EHL — Extra-High Level",
  OHL: "OHL — Ordinary High Level",
  "not-of-major-importance": "Not of major importance",
};

export interface CallRequestDisclosure {
  heading: string;
  notice: string;
  consentLabel: string;
  privacyLink: { label: string; href: "/privacy" };
}

export const callRequestDisclosure: CallRequestDisclosure = {
  heading: "What will be sent",
  notice:
    "If you request a call, Thanelinc will receive your six self-check answers and the category calculated from them, together with your phone number, email address and preferred call time. This helps the team route and prepare for the conversation.",
  consentLabel: "I agree to send this information to Thanelinc for this follow-up request.",
  privacyLink: { label: "Read the Privacy Policy", href: "/privacy" },
};
