export interface LegalSection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface LegalDocumentContent {
  slug: "privacy" | "cookie-policy" | "terms";
  navLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  draftNotice: string;
  sections: LegalSection[];
}

/**
 * Operational drafts only. They describe the intended production data flow
 * and must be reviewed by Thanelinc's CDPO before being treated as final legal
 * notices. The server-side form-delivery controls described here are a release
 * requirement, not a claim about this local client-only build.
 */
export const legalDocuments: LegalDocumentContent[] = [
  {
    slug: "privacy",
    navLabel: "Privacy Policy",
    eyebrow: "Legal & Privacy",
    title: "Privacy Policy",
    summary: "How this website will handle personal information when you contact Thanelinc or submit a request through its tools.",
    updated: "23 August 2026",
    draftNotice: "Operational draft for CDPO and legal review. Before publication, the production site must send form submissions to the approved backend with the safeguards described here; the current local contact flow does not yet do that.",
    sections: [
      {
        id: "scope",
        label: "01 — Scope",
        title: "What this notice covers",
        paragraphs: [
          "This notice explains how Thanelinc Nigeria Limited will handle personal information obtained through this website. It applies to information you choose to provide when you contact us or submit a request through a website form, and to limited information generated while the website operates.",
          "It does not replace the data-protection terms in a signed client engagement. Where an engagement has its own agreed terms, those terms govern the services delivered under that engagement.",
        ],
      },
      {
        id: "information",
        label: "02 — Information",
        title: "Information you may provide",
        paragraphs: [
          "When you submit a contact, consultation or call-back request, the production website will collect the fields you provide. These may include your name, organisation, email address, telephone number, reason for contacting us, preferred contact time and message.",
          "The ‘Am I Covered?’ self-check calculates a result in your browser. If you choose to submit a follow-up request, the production website will send your six self-check answers and the category calculated from them, together with your phone number, email address and preferred contact time. This purpose is shown at the point of collection so Thanelinc can route and prepare for the requested conversation.",
        ],
      },
      {
        id: "use",
        label: "03 — Use",
        title: "How information is used",
        paragraphs: [
          "Information submitted through the production website may be used to respond to your enquiry, understand the service you are asking about, arrange a conversation, and keep an appropriate record of that correspondence.",
          "The production backend may also process the limited technical information needed to deliver the form, prevent abuse, protect the service and diagnose faults. This notice does not authorise a new use of information beyond those purposes.",
        ],
      },
      {
        id: "sharing",
        label: "04 — Sharing",
        title: "When information may be shared",
        paragraphs: [
          "The production backend and any connected communications service may process form submissions on Thanelinc’s behalf. Before launch, Thanelinc must approve those providers, document their roles and ensure suitable written instructions and safeguards are in place.",
          "Information may also be disclosed where required by applicable law, a regulator, or to protect legal rights, safety or the security of the service. This section will be updated with the approved processor arrangements before final publication.",
        ],
      },
      {
        id: "rights",
        label: "05 — Your choices",
        title: "Questions and data-rights requests",
        paragraphs: [
          "Depending on the circumstances and applicable law, you may ask about the personal information Thanelinc holds about you or request that inaccurate information be corrected. You may also raise a concern about how your information is handled.",
          "To make a request, email info@thanelinc.ng with ‘Privacy request’ in the subject line. Thanelinc may need enough information to confirm your identity and understand the request before responding.",
        ],
        links: [{ label: "Nigeria Data Protection Commission: Data Subject Access Request guidance", href: "https://forms.ndpc.gov.ng/dsar-request/" }],
      },
      {
        id: "security",
        label: "06 — Security & retention",
        title: "Keeping information appropriate",
        paragraphs: [
          "The production backend must use organisational and technical measures appropriate to the sensitivity of submitted information, including transport security and access controls. No internet transmission or storage method is completely risk-free.",
          "Retention periods, the named internal owner for privacy requests, and the final backend/processor list are awaiting Thanelinc confirmation. This notice will be updated with those operational details following CDPO review and before launch.",
        ],
      },
      {
        id: "updates",
        label: "07 — Updates",
        title: "Changes to this notice",
        paragraphs: [
          "This notice may be updated when the website, its data flows or applicable obligations change. The date above records the most recent draft revision.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    navLabel: "Cookie Policy",
    eyebrow: "Legal & Privacy",
    title: "Cookie Policy",
    summary: "A clear, current view of the cookies and similar technologies used on this website.",
    updated: "23 August 2026",
    draftNotice: "Operational draft for CDPO and legal review. It must be updated before optional analytics, advertising or third-party tracking tools are introduced, or if the approved submission backend adds cookies beyond essential security controls.",
    sections: [
      {
        id: "scope",
        label: "01 — Scope",
        title: "What cookies are",
        paragraphs: [
          "Cookies are small text files that a website can place in a browser. Similar technologies can also store or read information on a device to remember a setting, support a service or measure activity.",
        ],
      },
      {
        id: "current-use",
        label: "02 — Current use",
        title: "The current website position",
        paragraphs: [
          "At the date above, the public website code does not include optional analytics, advertising or social-media tracking cookies. It does not use a consent banner because no optional tracking tool has been configured in this implementation.",
          "Hosting, security, browser functionality, or the approved form-submission backend may use strictly necessary technical storage to deliver and protect the website. These functions are not used by Thanelinc to build an advertising profile.",
        ],
      },
      {
        id: "choices",
        label: "03 — Your choices",
        title: "Managing cookies",
        paragraphs: [
          "Most browsers let you view, delete or block cookies through their settings. Blocking strictly necessary technologies can affect how a website works.",
          "If Thanelinc adds optional cookies in future, this policy and the site’s consent controls will be updated before those tools are enabled. Any server-side form security cookie must be identified here as an essential cookie before launch.",
        ],
      },
      {
        id: "contact",
        label: "04 — Contact",
        title: "Questions about this policy",
        paragraphs: [
          "For questions about the website’s use of cookies or similar technologies, email info@thanelinc.ng with ‘Cookie policy’ in the subject line.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    navLabel: "Terms",
    eyebrow: "Legal & Privacy",
    title: "Website Terms",
    summary: "The terms that apply to your use of the public Thanelinc website.",
    updated: "23 August 2026",
    draftNotice: "Operational draft for legal review. These website terms do not replace the commercial, professional or data-processing terms agreed in a signed Thanelinc engagement.",
    sections: [
      {
        id: "acceptance",
        label: "01 — Using this site",
        title: "Information, not an engagement",
        paragraphs: [
          "This website is provided to help visitors understand Thanelinc’s services and start a conversation. Using the website does not create a client, adviser or service-provider relationship.",
          "Regulatory obligations depend on an organisation’s specific facts. Website content is general information and should not be treated as a substitute for advice tailored to a particular organisation or incident.",
        ],
      },
      {
        id: "content",
        label: "02 — Website content",
        title: "Keeping content useful and current",
        paragraphs: [
          "Thanelinc may change, correct, remove or update website content as its services, guidance and operational information develop. Visitors should confirm material information with Thanelinc before relying on it for a business decision.",
        ],
      },
      {
        id: "conduct",
        label: "03 — Acceptable use",
        title: "Using the site responsibly",
        paragraphs: [
          "Do not interfere with the site’s operation, attempt to obtain unauthorised access, introduce harmful code, or use the site in a way that could harm Thanelinc, other visitors or the service.",
        ],
      },
      {
        id: "intellectual-property",
        label: "04 — Content ownership",
        title: "Thanelinc materials",
        paragraphs: [
          "Unless otherwise identified, the website’s text, design, marks and original materials belong to Thanelinc or are used with permission. You may view the site for personal or internal business use, but should not reproduce or republish substantial material without permission.",
        ],
      },
      {
        id: "external-links",
        label: "05 — External links",
        title: "Other websites",
        paragraphs: [
          "The site may link to third-party websites for convenience or reference. Thanelinc does not control those sites and their own terms and privacy notices apply when you visit them.",
        ],
      },
      {
        id: "contact",
        label: "06 — Contact",
        title: "Questions about these terms",
        paragraphs: [
          "For a question about these website terms, email info@thanelinc.ng with ‘Website terms’ in the subject line.",
        ],
      },
    ],
  },
];

export const legalDocumentBySlug = (slug: LegalDocumentContent["slug"]) =>
  legalDocuments.find((document) => document.slug === slug)!;
