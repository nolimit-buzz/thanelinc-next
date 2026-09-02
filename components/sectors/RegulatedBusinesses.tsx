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
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "why-it-matters", label: "Why It Matters" },
    { id: "timeline", label: "Timeline" },
    { id: "questions", label: "Common Questions" },
    { id: "get-started", label: "Get Started" },
  ],
};

// The `RegulatedBusinesses` component that used to live here was removed when
// /sectors/regulated-businesses moved onto the CMS — the route now maps Strapi
// content straight into `GuidedSectorPageTemplate`. `regulatedBusinessesPageContent`
// above is kept because the two `/design-review/sectors/*` previews still render
// against it as a fixed sample.
