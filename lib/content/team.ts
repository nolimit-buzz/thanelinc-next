export interface TeamMember {
  displayOrder: number;
  name: string;
  role: string;
  credentials: string[];
  biography: string[];
  image?: { src: string; alt: string };
  linkedInUrl?: string;
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
  title: "Our Team — Thanelinc",
  summary: "Dedicated professionals. Fully accountable.",
  hero: {
    eyebrow: "Our Team",
    h1: "Dedicated professionals.",
    h1Accent: "Fully accountable.",
    summary: "Meet the people who lead Thanelinc's work across business strategy, learning, governance and data protection.",
    primaryCta: { label: "See credentials", href: "/about#credentials" },
    secondaryCta: { label: "How we work", href: "/how-we-work" },
  },
  introduction: {
    eyebrow: "Leadership",
    heading: "Our Team",
    body: "Dedicated professionals. Fully accountable.",
  },
  members: [
    {
      displayOrder: 1,
      name: "Ogho Emore",
      role: "CEO, Thanelinc Nigeria Limited",
      credentials: [],
      biography: [
        "Ogho Emore is an SME consultant, trainer, and business strategist with a strong background in entrepreneurship and organizational development, having led multiple business growth initiatives and supported SMEs in building sustainable, scalable operations.",
        "As CEO of Thanelinc Nigeria Limited and Co-Founder of assess.ng, he drives the company's growth and innovation across HR systems, digital learning platforms, and business development strategy. He leads Thanelinc's Data Protection Compliance unit, which holds certification as a Data Protection Compliance Organization (DPCO).",
        "He holds a degree in Accounting and Finance from Madonna University and is an alumnus of Pan-Atlantic University's Enterprise Development Centre, where he studied Entrepreneurial Management, alongside further certifications in business development, financial intelligence, negotiation, and project management.",
      ],
      image: { src: "/team/ogho-emore.jpg", alt: "Ogho Emore" },
      disclosureStatus: "cleared",
    },
    {
      displayOrder: 3,
      name: "Chukwuweike Karl Ogwu",
      role: "Head of Learning and Development",
      credentials: [],
      biography: [
        "Chukwuweike Karl Ogwu brings over 20 years of experience across banking, HR, and executive training to his work in building people-centred learning and consulting solutions. He specializes in leadership training and compliance training, using experiential learning methods that help people internalize skills through practice rather than theory alone.",
        "Karl's deep understanding of how people make decisions and build trust shapes his approach to training design and client delivery. As Head of Learning and Development at Thanelinc Nigeria Limited, he leads the design and delivery of leadership and compliance programmes rooted in experiential learning, helping teams translate training into lasting, practical behavioural change.",
      ],
      image: { src: "/team/chukwuweike-karl-ogwu.jpg", alt: "Chukwuweike Karl Ogwu" },
      disclosureStatus: "cleared",
    },
    {
      displayOrder: 4,
      name: "Emmanuella Uyaelumuo",
      role: "Company Secretary",
      credentials: [],
      biography: [
        "Emmanuella Uyaelumuo serves as Company Secretary at Thanelinc, where she oversees the company's legal and governance functions. She holds a Bachelor of Law from Madonna University Nigeria and brings a well-rounded background in corporate and company secretarial practice, having supported legal and governance operations across the advertising, technology, and business services sectors.",
        "Prior to joining Thanelinc, Emmanuella held and still holds legal and secretarial roles including Corporate Secretary at Outdoors.ng, Legal Secretary at WHSC Nigeria, as well as a company secretarial role at Premium E-commerce Support Service Limited. This breadth of experience gives her a strong command of corporate compliance, governance, and legal administration, which she applies in support of Thanelinc's operations.",
      ],
      image: { src: "/team/emmanuella-uyaelumuo.jpg", alt: "Emmanuella Uyaelumuo" },
      disclosureStatus: "cleared",
    },
    {
      displayOrder: 2,
      name: "Tsenyon Dariem",
      role: "Certified Data Protection Officer (CDPO)",
      credentials: ["CDPO"],
      biography: [
        "Tsenyon Dariem is a Certified Data Protection Officer (CDPO) with experience spanning data protection, privacy management, governance, compliance, healthcare administration, and strategic communication. She has supported organisations in embedding privacy into their operations through effective governance and compliance frameworks, with a strong focus on accountability, responsible information management, and regulatory compliance.",
        "With a background in Mass Communication and journalism, she combines privacy expertise with strong communication and stakeholder engagement skills, enabling her to translate complex data protection requirements into clear, practical solutions and promote a culture of privacy and compliance within organisations.",
      ],
      image: { src: "/team/tsenyon-dariem.jpg", alt: "Tsenyon Dariem" },
      disclosureStatus: "cleared",
    },
  ],
  bridge: {
    heading: "Verify the firm as well as the practitioner.",
    body: "The DPCO licence and separate Data Controller/Processor registration are available to view directly, alongside an explanation of why the distinction matters.",
    href: "/about#credentials",
    ctaLabel: "View our credentials",
  },
  closingCta: {
    heading: "Need a clearer view of your organisation's next step?",
    primary: { label: "Run the self-check", href: "/am-i-covered" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
};
