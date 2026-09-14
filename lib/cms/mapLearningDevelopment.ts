import type { StrapiSection } from "@/lib/cms/client";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `learning-development` single type onto the props the
 * `/learning-and-development` page renders. Styled like `mapServices.ts` —
 * this page now mirrors the Services index page's hero/approach/directory/
 * audience/closing structure, reusing the same shared `IndexSplitHero` and
 * `services-directory.module.css` visual language. Same conventions as
 * mapServices.ts: every field is read defensively, and a section missing its
 * required fields maps to `null`. The page has no fallback copy, so
 * `mapLearningDevelopmentPage` is all-or-nothing — a partial page is never
 * rendered.
 */

export interface LearningDevelopmentHeroContent {
  eyebrow: string;
  h1: string;
  titleAccent: string;
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: { value: string; label: string }[];
  image: { src: string; alt: string; width: number; height: number };
  floatingPanel: { eyebrow: string; title: string; body: string };
  credentialPanel: { eyebrow: string; title: string; body: string };
}

export interface LearningDevelopmentApproachContent {
  eyebrow: string;
  h2: string;
  label: string;
  body: string;
  cards: { title: string; desc: string; icon: ApproachIconName }[];
}

export interface LearningDevelopmentClientsContent {
  eyebrow: string;
  heading: string;
  logos: { name: string; logoMarkup: string }[];
}

export interface LearningDevelopmentFocusAreasContent {
  eyebrow: string;
  h2: string;
  subhead: string;
  label: string;
  items: { number: string; title: string; body: string }[];
}

export interface LearningDevelopmentClosingContent {
  heading: string;
  primaryCta: { label: string; href: string };
  backgroundImage?: string;
}

export interface LearningDevelopmentPageContent {
  hero: LearningDevelopmentHeroContent;
  approach: LearningDevelopmentApproachContent;
  clients: LearningDevelopmentClientsContent;
  focusAreas: LearningDevelopmentFocusAreasContent;
  closing: LearningDevelopmentClosingContent;
}

// Closed union, same defensive posture as mapServices.ts's icon allowlists —
// an unrecognised value drops the card rather than being cast through.
const APPROACH_ICONS = ["compass", "layers", "map"] as const;
type ApproachIconName = (typeof APPROACH_ICONS)[number];

function isOneOf<T extends readonly string[]>(allowed: T, value: unknown): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

/** The hero cutout has no dimensions field in the CMS; same intrinsic size as the Services hero image. */
const HERO_IMAGE_SIZE = { width: 640, height: 1074 };

function mapHero(sections: StrapiSection[] | null): LearningDevelopmentHeroContent | null {
  const section = findSection(sections, "learning-development.hero-section");
  if (!section) return null;
  const metrics = section.metrics as Array<{ value?: unknown; label?: unknown }> | undefined;
  if (!section.h1 || !metrics?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h1: String(section.h1),
    titleAccent: String(section.titleAccent ?? ""),
    summary: String(section.summary ?? ""),
    primaryCta: { label: String(section.primaryCtaLabel ?? ""), href: String(section.primaryCtaHref ?? "") },
    secondaryCta: { label: String(section.secondaryCtaLabel ?? ""), href: String(section.secondaryCtaHref ?? "") },
    metrics: metrics.map((metric) => ({ value: String(metric.value ?? ""), label: String(metric.label ?? "") })),
    image: {
      src: withCloudinaryTransform(String(section.heroImage ?? ""), 900),
      alt: String(section.heroImage_alt_text ?? ""),
      ...HERO_IMAGE_SIZE,
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

function mapApproach(sections: StrapiSection[] | null): LearningDevelopmentApproachContent | null {
  const section = findSection(sections, "learning-development.delivery-section");
  if (!section?.body) return null;
  const cards = section.cards as Array<{ title?: unknown; desc?: unknown; icon?: unknown }> | undefined;

  const mappedCards = (cards ?? [])
    .filter((card) => isOneOf(APPROACH_ICONS, card.icon))
    .map((card) => ({ title: String(card.title ?? ""), desc: String(card.desc ?? ""), icon: card.icon as ApproachIconName }));
  if (!mappedCards.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2 ?? ""),
    label: String(section.label ?? ""),
    body: String(section.body),
    cards: mappedCards,
  };
}

function mapClients(sections: StrapiSection[] | null): LearningDevelopmentClientsContent | null {
  const section = findSection(sections, "learning-development.clients-section");
  if (!section) return null;
  const clients = section.clients as Array<{ name?: unknown; logoMarkup?: unknown }> | undefined;

  // A client missing either field would render a broken tile in the marquee
  // (a blank name for the tooltip/key, or an empty logo slot), so both are
  // required rather than falling back to placeholder content.
  const logos = (clients ?? [])
    .map((client) => ({ name: String(client.name ?? "").trim(), logoMarkup: String(client.logoMarkup ?? "").trim() }))
    .filter((client) => client.name && client.logoMarkup);
  if (!logos.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    heading: String(section.label ?? ""),
    logos,
  };
}

function mapFocusAreas(sections: StrapiSection[] | null): LearningDevelopmentFocusAreasContent | null {
  const section = findSection(sections, "learning-development.focus-areas-section");
  if (!section) return null;
  const items = section.items as Array<{ number?: unknown; title?: unknown; body?: unknown }> | undefined;
  if (!items?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2 ?? ""),
    subhead: String(section.subhead ?? ""),
    label: String(section.label ?? ""),
    items: items.map((item, index) => ({
      // Numbers are authored so the CMS controls the sequence, but an unset one
      // falls back to the item's position rather than rendering blank.
      number: String(item.number ?? "").trim() || String(index + 1).padStart(2, "0"),
      title: String(item.title ?? ""),
      body: String(item.body ?? ""),
    })),
  };
}

function mapClosing(sections: StrapiSection[] | null): LearningDevelopmentClosingContent | null {
  const section = findSection(sections, "learning-development.closing-cta-section");
  if (!section?.heading) return null;

  return {
    heading: String(section.heading),
    primaryCta: {
      label: String(section.primaryCtaLabel ?? ""),
      href: String(section.primaryCtaHref ?? ""),
    },
    // Left undefined so InnerPageCta falls back to its own default image.
    backgroundImage: section.backgroundImage ? String(section.backgroundImage) : undefined,
  };
}

export function mapLearningDevelopmentPage(
  sections: StrapiSection[] | null,
): LearningDevelopmentPageContent | null {
  const hero = mapHero(sections);
  const approach = mapApproach(sections);
  const clients = mapClients(sections);
  const focusAreas = mapFocusAreas(sections);
  const closing = mapClosing(sections);

  if (!hero || !approach || !clients || !focusAreas || !closing) return null;
  return { hero, approach, clients, focusAreas, closing };
}
