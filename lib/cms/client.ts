// Minimal Strapi 5 fetch layer. Every single type read here (`home`, `services`,
// `sectors`, `resources`, `about`, `credentials`, `team`, `how-we-work`,
// `contact`, and the service, sector and resource article detail types) has a
// public find permission, so this sends no credentials.

import { STRAPI_API_URL } from "@/lib/config/site-config";

export interface StrapiSection {
  __component: string;
  [key: string]: unknown;
}

// Strapi 5 only auto-populates one level of a dynamiczone's own fields — the
// repeatable components nested inside each section (painPoints, cards, sublinks,
// steps, checklistRows, chips, logos, trustItems, categories) need an explicit
// per-component `on` populate path or they come back empty.
const HOME_POPULATE_QUERY = [
  "populate[sections][on][home.hero-section][populate]=slides",
  "populate[sections][on][home.problem-section][populate]=painPoints",
  "populate[sections][on][home.self-check-section][populate]=trustItems",
  "populate[sections][on][home.sector-accordion-section][populate][cards][populate]=sublinks",
  "populate[sections][on][home.track-record-section][populate]=logos",
  "populate[sections][on][home.process-section][populate][steps][populate]=checklistRows",
  "populate[sections][on][home.services-section][populate][cards][populate]=chips",
  "populate[sections][on][home.resources-section][populate][categories]=true",
  // `[populate]=*` rather than naming `audience`: Strapi 400s on an unknown
  // populate key, and naming a field the deployed CMS does not have yet would
  // fail the whole home fetch (a 400 is non-retryable) and blank the page. The
  // wildcard picks up audience once cms/src/components/home/resource-item.json
  // is deployed, and is harmless before then.
  "populate[sections][on][home.resources-section][populate][items][populate]=*",
  "populate[sections][on][home.pre-footer-section][populate]=*",
].join("&");

// Same one-level-of-populate limit as the homepage: metrics, cards, groups and
// the bullets nested inside each directory card each need their own `on` path.
const SERVICES_POPULATE_QUERY = [
  "populate[sections][on][services.hero-section][populate]=metrics",
  "populate[sections][on][services.problem-section][populate]=cards",
  "populate[sections][on][services.directory-section][populate][groups][populate][cards][populate]=bullets",
  "populate[sections][on][services.audience-section][populate]=cards",
  "populate[sections][on][services.closing-cta-section][populate]=*",
].join("&");

// Sectors index (/sectors). Same one-level-of-populate limit again: the hero's
// metrics, the directory cards, and the category chips nested inside each card
// each need their own path.
const SECTORS_POPULATE_QUERY = [
  "populate[sections][on][sectors.hero-section][populate]=metrics",
  "populate[sections][on][sectors.directory-section][populate][cards][populate]=categories",
  "populate[sections][on][sectors.coverage-section][populate]=*",
  "populate[sections][on][sectors.closing-cta-section][populate]=*",
].join("&");

// Resource library (/resources). `[populate]=*` on the cards picks up the nested
// audience tags in one path; the categories are flat and only need `=true`.
const RESOURCES_POPULATE_QUERY = [
  "populate[sections][on][resources.hero-section][populate]=*",
  "populate[sections][on][resources.library-section][populate][categories]=true",
  "populate[sections][on][resources.library-section][populate][cards][populate]=*",
].join("&");

// About cluster. The about page's own sections are flat, but it renders the
// credentials and team single types inline as its #credentials and #team bands,
// so all three are fetched together by app/about/page.tsx.
//
// `about.pathways-section` is deliberately absent: it is seeded but nothing
// renders it — /about shows the full team and credentials sections instead of
// link-out cards.
const ABOUT_POPULATE_QUERY = [
  "populate[sections][on][about.hero-section][populate]=*",
  "populate[sections][on][about.positioning-section][populate]=*",
  "populate[sections][on][about.process-section][populate]=*",
  "populate[sections][on][about.closing-cta-section][populate]=*",
].join("&");

const CREDENTIALS_POPULATE_QUERY = [
  "populate[sections][on][credentials.hero-section][populate]=*",
  "populate[sections][on][credentials.credentials-section][populate]=credentials",
  "populate[sections][on][credentials.proof-section][populate]=*",
  "populate[sections][on][credentials.closing-cta-section][populate]=*",
].join("&");

