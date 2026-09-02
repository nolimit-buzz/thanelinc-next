// Minimal Strapi 5 fetch layer for the homepage (`home` single type). The `home`
// single type's find permission is public, so this sends no credentials.

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

async function fetchHomeSectionsOnce(): Promise<{ ok: true; sections: StrapiSection[] } | { ok: false; retryable: boolean; reason: string }> {
  let response: Response;
  try {
    response = await fetch(`${STRAPI_API_URL}/api/home?${HOME_POPULATE_QUERY}`, {
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

export async function fetchHomeSections(): Promise<StrapiSection[] | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await fetchHomeSectionsOnce();

    if (result.ok) {
      console.log("[cms] home fetch: live data", { attempt, sectionCount: result.sections.length });
      return result.sections;
    }

    const isLastAttempt = attempt === MAX_ATTEMPTS;
    if (!result.retryable || isLastAttempt) {
      console.log("[cms] home fetch failed, sections omitted", { attempt, reason: result.reason });
      return null;
    }

    console.log("[cms] home fetch attempt failed, retrying", { attempt, reason: result.reason });
    await sleep(RETRY_DELAY_MS[attempt - 1]);
  }

  return null;
}
