import type { StrapiSection, LegalSlug } from "@/lib/cms/client";
import type { LegalSection } from "@/components/legal/LegalDocument";

/**
 * Maps the `privacy`/`terms`/`cookie-policy` single types onto the CMS-sourced
 * slice of `LegalDocumentContent` (everything except `slug`/`navLabel`/`title`/
 * `summary`, which stay static per route, matching the /about convention).
 *
 * Same all-or-nothing convention as mapAbout.ts: a missing meta section or a
 * section item without its required fields collapses the whole page to
 * `null` and ContentUnavailable renders instead — stale compliance content is
 * worse than none.
 */

export interface LegalCmsContent {
  eyebrow: string;
  updated: string;
  draftNotice: string;
  sections: LegalSection[];
}

function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

export function mapLegalPage(sections: StrapiSection[] | null, namespace: LegalSlug): LegalCmsContent | null {
  const meta = findSection(sections, `${namespace}.meta-section`);
  const sectionsSection = findSection(sections, `${namespace}.sections-section`);
  const items = sectionsSection?.items as
    | Array<{
        sectionId?: string;
        label?: string;
        title?: string;
        paragraphs?: string;
        bullets?: Array<{ text?: string }>;
        links?: Array<{ label?: string; href?: string }>;
      }>
    | undefined;

  if (!meta?.eyebrow || !items?.length) return null;

  const legalSections = items
    .filter((item): item is typeof item & { sectionId: string; label: string; title: string } =>
      Boolean(item.sectionId && item.label && item.title),
    )
    .map<LegalSection>((item) => {
      const bullets = (item.bullets ?? []).map((bullet) => String(bullet.text ?? "")).filter(Boolean);
      const links = (item.links ?? [])
        .filter((link): link is { label: string; href: string } => Boolean(link.label && link.href))
        .map((link) => ({ label: link.label, href: link.href }));

      return {
        id: item.sectionId,
        label: item.label,
        title: item.title,
        // `paragraphs` is a single text field in the CMS but an array in the
        // component, so blank lines are the paragraph break — same convention
        // as `biography` in mapTeamPage.
        paragraphs: String(item.paragraphs ?? "")
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
        ...(bullets.length ? { bullets } : {}),
        ...(links.length ? { links } : {}),
      };
    });
  if (!legalSections.length) return null;

  return {
    eyebrow: String(meta.eyebrow),
    updated: String(meta.updated ?? ""),
    draftNotice: String(meta.draftNotice ?? ""),
    sections: legalSections,
  };
}
