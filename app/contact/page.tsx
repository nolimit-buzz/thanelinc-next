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
              <svg className={styles.mapArtwork} viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden>
                <rect width="1200" height="420" className={styles.mapGround} />
                <path className={styles.mapWater} d="M-40 330 C150 270 270 360 430 310 S730 225 910 285 S1090 350 1240 280 L1240 460 L-40 460 Z" />
                <g className={styles.mapMinorRoads}>
                  <path d="M40 40 L250 180 L400 110 L590 240 L780 105 L1150 210" />
                  <path d="M0 160 L180 95 L350 250 L510 165 L700 320 L900 170 L1200 240" />
                  <path d="M80 390 L170 245 L330 315 L455 205 L650 365 L820 230 L1030 345 L1180 190" />
                  <path d="M120 0 L210 420 M360 0 L310 420 M520 0 L610 420 M760 0 L720 420 M980 0 L1050 420" />
                  <path d="M0 75 L1200 40 M0 215 L1200 155 M0 365 L1200 330" />
                </g>
                <g className={styles.mapMajorRoads}>
                  <path d="M-30 115 C210 185 335 40 560 120 S880 285 1230 115" />
                  <path d="M95 450 C210 310 275 260 450 255 S730 350 850 190 S1050 60 1210 75" />
                </g>
                <g className={styles.mapBlocks}>
                  <path d="M160 135 l68 18 -22 52 -70 -18 z M420 55 l95 20 -18 62 -100 -18 z M790 155 l88 -10 20 58 -94 16 z M1010 255 l92 22 -24 62 -96 -24 z" />
                  <path d="M270 275 l78 -12 16 48 -82 15 z M610 115 l82 26 -18 55 -86 -28 z M690 305 l96 -18 15 52 -98 18 z" />
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
