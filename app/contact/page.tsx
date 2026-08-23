import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/contact/contact.module.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { contact } from "@/lib/content/contact";

export const metadata = {
  title: "Contact",
  description: "Request a scoped proposal or talk to Thanelinc before committing.",
};

export default function ContactPage() {
  const email = contact.channels[0];

  return (
    <>
      <SiteNav variant="light" />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={`${styles.headingRow} reveal`}>
              <div className={styles.eyebrow}>{contact.eyebrow}</div>
              <div className={styles.heroCopy}>
                <h1 className={styles.title}>{contact.h1}</h1>
                <p className={styles.heroSummary}>{contact.subhead}</p>
              </div>
            </div>

            <div className={`${styles.visual} reveal delay-1`}>
              <svg className={styles.mapArtwork} viewBox="0 0 2048 680" preserveAspectRatio="none" aria-hidden>
                <rect width="2048" height="680" className={styles.mapGround} />
                <path className={styles.mapWater} d="M-45 510 C210 430 420 560 650 468 S1110 408 1325 488 S1710 585 2100 442 L2100 730 L-45 730 Z" />
                <g className={styles.mapMinorRoads}>
                  <path d="M65 62 L292 254 L464 156 L755 360 L988 169 L1368 332 L1732 138 L2030 270" />
                  <path d="M-20 192 L244 130 L486 338 L718 222 L1007 430 L1304 237 L1638 417 L2060 267" />
                  <path d="M112 642 L291 390 L566 528 L805 298 L1110 592 L1405 350 L1744 547 L2010 278" />
                  <path d="M148 0 L310 680 M600 0 L526 680 M910 0 L1070 680 M1304 0 L1240 680 M1662 0 L1782 680" />
                  <path d="M0 90 L2048 56 M0 266 L2048 194 M0 468 L2048 410 M0 624 L2048 582" />
                </g>
                <g className={styles.mapMajorRoads}>
                  <path d="M-55 181 C282 285 530 48 846 166 S1420 438 2105 166" />
                  <path d="M126 730 C336 492 496 394 748 404 S1182 548 1425 284 S1776 79 2088 106" />
                </g>
                <g className={styles.mapBlocks}>
                  <path d="M245 203 l112 31 -35 84 -118 -31 z M683 74 l149 32 -29 99 -156 -31 z M1170 243 l143 -17 31 95 -151 23 z M1630 424 l147 34 -39 99 -154 -37 z" />
                  <path d="M438 439 l128 -20 26 78 -137 24 z M896 171 l133 43 -31 88 -141 -46 z M1012 494 l154 -28 24 82 -158 28 z M1826 184 l110 26 -21 72 -116 -28 z" />
                </g>
              </svg>
              <div aria-hidden className={styles.mapVignette} />
              <div className={`${styles.visualCallout} reveal delay-2`}>
                <div className={styles.calloutLabel}>{contact.visual.calloutLabel}</div>
                <a href={email.href} className={styles.calloutLink}>{email.value}</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contactBand}>
          <div className={`container ${styles.contactGrid}`}>
            <div>
              <h2 className={`${styles.channelHeading} reveal`}>{contact.channelsHeading}</h2>
              <div className={styles.channelList}>
                {contact.channels.map((channel, index) => (
                  <div key={channel.href} className={`${styles.channel} reveal delay-${index + 1}`}>
                    <div className={styles.channelLabel}>{channel.label}</div>
                    <a className={styles.channelLink} href={channel.href}>{channel.value}</a>
                    <p className={styles.channelNote}>{channel.note}</p>
                  </div>
                ))}
              </div>
              <div className={`${styles.utilityLinks} reveal delay-3`}>
                <Link href={contact.breachNote.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
                  <span>{contact.breachNote.label}</span><span>→</span>
                </Link>
                <Link href={contact.selfCheckCta.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
                  <span>{contact.selfCheckCta.label}</span><span>→</span>
                </Link>
              </div>
            </div>

            <div className={`${styles.formCard} reveal delay-1`}>
              <h2 className={styles.formHeading}>{contact.form.heading}</h2>
              <p className={styles.formIntro}>{contact.form.intro}</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <ScrollReveals />
      <SiteFooter />
    </>
  );
}
