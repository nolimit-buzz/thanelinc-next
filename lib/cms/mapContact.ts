import type { StrapiSection } from "@/lib/cms/client";
import type { ContactChannel, ContactPageContent } from "@/lib/content/contact";
import { contactConsent } from "@/lib/content/contact";

/**
 * Maps the `contact` single type onto the props the /contact page renders.
 *
 * The hero's `heroVisual` field is deliberately not mapped: the map artwork is
 * an inline SVG that belongs to the page's layout, not to its copy, so it stays
 * in the component. Consent wording comes from `contactConsent` rather than the
 * CMS — see ContactPageContent.
 */
function findSection(sections: StrapiSection[] | null, component: string): StrapiSection | undefined {
  return sections?.find((section) => section.__component === component);
}

export function mapContactPage(sections: StrapiSection[] | null): ContactPageContent | null {
  const heroSection = findSection(sections, "contact.hero-section");
  const bandSection = findSection(sections, "contact.contact-band-section");

  const channels = bandSection?.channels as ContactChannel[] | undefined;
  const reasons = bandSection?.formReasons as Array<{ label: string }> | undefined;

  // The channel list is the whole point of this page, and the reason select is
  // required on submit — an empty one would make the form unsubmittable.
  if (!heroSection?.h1 || !bandSection || !channels?.length || !reasons?.length) return null;

  return {
    eyebrow: String(heroSection.eyebrow ?? ""),
    h1: String(heroSection.h1),
    subhead: String(heroSection.subhead ?? ""),
    visual: { calloutLabel: String(heroSection.calloutLabel ?? "") },
    channelsHeading: String(bandSection.channelsHeading ?? ""),
    channels: channels.map((channel) => ({
      label: String(channel.label ?? ""),
      value: String(channel.value ?? ""),
      href: String(channel.href ?? ""),
      note: String(channel.note ?? ""),
    })),
    breachNote: { label: String(bandSection.breachNoteLabel ?? ""), href: String(bandSection.breachNoteHref ?? "") },
    selfCheckCta: {
      label: String(bandSection.selfCheckCtaLabel ?? ""),
      href: String(bandSection.selfCheckCtaHref ?? ""),
    },
    form: {
      heading: String(bandSection.formHeading ?? ""),
      intro: String(bandSection.formIntro ?? ""),
      reasonLabel: String(bandSection.formReasonLabel ?? ""),
      reasonPlaceholder: String(bandSection.formReasonPlaceholder ?? ""),
      nameLabel: String(bandSection.formNameLabel ?? ""),
      organisationLabel: String(bandSection.formOrganisationLabel ?? ""),
      emailLabel: String(bandSection.formEmailLabel ?? ""),
      phoneLabel: String(bandSection.formPhoneLabel ?? ""),
      reasons: reasons.map((reason) => String(reason.label ?? "")).filter(Boolean),
      submitLabel: String(bandSection.formSubmitLabel ?? ""),
      deliveryNote: String(bandSection.formDeliveryNote ?? ""),
      subject: String(bandSection.formSubject ?? ""),
      ...contactConsent,
    },
  };
}
