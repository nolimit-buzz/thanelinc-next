import type { StrapiSection } from "@/lib/cms/client";
import type { HomeHeroContent } from "@/components/design-review/HomeHeroArtworkReview";
import type { ProblemContent } from "@/components/v5/Problem";
import type { SelfCheckContent } from "@/components/v5/SelfCheck";
import type { SectorAccordionContent } from "@/components/v5/SectorAccordion";
import type { TrackRecordContent } from "@/components/v5/TrackRecord";
import type { ProcessContent } from "@/components/v5/Process";
import type { ServicesContent } from "@/components/v5/Services";
import type { PreFooterContent } from "@/components/v5/PreFooter";
import type { ResourcesHomeContent } from "@/lib/content/resources";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

// Self-check trust items are gated per AGENTS.md rule 2 (never add an uncleared
// client name) — only the names the Strapi field's own schema description lists
// are allowed through, everything else from the CMS is silently dropped.
const ALLOWED_TRUST_ITEM_LABELS = new Set([
  "Nigerian Bar Association (NBA Election 2026)",
  "Levitate",
  "Licensed DPCO · NDPC GAID 2025",
]);

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

export function mapHero(sections: StrapiSection[] | null): HomeHeroContent | null {
  const section = findSection(sections, "home.hero-section");
  if (!section) return null;
  type CmsSlide = {
    slideId: string;
    eyebrow: string;
    title: string;
    description?: string;
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageWidth: string | number;
    imageHeight: string | number;
  };
  const slides = section.slides as CmsSlide[] | undefined;
  if (!section.headlineLead || !slides?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    headlinePrimary: String(section.headlineLead),
    headlineLead: String(section.headlineAccentPrimary ?? ""),
    headlineAccent: String(section.headlineAccentSecondary ?? ""),
    headlineSecondary: String(section.headlineSecondary ?? ""),
    lede: String(section.lede ?? ""),
    primaryCta: { label: String(section.ctaLabel ?? ""), href: String(section.ctaHref ?? "") },
    primaryCtaCaption: String(section.ctaSubCaption ?? ""),
    scrollLabel: String(section.scrollLabel ?? ""),
    slides: slides.map((slide) => ({
      id: slide.slideId,
      title: slide.title,
      eyebrow: slide.eyebrow,
      description: slide.description ?? "",
      image: {
        src: withCloudinaryTransform(slide.imageSrc, 1400),
        width: Number(slide.imageWidth) || 0,
        height: Number(slide.imageHeight) || 0,
      },
      cta: { label: slide.ctaLabel, href: slide.ctaHref },
    })),
  };
}

export function mapResources(sections: StrapiSection[] | null): ResourcesHomeContent | null {
  const section = findSection(sections, "home.resources-section");
  if (!section) return null;
  type CmsCategory = { categoryId: string; label: string; detail: string; state: "live" | "coming-soon" };
  type CmsItem = {
    resourceId: string;
    category: string;
    title: string;
    body: string;
    lastReviewed: string;
    href: string;
    image: string;
    image_alt_text: string;
    audience?: Array<{ label: string }>;
  };
  const categories = section.categories as CmsCategory[] | undefined;
  const items = section.items as CmsItem[] | undefined;
  if (!section.heading || !categories?.length || !items?.length) return null;

  return {
    eyebrow: String(section.badge ?? ""),
    heading: String(section.heading),
    body: String(section.body ?? ""),
    items: items.map((item) => ({
      id: item.resourceId,
      category: item.category,
      title: item.title,
      body: item.body,
      lastReviewed: item.lastReviewed.trim(),
      href: item.href,
      image: {
        src: withCloudinaryTransform(item.image, 1200),
        alt: item.image_alt_text,
      },
      audience: (item.audience ?? []).map((tag) => tag.label),
    })),
    categories: categories.map((category) => ({
      id: category.categoryId,
      label: category.label,
      detail: category.detail,
      state: category.state,
    })),
    cta: { label: String(section.ctaLabel ?? ""), href: String(section.ctaHref ?? ""), variant: "ghost" },
  };
}

export function mapProblem(sections: StrapiSection[] | null): ProblemContent | null {
  const section = findSection(sections, "home.problem-section");
  if (!section) return null;
  const painPoints = section.painPoints as Array<{ title: string; body: string }> | undefined;
  if (!section.heading || !painPoints?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    heading: String(section.heading),
    statLinePrefix: String(section.statLinePrefix ?? ""),
    statLineEmphasis: String(section.statLineEmphasis ?? ""),
    statLineSuffix: String(section.statLineSuffix ?? ""),
    painPoints: painPoints.map((item) => ({ title: item.title, body: item.body })),
  };
}

export function mapSelfCheck(sections: StrapiSection[] | null): SelfCheckContent | null {
  const section = findSection(sections, "home.self-check-section");
  if (!section) return null;
  const trustItems = section.trustItems as Array<{ label: string }> | undefined;
  if (!section.heading) return null;

  return {
    badge: String(section.badge ?? ""),
    heading: String(section.heading),
    body: String(section.body ?? ""),
    primaryCtaLabel: String(section.primaryCtaLabel ?? ""),
    primaryCtaHref: String(section.primaryCtaHref ?? ""),
    secondaryCtaLabel: String(section.secondaryCtaLabel ?? ""),
    secondaryCtaHref: String(section.secondaryCtaHref ?? ""),
    diagnosticTitle: String(section.diagnosticTitle ?? ""),
    diagnosticSubtitle: String(section.diagnosticSubtitle ?? ""),
    diagnosticStatusLabel: String(section.diagnosticStatusLabel ?? ""),
    trustTitle: String(section.trustTitle ?? ""),
    trustItems: (trustItems ?? [])
      .filter((item) => ALLOWED_TRUST_ITEM_LABELS.has(item.label))
      .map((item) => ({ label: item.label })),
  };
}

