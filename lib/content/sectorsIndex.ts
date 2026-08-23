export const sectorsIndexHero = {
  eyebrow: "Who We Serve",
  title: "Compliance guidance",
  titleAccent: "built around your world.",
  summary:
    "Start with the route that matches your organisation. Each sector page explains why you are in scope, what happens next, and how a licensed DPCO supports the filing path.",
  primaryCta: { label: "Find your sector", href: "#sector-directory" },
  secondaryCta: { label: "Run the self-check", href: "/am-i-covered" },
  metrics: [
    { value: "2", label: "approved sector routes" },
    { value: "EHL", label: "higher institutions" },
    { value: "UHL", label: "regulated businesses" },
  ],
  floatingPanel: {
    eyebrow: "Audience routes",
    title: "Begin with your trigger",
    body: "A regulatory deadline, due diligence request, contract, or incident.",
  },
  credentialPanel: {
    eyebrow: "Licensed DPCO",
    title: "Credential established on every route",
    body: "Each sector page stands on its own, even when it is your first visit.",
  },
};

export const sectorsIndexDirectory = {
  eyebrow: "Sector Directory",
  h2: "Choose the route written for your organisation.",
  subhead:
    "The statutory framework may be shared, but the operational questions are not. These pages start with the pressure your team is actually facing.",
  cards: [
    {
      number: "01",
      eyebrow: "Higher Institutions · EHL",
      title: "Universities & Tertiary Institutions",
      body: "Every higher institution is an EHL organisation under the NDPC, by name, not by size. See what that means for filing, governance, student data, and council scrutiny.",
      href: "/sectors/tertiary-institutions",
      cta: "Explore tertiary institutions",
      icon: "graduation-cap" as const,
      categories: ["Universities", "Polytechnics", "Colleges"],
    },
    {
      number: "02",
      eyebrow: "Regulated Businesses · UHL",
      title: "Regulated Private Businesses",
      body: "For fintech, telecoms, insurance, retail, health, logistics, and other high-exposure businesses handling customer, employee, or partner data.",
      href: "/sectors/regulated-businesses",
      cta: "Explore regulated businesses",
      icon: "building" as const,
      categories: ["Finance & Fintech", "Telecoms", "Insurance", "Retail", "Health", "Logistics"],
    },
  ],
};

export const sectorsIndexCoverage = {
  eyebrow: "Not Sure Where You Fit?",
  h2: "Classification can follow your organisation type or your data volume.",
  body:
    "The quickest route is the category self-check. It applies the named categories before volume, then gives you the obligation and deadline that follow from your answers.",
  cta: { label: "Check your category", href: "/am-i-covered" },
};

export const sectorsIndexClosing = {
  heading: "Know the pressure. Not the category?",
  primary: { label: "Run the self-check", href: "/am-i-covered" },
  secondary: { label: "Get in touch", href: "/contact" },
};
