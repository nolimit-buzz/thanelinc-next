import {
  hero,
  credentialBlock,
  turnaroundsIntro,
  turnarounds,
  reasons,
  categorySection,
  dpoSection,
  filingSection,
  proof,
  closingCta,
} from "@/lib/content/sectorsRegulatedBusinesses";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";

// Two-tone split of the closing CTA heading — same wording as
// `closingCta.h2`, just coloured in two parts (dark + white).
const closingCtaHeadingSplit = closingCta.h2.split(" for a company");
const closingCtaHeadingDark = closingCtaHeadingSplit[0];
const closingCtaHeadingAccent = "for a company" + (closingCtaHeadingSplit[1] ?? "");

export const regulatedBusinessesPageContent: SectorPageContent = {
  badge: "UHL BY CATEGORY OR VOLUME — GAID 2025 SCH.3",
  guidedLabels: {
    credential: "Licensed DPCO",
    sequence: "What happens next",
    questions: "Your questions, answered",
    reasonsFallback: "Why this matters",
  },
  hero,
  credentialBlock: { ...credentialBlock, backgroundImage: "/hero-hologram.jpg" },
  turnarounds: { intro: turnaroundsIntro, steps: turnarounds },
  reasons,
  reasonsHeading: { lead: "Why companies land", accent: "on this page" },
  accordion: [
    { number: "01", heading: categorySection.heading, body: categorySection.body, cta: categorySection.cta },
    { number: "02", heading: dpoSection.heading, body: dpoSection.body, cta: dpoSection.cta },
    { number: "03", heading: filingSection.heading, body: filingSection.body },
  ],
  proof,
  closingCta: {
    headingLead: closingCtaHeadingDark,
    headingAccent: closingCtaHeadingAccent,
    eyebrow: "Regulated Businesses",
    primary: closingCta.primary,
    secondary: closingCta.secondary,
    cutoutImage: "/regulated-businesses-cutout.png",
  },
};

/**
 * `/sectors/regulated-businesses` — structure follows the approved copy in
 * Content/04-Page-Copy/sectors-regulated-businesses.md verbatim.
 *
 * The page's layout moved into `SectorPageTemplate` on 2026-08-20 so
 * /sectors/tertiary-institutions could share it (W-028). Rendered output is
 * unchanged; this file is now the content binding only.
 */
export function RegulatedBusinesses() {
  return <GuidedSectorPageTemplate content={regulatedBusinessesPageContent} />;
}
