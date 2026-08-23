export interface TeamMember {
  name: string;
  role?: string;
  credentials: string[];
  biography?: string;
  image?: { src: string; alt: string };
  disclosureStatus: "cleared" | "pending-clearance" | "excluded";
}

export interface TeamPageContent {
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
  introduction: { eyebrow: string; heading: string; body: string };
  members: TeamMember[];
  bridge: { heading: string; body: string; href: string; ctaLabel: string };
  closingCta: { heading: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
}

export const teamPageContent: TeamPageContent = {
  title: "Team — Thanelinc",
  summary: "The practitioner currently approved for public listing at Thanelinc.",
  hero: {
    eyebrow: "Our Team",
    h1: "People accountable",
    h1Accent: "for the work.",
    summary: "Our public team listing is kept deliberately precise. Where a credential is shown, it is one Thanelinc is prepared to stand behind.",
    primaryCta: { label: "View credentials", href: "/about/credentials" },
    secondaryCta: { label: "How we work", href: "/how-we-work" },
  },
  introduction: {
    eyebrow: "Public listing",
    heading: "Named responsibility matters in compliance work.",
    body: "This page includes only practitioners approved for public listing. It is designed to give a procurement or compliance reader a clear, attributable starting point without making unverified claims about the wider team.",
  },
  members: [
    { name: "Ahmed Goni", credentials: ["CDPO"], disclosureStatus: "cleared" },
  ],
  bridge: {
    heading: "Verify the firm as well as the practitioner.",
    body: "The DPCO licence and separate Data Controller/Processor registration are available to view directly, alongside an explanation of why the distinction matters.",
    href: "/about/credentials",
    ctaLabel: "View our credentials",
  },
  closingCta: {
    heading: "Need a clearer view of your organisation's next step?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
};
