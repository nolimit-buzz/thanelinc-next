import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { ArticleSidebar } from "@/components/resources/ArticleSidebar";
import { ResourceCards, type ResourceCardItem } from "@/components/resources/ResourceCards";
import type { ResourceArticleContent } from "@/lib/cms/mapResourceArticle";
import styles from "@/components/resources/resource-article.module.css";

export function ResourceArticlePage({ content, related }: { content: ResourceArticleContent; related: ResourceCardItem[] }) {
  const { article, cta, sidebar } = content;

  return (
    <>
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <Link href="/resources" className={styles.backLink}>Resources <span aria-hidden>›</span> {article.kind}</Link>
            <div className={styles.heroGrid}>
              <p className={styles.kind}>{article.kind}</p>
              <h1>{article.title}</h1>
              <div className={styles.heroImage}>
                <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 900px) calc(100vw - 64px), 850px" priority className={styles.image} />
              </div>
              <div className={styles.heroDetails}>
                <p className={styles.summary}>{article.summary}</p>
                <div className={styles.meta}><span>Reviewed {article.lastReviewed}</span>{article.audience.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.articleShell}>
          <div className={`container ${styles.articleGrid}`}>
            <article className={styles.article}>
              {article.sections.map((section, index) => (
                <section id={section.id} key={section.id} className={styles.articleSection}>
                  <p className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</p>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points ? (
                    <dl className={styles.points}>
                      {section.points.map((point) => <div key={point.label}><dt>{point.label}</dt><dd>{point.body}</dd></div>)}
                    </dl>
                  ) : null}
                </section>
              ))}
              <section className={styles.articleCta}>
                <p>{cta.label}</p>
                <h2>{cta.heading}</h2>
                <div><Link href={article.primaryCta.href} className="btn-architectural-cta"><span className="btn-arch-label">{article.primaryCta.label}</span><span className="btn-arch-arrow">→</span></Link><Link href={article.secondaryCta.href} className="mandate-link-check"><span>{article.secondaryCta.label}</span><ArrowRight aria-hidden /></Link></div>
              </section>
            </article>
            <ArticleSidebar article={article} newsletter={sidebar} />
          </div>
        </section>

        {/* The related list comes from the resource library single type, so it is
            simply omitted when that fetch fails rather than failing the article. */}
        {related.length > 0 ? (
          <section className={styles.relatedSection}>
            <div className="container">
              <div className={styles.relatedHeader}><p className={styles.kind}>{content.related.kindLabel}</p><h2>{content.related.heading}</h2><Link href={content.related.viewAllHref}>{content.related.viewAllLabel} <span aria-hidden>↗</span></Link></div>
              <ResourceCards articles={related} compact />
            </div>
          </section>
        ) : null}
      </main>
      <ScrollReveals />
    </>
  );
}