// The credential tags nested inside each member need their own path — the same
// one-level-of-populate limit as everywhere else.
const TEAM_POPULATE_QUERY = [
  "populate[sections][on][team.hero-section][populate]=*",
  "populate[sections][on][team.introduction-section][populate]=*",
  "populate[sections][on][team.members-section][populate][members][populate]=credentials",
  "populate[sections][on][team.bridge-section][populate]=*",
  "populate[sections][on][team.closing-cta-section][populate]=*",
].join("&");

// Same again for the rows nested inside each journey stage.
const HOW_WE_WORK_POPULATE_QUERY = [
  "populate[sections][on][how-we-work.hero-section][populate]=*",
  "populate[sections][on][how-we-work.stages-section][populate][stages][populate]=rows",
  "populate[sections][on][how-we-work.involvement-section][populate]=*",
  "populate[sections][on][how-we-work.breach-aside-section][populate]=*",
  "populate[sections][on][how-we-work.closing-cta-section][populate]=*",
].join("&");

const CONTACT_POPULATE_QUERY = [
  "populate[sections][on][contact.hero-section][populate]=*",
  "populate[sections][on][contact.contact-band-section][populate][channels]=true",
  "populate[sections][on][contact.contact-band-section][populate][formReasons]=true",
].join("&");

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = [400, 900];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Only worth retrying when the failure looks transient (network blip, gateway
// down mid-restart) — a 4xx is our own request's fault and won't change on retry.
function isRetryableStatus(status: number) {
  return status >= 500;
}

async function fetchSectionsOnce(
  endpoint: string,
  populateQuery: string,
): Promise<{ ok: true; sections: StrapiSection[] } | { ok: false; retryable: boolean; reason: string }> {
  let response: Response;
  try {
    response = await fetch(`${STRAPI_API_URL}/api/${endpoint}?${populateQuery}`, {
      cache: "no-store",
    });
  } catch (error) {
    return { ok: false, retryable: true, reason: error instanceof Error ? error.message : String(error) };
  }

  if (!response.ok) {
    return { ok: false, retryable: isRetryableStatus(response.status), reason: `status ${response.status}` };
  }

  const json = await response.json();
  const sections = json?.data?.sections;

  if (!Array.isArray(sections)) {
    return { ok: false, retryable: false, reason: "response had no sections array" };
  }

  return { ok: true, sections };
}

async function fetchSections(endpoint: string, populateQuery: string): Promise<StrapiSection[] | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await fetchSectionsOnce(endpoint, populateQuery);

    if (result.ok) {
      console.log(`[cms] ${endpoint} fetch: live data`, { attempt, sectionCount: result.sections.length });
      return result.sections;
    }

    const isLastAttempt = attempt === MAX_ATTEMPTS;
    if (!result.retryable || isLastAttempt) {
      console.log(`[cms] ${endpoint} fetch failed, sections omitted`, { attempt, reason: result.reason });
      return null;
    }

    console.log(`[cms] ${endpoint} fetch attempt failed, retrying`, { attempt, reason: result.reason });
    await sleep(RETRY_DELAY_MS[attempt - 1]);
  }

  return null;
}

export async function fetchHomeSections(): Promise<StrapiSection[] | null> {
  return fetchSections("home", HOME_POPULATE_QUERY);
}

export async function fetchServicesSections(): Promise<StrapiSection[] | null> {
  return fetchSections("services", SERVICES_POPULATE_QUERY);
}

/**
 * The eight service detail single types share an identical five-component shape,
 * differing only in their component namespace — which is the same string as the
 * API endpoint in every case. So one query builder covers all of them.
 */
export type ServiceDetailSlug =
  | "ndpc-registration"
  | "data-mapping-ropa"
  | "gap-assessment-dpia"
  | "policies-remediation"
  | "outsourced-dpo"
  | "compliance-audit-filing"
  | "ongoing-monitoring"
  | "breach-response";

function serviceDetailPopulateQuery(namespace: ServiceDetailSlug) {
  return [
    `populate[sections][on][${namespace}.hero-section][populate]=*`,
    `populate[sections][on][${namespace}.banner-hero-section][populate]=features`,
    `populate[sections][on][${namespace}.what-you-get-section][populate]=*`,
    `populate[sections][on][${namespace}.narrative-section][populate][bodyBlocks][populate]=*`,
    `populate[sections][on][${namespace}.narrative-section][populate][whoThisIsFor]=true`,
    `populate[sections][on][${namespace}.closing-cta-section][populate]=*`,
  ].join("&");
}

