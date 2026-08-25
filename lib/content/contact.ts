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
      value: "info@thanelinc.com",
      href: "mailto:info@thanelinc.com",
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
    subject: "Proposal request from thanelinc.com",
  },
} as const;
