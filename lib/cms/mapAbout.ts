import type { StrapiSection } from "@/lib/cms/client";
import type { AboutPageContent } from "@/lib/content/about";
import type { CredentialEntry, CredentialsPageContent } from "@/lib/content/credentials";
import type { TeamMember, TeamPageContent } from "@/lib/content/team";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `about`, `credentials` and `team` single types onto the props the
 * /about page renders. Credentials and team are separate single types because
 * they are separately editable, but /about renders them inline as its
 * #credentials and #team bands — /about/credentials and /about/team are only
 * redirects to those anchors.
 *
 * Same conventions as mapServices.ts: a section missing or short of its required
 * fields collapses the whole page to `null` and ContentUnavailable renders
 * instead — there is no fallback copy.
 *
 * `title` and `summary` are not in the CMS; they stay as static metadata in the
 * route file, matching app/services/page.tsx.
 */

/** The banner and cutout images live in the CMS, unlike the static modules where they were hardcoded in JSX. */
export type AboutSections = Omit<AboutPageContent, "title" | "summary"> & {
  hero: AboutPageContent["hero"] & { bannerImage: string; bannerAlt: string };
  closingCta: AboutPageContent["closingCta"] & { cutoutImage: string };
};

export type CredentialsSections = Omit<CredentialsPageContent, "title" | "summary">;

export type TeamSections = Omit<TeamPageContent, "title" | "summary">;

// Both are closed unions in the components — CredentialDocument styles on
// `id === "dpdc"`, and TeamPage only renders members whose status is "cleared".
// Rather than casting free CMS text into them, an unrecognised value drops the
// entry: publishing a name whose clearance we could not read would be worse
// than publishing one fewer card.
const CREDENTIAL_IDS = ["dpco", "dpdc"] as const;
const DISCLOSURE_STATUSES = ["cleared", "pending-clearance", "excluded"] as const;

function isOneOf<T extends readonly string[]>(allowed: T, value: unknown): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

/** Shared shape: every hero and closing CTA in this cluster flattens its CTAs to label/href pairs. */
function mapCtaPair(section: StrapiSection, prefix: "primaryCta" | "secondaryCta") {
  return { label: String(section[`${prefix}Label`] ?? ""), href: String(section[`${prefix}Href`] ?? "") };
}

type HeroContent = AboutPageContent["hero"] & { bannerImage: string; bannerAlt: string };

function mapHero(sections: StrapiSection[] | null, component: string): HeroContent | null {
  const section = findSection(sections, component);
  if (!section?.h1) return null;

  return {
    eyebrow: String(section.eyebrow ?? ""),
    h1: String(section.h1),
    h1Accent: String(section.h1Accent ?? ""),
    summary: String(section.summary ?? ""),
    primaryCta: mapCtaPair(section, "primaryCta"),
    secondaryCta: mapCtaPair(section, "secondaryCta"),
    bannerImage: withCloudinaryTransform(String(section.bannerImage ?? ""), 1600),
    bannerAlt: String(section.bannerImage_alt_text ?? ""),
  };
}

type ClosingCtaContent = AboutPageContent["closingCta"] & { cutoutImage: string };

function mapClosingCta(sections: StrapiSection[] | null, component: string): ClosingCtaContent | null {
  const section = findSection(sections, component);
  if (!section?.heading) return null;

  return {
    heading: String(section.heading),
    primary: { label: String(section.primaryLabel ?? ""), href: String(section.primaryHref ?? "") },
    secondary: { label: String(section.secondaryLabel ?? ""), href: String(section.secondaryHref ?? "") },
    cutoutImage: withCloudinaryTransform(String(section.cutoutImage ?? ""), 900),
  };
}

