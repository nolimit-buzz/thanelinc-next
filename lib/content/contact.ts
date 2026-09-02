export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  note: string;
}

/**
 * The content-model contract for the `contact` single type. `consentLabel` and
 * `privacyLink` have no CMS fields — the privacy consent wording is a legal
 * control, not editable marketing copy — so they stay static and the route
 * threads them into the form.
 */
export interface ContactPageContent {
  eyebrow: string;
  h1: string;
  subhead: string;
  visual: { calloutLabel: string };
  channelsHeading: string;
  channels: readonly ContactChannel[];
  breachNote: { label: string; href: string };
  selfCheckCta: { label: string; href: string };
  form: {
    heading: string;
    intro: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    nameLabel: string;
    organisationLabel: string;
    emailLabel: string;
    phoneLabel: string;
    reasons: readonly string[];
    submitLabel: string;
    deliveryNote: string;
    consentLabel: string;
    privacyLink: { label: string; href: string };
    subject: string;
  };
}

/**
 * Consent wording retained from the static module and threaded into the
 * CMS-backed form — see `ContactPageContent` above.
 */
export const contactConsent = {
  consentLabel: "I agree to the",
  privacyLink: { label: "Privacy Policy", href: "/privacy" },
} as const;

/** Confirmed contact channels come from the canonical `data/site.json`. */
export const contact = {
  eyebrow: "Contact",
  h1: "Talk to us about what comes next.",
  subhead: "Request a scoped proposal, ask a question before committing, or find out where you stand first.",
  visual: {
    calloutLabel: "General enquiries",
  },
  channelsHeading: "Choose the channel that fits your question.",
  channels: [
    {
      label: "Email",
      value: "info@thanelinc.ng",
      href: "mailto:info@thanelinc.ng",
      note: "For proposals and general enquiries.",
    },
    {
      label: "General / breach line",
      value: "0913 016 2558",
      href: "tel:09130162558",
      note: "Use the breach-response route for same-day breach support.",
    },
    {
      label: "Compliance line",
      value: "0807 269 0085",
      href: "tel:08072690085",
      note: "For compliance enquiries.",
    },
  ],
  breachNote: { label: "Go to breach response", href: "/services/breach-response" },
  selfCheckCta: { label: "Run the self-check", href: "/am-i-covered" },
  form: {
    heading: "Get in touch",
    intro: "Share enough context for a useful first conversation.",
    reasonLabel: "Reason for contacting",
    reasons: [
      "NDPC registration and filing",
      "Data mapping and ROPA",
      "Gap assessment and DPIA",
      "Policies and remediation",
      "Outsourced DPO",
      "Compliance audit and filing",
      "Ongoing compliance monitoring",
      "Breach response",
      "Privacy and compliance training",
      "General enquiry",
    ],
    submitLabel: "Send message",
    deliveryNote: "We'll reply to the email address you provide.",
    consentLabel: "I agree to the",
    privacyLink: { label: "Privacy Policy", href: "/privacy" },
    subject: "Proposal request from thanelinc.ng",
  },
} as const;