export async function fetchServiceDetailSections(slug: ServiceDetailSlug): Promise<StrapiSection[] | null> {
  return fetchSections(slug, serviceDetailPopulateQuery(slug));
}

export async function fetchSectorsSections(): Promise<StrapiSection[] | null> {
  return fetchSections("sectors", SECTORS_POPULATE_QUERY);
}

/**
 * The three sector detail single types share a component shape whose namespace
 * is again the same string as the API endpoint — with one difference: only
 * regulated-businesses carries a turnarounds section.
 */
export type SectorDetailSlug = "tertiary-institutions" | "regulated-businesses" | "public-sector";

function sectorDetailPopulateQuery(namespace: SectorDetailSlug) {
  const paths = [
    `populate[sections][on][${namespace}.hero-section][populate]=*`,
    `populate[sections][on][${namespace}.credential-section][populate]=reasons`,
    `populate[sections][on][${namespace}.proof-section][populate]=*`,
    // `[populate]=*` on the items picks up both `links` and `stages` in one path.
    `populate[sections][on][${namespace}.accordion-section][populate][items][populate]=*`,
    `populate[sections][on][${namespace}.section-nav-section][populate]=items`,
    `populate[sections][on][${namespace}.closing-cta-section][populate]=*`,
  ];

  // Naming a component that is not in this type's dynamiczone risks a 400, and a
  // 400 is non-retryable — it would blank the page. So only ask for turnarounds
  // on the one type that has them.
  if (namespace === "regulated-businesses") {
    paths.push(`populate[sections][on][${namespace}.turnarounds-section][populate]=steps`);
  }

  return paths.join("&");
}

export async function fetchSectorDetailSections(slug: SectorDetailSlug): Promise<StrapiSection[] | null> {
  return fetchSections(slug, sectorDetailPopulateQuery(slug));
}

export async function fetchResourcesSections(): Promise<StrapiSection[] | null> {
  return fetchSections("resources", RESOURCES_POPULATE_QUERY);
}

/**
 * The three resource article single types share an identical five-component
 * shape whose namespace is again the same string as the API endpoint, so one
 * query builder covers all of them.
 */
export const RESOURCE_ARTICLE_SLUGS = [
  "ndpc-compliance-categories-explained",
  "ropa-dpia-lia-explained",
  "vendor-due-diligence",
] as const;

export type ResourceArticleSlug = (typeof RESOURCE_ARTICLE_SLUGS)[number];

export function isResourceArticleSlug(slug: string): slug is ResourceArticleSlug {
  return (RESOURCE_ARTICLE_SLUGS as readonly string[]).includes(slug);
}

function resourceArticlePopulateQuery(namespace: ResourceArticleSlug) {
  return [
    `populate[sections][on][${namespace}.hero-section][populate]=audience`,
    // `[populate]=*` on the body's section items picks up both `paragraphs` and
    // `points` in one path.
    `populate[sections][on][${namespace}.body-section][populate][sections][populate]=*`,
    `populate[sections][on][${namespace}.cta-section][populate]=*`,
    `populate[sections][on][${namespace}.sidebar-section][populate]=*`,
    `populate[sections][on][${namespace}.related-section][populate]=relatedSlugs`,
  ].join("&");
}

export async function fetchResourceArticleSections(slug: ResourceArticleSlug): Promise<StrapiSection[] | null> {
  return fetchSections(slug, resourceArticlePopulateQuery(slug));
}

export async function fetchAboutSections(): Promise<StrapiSection[] | null> {
  return fetchSections("about", ABOUT_POPULATE_QUERY);
}

export async function fetchCredentialsSections(): Promise<StrapiSection[] | null> {
  return fetchSections("credentials", CREDENTIALS_POPULATE_QUERY);
}

export async function fetchTeamSections(): Promise<StrapiSection[] | null> {
  return fetchSections("team", TEAM_POPULATE_QUERY);
}

export async function fetchHowWeWorkSections(): Promise<StrapiSection[] | null> {
  return fetchSections("how-we-work", HOW_WE_WORK_POPULATE_QUERY);
}

export async function fetchContactSections(): Promise<StrapiSection[] | null> {
  return fetchSections("contact", CONTACT_POPULATE_QUERY);
}
