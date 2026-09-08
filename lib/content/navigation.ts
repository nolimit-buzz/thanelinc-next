import { services } from "@/lib/content/servicesIndex";
import { resources } from "@/lib/content/home";

/**
 * Single source for every nav/footer link on the site (W-030, D1 —
 * status-flagged). No copy here is new: services pull from
 * `servicesIndex.ts`, resources from `home.ts`. Sector and company copy is
 * short enough that duplicating it here as plain labels (not full sentences)
 * doesn't create a second source of truth to drift.
 *
 * `status: "planned"` items render in the same visual slot as a live item,
 * but non-interactive with a "Soon" tag — never a link, never a 404. Flip a
 * status to "live" the moment its page ships; nothing else needs to change.
 */

export type NavStatus = "live" | "planned";

export interface NavItem {
  label: string;
  href: string;
  status: NavStatus;
  description?: string;
  meta?: string;
  icon?: string;
}

export interface NavColumn {
  eyebrow: string;
  items: NavItem[];
}

export interface NavFeatured {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  status: NavStatus;
  ctaLabel: string;
}

export interface MegaMenu {
  label: string;
  columns: NavColumn[];
  featured: NavFeatured;
  viewAll: NavItem;
}

// ---------------------------------------------------------------------------
// Services — grouped by the 6-stage journey (W-029), so the menu teaches the
// model instead of listing 8 links flatly. Secondary line is deliverable +
// turnaround (W-005), sourced verbatim from servicesIndex.ts.
// ---------------------------------------------------------------------------

const byslug = (slug: string) => services.find((s) => s.slug === slug)!;

// Phase 2 rollout verified each service route locally before this set was
// expanded (Gate 1 approval, 2026-08-21). Keep route state evidence-based:
// approved copy alone is not enough to mark a destination live.
const LIVE_SERVICE_SLUGS = new Set(services.map((service) => service.slug));

function serviceItem(slug: string): NavItem {
  const s = byslug(slug);
  return {
    label: s.name,
    href: `/services/${s.slug}`,
    status: LIVE_SERVICE_SLUGS.has(slug) ? "live" : "planned",
    description: `${s.deliverable} — ${s.turnaround}`,
    icon: s.icon,
  };
}

export const servicesMenu: MegaMenu = {
  label: "Services",
  columns: [
    {
      eyebrow: "Start Now · Foundation",
      items: [
        serviceItem("ndpc-registration"),
        serviceItem("data-mapping-ropa"),
        serviceItem("gap-assessment-dpia"),
      ],
    },
    {
      eyebrow: "Governance · Train & Embed",
      items: [serviceItem("policies-remediation"), serviceItem("outsourced-dpo")],
    },
    {
      eyebrow: "Audit & Ongoing",
      items: [serviceItem("compliance-audit-filing"), serviceItem("ongoing-monitoring"), serviceItem("breach-response")],
    },
  ],
  featured: {
    eyebrow: "Learning & Development",
    title: "Build skills that stick.",
    description:
      "Leadership, digital fluency, and execution capability — delivered through practical workshops, technology-enabled learning, and our Strategy Lab Retreats. 92% programme completion rate.",
    href: "/learning-and-development",
    status: "live",
    ctaLabel: "Explore Learning & Development",
  },
  viewAll: { label: "See all services", href: "/services", status: "live" },
};

// ---------------------------------------------------------------------------
// Sectors
// ---------------------------------------------------------------------------

/**
 * The four live sector routes, defined once. `sectorsMenu` below builds its
 * links from these, the footer's "Priority Sectors" column derives from that,
 * and `mapHero` in `lib/cms/mapHome.ts` resolves the homepage hero's CTA
 * targets through them — so a route rename here reaches every surface and no
 * link can drift out on its own. Keys are stable identifiers, not paths:
 * renaming a path leaves the key (and every consumer) untouched.
 */
export const sectorRoutes = {
  tertiaryInstitutions: "/sectors/tertiary-institutions",
  publicSector: "/sectors/public-sector",
  midSizeOrganisations: "/sectors/mid-size-organizations",
  regulatedBusinesses: "/sectors/regulated-businesses",
} as const;

