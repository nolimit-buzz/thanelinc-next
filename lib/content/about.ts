export interface AboutPageContent {
  title: string;
  summary: string;
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent: string;
    summary: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  positioning: { eyebrow: string; heading: string; body: string };
  pathways: Array<{ eyebrow: string; title: string; body: string; href: string; ctaLabel: string }>;
  process: { heading: string; body: string; href: string; ctaLabel: string };
  closingCta: { heading: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
}

export const aboutPageContent: AboutPageContent = {
  title: "About Thanelinc",
  summary: "Thanelinc is an NDPC-licensed Data Protection Compliance Organization, with credentials you can view directly.",
  hero: {
    eyebrow: "About Thanelinc",
    h1: "Compliance support with",
    h1Accent: "credentials you can verify.",
    summary: "Thanelinc Nigeria Limited is an NDPC-licensed Data Protection Compliance Organization. This page is the route to the licence, the people approved for public listing, and the compliance work those credentials support.",
    primaryCta: { label: "View our credentials", href: "/about/credentials" },
    secondaryCta: { label: "How we work", href: "/how-we-work" },
  },
  positioning: {
    eyebrow: "What the licence changes",
    heading: "A DPCO licence is not a general consulting claim.",
    body: "Thanelinc is licensed by the Nigeria Data Protection Commission as a Data Protection Compliance Organization. For organisations within the UHL and EHL categories, annual Compliance Audit Returns are filed through a DPCO licensed by the Commission, subject to any Commission approval otherwise. Thanelinc is also separately registered as a Data Controller/Processor; that registration is distinct from the DPCO licence.",
  },
  pathways: [
    {
      eyebrow: "For due diligence",
      title: "Credentials",
      body: "View the DPCO licence and the separate Data Controller/Processor registration directly, with the distinction between them made clear.",
      href: "/about/credentials",
      ctaLabel: "View credentials",
    },
    {
      eyebrow: "For accountability",
      title: "Team",
      body: "Meet the practitioner currently approved for public listing, with their stated credential shown precisely.",
      href: "/about/team",
      ctaLabel: "Meet the team",
    },
  ],
  process: {
    heading: "Need to understand the work before starting?",
    body: "The six-stage compliance journey sets out what happens from engagement and registration through to ongoing monitoring, including the deliverables and stated turnarounds where they are confirmed.",
    href: "/how-we-work",
    ctaLabel: "Explore how we work",
  },
  closingCta: {
    heading: "Ready to confirm what applies to your organisation?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
};
