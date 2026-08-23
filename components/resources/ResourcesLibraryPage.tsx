import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { ResourceCards } from "@/components/resources/ResourceCards";
import { resourceArticles, resourceKinds } from "@/lib/content/resources";
import styles from "@/components/resources/resources-library.module.css";

export function ResourcesLibraryPage() {
  return (
    <>
      <SiteNav variant="light" />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="container"><p>Resource library</p><h1>Useful clarity for the next compliance decision.</h1><span>Explainers, articles, news and training updates — organised for the work you need to do.</span></div>
        </header>
        <section className={styles.library}><div className="container">
          <div className={styles.categories}>{resourceKinds.map((category) => <div key={category.id}><strong>{category.label}</strong><span>{category.detail}</span><small>{category.state === "live" ? "Published now" : "Coming soon"}</small></div>)}</div>
          <div className={styles.listHeader}><div><p>Published explainers</p><h2>Start with the practical questions.</h2></div><Link href="/contact">Suggest a topic <span aria-hidden>↗</span></Link></div>
          <ResourceCards articles={resourceArticles} />
        </div></section>
      </main>
      <ScrollReveals />
      <SiteFooter />
    </>
  );
}