export const sectorsMenu: MegaMenu = {
  label: "Sectors",
  columns: [
    {
      eyebrow: "By Category",
      // Order is the client's (r6): the two by-name-only tiers first, then the
      // two that private organisations and SMEs can also reach by data volume.
      // This list also renders as the footer's "Priority Sectors" column via
      // `footerColumns[1]` below, so the two can't drift.
      items: [
        {
          label: "Tertiary Institutions",
          href: sectorRoutes.tertiaryInstitutions,
          status: "live",
          description: "Universities, polytechnics and colleges — EHL by name, not by size.",
          icon: "graduation-cap",
        },
        {
          label: "Public Sector & MDAs",
          href: sectorRoutes.publicSector,
          status: "live",
          description: "Federal and state ministries and agencies.",
          icon: "landmark",
        },
        {
          label: "Mid-Size Organisations & Financial Institutions (EHL)",
          href: sectorRoutes.midSizeOrganisations,
          status: "live",
          description: "Hospitals, microfinance and mortgage banks, or SMEs by data volume.",
          icon: "layers",
        },
        {
          label: "Regulated Businesses (UHL)",
          href: sectorRoutes.regulatedBusinesses,
          status: "live",
          description: "Banks, telecoms, insurance and fintech, or SMEs by data volume.",
          icon: "building",
        },
      ],
    },
    // Named UHL/EHL categories, one level down — sourced verbatim from each
    // sector page's own approved copy and from the /sectors directory cards.
    // No new claim: just the existing category lists surfaced as their own
    // column so the menu shows who's actually covered, not just link labels.
    //
    // Revised 2026-09-04 with the client's reclassification: mortgage banks are
    // an EHL category and now route to /sectors/mid-size-organizations, while
    // banks stay UHL. Retail/health/logistics reach UHL by volume, not by name.
    //
    // Revised again 2026-09-04 (r6): eight rows collapse to six — hospitals join
    // microfinance/mortgage banks, and banks join telecoms/fintech — and each
    // row now names its tier in parentheses, so a reader who lands here without
    // having read the "By Category" column still knows where the link goes.
    // Several rows deliberately share a href; keys are by label, not href.
    {
      eyebrow: "Who's Covered",
      items: [
        { label: "Universities & Colleges (Tertiary Institutions)", href: sectorRoutes.tertiaryInstitutions, status: "live" },
        {
          label: "Ministries & Agencies (Public Sector & MDAs)",
          href: `${sectorRoutes.publicSector}#ministries-agencies`,
          status: "live",
        },
        {
          label: "Hospitals, Microfinance & Mortgage Banks (Mid-Size Organisations & Financial Institutions)",
          href: sectorRoutes.midSizeOrganisations,
          status: "live",
        },
        { label: "Banks, Telecoms & Fintech (Regulated Businesses)", href: sectorRoutes.regulatedBusinesses, status: "live" },
        { label: "Insurers & Oil and Gas (Regulated Businesses)", href: sectorRoutes.regulatedBusinesses, status: "live" },
        { label: "Retail, Health & Logistics (Regulated Businesses)", href: sectorRoutes.regulatedBusinesses, status: "live" },
      ],
    },
  ],
  featured: {
    eyebrow: "Not sure which applies to you?",
    title: "Am I required to register?",
    description: "Confirm your exact category — six questions, two minutes.",
    href: "/am-i-required-to-register",
    status: "live",
    ctaLabel: "Run the check",
  },
  viewAll: { label: "View all sectors", href: "/sectors", status: "live" },
};

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

function resourceItem(id: string, icon: string): NavItem {
  const r = resources.items.find((i) => i.id === id)!;
  return { label: r.title, href: r.href, status: "live", description: r.body, icon };
}

