import type { StrapiSection } from "@/lib/cms/client";

/**
 * Maps the `learning-development` single type onto the props the
 * `/learning-and-development` page renders. Same conventions as mapServices.ts:
 * every field is read defensively, and a section missing its required fields
 * maps to `null`. The page has no fallback copy, so `mapLearningDevelopmentPage`
 * is all-or-nothing — a partial page is never rendered.
 */

export interface LearningDevelopmentHeroContent {
  eyebrow: string;
  h1: string;
  summary: string;
  primaryCta: { label: string; href: string };
  bannerImage: string;
  bannerAlt: string;
}

export interface LearningDevelopmentDeliveryContent {
  label: string;
  body: string;
  metricsLabel: string;
  metrics: { value: string; label: string }[];
}

export interface LearningDevelopmentClientsContent {
  label: string;
  clients: string[];
}

export interface LearningDevelopmentFocusAreasContent {
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
  delivery: LearningDevelopmentDeliveryContent;
  clients: LearningDevelopmentClientsContent;
  focusAreas: LearningDevelopmentFocusAreasContent;
  closing: LearningDevelopmentClosingContent;
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

function mapHero(sections: StrapiSection[] | null): LearningDevelopmentHeroContent | null {
  const section = findSection(sections, "learning-development.hero-section");
  if (!section?.h1) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h1: String(section.h1),
    summary: String(section.summary ?? ""),
    primaryCta: {
      label: String(section.primaryCtaLabel ?? ""),
      href: String(section.primaryCtaHref ?? ""),
    },
    bannerImage: String(section.bannerImage ?? ""),
    bannerAlt: String(section.bannerImage_alt_text ?? ""),
  };
}

function mapDelivery(sections: StrapiSection[] | null): LearningDevelopmentDeliveryContent | null {
  const section = findSection(sections, "learning-development.delivery-section");
  if (!section?.body) return null;
  const metrics = section.metrics as Array<{ value?: unknown; label?: unknown }> | undefined;

  return {
    label: String(section.label ?? ""),
    body: String(section.body),
    metricsLabel: String(section.metricsLabel ?? ""),
    metrics: (metrics ?? []).map((metric) => ({
      value: String(metric.value ?? ""),
      label: String(metric.label ?? ""),
    })),
  };
}

function mapClients(sections: StrapiSection[] | null): LearningDevelopmentClientsContent | null {
  const section = findSection(sections, "learning-development.clients-section");
  if (!section) return null;
  const clients = section.clients as Array<{ name?: unknown }> | undefined;
  if (!clients?.length) return null;

  return {
    label: String(section.label ?? ""),
    // A blank name would render as an empty slot in the strip, so drop it
    // rather than let the CMS punch a hole in the row.
    clients: clients.map((client) => String(client.name ?? "").trim()).filter(Boolean),
  };
}

function mapFocusAreas(sections: StrapiSection[] | null): LearningDevelopmentFocusAreasContent | null {
  const section = findSection(sections, "learning-development.focus-areas-section");
  if (!section) return null;
  const items = section.items as Array<{ number?: unknown; title?: unknown; body?: unknown }> | undefined;
  if (!items?.length) return null;

  return {
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
  const delivery = mapDelivery(sections);
  const clients = mapClients(sections);
  const focusAreas = mapFocusAreas(sections);
  const closing = mapClosing(sections);

  if (!hero || !delivery || !clients || !focusAreas || !closing) return null;
  return { hero, delivery, clients, focusAreas, closing };
}
