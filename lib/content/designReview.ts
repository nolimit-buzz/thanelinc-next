export const designReview = {
  eyebrow: "Development-only design review",
  h1: "Inner-page directions for review",
  intro: "Compare the approved pilot pages at mobile, tablet and desktop widths before any broader template rollout.",
  viewportChecklist: ["390px mobile", "768px tablet", "1440px desktop"],
  pages: [
    {
      label: "Homepage artwork review",
      title: "People-led sector carousel",
      href: "/design-review/home",
      reference: "Four generic people-led sector artworks",
    },
    {
      label: "Service exemplar",
      title: "Data Mapping & ROPA",
      href: "/services/data-mapping-ropa",
      reference: "Capital-allocation service reference",
    },
    {
      label: "Contact direction",
      title: "Contact",
      href: "/contact",
      reference: "Contact.jpg composition",
    },
    {
      label: "Sector Option A — recommended",
      title: "Guided Audience Journey",
      href: "/design-review/sectors/guided-journey",
      reference: "Our Approach (1).jpg",
    },
    {
      label: "Sector Option B",
      title: "Editorial Evidence Grid",
      href: "/design-review/sectors/editorial-grid",
      reference: "Our Approach.jpg",
    },
  ],
  assetNote: "Existing repository images are placeholders for local review. Provenance-cleared final imagery remains a launch gate.",
  sector: {
    guided: {
      optionLabel: "Option A — recommended",
      title: "Guided Audience Journey",
      reference: "Inspired by Our Approach (1).jpg",
      reasonHeading: "Why this applies",
      credentialLabel: "Independent credential",
      sequenceHeading: "What the engagement looks like",
      questionsHeading: "Questions to resolve",
    },
    editorial: {
      optionLabel: "Option B",
      title: "Editorial Evidence Grid",
      reference: "Inspired by Our Approach.jpg",
      matrixHeading: "Why companies land on this page",
      questionsHeading: "Questions to resolve",
      credentialLabel: "Credential",
      proofLabel: "Proof",
    },
  },
} as const;