export const resourcesMenu: MegaMenu = {
  label: "Resources",
  columns: [
    {
      eyebrow: "Explainers",
      items: [
        resourceItem("ndpc-compliance-categories-explained", "layers"),
        resourceItem("ropa-dpia-lia-explained", "map"),
        resourceItem("vendor-due-diligence", "search"),
      ],
    },
    {
      eyebrow: "The Process",
      items: [
        {
          label: "How We Work",
          href: "/how-we-work",
          status: "live",
          description: "The full 6-stage compliance journey.",
          icon: "compass",
        },
        {
          label: "Am I required to register?",
          href: "/am-i-required-to-register",
          status: "live",
          description: "Confirm your category in two minutes.",
          icon: "search",
        },
      ],
    },
    {
      eyebrow: "About",
      items: [
        {
          label: "Credentials",
          href: "/about#credentials",
          status: "live",
          description: "Our NDPC Data Protection Compliance Organization licence.",
          icon: "seal",
        },
        {
          label: "Learning & Development",
          href: "/learning-and-development",
          status: "live",
          // Was a planned "Training" page at /training. Shipped as the Learning
          // & Development business unit; description is the page's own approved
          // meta copy, not new wording.
          description: "Leadership, digital fluency, and execution capability.",
          icon: "graduation-cap",
        },
        { label: "Privacy Policy", href: "/privacy", status: "live", icon: "lock" },
      ],
    },
  ],
  featured: {
    eyebrow: `Reviewed ${resources.items[0].lastReviewed}`,
    title: resources.items[0].title,
    description: resources.items[0].body,
    href: resources.items[0].href,
    status: "planned",
    ctaLabel: "Read more",
  },
  viewAll: { label: "See all resources", href: "/resources", status: "live" },
};

// ---------------------------------------------------------------------------
// Simple (non-mega) nav items and the primary CTA
// ---------------------------------------------------------------------------

export const howWeWorkNavItem: NavItem = { label: "How We Work", href: "/how-we-work", status: "live" };

export const aboutMenu: MegaMenu = {
  label: "About",
  columns: [
    {
      eyebrow: "Thanelinc",
      items: [
        { label: "About Thanelinc", href: "/about", status: "live", description: "Our credential-led compliance position.", icon: "building" },
        { label: "Credentials", href: "/about#credentials", status: "live", description: "View the DPCO licence and separate registration.", icon: "seal" },
        { label: "Team", href: "/about#team", status: "live", description: "The practitioners approved for public listing.", icon: "shield" },
      ],
    },
  ],
  featured: {
    eyebrow: "Due diligence",
    title: "See our DPCO credentials",
    description: "The DPCO licence and separate registration are clearly explained.",
    href: "/about#credentials",
    status: "live",
    ctaLabel: "See credentials",
  },
  viewAll: { label: "About Thanelinc", href: "/about", status: "live" },
};

export const contactNavItem: NavItem = { label: "Contact Us", href: "/contact", status: "live" };

// ---------------------------------------------------------------------------
// Footer — same menus above, plus company/legal items not shown in the nav.
// ---------------------------------------------------------------------------

export const footerColumns: { title: string; items: NavItem[] }[] = [
  { title: "Compliance Services", items: services.map((s) => serviceItem(s.slug)) },
  {
    title: "Priority Sectors",
    items: sectorsMenu.columns[0].items.map(({ label, href, status }) => ({ label, href, status })),
  },
  { title: "Resources", items: resourcesMenu.columns[0].items.map(({ label, href, status }) => ({ label, href, status })) },
  {
    title: "Company",
    items: [
      { label: "About Thanelinc", href: "/about", status: "live" },
      { label: "Credentials", href: "/about#credentials", status: "live" },
      { label: "Team", href: "/about#team", status: "live" },
      { label: "How We Work", href: "/how-we-work", status: "live" },
      { label: "Learning & Development", href: "/learning-and-development", status: "live" },
      { label: "Contact", href: "/contact", status: "live" },
    ],
  },
];

export const footerLegal: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy", status: "live" },
  { label: "Cookie Policy", href: "/cookie-policy", status: "live" },
  { label: "Terms", href: "/terms", status: "live" },
];
