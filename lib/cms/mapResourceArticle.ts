import type { ResourceArticleSlug, StrapiSection } from "@/lib/cms/client";
import type { ResourceArticle, ResourceKind, ResourceSection } from "@/lib/content/resources";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * Maps one of the three resource article single types onto the props
 * `ResourceArticlePage` renders. Their components are namespaced per article
 * (the namespace is the same string as the slug), so every lookup is built from
 * the slug rather than hardcoded. All-or-nothing, like mapServices.ts.
 */

export interface ResourceArticleSidebarContent {
  newsletterLabel: string;
  newsletterHeading: string;
  newsletterBody: string;
}

export interface ResourceArticleRelatedContent {
  kindLabel: string;
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  slugs: string[];
}

export interface ResourceArticleContent {
  article: ResourceArticle;
  /** The article's closing CTA block; its two links live on `article` itself. */
  cta: { label: string; heading: string };
  sidebar: ResourceArticleSidebarContent;
  related: ResourceArticleRelatedContent;
}

// `kind` is rendered as a taxonomy label and typed as a closed union, so an
// unrecognised CMS value drops the article rather than being cast into it.
const RESOURCE_KINDS = ["explainer", "blog", "news", "training"] as const;

function isResourceKind(value: unknown): value is ResourceKind {
  return typeof value === "string" && (RESOURCE_KINDS as readonly string[]).includes(value);
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

export function mapResourceArticlePage(
  sections: StrapiSection[] | null,
  slug: ResourceArticleSlug,
): ResourceArticleContent | null {
  const hero = findSection(sections, `${slug}.hero-section`);
  const body = findSection(sections, `${slug}.body-section`);
  const cta = findSection(sections, `${slug}.cta-section`);
  const sidebar = findSection(sections, `${slug}.sidebar-section`);
  const related = findSection(sections, `${slug}.related-section`);

  if (!hero?.title || !isResourceKind(hero.kind)) return null;

  type CmsArticleSection = {
    sectionId: string;
    title: string;
    paragraphs?: Array<{ text: string }>;
    points?: Array<{ label: string; body: string }>;
  };
  const bodySections = body?.sections as CmsArticleSection[] | undefined;
  if (!bodySections?.length) return null;

  const mappedSections = bodySections
    .filter((section) => section.sectionId && section.title)
    .map<ResourceSection>((section) => ({
      id: String(section.sectionId),
      title: String(section.title),
      paragraphs: (section.paragraphs ?? []).map((paragraph) => String(paragraph.text ?? "")),
      // Optional in the type: an empty repeatable must stay undefined so the
      // article renders no empty definition list.
      ...(section.points?.length
        ? { points: section.points.map((point) => ({ label: String(point.label ?? ""), body: String(point.body ?? "") })) }
        : {}),
    }));
  if (!mappedSections.length) return null;

  const audience = hero.audience as Array<{ label: string }> | undefined;
  const relatedSlugs = related?.relatedSlugs as Array<{ slug: string }> | undefined;

  return {
    article: {
      slug,
      kind: hero.kind,
      title: String(hero.title),
      summary: String(hero.summary ?? ""),
      lastReviewed: String(hero.lastReviewed ?? ""),
      image: {
        src: withCloudinaryTransform(String(hero.image ?? ""), 1600),
        alt: String(hero.image_alt_text ?? ""),
      },
      audience: (audience ?? []).map((tag) => String(tag.label ?? "")),
      sections: mappedSections,
      primaryCta: { label: String(cta?.primaryCtaLabel ?? ""), href: String(cta?.primaryCtaHref ?? "") },
      secondaryCta: { label: String(cta?.secondaryCtaLabel ?? ""), href: String(cta?.secondaryCtaHref ?? "") },
    },
    cta: { label: String(cta?.label ?? ""), heading: String(cta?.heading ?? "") },
    sidebar: {
      newsletterLabel: String(sidebar?.newsletterLabel ?? ""),
      newsletterHeading: String(sidebar?.newsletterHeading ?? ""),
      newsletterBody: String(sidebar?.newsletterBody ?? ""),
    },
    related: {
      kindLabel: String(related?.kindLabel ?? ""),
      heading: String(related?.heading ?? ""),
      viewAllLabel: String(related?.viewAllLabel ?? ""),
      viewAllHref: String(related?.viewAllHref ?? ""),
      slugs: (relatedSlugs ?? []).map((item) => String(item.slug ?? "")),
    },
  };
}
