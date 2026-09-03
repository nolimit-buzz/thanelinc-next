import type { StrapiSection } from "@/lib/cms/client";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";
import type { AccordionItem } from "@/components/sectors/QuestionAccordion";
import type { StageRow } from "@/components/sectors/StageTable";
import type { SectionNavItem } from "@/components/sectors/SectionNav";
import { withCloudinaryTransform } from "@/lib/cms/cloudinaryImage";

/**
 * The three sector detail single types share one component shape and differ only
 * in their namespace, so — as with mapServiceDetail — the namespace is read off
 * the payload rather than passed in.
 *
 * Turnarounds, reasons, proof and the section nav stay optional all the way
 * through: the approved copy genuinely differs between sectors (public sector
 * has no cleared client to name), and defaulting a missing section would
 * manufacture a claim. See AGENTS.md rules 1 and 2.
 */

function sectionOf(sections: StrapiSection[] | null, namespace: string, name: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === `${namespace}.${name}`);
}

/** Strapi returns `[]` for an unset repeatable; the template expects `undefined`. */
function orUndefined<T>(items: T[] | undefined): T[] | undefined {
  return items?.length ? items : undefined;
}

function optionalCta(label: unknown, href: unknown) {
  return label ? { label: String(label), href: String(href ?? "") } : undefined;
}

export function mapSectorDetail(sections: StrapiSection[] | null): SectorPageContent | null {
  const namespace = sections?.[0]?.__component?.split(".")[0];
  if (!namespace) return null;

  const hero = sectionOf(sections, namespace, "hero-section");
  const credential = sectionOf(sections, namespace, "credential-section");
  const turnarounds = sectionOf(sections, namespace, "turnarounds-section");
  const accordion = sectionOf(sections, namespace, "accordion-section");
  const proof = sectionOf(sections, namespace, "proof-section");
  const nav = sectionOf(sections, namespace, "section-nav-section");
  const closing = sectionOf(sections, namespace, "closing-cta-section");

  type CmsAccordionItem = {
    number: string;
    heading: string;
    body?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
    links?: Array<{ label: string; href: string }>;
    stages?: StageRow[];
  };
  const accordionItems = accordion?.items as CmsAccordionItem[] | undefined;

  // The template dereferences these unconditionally.
  if (!hero?.h1 || !credential || !accordionItems?.length || !closing?.headingLead) return null;

  const mappedAccordion: AccordionItem[] = accordionItems.map((item) => ({
    number: item.number,
    heading: item.heading,
    body: item.body ?? undefined,
    links: orUndefined(item.links)?.map((link) => ({ label: link.label, href: link.href })),
    stages: orUndefined(item.stages)?.map((stage) => ({
      step: stage.step,
      category: stage.category,
      title: stage.title,
      description: stage.description,
    })),
    cta: optionalCta(item.ctaLabel, item.ctaHref),
  }));

  const reasons = orUndefined(
    credential.reasons as Array<{ title: string; body: string; ctaLabel?: string; ctaHref?: string }> | undefined,
  );
  const turnaroundSteps = orUndefined(
    turnarounds?.steps as Array<{ step: string; deliverable: string; turnaround: string }> | undefined,
  );
  // `sectionId` in the CMS, `id` in the component.
  const navItems = orUndefined(nav?.items as Array<{ sectionId: string; label: string }> | undefined);

  return {
    badge: String(hero.badge ?? ""),
    guidedLabels: {
      credential: String(hero.guidedLabelCredential ?? ""),
      sequence: String(hero.guidedLabelSequence ?? ""),
      questions: String(hero.guidedLabelQuestions ?? ""),
      reasonsFallback: String(hero.guidedLabelReasonsFallback ?? ""),
    },
    hero: {
      h1: String(hero.h1),
      subhead: String(hero.subhead ?? ""),
      primaryCta: { label: String(hero.primaryCtaLabel ?? ""), href: String(hero.primaryCtaHref ?? "") },
      secondaryCta: { label: String(hero.secondaryCtaLabel ?? ""), href: String(hero.secondaryCtaHref ?? "") },
    },
    credentialBlock: {
      body: String(credential.body ?? ""),
      cta: { label: String(credential.ctaLabel ?? ""), href: String(credential.ctaHref ?? "") },
      backgroundImage: credential.backgroundImage
        ? withCloudinaryTransform(String(credential.backgroundImage), 1600)
        : undefined,
    },
    turnarounds: turnaroundSteps
      ? {
          intro: String(turnarounds?.intro ?? ""),
          steps: turnaroundSteps.map((step) => ({
            step: step.step,
            deliverable: step.deliverable,
            turnaround: step.turnaround,
          })),
        }
      : undefined,
    reasons: reasons?.map((reason) => ({
      title: reason.title,
      body: reason.body,
      cta: optionalCta(reason.ctaLabel, reason.ctaHref),
    })),
    reasonsId: credential.reasonsId ? String(credential.reasonsId) : undefined,
    reasonsHeading: credential.reasonsHeadingLead
      ? {
          lead: String(credential.reasonsHeadingLead),
          accent: String(credential.reasonsHeadingAccent ?? ""),
        }
      : undefined,
    accordion: mappedAccordion,
    accordionMaxWidth: accordion?.accordionMaxWidth ? String(accordion.accordionMaxWidth) : undefined,
    proof: proof?.clientName
      ? {
          clientName: String(proof.clientName),
          body: String(proof.body ?? ""),
          cta: { label: String(proof.ctaLabel ?? ""), href: String(proof.ctaHref ?? "") },
        }
      : undefined,
    closingCta: {
      headingLead: String(closing.headingLead),
      headingAccent: String(closing.headingAccent ?? ""),
      eyebrow: String(closing.eyebrow ?? ""),
      primary: { label: String(closing.primaryLabel ?? ""), href: String(closing.primaryHref ?? "") },
      secondary: { label: String(closing.secondaryLabel ?? ""), href: String(closing.secondaryHref ?? "") },
      cutoutImage: closing.cutoutImage ? withCloudinaryTransform(String(closing.cutoutImage), 700) : "",
    },
    sectionNav: navItems?.map<SectionNavItem>((item) => ({ id: item.sectionId, label: item.label })),
  };
}
