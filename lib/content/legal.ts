export interface LegalPageMeta {
  slug: "privacy" | "cookie-policy" | "terms";
  navLabel: string;
  title: string;
  summary: string;
}

/**
 * Section content for these pages now lives in Strapi (the `privacy`, `terms`
 * and `cookie-policy` single types) — see lib/cms/mapLegal.ts. `title` and
 * `summary` stay static here, matching lib/content/about.ts: they feed each
 * route's own `metadata` export and searchIndex.ts, the same way `.summary`
 * on the other already-CMS-wired pages does.
 */
export const legalPageMeta: LegalPageMeta[] = [
  {
    slug: "privacy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    summary: "How this website handles personal information when you contact Thanelinc or submit a request through its tools.",
  },
  {
    slug: "terms",
    navLabel: "Terms",
    title: "Website Terms",
    summary: "The terms that apply to your use of the public Thanelinc website.",
  },
  {
    slug: "cookie-policy",
    navLabel: "Cookie Policy",
    title: "Cookie Policy",
    summary: "A clear, current view of the cookies and similar technologies used on this website.",
  },
];

export const legalPageMetaBySlug = (slug: LegalPageMeta["slug"]) =>
  legalPageMeta.find((page) => page.slug === slug)!;
