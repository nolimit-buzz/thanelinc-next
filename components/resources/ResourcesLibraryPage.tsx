import Link from "next/link";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { ResourceCards } from "@/components/resources/ResourceCards";
import type { ResourcesLibraryContent } from "@/lib/cms/mapResources";
import styles from "@/components/resources/resources-library.module.css";

export function ResourcesLibraryPage({ content }: { content: ResourcesLibraryContent }) {
  const { hero, library } = content;

  return (
    <>
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="container"><p>{hero.eyebrow}</p><h1>{hero.h1}</h1><span>{hero.subhead}</span></div>
        </header>
        <section className={styles.library}><div className="container">
          <div className={styles.categories}>{library.categories.map((category) => <div key={category.id}><strong>{category.label}</strong><span>{category.detail}</span><small>{category.state === "live" ? library.stateLiveLabel : library.stateComingSoonLabel}</small></div>)}</div>
          <div className={styles.listHeader}><div><p>{library.listHeaderLabel}</p><h2>{library.listHeaderHeading}</h2></div><Link href={library.suggestTopicHref}>{library.suggestTopicLabel} <span aria-hidden>↗</span></Link></div>
          <ResourceCards articles={library.cards} readLabel={library.cardReadLabel} reviewedLabel={library.cardReviewedLabel} />
        </div></section>
      </main>
      <ScrollReveals />
    </>
  );
}
