import { services, servicesIndexProblem } from "@/lib/content/servicesIndex";
import { resourcesMenu, contactNavItem } from "@/lib/content/navigation";
import { hero as regulatedBusinessesHero, reasons as regulatedBusinessesReasons } from "@/lib/content/sectorsRegulatedBusinesses";
import { tertiaryInstitutionsPage } from "@/lib/content/sectorsTertiaryInstitutions";
import { sectorsIndexHero } from "@/lib/content/sectorsIndex";
import { aboutPageContent } from "@/lib/content/about";
import { credentialsPageContent } from "@/lib/content/credentials";
import { teamPageContent } from "@/lib/content/team";
import { howWeWorkContent } from "@/lib/content/howWeWork";
import { sectorsPublicSectorContent, publicSectorPage } from "@/lib/content/sectorsPublicSector";
import { legalDocuments } from "@/lib/content/legal";
import type { NavStatus } from "@/lib/content/navigation";

export interface SearchEntry {
  id: string;
  label: string;
  description: string;
  href: string;
  status: NavStatus;
  group: string;
}

/**
 * `description` here is what gets embedded and matched against, so it needs
 * real prose — not the terse "deliverable — turnaround" strings the nav
 * dropdowns use. Nothing below is new copy: services pull each service's
 * full `summary` from `servicesIndex.ts`, sectors pull their hero subheads
 * and "why you're here" reasons, resources their existing explainer lines.
 * All already published elsewhere on the site.
 */
const serviceEntries: SearchEntry[] = services.map((s) => ({
  id: `/services/${s.slug}`,
  label: s.name,
  description: `${s.summary} ${s.bullets.join(" ")}`,
  href: `/services/${s.slug}`,
  status: "live",
  group: "Services",
}));

// The regulatory-penalty paragraph doesn't belong to one service — it's page
// context on /services — but it's exactly the kind of thing someone might
// search "penalty" or "fine" for, and the text already exists and ships
// there verbatim.
const problemEntry: SearchEntry = {
  id: "/services#problem",
  label: "Penalty exposure & regulatory risk",
  description: servicesIndexProblem.description,
  href: "/services",
  status: "live",
  group: "Services",
};

const sectorEntries: SearchEntry[] = [
  {
    id: "/sectors/tertiary-institutions",
    label: "Higher Institutions (EHL)",
    description: `${tertiaryInstitutionsPage.hero.h1} ${tertiaryInstitutionsPage.hero.subhead}`,
    href: "/sectors/tertiary-institutions",
    status: "live",
    group: "Sectors",
  },
  {
    id: "/sectors/regulated-businesses",
    label: "Regulated Businesses (UHL)",
    description: `${regulatedBusinessesHero.subhead} ${regulatedBusinessesReasons.map((r) => `${r.title}. ${r.body}`).join(" ")}`,
    href: "/sectors/regulated-businesses",
    status: "live",
    group: "Sectors",
  },
  {
    id: "/sectors/public-sector",
    label: "Public Sector & MDAs",
    description: `${sectorsPublicSectorContent.summary} ${publicSectorPage.hero.subhead}`,
    href: "/sectors/public-sector",
    status: "live",
    group: "Sectors",
  },
];

const resourceEntries: SearchEntry[] = resourcesMenu.columns[0].items.map((i) => ({
  id: i.href,
  label: i.label,
  description: i.description ?? "",
  href: i.href,
  status: i.status,
  group: "Resources",
}));

export const searchIndex: SearchEntry[] = [
  ...serviceEntries,
  problemEntry,
  ...sectorEntries,
  ...resourceEntries,
  { id: "/", label: "Home", description: "Thanelinc — NDPC-licensed Data Protection Compliance Organization, handling end-to-end NDPC regulatory filings.", href: "/", status: "live", group: "Pages" },
  { id: "/am-i-covered", label: "Am I Covered?", description: "Confirm your exact NDPA category, obligation and deadline in under two minutes.", href: "/am-i-covered", status: "live", group: "Pages" },
  { id: "/sectors", label: "Who We Serve", description: `${sectorsIndexHero.title} ${sectorsIndexHero.titleAccent} ${sectorsIndexHero.summary}`, href: "/sectors", status: "live", group: "Pages" },
  { id: "/how-we-work", label: "How We Work", description: howWeWorkContent.summary, href: "/how-we-work", status: "live", group: "Pages" },
  { id: "/about", label: "About Thanelinc", description: aboutPageContent.summary, href: "/about", status: "live", group: "Pages" },
  { id: "/about#credentials", label: "Credentials", description: credentialsPageContent.summary, href: "/about#credentials", status: "live", group: "Pages" },
  { id: "/about#team", label: "Team", description: teamPageContent.summary, href: "/about#team", status: "live", group: "Pages" },
  ...legalDocuments.map((document) => ({ id: `/${document.slug}`, label: document.navLabel, description: document.summary, href: `/${document.slug}`, status: "live" as const, group: "Legal" })),
  { id: contactNavItem.href, label: contactNavItem.label, description: "Request a scoped proposal or call the general company line.", href: contactNavItem.href, status: contactNavItem.status, group: "Pages" },
];
