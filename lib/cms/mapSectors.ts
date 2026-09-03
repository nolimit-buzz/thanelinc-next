import type { StrapiSection } from "@/lib/cms/client";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `sectors` single type onto the props `SectorsDirectory` renders.
 * Same conventions as mapServices.ts: no fallback copy, and an unrecognised
 * icon drops the card rather than being cast into the component's closed union.
 */

export interface SectorsHeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: { value: string; label: string }[];
  image: { src: string; alt: string; width: number; height: number };
  floatingPanel: { eyebrow: string; title: string; body: string };
  credentialPanel: { eyebrow: string; title: string; body: string };
}

export interface SectorsDirectoryContent {
  eyebrow: string;
  h2: string;
  subhead: string;
  cards: {
    number: string;
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    icon: SectorIconName;
    categories: string[];
  }[];
}

export interface SectorsCoverageContent {
  eyebrow: string;
  h2: string;
  body: string;
  cta: { label: string; href: string };
}

export interface SectorsClosingContent {
  heading: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  backgroundImage?: string;
  cutoutImage?: string;
}

export interface SectorsPageContent {
  hero: SectorsHeroContent;
  directory: SectorsDirectoryContent;
  coverage: SectorsCoverageContent;
  closing: SectorsClosingContent;
}

// `ServiceRowIcon`'s keys, narrowed to the three sector marks. `landmark` is
// required here: the public sector card is seeded with it, and an icon outside
// this list silently drops its card.
const SECTOR_ICONS = ["graduation-cap", "building", "landmark"] as const;
type SectorIconName = (typeof SECTOR_ICONS)[number];

function isOneOf<T extends readonly string[]>(allowed: T, value: unknown): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

/** The split hero's cutout has no dimensions field in the CMS; these are the
 *  intrinsic ones, and the local asset stands in until an image is set. */
const HERO_IMAGE = {
  src: "/regulated-businesses-cutout.png",
  alt: "Thanelinc compliance adviser carrying an NDPC report",
  width: 500,
  height: 810,
};

function mapHero(sections: StrapiSection[] | null): SectorsHeroContent | null {
  const section = findSection(sections, "sectors.hero-section");
  if (!section) return null;
  const metrics = section.metrics as Array<{ value: string; label: string }> | undefined;
  if (!section.title || !metrics?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    title: String(section.title),
    titleAccent: String(section.titleAccent ?? ""),
    summary: String(section.summary ?? ""),
    primaryCta: { label: String(section.primaryCtaLabel ?? ""), href: String(section.primaryCtaHref ?? "") },
    secondaryCta: { label: String(section.secondaryCtaLabel ?? ""), href: String(section.secondaryCtaHref ?? "") },
    metrics: metrics.map((metric) => ({ value: metric.value, label: metric.label })),
    image: {
      src: section.heroImage ? withCloudinaryTransform(String(section.heroImage), 900) : HERO_IMAGE.src,
      alt: String(section.heroImage_alt_text ?? HERO_IMAGE.alt),
      width: HERO_IMAGE.width,
      height: HERO_IMAGE.height,
    },
    floatingPanel: {
      eyebrow: String(section.floatingPanelEyebrow ?? ""),
      title: String(section.floatingPanelTitle ?? ""),
      body: String(section.floatingPanelBody ?? ""),
    },
    credentialPanel: {
      eyebrow: String(section.credentialPanelEyebrow ?? ""),
      title: String(section.credentialPanelTitle ?? ""),
      body: String(section.credentialPanelBody ?? ""),
    },
  };
}

function mapDirectory(sections: StrapiSection[] | null): SectorsDirectoryContent | null {
  const section = findSection(sections, "sectors.directory-section");
  if (!section) return null;
  type CmsCard = {
    number: string;
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    icon: string;
    categories?: Array<{ label: string }>;
  };
  const cards = section.cards as CmsCard[] | undefined;
  if (!section.h2 || !cards?.length) return null;

  const mappedCards = cards
    .filter((card) => isOneOf(SECTOR_ICONS, card.icon))
    .map((card) => ({
      number: card.number,
      eyebrow: card.eyebrow,
      title: card.title,
      body: card.body,
      href: card.href,
      cta: card.cta,
      icon: card.icon as SectorIconName,
      categories: (card.categories ?? []).map((category) => category.label),
    }));
  if (!mappedCards.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2),
    subhead: String(section.subhead ?? ""),
    cards: mappedCards,
  };
}

function mapCoverage(sections: StrapiSection[] | null): SectorsCoverageContent | null {
  const section = findSection(sections, "sectors.coverage-section");
  if (!section?.h2) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2),
    body: String(section.body ?? ""),
    cta: { label: String(section.ctaLabel ?? ""), href: String(section.ctaHref ?? "") },
  };
}

function mapClosing(sections: StrapiSection[] | null): SectorsClosingContent | null {
  const section = findSection(sections, "sectors.closing-cta-section");
  if (!section?.heading) return null;

  return {
    heading: String(section.heading),
    primary: { label: String(section.primaryLabel ?? ""), href: String(section.primaryHref ?? "") },
    secondary: { label: String(section.secondaryLabel ?? ""), href: String(section.secondaryHref ?? "") },
    backgroundImage: section.backgroundImage
      ? withCloudinaryTransform(String(section.backgroundImage), 1600)
      : undefined,
    cutoutImage: section.cutoutImage ? withCloudinaryTransform(String(section.cutoutImage), 700) : undefined,
  };
}

/**
 * All-or-nothing, like `mapServicesPage`: /sectors is one continuous page whose
 * directory is the reason to visit it, so a half-rendered page is worse than
 * the unavailable notice.
 */
export function mapSectorsPage(sections: StrapiSection[] | null): SectorsPageContent | null {
  const hero = mapHero(sections);
  const directory = mapDirectory(sections);
  const coverage = mapCoverage(sections);
  const closing = mapClosing(sections);

  if (!hero || !directory || !coverage || !closing) return null;
  return { hero, directory, coverage, closing };
}
