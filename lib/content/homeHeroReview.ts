/**
 * Homepage hero carousel content — approved replacement for the former
 * W-038 shared index-hero visual (`homeMandateSlides`, now unused).
 * The figures are generic generated editorial artwork / stock photography,
 * not Thanelinc staff, clients, regulators or engagement proof.
 */

export interface HomeHeroReviewSlide {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  cta: {
    label: string;
    href: string;
  };
}

/** Copied verbatim from the live v5 hero for a like-for-like visual review. */
export const homeHeroReviewCopy = {
  eyebrow: "NDPC-Licensed · Data Protection Compliance Organization",
  headlinePrimary: "Eliminate Regulatory",
  headlineLead: "Risk.",
  headlineAccent: "Gain the",
  headlineSecondary: "Compliance Edge.",
  lede:
    "We help high-impact organisations, from financial institutions and telecoms to universities and MDAs stay fully compliant. As a licensed DPCO, Thanelinc handles your end-to-end NDPC regulatory filings with zero friction.",
  primaryCta: { label: "AM I COVERED?", href: "#check" },
  primaryCtaCaption: "2 minute check",
} as const;

export const homeHeroReviewSlides: readonly HomeHeroReviewSlide[] = [
  {
    id: "tertiary-institutions",
    title: "Tertiary Institutions",
    eyebrow: "The Mandate",
    description: "A people-led editorial direction for higher institutions.",
    image: {
      src: "/design-review/home-hero/tertiary-institutions-female-cutout.png",
      width: 1122,
      height: 1402,
    },
    cta: { label: "Explore tertiary institutions", href: "/sectors/tertiary-institutions" },
  },
  {
    id: "regulated-businesses",
    title: "Regulated Businesses",
    eyebrow: "The Mandate",
    description: "A people-led editorial direction for high-exposure organisations.",
    image: {
      src: "/design-review/home-hero/regulated-businesses-male-cutout-v7.png",
      width: 819,
      height: 1024,
    },
    cta: { label: "Explore regulated businesses", href: "/sectors/regulated-businesses" },
  },
  {
    id: "hospitality",
    title: "Hospitality Industry",
    eyebrow: "The Mandate",
    description: "A people-led editorial direction for guest-data operations.",
    image: {
      src: "/design-review/home-hero/hospitality-male-cutout-v7.png",
      width: 1638,
      height: 2048,
    },
    cta: { label: "Explore business compliance", href: "/sectors/regulated-businesses" },
  },
  {
    id: "healthcare-public-sector",
    title: "Healthcare & Public Sector",
    eyebrow: "The Mandate",
    description: "A people-led editorial direction for sensitive public records.",
    image: {
      src: "/design-review/home-hero/healthcare-public-sector-female-cutout.png",
      width: 1122,
      height: 1402,
    },
    cta: { label: "Explore public-sector compliance", href: "/sectors/public-sector" },
  },
] as const;
