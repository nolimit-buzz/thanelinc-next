import type { StrapiSection } from "@/lib/cms/client";
import type { ResourceCardItem } from "@/components/resources/ResourceCards";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `resources` single type onto the props `ResourcesLibraryPage` renders.
 * Same conventions as mapServices.ts: a section short of its required fields maps
 * to `null`, and the page maps all-or-nothing — there is no fallback copy.
 */

export interface ResourcesHeroContent {
  eyebrow: string;
  h1: string;
  subhead: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ResourcesLibrarySectionContent {
  listHeaderLabel: string;
  listHeaderHeading: string;
  suggestTopicLabel: string;
  suggestTopicHref: string;
  stateLiveLabel: string;
  stateComingSoonLabel: string;
  cardReadLabel: string;
  cardReviewedLabel: string;
  categories: { id: string; label: string; detail: string; state: CategoryState }[];
  cards: ResourceCardItem[];
}

export interface ResourcesLibraryContent {
  hero: ResourcesHeroContent;
  library: ResourcesLibrarySectionContent;
}

// `state` drives which badge a category renders, so it stays a closed union
// rather than a cast of free-text CMS input — an unrecognised value drops the
// category, matching mapServices.ts's icon allowlists.
const CATEGORY_STATES = ["live", "coming-soon"] as const;
type CategoryState = (typeof CATEGORY_STATES)[number];

/**
 * Added to the components after the entry was seeded, so these read empty until
 * the CMS is backfilled. They are chrome rather than the page's own copy, and a
 * blank badge or aria-label is a worse failure than a stale default, so each one
 * falls back to the wording it had when it lived in the JSX. The defaults live
 * here, not in the components, so the "no copy in JSX" rule still holds.
 */
const DEFAULTS = {
  metaTitle: "Resource Library",
  metaDescription: "Explainers, articles, news and training updates for compliance owners.",
  stateLiveLabel: "Published now",
  stateComingSoonLabel: "Coming soon",
  cardReadLabel: "Read",
  cardReviewedLabel: "Reviewed",
} as const;

/** CMS value when set, else the pre-CMS wording. Never returns an empty string. */
function text(value: unknown, fallback: string): string {
  return String(value ?? "").trim() || fallback;
}

function isOneOf<T extends readonly string[]>(allowed: T, value: unknown): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

interface CmsResourceCard {
  slug: string;
  kind: string;
  title: string;
  summary: string;
  lastReviewed: string;
  image?: string;
  image_alt_text?: string;
  audience?: Array<{ label: string }>;
}

/** Shared with mapResourceArticle.ts, which resolves related cards from this list. */
export function mapResourceCard(card: CmsResourceCard): ResourceCardItem {
  return {
    slug: String(card.slug ?? ""),
    kind: String(card.kind ?? ""),
    title: String(card.title ?? ""),
    summary: String(card.summary ?? ""),
    lastReviewed: String(card.lastReviewed ?? ""),
    image: {
      src: withCloudinaryTransform(String(card.image ?? ""), 900),
      alt: String(card.image_alt_text ?? ""),
    },
    audience: (card.audience ?? []).map((tag) => String(tag.label ?? "")),
  };
}

function mapHero(sections: StrapiSection[] | null): ResourcesHeroContent | null {
  const section = findSection(sections, "resources.hero-section");
  if (!section?.h1) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h1: String(section.h1),
    subhead: String(section.subhead ?? ""),
    metaTitle: text(section.metaTitle, DEFAULTS.metaTitle),
    metaDescription: text(section.metaDescription, DEFAULTS.metaDescription),
  };
}

function mapLibrary(sections: StrapiSection[] | null): ResourcesLibrarySectionContent | null {
  const section = findSection(sections, "resources.library-section");
  if (!section) return null;

  type CmsCategory = { kindId: string; label: string; detail: string; state: string };
  const categories = section.categories as CmsCategory[] | undefined;
  const cards = section.cards as CmsResourceCard[] | undefined;
  if (!cards?.length) return null;

  return {
    listHeaderLabel: String(section.listHeaderLabel ?? ""),
    listHeaderHeading: String(section.listHeaderHeading ?? ""),
    suggestTopicLabel: String(section.suggestTopicLabel ?? ""),
    suggestTopicHref: String(section.suggestTopicHref ?? ""),
    stateLiveLabel: text(section.stateLiveLabel, DEFAULTS.stateLiveLabel),
    stateComingSoonLabel: text(section.stateComingSoonLabel, DEFAULTS.stateComingSoonLabel),
    cardReadLabel: text(section.cardReadLabel, DEFAULTS.cardReadLabel),
    cardReviewedLabel: text(section.cardReviewedLabel, DEFAULTS.cardReviewedLabel),
    categories: (categories ?? [])
      .filter((category) => isOneOf(CATEGORY_STATES, category.state))
      .map((category) => ({
        id: String(category.kindId ?? ""),
        label: String(category.label ?? ""),
        detail: String(category.detail ?? ""),
        state: category.state as CategoryState,
      })),
    cards: cards.map(mapResourceCard),
  };
}

export function mapResourcesPage(sections: StrapiSection[] | null): ResourcesLibraryContent | null {
  const hero = mapHero(sections);
  const library = mapLibrary(sections);

  if (!hero || !library) return null;
  return { hero, library };
}

/** The library cards double as the source for an article page's related list. */
export function mapResourceCards(sections: StrapiSection[] | null): ResourceCardItem[] {
  return mapLibrary(sections)?.cards ?? [];
}

export interface ResourceCardLabels {
  readLabel: string;
  reviewedLabel: string;
}

/**
 * The card labels belong to the library section, so the article page's related
 * list takes them from there too rather than from the article's own chrome.
 * Falls back to the defaults when the library fetch failed.
 */
export function mapResourceCardLabels(sections: StrapiSection[] | null): ResourceCardLabels {
  const library = mapLibrary(sections);
  return {
    readLabel: library?.cardReadLabel ?? DEFAULTS.cardReadLabel,
    reviewedLabel: library?.cardReviewedLabel ?? DEFAULTS.cardReviewedLabel,
  };
}
