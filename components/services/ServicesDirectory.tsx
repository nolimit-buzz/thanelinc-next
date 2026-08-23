import Link from "next/link";
import { ArrowUpRight, Clock3, FileCheck } from "lucide-react";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { IndexSplitHero } from "@/components/inner/IndexSplitHero";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import {
  servicesIndexAudience,
  servicesIndexClosing,
  servicesIndexDirectory,
  servicesIndexHero,
  servicesIndexProblem,
  type ServiceRow,
} from "@/lib/content/servicesIndex";
import styles from "@/components/services/services-directory.module.css";

function ProblemIcon({ name }: { name: "alert-circle" | "grid" | "shield-alert" }) {
  if (name === "alert-circle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ServiceFact({ icon, label, value }: { icon: "deliverable" | "turnaround"; label: string; value: string }) {
  const Icon = icon === "deliverable" ? FileCheck : Clock3;
  return (
    <div className={styles.serviceFact}>
      <Icon aria-hidden />
      <div>
        <div className={styles.factLabel}>{label}</div>
        <div className={styles.factValue}>{value}</div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: ServiceRow; index: number }) {
  return (
    <article className={`${styles.serviceCard} reveal delay-${Math.min((index % 4) + 1, 4)}`}>
      <div className={styles.serviceCardTop}>
        <div className={styles.serviceIcon} style={{ color: service.shade }}>
          <ServiceRowIcon name={service.icon} size={34} />
        </div>
        <div className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</div>
      </div>
      <div className={styles.serviceCategory}>{service.category}</div>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <div className={styles.serviceFacts}>
        <ServiceFact icon="deliverable" label="Deliverable" value={service.deliverable} />
        <ServiceFact icon="turnaround" label="Turnaround" value={service.turnaround} />
      </div>
      <Link href={`/services/${service.slug}`} className={styles.serviceLink}>
        <span>View service</span>
        <ArrowUpRight aria-hidden />
      </Link>
    </article>
  );
}

export function ServicesDirectory({ services }: { services: ServiceRow[] }) {
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

  return (
    <main>
      <IndexSplitHero
        eyebrow={servicesIndexHero.eyebrow}
        title={servicesIndexHero.title}
        titleAccent={servicesIndexHero.titleAccent}
        summary={servicesIndexHero.subhead}
        primaryCta={servicesIndexHero.primaryCta}
        secondaryCta={servicesIndexHero.secondaryCta}
        metrics={servicesIndexHero.metrics}
        image={{ src: "/services-hero-cutout.png", alt: "Thanelinc compliance adviser", width: 640, height: 1074 }}
        floatingPanel={servicesIndexHero.floatingPanel}
        credentialPanel={servicesIndexHero.credentialPanel}
        variant="services"
      />

      <section className={styles.problemSection}>
        <div className="container">
          <div className={styles.problemIntro}>
            <div className={`${styles.sectionEyebrow} reveal`}>{servicesIndexProblem.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{servicesIndexProblem.h2}</h2>
              <p>{servicesIndexProblem.description}</p>
            </div>
          </div>
          <div className={styles.problemGrid}>
            {servicesIndexProblem.cards.map((card, index) => (
              <article key={card.title} className={`${styles.problemCard} reveal delay-${index + 1}`}>
                <div className={styles.problemIcon}><ProblemIcon name={card.icon} /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.directorySection} id="service-directory">
        <div className="container">
          <div className={styles.directoryIntro}>
            <div className={`${styles.sectionEyebrow} reveal`}>{servicesIndexDirectory.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{servicesIndexDirectory.h2}</h2>
              <p>{servicesIndexDirectory.subhead}</p>
            </div>
          </div>

          <div className={styles.directoryGroups}>
            {servicesIndexDirectory.groups.map((group) => {
              const groupServices = group.slugs
                .map((slug) => serviceBySlug.get(slug))
                .filter((service): service is ServiceRow => Boolean(service));
              return (
                <section key={group.number} className={styles.directoryGroup} aria-labelledby={`service-group-${group.number}`}>
                  <header className={`${styles.groupHeader} reveal`}>
                    <div className={styles.groupNumber}>{group.number}</div>
                    <h3 id={`service-group-${group.number}`}>{group.label}</h3>
                  </header>
                  <div className={styles.serviceGrid}>
                    {groupServices.map((service) => (
                      <ServiceCard key={service.slug} service={service} index={services.indexOf(service)} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className="container">
          <div className={styles.audienceIntro}>
            <div className={`${styles.sectionEyebrow} reveal`}>{servicesIndexAudience.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{servicesIndexAudience.h2}</h2>
              <p>{servicesIndexAudience.subhead}</p>
            </div>
          </div>
          <div className={styles.audienceGrid}>
            {servicesIndexAudience.cards.map((card, index) => (
              <Link href={card.href} key={card.href} className={`${styles.audienceCard} reveal delay-${index + 1}`}>
                <ServiceRowIcon name={card.icon} size={38} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
                <span className={styles.audienceLink}>{card.cta} <ArrowUpRight aria-hidden /></span>
              </Link>
            ))}
            <Link href={servicesIndexAudience.selfCheck.href} className={`${styles.selfCheckCard} reveal delay-3`}>
              <div className={styles.selfCheckEyebrow}>{servicesIndexAudience.selfCheck.eyebrow}</div>
              <h3>{servicesIndexAudience.selfCheck.title}</h3>
              <p>{servicesIndexAudience.selfCheck.body}</p>
              <span>{servicesIndexAudience.selfCheck.cta} <ArrowUpRight aria-hidden /></span>
            </Link>
          </div>
        </div>
      </section>

      <InnerPageCta
        heading={servicesIndexClosing.heading}
        primary={servicesIndexClosing.primary}
        backgroundImage="/hero-hologram.jpg"
        cutoutImage="/services-hero-cutout-bust.png"
      />
      <ScrollReveals />
    </main>
  );
}
