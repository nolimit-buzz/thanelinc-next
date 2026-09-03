import type { StrapiSection } from "@/lib/cms/client";
import type { HowWeWorkPageContent, JourneyStageRow } from "@/lib/content/howWeWork";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps the `how-we-work` single type onto the props HowWeWorkPage renders.
 *
 * `title`, `summary`, `audience`, `regulationReferences` and `sectionNav` have
 * no CMS fields — they are page metadata and structural navigation rather than
 * editable copy, so they stay in lib/content/howWeWork.ts and the route file
 * spreads them over this result.
 */
export type HowWeWorkSections = Omit<
  HowWeWorkPageContent,
  "title" | "summary" | "audience" | "regulationReferences" | "sectionNav"
> & {
  hero: HowWeWorkPageContent["hero"] & { bannerImage: string; bannerAlt: string };
  closingCta: HowWeWorkPageContent["closingCta"] & { cutoutImage: string };
};

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

type CmsStage = {
  number?: string;
  label?: string;
  title?: string;
  introduction?: string;
  rows?: Array<{ step?: string; label?: string; href?: string; deliverable?: string; turnaround?: string }>;
};

export function mapHowWeWorkPage(sections: StrapiSection[] | null): HowWeWorkSections | null {
  const heroSection = findSection(sections, "how-we-work.hero-section");
  const stagesSection = findSection(sections, "how-we-work.stages-section");
  const involvementSection = findSection(sections, "how-we-work.involvement-section");
  const breachSection = findSection(sections, "how-we-work.breach-aside-section");
  const closingSection = findSection(sections, "how-we-work.closing-cta-section");

  const stages = stagesSection?.stages as CmsStage[] | undefined;

  if (
    !heroSection?.h1 ||
    !stages?.length ||
    !involvementSection?.heading ||
    !breachSection?.heading ||
    !closingSection?.heading
  ) {
    return null;
  }

  return {
    hero: {
      eyebrow: String(heroSection.eyebrow ?? ""),
      h1: String(heroSection.h1),
      h1Accent: String(heroSection.h1Accent ?? ""),
      summary: String(heroSection.summary ?? ""),
      primaryCta: { label: String(heroSection.primaryCtaLabel ?? ""), href: String(heroSection.primaryCtaHref ?? "") },
      secondaryCta: {
        label: String(heroSection.secondaryCtaLabel ?? ""),
        href: String(heroSection.secondaryCtaHref ?? ""),
      },
      bannerImage: withCloudinaryTransform(String(heroSection.bannerImage ?? ""), 1600),
      bannerAlt: String(heroSection.bannerImage_alt_text ?? ""),
    },
    stages: stages.map((stage) => ({
      number: String(stage.number ?? ""),
      label: String(stage.label ?? ""),
      title: String(stage.title ?? ""),
      introduction: String(stage.introduction ?? ""),
      // `claimIds` has no CMS field — it is a provenance annotation for the
      // claims register, not rendered copy — so it is simply left off.
      rows: (stage.rows ?? []).map<JourneyStageRow>((row) => ({
        step: String(row.step ?? ""),
        label: String(row.label ?? ""),
        href: row.href ? String(row.href) : undefined,
        deliverable: String(row.deliverable ?? ""),
        turnaround: String(row.turnaround ?? ""),
      })),
    })),
    involvement: {
      heading: String(involvementSection.heading),
      body: String(involvementSection.body ?? ""),
    },
    breachAside: {
      heading: String(breachSection.heading),
      body: String(breachSection.body ?? ""),
      href: String(breachSection.href ?? ""),
      ctaLabel: String(breachSection.ctaLabel ?? ""),
    },
    closingCta: {
      heading: String(closingSection.heading),
      primary: { label: String(closingSection.primaryLabel ?? ""), href: String(closingSection.primaryHref ?? "") },
      secondary: {
        label: String(closingSection.secondaryLabel ?? ""),
        href: String(closingSection.secondaryHref ?? ""),
      },
      cutoutImage: withCloudinaryTransform(String(closingSection.cutoutImage ?? ""), 900),
    },
  };
}
