// Minimal Strapi 5 fetch layer for the homepage (`home` single type). Server-only —
// STRAPI_API_TOKEN must never be prefixed with NEXT_PUBLIC_.

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
  "populate[sections][on][home.resources-section][populate]=categories",
  "populate[sections][on][home.pre-footer-section][populate]=*",
].join("&");

export async function fetchHomeSections(): Promise<StrapiSection[] | null> {
  try {
    const headers: Record<string, string> = {};
    if (process.env.STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_API_URL}/api/home?${HOME_POPULATE_QUERY}`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.log("[cms] home fetch failed, using fallback content", { status: response.status });
      return null;
    }

    const json = await response.json();
    const sections = json?.data?.sections;

    if (!Array.isArray(sections)) {
      console.log("[cms] home fetch returned no sections, using fallback content", { status: response.status, data: json?.data });
      return null;
    }

    console.log("[cms] home fetch: live data", { status: response.status, sectionCount: sections.length });
    return sections;
  } catch (error) {
    console.log("[cms] home fetch threw, using fallback content", { error: error instanceof Error ? error.message : error });
    return null;
  }
}