export function mapSectorAccordion(sections: StrapiSection[] | null): SectorAccordionContent | null {
  const section = findSection(sections, "home.sector-accordion-section");
  if (!section) return null;
  type CmsCard = {
    sectorId: string;
    imageSrc: string;
    imageAlt: string;
    collapsedTitle: string;
    drawerTitle: string;
    drawerHook: string;
    sublinks?: Array<{ label: string; href: string }>;
    ctaLabel: string;
    ctaHref: string;
  };
  const cards = section.cards as CmsCard[] | undefined;
  if (!section.heading || !cards?.length) return null;

  return {
    badge: String(section.badge ?? ""),
    heading: String(section.heading),
    subtext: String(section.subtext ?? ""),
    checkLinkLabel: String(section.checkLinkLabel ?? ""),
    checkLinkHref: String(section.checkLinkHref ?? ""),
    cards: cards.map((card) => ({
      sectorId: card.sectorId,
      imageSrc: withCloudinaryTransform(card.imageSrc, 1200),
      imageAlt: card.imageAlt,
      collapsedTitle: card.collapsedTitle,
      drawerTitle: card.drawerTitle,
      drawerHook: card.drawerHook,
      sublinks: (card.sublinks ?? []).map((link) => ({ label: link.label, href: link.href })),
      ctaLabel: card.ctaLabel,
      ctaHref: card.ctaHref,
    })),
  };
}

export function mapTrackRecord(sections: StrapiSection[] | null): TrackRecordContent | null {
  const section = findSection(sections, "home.track-record-section");
  if (!section) return null;
  const logos = section.logos as Array<{ name: string; logoMarkup: string }> | undefined;
  if (!section.heading || !logos?.length) return null;

  return {
    badge: String(section.badge ?? ""),
    heading: String(section.heading),
    body: String(section.body ?? ""),
    logos: logos.map((logo) => ({ name: logo.name, logoMarkup: logo.logoMarkup })),
  };
}

export function mapProcess(sections: StrapiSection[] | null): ProcessContent | null {
  const section = findSection(sections, "home.process-section");
  if (!section) return null;
  type CmsStep = {
    stepNumber: string;
    pillLabel: string;
    title: string;
    body: string;
    checklistRows?: Array<{ label: string; statusLabel: string; statusVariant: string }>;
  };
  const steps = section.steps as CmsStep[] | undefined;
  if (!section.heading || !steps?.length) return null;

  return {
    badge: String(section.badge ?? ""),
    heading: String(section.heading),
    body: String(section.body ?? ""),
    steps: steps.map((step) => ({
      stepNumber: step.stepNumber,
      pillLabel: step.pillLabel,
      title: step.title,
      body: step.body,
      checklistRows: (step.checklistRows ?? []).map((row) => ({
        label: row.label,
        statusLabel: row.statusLabel,
        statusVariant: row.statusVariant,
      })),
    })),
    bottomLinkLabel: String(section.bottomLinkLabel ?? ""),
    bottomLinkHref: String(section.bottomLinkHref ?? ""),
  };
}

export function mapServices(sections: StrapiSection[] | null): ServicesContent | null {
  const section = findSection(sections, "home.services-section");
  if (!section) return null;
  type CmsCard = {
    serviceId: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    descriptionShort: string;
    descriptionFull: string;
    chips?: Array<{ label: string }>;
    ctaLabel: string;
    ctaHref: string;
    isDefaultOpen?: boolean;
  };
  const cards = (section.cards as CmsCard[] | undefined)?.filter(
    // AGENTS.md rule 6: every service needs a stated deliverable — drop cards
    // that arrive without a full description or at least one chip rather than
    // rendering an incomplete safeguard.
    (card) => card.descriptionFull && card.chips?.length,
  );
  if (!section.headingPrimary || !cards?.length) return null;

  return {
    badge: String(section.badge ?? ""),
    headingPrimary: String(section.headingPrimary),
    headingSecondary: String(section.headingSecondary ?? ""),
    body: String(section.body ?? ""),
    cards: cards.map((card) => ({
      serviceId: card.serviceId,
      imageSrc: withCloudinaryTransform(card.imageSrc, 1200),
      imageAlt: card.imageAlt,
      title: card.title,
      descriptionShort: card.descriptionShort,
      descriptionFull: card.descriptionFull,
      chips: (card.chips ?? []).map((chip) => ({ label: chip.label })),
      ctaLabel: card.ctaLabel,
      ctaHref: card.ctaHref,
      isDefaultOpen: Boolean(card.isDefaultOpen),
    })),
    allServicesLabel: String(section.allServicesLabel ?? ""),
    allServicesHref: String(section.allServicesHref ?? ""),
  };
}

export function mapPreFooter(sections: StrapiSection[] | null): PreFooterContent | null {
  const section = findSection(sections, "home.pre-footer-section");
  if (!section) return null;
  if (!section.heading) return null;

  return {
    badge: String(section.badge ?? ""),
    heading: String(section.heading),
    body: String(section.body ?? ""),
    imageSrc: withCloudinaryTransform(String(section.imageSrc ?? ""), 1200),
    imageAlt: String(section.imageAlt ?? ""),
    ctaLabel: String(section.ctaLabel ?? ""),
    ctaHref: String(section.ctaHref ?? ""),
  };
}
