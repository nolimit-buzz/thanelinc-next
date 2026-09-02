import type { StrapiSection } from "@/lib/cms/client";
import type { ServiceRow } from "@/lib/content/servicesIndex";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `services` single type onto the props `ServicesDirectory` renders.
 * Same conventions as mapHome.ts: a section that is missing or short of its
 * required fields maps to `null` and is simply not rendered — there is no
 * fallback copy.
 */

export interface ServicesHeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: { value: string; label: string }[];
  image: { src: string; alt: string; width: number; height: number };
  floatingPanel: { eyebrow: string; title: string; body: string };
  credentialPanel: { eyebrow: string; title: string; body: string };
}

export interface ServicesProblemContent {
  eyebrow: string;
  h2: string;
  description: string;
  cards: { title: string; desc: string; icon: ProblemIconName }[];
}

export interface ServicesDirectoryContent {
  eyebrow: string;
  h2: string;
  subhead: string;
  groups: { number: string; label: string; services: ServiceRow[] }[];
}

export interface ServicesAudienceContent {
  eyebrow: string;
  h2: string;
  subhead: string;
  cards: { title: string; body: string; href: string; cta: string; icon: string }[];
  selfCheck: { eyebrow: string; title: string; body: string; href: string; cta: string };
}

export interface ServicesClosingContent {
  heading: string;
  primary: { label: string; href: string };
  backgroundImage?: string;
  cutoutImage?: string;
}

export interface ServicesPageContent {
  hero: ServicesHeroContent;
  problem: ServicesProblemContent;
  directory: ServicesDirectoryContent;
  audience: ServicesAudienceContent;
  closing: ServicesClosingContent;
}

// The two icon props are closed unions in the components. Rather than casting a
// free-text CMS string into them, an unrecognised value drops the card — the
// same defensive posture as mapHome.ts's trust-item allowlist.
const PROBLEM_ICONS = ["alert-circle", "grid", "shield-alert"] as const;
type ProblemIconName = (typeof PROBLEM_ICONS)[number];

const SERVICE_ICONS = ["seal", "map", "search", "document", "shield", "folder", "refresh", "alert"] as const;
type ServiceIconName = (typeof SERVICE_ICONS)[number];

// Audience cards use ServiceRowIcon too, but with sector marks rather than the
// eight service marks.
const AUDIENCE_ICONS = ["graduation-cap", "building"] as const;

function isOneOf<T extends readonly string[]>(allowed: T, value: unknown): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

/** The hero cutout has no dimensions field in the CMS; these are the intrinsic ones. */
const HERO_IMAGE_SIZE = { width: 640, height: 1074 };

function mapHero(sections: StrapiSection[] | null): ServicesHeroContent | null {
  const section = findSection(sections, "services.hero-section");
  if (!section) return null;
  const metrics = section.metrics as Array<{ value: string; label: string }> | undefined;
  if (!section.title || !metrics?.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    title: String(section.title),
    titleAccent: String(section.titleAccent ?? ""),
    subhead: String(section.subhead ?? ""),
    primaryCta: { label: String(section.primaryCtaLabel ?? ""), href: String(section.primaryCtaHref ?? "") },
    secondaryCta: { label: String(section.secondaryCtaLabel ?? ""), href: String(section.secondaryCtaHref ?? "") },
    metrics: metrics.map((metric) => ({ value: metric.value, label: metric.label })),
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

function mapProblem(sections: StrapiSection[] | null): ServicesProblemContent | null {
  const section = findSection(sections, "services.problem-section");
  if (!section) return null;
  const cards = section.cards as Array<{ title: string; desc: string; icon: string }> | undefined;
  if (!section.h2 || !cards?.length) return null;

  const mappedCards = cards
    .filter((card) => isOneOf(PROBLEM_ICONS, card.icon))
    .map((card) => ({ title: card.title, desc: card.desc, icon: card.icon as ProblemIconName }));
  if (!mappedCards.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2),
    description: String(section.description ?? ""),
    cards: mappedCards,
  };
}

function mapDirectory(sections: StrapiSection[] | null): ServicesDirectoryContent | null {
  const section = findSection(sections, "services.directory-section");
  if (!section) return null;
  type CmsCard = {
    slug: string;
    category: string;
    name: string;
    summary: string;
    bullets?: Array<{ text: string }>;
    deliverable: string;
    turnaround: string;
    icon: string;
    shade: string;
  };
  const groups = section.groups as Array<{ number: string; label: string; cards?: CmsCard[] }> | undefined;
  if (!section.h2 || !groups?.length) return null;

  const mappedGroups = groups
    .map((group) => ({
      number: group.number,
      label: group.label,
      services: (group.cards ?? [])
        .filter((card) => isOneOf(SERVICE_ICONS, card.icon))
        .map<ServiceRow>((card) => ({
          slug: card.slug,
          category: card.category,
          name: card.name,
          summary: card.summary,
          bullets: (card.bullets ?? []).map((bullet) => bullet.text),
          deliverable: card.deliverable,
          turnaround: card.turnaround,
          icon: card.icon as ServiceIconName,
          shade: card.shade,
        })),
    }))
    .filter((group) => group.services.length > 0);
  if (!mappedGroups.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2),
    subhead: String(section.subhead ?? ""),
    groups: mappedGroups,
  };
}

function mapAudience(sections: StrapiSection[] | null): ServicesAudienceContent | null {
  const section = findSection(sections, "services.audience-section");
  if (!section) return null;
  type CmsCard = { title: string; body: string; href: string; cta: string; icon: string };
  const cards = section.cards as CmsCard[] | undefined;
  if (!section.h2 || !cards?.length) return null;

  const mappedCards = cards
    .filter((card) => isOneOf(AUDIENCE_ICONS, card.icon))
    .map((card) => ({
      title: card.title,
      body: card.body,
      href: card.href,
      cta: card.cta,
      icon: card.icon,
    }));
  if (!mappedCards.length) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h2: String(section.h2),
    subhead: String(section.subhead ?? ""),
    cards: mappedCards,
    selfCheck: {
      eyebrow: String(section.selfCheckEyebrow ?? ""),
      title: String(section.selfCheckTitle ?? ""),
      body: String(section.selfCheckBody ?? ""),
      href: String(section.selfCheckHref ?? ""),
      cta: String(section.selfCheckCta ?? ""),
    },
  };
}

function mapClosing(sections: StrapiSection[] | null): ServicesClosingContent | null {
  const section = findSection(sections, "services.closing-cta-section");
  if (!section?.heading) return null;

  return {
    heading: String(section.heading),
    primary: { label: String(section.primaryLabel ?? ""), href: String(section.primaryHref ?? "") },
    backgroundImage: section.backgroundImage
      ? withCloudinaryTransform(String(section.backgroundImage), 1600)
      : undefined,
    cutoutImage: section.cutoutImage ? withCloudinaryTransform(String(section.cutoutImage), 700) : undefined,
  };
}

/**
 * `ServicesDirectory` renders one continuous page whose sections reference each
 * other (the directory's flat card numbering runs across groups), so unlike the
 * homepage this maps all-or-nothing rather than section by section.
 */
export function mapServicesPage(sections: StrapiSection[] | null): ServicesPageContent | null {
  const hero = mapHero(sections);
  const problem = mapProblem(sections);
  const directory = mapDirectory(sections);
  const audience = mapAudience(sections);
  const closing = mapClosing(sections);

  if (!hero || !problem || !directory || !audience || !closing) return null;
  return { hero, problem, directory, audience, closing };
}
