import type { CtaLink } from "./types";

export type ResourceKind = "explainer" | "blog" | "news" | "training";

export interface ResourceSection {
  id: string;
  title: string;
  paragraphs: string[];
  points?: Array<{ label: string; body: string }>;
}

export interface ResourceArticle {
  slug: string;
  kind: ResourceKind;
  title: string;
  summary: string;
  lastReviewed: string;
  image: { src: string; alt: string };
  audience: string[];
  sections: ResourceSection[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const resourceKinds: Array<{ id: ResourceKind; label: string; detail: string; state: "live" | "coming-soon" }> = [
  { id: "explainer", label: "Explainers", detail: "Practical guidance for compliance owners.", state: "live" },
  { id: "blog", label: "Blog", detail: "Analysis and practical perspectives.", state: "coming-soon" },
  { id: "news", label: "News", detail: "Updates from the compliance desk.", state: "coming-soon" },
  { id: "training", label: "Training", detail: "Learning tracks and programme updates.", state: "coming-soon" },
];

/**
 * Approved explainer copy is transcribed from Content/04-Page-Copy/resources.
 * New content types are taxonomy only until owner-approved entries exist.
 */
export const resourceArticles: ResourceArticle[] = [
  {
    slug: "ndpc-compliance-categories-explained",
    kind: "explainer",
    title: "UHL, EHL, OHL — what the NDPC's compliance categories actually mean",
    summary: "The NDPC sorts organisations into three compliance tiers. Here's what decides which one you're in, and what each one actually requires.",
    lastReviewed: "15 August 2026",
    image: {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85",
      alt: "Colleagues discussing work at a table",
    },
    audience: ["Compliance owners", "Higher institutions", "Regulated businesses"],
    sections: [
      {
        id: "two-ways",
        title: "Two ways an organisation lands in a category",
        paragraphs: [
          "If you've come across ‘UHL’ or ‘EHL’ while researching NDPA compliance, these are the NDPC's own tiers for classifying data controllers and processors — Upper High Level, Enhanced High Level, and Ordinary High Level. Which one applies to you decides what you're required to do and by when.",
          "By what you are. The NDPC's own schedule names specific categories outright, regardless of size.",
          "By volume. If your organisation type isn't named above, category is decided by how many people's personal data you've handled in a rolling six months. Higher volumes mean a higher category.",
          "Category-by-name always wins. A named category applies regardless of volume — a small university is still EHL, not OHL, no matter how few students it has.",
        ],
        points: [
          { label: "UHL by category", body: "Banks, telecoms, fintech and payment companies, insurers, and oil & gas companies." },
          { label: "EHL by category", body: "Higher institutions, MDAs of government, microfinance and mortgage banks, and hospitals providing tertiary or secondary care." },
          { label: "OHL by category", body: "Primary and secondary schools, corporate training providers, primary health centres, independent medical laboratories, and hotels under 50 suites." },
        ],
      },
      {
        id: "requirements",
        title: "What each category requires",
        paragraphs: [
          "UHL and EHL organisations must file annual Compliance Audit Returns (CAR) through a Data Protection Compliance Organization licensed by the NDPC. This isn't optional for either tier — it's a stated requirement in the NDPC's own guidance.",
          "The deadline is 31 March each year for organisations established before 12 June 2023, or within 15 months of establishment for newer ones, then annually.",
          "OHL organisations renew their registration annually and are not required to file CAR.",
        ],
      },
      {
        id: "four-factor-test",
        title: "There's also a four-factor test",
        paragraphs: [
          "Below the volume thresholds, four factors can still pull an organisation into a higher category: whether you process sensitive personal data, whether you transfer data across borders, whether a third party or cloud provider processes data on your behalf, and your overall data volume trend.",
          "None of these factors work in isolation — an organisation should never assume it's exempt on low volume alone.",
        ],
      },
      {
        id: "find-out",
        title: "Find out where you actually stand",
        paragraphs: ["This article describes how the categories work in general. Your own classification depends on your specific organisation type, volume, and processing activities."],
      },
    ],
    primaryCta: { label: "Run the 2-minute self-check", href: "/am-i-covered" },
    secondaryCta: { label: "View NDPC registration support", href: "/services/ndpc-registration" },
  },
  {
    slug: "ropa-dpia-lia-explained",
    kind: "explainer",
    title: "ROPA, DPIA, and LIA — what they are and when you need one",
    summary: "Three acronyms every accidental DPO runs into fast. Here's what each one does and which of your projects actually needs it.",
    lastReviewed: "15 August 2026",
    image: {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
      alt: "Team members reviewing work around a table",
    },
    audience: ["Compliance owners"],
    sections: [
      {
        id: "ropa",
        title: "ROPA — Record of Processing Activities",
        paragraphs: [
          "A ROPA is the inventory: every place personal data enters your organisation, what you do with it, who else sees it, and how long you keep it. It's the foundation everything else is built on — you cannot assess a risk you haven't mapped.",
          "You need one if: you process personal data at all, in any volume. This isn't a threshold question — it's the starting document for any compliance work.",
        ],
      },
      {
        id: "dpia",
        title: "DPIA — Data Protection Impact Assessment",
        paragraphs: [
          "A DPIA is a structured risk assessment, done before you start a new processing activity that's likely to carry real risk to people — large-scale processing of sensitive data, systematic monitoring, or a new system that changes how you handle personal information.",
          "You need one if: you're introducing new sensitive-data processing, deploying new monitoring technology, or combining datasets in a way that increases risk to the people in them.",
        ],
      },
      {
        id: "lia",
        title: "LIA — Legitimate Interest Assessment",
        paragraphs: [
          "When you're relying on legitimate interest as your lawful basis for processing (rather than consent, contract, or legal obligation), an LIA is the documented test proving that interest is genuine, necessary, and balanced against the individual's rights.",
          "You need one if: you're processing personal data without asking for consent, and you're leaning on legitimate interest as the justification. Skipping this step is one of the most common gaps found during a gap assessment.",
        ],
      },
      {
        id: "how-they-connect",
        title: "How they connect",
        paragraphs: [
          "The sequence in practice: ROPA first (you can't assess what you haven't mapped), then DPIA for specific high-risk activities the ROPA surfaces, with an LIA sitting alongside wherever legitimate interest is the lawful basis in use.",
          "This is the sequence in Thanelinc's own delivery process — data mapping, then gap assessment and DPIA.",
        ],
      },
    ],
    primaryCta: { label: "See how the full process works", href: "/how-we-work" },
    secondaryCta: { label: "Run the self-check", href: "/am-i-covered" },
  },
  {
    slug: "vendor-due-diligence",
    kind: "explainer",
    title: "Vendor due diligence: what ‘compliant enough’ actually means",
    summary: "Your compliance doesn't stop at your own systems. A practical checklist for vetting vendors and cloud providers who process data on your behalf.",
    lastReviewed: "15 August 2026",
    image: {
      src: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=85",
      alt: "Professionals reviewing a document together",
    },
    audience: ["Compliance owners", "Regulated businesses"],
    sections: [
      {
        id: "why-it-matters",
        title: "Why it matters",
        paragraphs: [
          "If a vendor or cloud provider processes personal data on your behalf, their compliance gaps become your exposure. This is one of the four factors that can move an organisation into a higher NDPC compliance category — and one of the most commonly skipped steps in a first compliance pass.",
        ],
      },
      {
        id: "what-to-check",
        title: "What to actually check",
        paragraphs: ["Start with the practical questions that reveal how your vendor handles information and risk."],
        points: [
          { label: "Where the data goes", body: "Does the vendor process or store data outside Nigeria? Cross-border transfer changes your own obligations, not just theirs." },
          { label: "Sub-processors", body: "A vendor who hands your data to a fourth party without telling you has expanded your exposure without your knowledge. Ask for a sub-processor list." },
          { label: "Written data-protection terms", body: "A general service contract is not the same as one that specifies data protection obligations, breach notification timelines, and audit rights." },
          { label: "Breach notification", body: "Know how the vendor would tell you about a breach, and how fast, before you need it." },
          { label: "Evidence", body: "Certifications, audit reports, or a completed due-diligence questionnaire are worth more than a line in a sales deck." },
        ],
      },
      {
        id: "starting-point",
        title: "A practical starting point",
        paragraphs: [
          "Most organisations don't need a formal audit of every vendor on day one. Start with the vendors handling the highest-risk data — payment processors, cloud infrastructure, anything touching health or biometric information — and work outward.",
        ],
      },
    ],
    primaryCta: { label: "See ongoing monitoring", href: "/services/ongoing-monitoring" },
    secondaryCta: { label: "Run the self-check", href: "/am-i-covered" },
  },
];

export const resources = {
  eyebrow: "Resources & Explainers",
  heading: "Clear guidance for the work in front of you.",
  body: "Practical explainers for compliance owners, with room for the articles, news and training updates that follow.",
  items: resourceArticles.map((article) => ({
    id: article.slug,
    category: article.kind,
    title: article.title,
    body: article.summary,
    lastReviewed: article.lastReviewed,
    href: `/resources/${article.slug}`,
    image: article.image,
  })),
  categories: resourceKinds,
  cta: { label: "Explore the resource library", href: "/resources", variant: "ghost" } satisfies CtaLink,
} as const;

export type ResourcesHomeContent = typeof resources;

export const resourceArticleBySlug = (slug: string) => resourceArticles.find((article) => article.slug === slug);
