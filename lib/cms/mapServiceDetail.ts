import type { StrapiSection } from "@/lib/cms/client";
import type { ServiceBodyBlock, ServicePageContent } from "@/components/services/ServicePageTemplate";
import type { ServiceFeatureItem } from "@/components/services/ServiceFeatureGrid";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * All eight service detail single types share one five-component shape and
 * differ only in their component namespace, so a single mapper covers them —
 * the namespace is read off the payload rather than passed in.
 */

function sectionOf(sections: StrapiSection[] | null, namespace: string, name: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === `${namespace}.${name}`);
}

/** Strapi returns `[]` for an unset repeatable; the template expects `undefined`. */
function orUndefined<T>(items: T[] | undefined): T[] | undefined {
  return items?.length ? items : undefined;
}

export function mapServiceDetail(sections: StrapiSection[] | null): ServicePageContent | null {
  const namespace = sections?.[0]?.__component?.split(".")[0];
  if (!namespace) return null;

  const hero = sectionOf(sections, namespace, "hero-section");
  const banner = sectionOf(sections, namespace, "banner-hero-section");
  const whatYouGet = sectionOf(sections, namespace, "what-you-get-section");
  const narrative = sectionOf(sections, namespace, "narrative-section");
  const closing = sectionOf(sections, namespace, "closing-cta-section");

  type CmsBodyBlock = {
    heading: string;
    body?: string | null;
    steps?: Array<{ text: string }>;
    links?: Array<{ label: string; href: string }>;
  };
  const bodyBlocks = narrative?.bodyBlocks as CmsBodyBlock[] | undefined;
  const whoThisIsFor = narrative?.whoThisIsFor as Array<{ label: string; href: string }> | undefined;

  // ServicePageTemplate dereferences all three of these unconditionally.
  if (!hero || !whatYouGet || !bodyBlocks?.length || !closing?.heading) return null;

  const mappedBlocks: ServiceBodyBlock[] = bodyBlocks.map((block) => ({
    heading: block.heading,
    body: block.body ?? undefined,
    steps: orUndefined(block.steps)?.map((step) => step.text),
    links: orUndefined(block.links)?.map((link) => ({ label: link.label, href: link.href })),
  }));

  const secondaryLabel = String(closing.secondaryLabel ?? "");
  const secondaryHref = String(closing.secondaryHref ?? "");

  return {
    heroVariant: hero.heroVariant === "dark" ? "dark" : "light",
    hero: {
      eyebrow: String(hero.eyebrow ?? ""),
      h1: String(hero.h1 ?? ""),
      subhead: String(hero.subhead ?? ""),
      primaryCta: { label: String(hero.primaryCtaLabel ?? ""), href: String(hero.primaryCtaHref ?? "") },
      secondaryCta: hero.secondaryCtaLabel
        ? { label: String(hero.secondaryCtaLabel), href: String(hero.secondaryCtaHref ?? "") }
        : undefined,
    },
    bannerHero: banner
      ? {
          eyebrow: String(banner.eyebrow ?? ""),
          h1: String(banner.h1 ?? ""),
          h1Accent: banner.h1Accent ? String(banner.h1Accent) : undefined,
          bannerImage: withCloudinaryTransform(String(banner.bannerImage ?? ""), 1600),
          bannerAlt: String(banner.bannerImage_alt_text ?? ""),
          bannerPosition: banner.bannerPosition ? String(banner.bannerPosition) : undefined,
        }
      : undefined,
    features: orUndefined(banner?.features as ServiceFeatureItem[] | undefined)?.map((feature) => ({
      number: feature.number,
      title: feature.title,
      body: feature.body,
    })),
    whatYouGet: {
      label: String(whatYouGet.label ?? ""),
      body: String(whatYouGet.body ?? ""),
      deliverable: String(whatYouGet.deliverable ?? ""),
      turnaround: String(whatYouGet.turnaround ?? ""),
    },
    bodyBlocks: mappedBlocks,
    whoThisIsFor: (whoThisIsFor ?? []).map((item) => ({ label: item.label, href: item.href })),
    closingCta: {
      heading: String(closing.heading),
      primary: { label: String(closing.primaryLabel ?? ""), href: String(closing.primaryHref ?? "") },
      secondary: secondaryLabel ? { label: secondaryLabel, href: secondaryHref } : undefined,
      backgroundImage: closing.backgroundImage
        ? withCloudinaryTransform(String(closing.backgroundImage), 1600)
        : undefined,
      cutoutImage: closing.cutoutImage ? withCloudinaryTransform(String(closing.cutoutImage), 700) : undefined,
    },
  };
}
