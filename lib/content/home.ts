/**
 * Homepage content.
 *
 * Source of truth: the approved page copy `Content/04-Page-Copy-v2/home.md`
 * in the handover workspace. Copy here is reproduced, not authored.
 *
 * DO NOT edit wording in this file to "improve" it. Every regulatory statement
 * traces to an ID in the claims register, and client names are cleared
 * individually. Changes go through the copy doc first.
 */

import type { CtaLink } from "./types";
export { resources } from "./resources";

// ---------------------------------------------------------------------------
// Homepage hero mandate carousel
// ---------------------------------------------------------------------------

/**
 * W-037: the homepage hero carousel now previews three entries already
 * approved in the homepage's "The Mandate" section. The two business-sector
 * entries intentionally share the live regulated-businesses destination;
 * no unsupported sector route or new regulatory claim is introduced here.
 */
export const homeMandateSlides = [
  {
    id: "tertiary-institutions",
    eyebrow: "The Mandate",
    title: "Tertiary Institutions",
    visual: {
      variant: "services" as const,
      image: {
        src: "/services-hero-cutout.png",
        alt: "Thanelinc compliance adviser for tertiary institutions",
        width: 640,
        height: 1074,
      },
      floatingPanel: {
        eyebrow: "Tertiary institutions",
        title: "EHL by statutory name",
        body: "Universities, polytechnics, and colleges of education.",
      },
      credentialPanel: {
        eyebrow: "Sector route",
        title: "Explore tertiary institutions",
        body: "The filing and governance route written for higher institutions.",
      },
    },
    cta: { label: "Explore tertiary institutions", href: "/sectors/tertiary-institutions" },
  },
  {
    id: "private-sector",
    eyebrow: "The Mandate",
    title: "Private Sector & SMEs",
    visual: {
      variant: "sectors" as const,
      image: {
        src: "/regulated-businesses-cutout.png",
        alt: "Thanelinc compliance adviser for regulated businesses",
        width: 500,
        height: 810,
      },
      floatingPanel: {
        eyebrow: "Private sector & SMEs",
        title: "Data that creates exposure",
        body: "Customer, employee, payment, and partner records.",
      },
      credentialPanel: {
        eyebrow: "Sector route",
        title: "Explore regulated businesses",
        body: "A practical route for high-exposure private organisations.",
      },
    },
    cta: { label: "Explore regulated businesses", href: "/sectors/regulated-businesses" },
  },
  {
    id: "hospitality",
    eyebrow: "The Mandate",
    title: "Hospitality Industry",
    visual: {
      variant: "services" as const,
      image: {
        src: "/services-hero-cutout-bust.png",
        alt: "Thanelinc compliance adviser for hospitality businesses",
        width: 640,
        height: 640,
      },
      floatingPanel: {
        eyebrow: "Hospitality industry",
        title: "Guest records need care",
        body: "Hotels, venues, and booking platforms handling personal data.",
      },
      credentialPanel: {
        eyebrow: "Sector route",
        title: "Explore business compliance",
        body: "Start with the regulated-businesses route for your sector.",
      },
    },
    cta: { label: "Explore business compliance", href: "/sectors/regulated-businesses" },
  },
] as const;

// ---------------------------------------------------------------------------
// Hero — transformation framing, credential in the next breath
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "NDPC-Licensed · Data Protection Compliance Organization",
  headlineLead: "Turning a compliance deadline",
  headlineAccent: "into a licensed advantage.",
  lede:
    "Thanelinc is a Nigeria Data Protection Commission–licensed Data Protection Compliance Organization, licensed to file compliance audit returns on behalf of UHL and EHL organisations. If you're a university, bank, fintech, telecom, insurer, or MDA, that licence is what the NDPC requires you to use.",
  ctas: [
    { label: "Am I Covered? — 2-Minute Check", href: "/am-i-covered", variant: "primary" },
    { label: "View Our DPCO Licence", href: "/about#credentials", variant: "secondary" },
  ] satisfies CtaLink[],
} as const;

// ---------------------------------------------------------------------------
// The Problem
// ---------------------------------------------------------------------------

