export interface CredentialEntry {
  id: "dpco" | "dpdc";
  title: string;
  eyebrow: string;
  issuer: string;
  description: string;
  meaning: string;
  preview: string;
  pdf: string;
  previewAlt: string;
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
  summary: "Thanelinc's DPCO licence and data controller/processor registration, viewable, not just described.",
  hero: {
    eyebrow: "Credentials",
    h1: "Not a claim —",
    h1Accent: "a licence you can inspect.",
    summary: "Here is exactly what Thanelinc holds, what each credential means, and the documents behind both statements.",
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
      meaning: "If you're a university, MDA, bank, telecom, fintech, insurer, or another UHL/EHL organisation, using a firm of Thanelinc's licensed category isn't a preference — it's what the regulation requires.",
      preview: "/credentials/thanelinc-dpco-registration-certificate.png",
      pdf: "/credentials/thanelinc-dpco-registration-certificate.pdf",
      previewAlt: "Preview of Thanelinc Nigeria Limited's NDPC Data Protection Compliance Organization certificate.",
    },
    {
      id: "dpdc",
      title: "Data Controller/Processor Registration",
      eyebrow: "Separate registration",
      issuer: "Nigeria Data Protection Commission (NDPC)",
      description: "Thanelinc is separately registered as a Data Controller/Processor — the same registration status our clients hold, held here as evidence Thanelinc practises what it files for others.",
      meaning: "This registration is not the same as the DPCO licence above. One is what our clients need; the other is what lets Thanelinc file for them.",
      preview: "/credentials/thanelinc-dpdc-registration-certificate.png",
      pdf: "/credentials/thanelinc-dpdc-registration-certificate.pdf",
      previewAlt: "Preview of Thanelinc Nigeria Limited's NDPC Data Controller and Processor registration certificate.",
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
