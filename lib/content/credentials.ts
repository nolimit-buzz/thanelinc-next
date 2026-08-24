export interface CredentialEntry {
  id: "dpco" | "dpdc";
  title: string;
  eyebrow: string;
  issuer: string;
  description: string;
}

export interface CredentialsPageContent {
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
  credentials: CredentialEntry[];
  proof: { eyebrow: string; title: string; body: string; href: string; ctaLabel: string };
  closingCta: { heading: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
}

export const credentialsPageContent: CredentialsPageContent = {
  title: "Credentials — Thanelinc's NDPC Licensing",
  summary: "Thanelinc's DPCO licence and data controller/processor registration, clearly explained.",
  hero: {
    eyebrow: "Credentials",
    h1: "Clear credentials —",
    h1Accent: "plainly explained.",
    summary: "Here is exactly what Thanelinc holds and what each credential means.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    secondaryCta: { label: "How we work", href: "/how-we-work" },
  },
  credentials: [
    {
      id: "dpco",
      title: "DPCO Licence",
      eyebrow: "Primary credential",
      issuer: "Nigeria Data Protection Commission (NDPC)",
      description: "Thanelinc is licensed by the NDPC as a Data Protection Compliance Organization (DPCO). This is the licence category the NDPC requires UHL and EHL organisations to file their annual Compliance Audit Returns through.",
    },
    {
      id: "dpdc",
      title: "Data Controller/Processor Registration",
      eyebrow: "Separate registration",
      issuer: "Nigeria Data Protection Commission (NDPC)",
      description: "Thanelinc is separately registered as a Data Controller/Processor — the same registration status our clients hold, held here as evidence Thanelinc practises what it files for others.",
    },
  ],
  proof: {
    eyebrow: "Cleared proof",
    title: "A professional body has trusted this licence with real work.",
    body: "Nigerian Bar Association — NBA Election 2026. Thanelinc was appointed the registered Data Protection Organization for a national professional body's election.",
    href: "/how-we-work",
    ctaLabel: "See how the work is structured",
  },
  closingCta: {
    heading: "Ready to establish your compliance position?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
};
