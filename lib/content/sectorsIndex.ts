export const sectorsIndexHero = {
  eyebrow: "Who We Serve",
  title: "Compliance guidance",
  titleAccent: "built around your world.",
  summary:
    "Every organisation with a filing obligation falls under EHL or UHL, but you shouldn't need to know that to find your page. Start with one of four routes built around what you actually do. Each sector page walks through why you're in scope, what to do first, and how Thanelinc's DPCO licence carries you through registration and filing.",
  primaryCta: { label: "Find your sector", href: "#sector-directory" },
  secondaryCta: { label: "Run the self-check", href: "/am-i-covered" },
  metrics: [
    { value: "4", label: "approved sector routes" },
    { value: "EHL", label: "Institutions, Private orgs & SMEs" },
    { value: "UHL", label: "regulated businesses, private orgs & SMEs" },
  ],
  floatingPanel: {
    eyebrow: "Audience routes",
    title: "Begin with your trigger",
    body: "A regulatory deadline, due diligence request, new contract requirement, or incident.",
  },
  credentialPanel: {
    eyebrow: "Licensed DPCO",
    title: "Trust it wherever you start",
    body: "No matter which sector page you land on first, the licence is right there, not buried on the homepage.",
  },
};

export const sectorsIndexDirectory = {
  eyebrow: "Sector Directory",
  h2: "Find the page that matches your organisation.",
  subhead:
    "The law is the same for everyone, but the operational questions are not. Each page speaks to the pressure your team is actually facing.",
  // Card order follows the client's revision doc: mid-size first, then UHL,
  // then the two named-by-category EHL routes.
  cards: [
    {
      number: "01",
      eyebrow: "Mid-Size Organisations & Financial Institutions · EHL",
      title: "Organisations & Financial Institutions",
      body: "Every organisation on the NDPC's EHL list qualifies either by name: hospitals, microfinance and mortgage banks, or by data volume, once processing crosses 1,000 data subjects in six months. See what that means for filing, governance, and regulatory scrutiny.",
      href: "/sectors/mid-size-organizations",
      cta: "Explore EHL organisations",
      icon: "layers" as const,
      categories: ["Hospitals", "Microfinance & Mortgage Banks", "Private Orgs & SMEs (by data volume)"],
    },
    {
      number: "02",
      eyebrow: "Regulated Businesses · UHL",
      title: "Regulated Businesses & High-Volume Organisations",
      body: "Every organisation on the NDPC's UHL list qualifies either by name: banks, telecoms, insurers, fintechs, oil & gas, and similar high-exposure sectors, or by data volume, once processing crosses 5,000 data subjects in six months. That volume route also covers retail, health, logistics, and other private organisations or SMEs handling data at scale.",
      href: "/sectors/regulated-businesses",
      cta: "Explore UHL organisations",
      icon: "building" as const,
      categories: [
        "Banks & Fintech",
        "Telecoms & Payments",
        "Insurance & Oil and Gas",
        "Retail, Health & Logistics (by data volume)",
        "Private Orgs & SMEs (by data volume)",
      ],
    },
    {
      number: "03",
      eyebrow: "Tertiary Institutions · EHL",
      title: "Universities & Tertiary Institutions",
      body: "Every higher institution qualifies for EHL by name; no volume threshold applies, regardless of student numbers. See what that means for filing, governance, and council scrutiny.",
      href: "/sectors/tertiary-institutions",
      cta: "Explore tertiary institutions",
      icon: "graduation-cap" as const,
      categories: ["Universities", "Polytechnics", "Colleges"],
    },
    {
      number: "04",
      eyebrow: "Public Sector & MDAs · EHL",
      title: "Ministries, Departments & Agencies",
      body: "Government bodies are named EHL categories outright — size and data volume don't factor in. See what that means for filing, governance, and public accountability.",
      href: "/sectors/public-sector",
      cta: "Explore public sector & MDAs",
      icon: "landmark" as const,
      categories: ["Federal & State MDAs"],
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
  heading: "Know you're exposed? Not sure of the category?",
  primary: { label: "Run the self-check", href: "/am-i-covered" },
  secondary: { label: "Get in touch", href: "/contact" },
};