export const problem = {
  eyebrow: "The Problem",
  heading: "Why organisations get caught out by NDPC compliance",
  /**
   * C-012 — approved wording, verbatim. "up to" and "can face" are load-bearing;
   * removing either overstates the claim. Section 49, never 48.
   */
  statLine:
    "Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of ₦10 million or 2% of its annual gross revenue for the preceding year — and most organisations don't find out they're exposed until it's already too late to fix quietly.",
  pains: [
    {
      id: "named-publicly",
      title: "Named publicly",
      body: "In a regulatory sweep, unprepared, in front of a governing council or the market.",
    },
    {
      id: "no-data-map",
      title: "No data map",
      body: "Not knowing where student, staff, or customer records actually live, or who holds copies.",
    },
    {
      id: "contracts-questioned",
      title: "Contracts questioned",
      body: "A governing council, investor, or enterprise customer pushes back on what was signed.",
    },
    {
      id: "open-ended-cost",
      title: "Open-ended cost",
      body: "An engagement with no stated deliverable and no stated end.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Self-check — the site spine (W-004)
// ---------------------------------------------------------------------------

export const selfCheck = {
  heading: "Does the NDPC actually apply to you?",
  body:
    "Six questions. No jargon. Find out your NDPC compliance category, whether you're required to file through a licensed DPCO, and your exact deadline — free, right now.",
  cta: { label: "Start the check", href: "/am-i-covered", variant: "primary" } satisfies CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Proof — ONLY these two names are cleared for publication.
// Never add a name here. See the client-permissions record in the handover
// workspace; a working relationship is not consent to publish.
// ---------------------------------------------------------------------------

export const proof = {
  eyebrow: "Proof",
  heading: "Who trusts us with regulated work",
  items: [
    {
      id: "nba",
      client: "Nigerian Bar Association",
      engagement: "NBA Election 2026",
      body: "Appointed registered Data Protection Organization for a national professional body's election.",
    },
    {
      id: "levitate",
      client: "Levitate",
      engagement: "Full NDPA engagement",
      body: "From scoping through to compliance filing — no open-ended scope, a stated deliverable at every step.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Audience doors
// ---------------------------------------------------------------------------

export const sectorDoors = {
  eyebrow: "Built For",
  heading: "Built for two kinds of organisation",
  doors: [
    {
      id: "tertiary",
      label: "Universities & Tertiary Institutions",
      body: "Every higher institution is EHL, by name, not size. See what that means and how the deadline works for you.",
      href: "/sectors/tertiary-institutions",
      linkLabel: "Explore for universities",
    },
    {
      id: "regulated",
      label: "Regulated Businesses",
      body: "Fintech, telecoms, insurance, retail, health, logistics — find out your category, your exposure, and how fast this can be done.",
      href: "/sectors/regulated-businesses",
      linkLabel: "Explore for businesses",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Process — turnarounds are the trust signal, compensating for no pricing
// ---------------------------------------------------------------------------

export const process = {
  eyebrow: "How We Work",
  heading: "No published price. A published timeline instead.",
  steps: [
    { step: "01", label: "Scoping — agreed scope of work", turnaround: "48 hours" },
    { step: "02", label: "NDPC registration — certificate", turnaround: "3 working days" },
    { step: "03", label: "Data mapping & ROPA", turnaround: "24 hours" },
    { step: "04", label: "Gap assessment & DPIA", turnaround: "24 / 72 hours" },
    { step: "05", label: "Policies & remediation — full suite", turnaround: "96 hours" },
    { step: "06", label: "DPO appointment — Thanelinc as your DPO of record", turnaround: "At scoping" },
    { step: "07", label: "Staff training", turnaround: "Scheduled" },
    { step: "08", label: "Compliance audit filing", turnaround: "Before 31 March" },
    { step: "09", label: "Ongoing monitoring", turnaround: "Quarterly" },
  ],
  cta: { label: "See the full 10-step process", href: "/how-we-work", variant: "ghost" } satisfies CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Services — four featured (W-021). The /services link is load-bearing for R9,
// not decorative: it is what keeps the other four services reachable.
//
// Lines are labelled "What you get", never "Turnaround" — only NDPC Registration
// and Breach Response have true turnaround figures. Audit & Filing carries a
// deadline; Outsourced DPO carries a deliverable, because Q-017 is still open.
// ---------------------------------------------------------------------------

export const services = {
  eyebrow: "Compliance Services",
  heading: "Four services most organisations start with",
  items: [
    {
      id: "ndpc-registration",
      icon: "shield-check",
      title: "NDPC Registration",
      body: "Statutory registration for Data Controllers and Processors of Major Importance.",
      whatYouGet: "Certificate in 3 working days",
      href: "/services/ndpc-registration",
    },
    {
      id: "compliance-audit-filing",
      icon: "folder",
      title: "Compliance Audit & Filing",
      body: "Your annual Compliance Audit Returns, filed through our NDPC-licensed DPCO.",
      whatYouGet: "Filed ahead of 31 March",
      href: "/services/compliance-audit-filing",
    },
    {
      id: "outsourced-dpo",
      icon: "user-shield",
      title: "Outsourced DPO",
      body: "Thanelinc serves as your DPO of record — no new hire.",
      whatYouGet: "Thanelinc as your DPO of record",
      href: "/services/outsourced-dpo",
    },
    {
      id: "breach-response",
      icon: "alert",
      title: "Breach Response",
      body: "Think you've had a breach? Call — don't fill in a form.",
      whatYouGet: "Same-day response",
      href: "/services/breach-response",
    },
  ],
  allServicesLink: { label: "See all eight services", href: "/services", variant: "ghost" } satisfies CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Resources — "Reviewed", not "Published". Evergreen regulatory explainers age
// badly with a publish date; lastReviewed is a maintenance signal (W-023).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Secondary lines
// ---------------------------------------------------------------------------

export const secondary = {
  eyebrow: "Training & Certification",
  heading: "Build in-house capability alongside outsourced support",
  body:
    "DPO certification, Privacy Champion, staff awareness, and leadership development. Certification is partner-issued.",
  cta: { label: "Learn about training", href: "/training", variant: "primary" } satisfies CtaLink,
} as const;

// ---------------------------------------------------------------------------
// Navigation & footer
// ---------------------------------------------------------------------------

export const nav = {
  links: [
    { label: "Sectors", href: "/sectors" },
    { label: "Services", href: "/services" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Resources", href: "/resources" },
    { label: "Training", href: "/training" },
  ],
  cta: { label: "Am I Covered?", href: "/am-i-covered", variant: "primary" } satisfies CtaLink,
} as const;

export const footer = {
  tagline: { lead: "Turning a compliance deadline into a", accent: "licensed", trail: "advantage." },
  ctas: [
    { label: "Am I Covered? — 2-Minute Check", href: "/am-i-covered", variant: "primary" },
    { label: "View Our DPCO Licence", href: "/about#credentials", variant: "secondary" },
  ] satisfies CtaLink[],
  descriptor:
    "Thanelinc Nigeria Limited is a licensed Data Protection Compliance Organization (DPCO) registered with the Nigeria Data Protection Commission (NDPC).",
  credentialLink: { label: "Licensed DPCO — See credentials", href: "/about#credentials" },
  columns: [
    {
      title: "Compliance Services",
      links: [
        { label: "NDPC Registration", href: "/services/ndpc-registration" },
        { label: "Data Mapping & ROPA", href: "/services/data-mapping-ropa" },
        { label: "Gap Assessment & DPIA", href: "/services/gap-assessment-dpia" },
        { label: "Policies & Remediation", href: "/services/policies-remediation" },
        { label: "Outsourced DPO", href: "/services/outsourced-dpo" },
        { label: "Compliance Audit & Filing", href: "/services/compliance-audit-filing" },
        { label: "Ongoing Monitoring", href: "/services/ongoing-monitoring" },
        { label: "Breach Response", href: "/services/breach-response" },
      ],
    },
    {
      title: "Priority Sectors",
      links: [
        { label: "Higher Institutions (EHL)", href: "/sectors/tertiary-institutions" },
        { label: "Regulated Businesses (UHL)", href: "/sectors/regulated-businesses" },
        { label: "Public Sector & MDAs", href: "/sectors/public-sector" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "NDPC Category Guide", href: "/resources/ndpc-compliance-categories-explained" },
        { label: "ROPA & DPIA Explainer", href: "/resources/ropa-dpia-lia-explained" },
        { label: "Vendor Due Diligence", href: "/resources/vendor-due-diligence" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Credentials", href: "/about#credentials" },
        { label: "Training", href: "/training" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Notice", href: "/privacy" },
      ],
    },
  ],
  legal: {
    copyright: "© 2026 Thanelinc Nigeria Limited. All rights reserved. Licensed DPCO.",
    domain: "Canonical domain: thanelinc.ng",
    credit: "Website",
  },
} as const;