export function mapAboutPage(sections: StrapiSection[] | null): AboutSections | null {
  const hero = mapHero(sections, "about.hero-section");
  const closingCta = mapClosingCta(sections, "about.closing-cta-section");

  const positioningSection = findSection(sections, "about.positioning-section");
  const processSection = findSection(sections, "about.process-section");
  if (!hero || !closingCta || !positioningSection?.heading || !processSection?.heading) return null;

  return {
    hero,
    positioning: {
      eyebrow: String(positioningSection.eyebrow ?? ""),
      heading: String(positioningSection.heading),
      body: String(positioningSection.body ?? ""),
    },
    process: {
      heading: String(processSection.heading),
      body: String(processSection.body ?? ""),
      href: String(processSection.href ?? ""),
      ctaLabel: String(processSection.ctaLabel ?? ""),
    },
    closingCta,
  };
}

export function mapCredentialsPage(sections: StrapiSection[] | null): CredentialsSections | null {
  const hero = mapHero(sections, "credentials.hero-section");
  const closingCta = mapClosingCta(sections, "credentials.closing-cta-section");

  const credentialsSection = findSection(sections, "credentials.credentials-section");
  const proofSection = findSection(sections, "credentials.proof-section");
  const items = credentialsSection?.credentials as
    | Array<{ credentialId?: string; title?: string; eyebrow?: string; issuer?: string; description?: string }>
    | undefined;

  if (!hero || !closingCta || !proofSection?.title || !items?.length) return null;

  const credentials = items
    .filter((item) => isOneOf(CREDENTIAL_IDS, item.credentialId))
    .map<CredentialEntry>((item) => ({
      id: item.credentialId as CredentialEntry["id"],
      title: String(item.title ?? ""),
      eyebrow: String(item.eyebrow ?? ""),
      issuer: String(item.issuer ?? ""),
      description: String(item.description ?? ""),
    }));
  if (!credentials.length) return null;

  return {
    hero,
    credentials,
    proof: {
      eyebrow: String(proofSection.eyebrow ?? ""),
      title: String(proofSection.title),
      body: String(proofSection.body ?? ""),
      href: String(proofSection.href ?? ""),
      ctaLabel: String(proofSection.ctaLabel ?? ""),
    },
    closingCta,
  };
}

export function mapTeamPage(sections: StrapiSection[] | null): TeamSections | null {
  const hero = mapHero(sections, "team.hero-section");
  const closingCta = mapClosingCta(sections, "team.closing-cta-section");

  const introductionSection = findSection(sections, "team.introduction-section");
  const membersSection = findSection(sections, "team.members-section");
  const bridgeSection = findSection(sections, "team.bridge-section");
  const items = membersSection?.members as
    | Array<{
        name?: string;
        role?: string;
        credentials?: Array<{ label: string }>;
        biography?: string;
        image?: string;
        image_alt_text?: string;
        disclosureStatus?: string;
      }>
    | undefined;

  if (!hero || !closingCta || !introductionSection?.heading || !bridgeSection?.heading || !items?.length) return null;

  const members = items
    .filter((item) => item.name && isOneOf(DISCLOSURE_STATUSES, item.disclosureStatus))
    .map<TeamMember>((item, index) => ({
      // No CMS field for display order — the Content Manager's drag order is it.
      displayOrder: index + 1,
      name: String(item.name),
      role: String(item.role ?? ""),
      credentials: (item.credentials ?? []).map((tag) => tag.label),
      // `biography` is a single text field in the CMS but an array of paragraphs
      // in the component, so blank lines are the paragraph break.
      biography: String(item.biography ?? "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      image: item.image
        ? { src: withCloudinaryTransform(String(item.image), 640), alt: String(item.image_alt_text ?? "") }
        : undefined,
      disclosureStatus: item.disclosureStatus as TeamMember["disclosureStatus"],
    }));
  if (!members.length) return null;

  return {
    hero,
    introduction: {
      eyebrow: String(introductionSection.eyebrow ?? ""),
      heading: String(introductionSection.heading),
      body: String(introductionSection.body ?? ""),
    },
    members,
    bridge: {
      heading: String(bridgeSection.heading),
      body: String(bridgeSection.body ?? ""),
      href: String(bridgeSection.href ?? ""),
      ctaLabel: String(bridgeSection.ctaLabel ?? ""),
    },
    closingCta,
  };
}
