import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ResourceArticlePage } from "@/components/resources/ResourceArticlePage";
import {
  RESOURCE_ARTICLE_SLUGS,
  fetchResourceArticleSections,
  fetchResourcesSections,
  isResourceArticleSlug,
  type ResourceArticleSlug,
} from "@/lib/cms/client";
import { mapResourceArticlePage } from "@/lib/cms/mapResourceArticle";
import { mapResourceCardLabels, mapResourceCards } from "@/lib/cms/mapResources";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isResourceArticleSlug(slug)) return {};

  const content = mapResourceArticlePage(await fetchResourceArticleSections(slug), slug);
  if (!content) return {};
  return { title: content.article.title, description: content.article.summary };
}

/**
 * Article copy comes from the article's own Strapi single type; the related
 * cards come from the `resources` library single type, fetched alongside it so
 * a library failure costs only the related block.
 */
async function ArticleContent({ slug }: { slug: ResourceArticleSlug }) {
  const [articleSections, librarySections] = await Promise.all([
    fetchResourceArticleSections(slug),
    fetchResourcesSections(),
  ]);

  const content = mapResourceArticlePage(articleSections, slug);
  console.log(`[cms] resource article ${slug}: ${content ? "live" : "missing"}`);
  if (!content) return <ContentUnavailable />;

  const cards = mapResourceCards(librarySections);
  const relatedSlugs = content.related.slugs;
  const related = cards.filter(
    (card) => card.slug !== slug && (relatedSlugs.length === 0 || relatedSlugs.includes(card.slug)),
  );

  return (
    <ResourceArticlePage content={content} related={related} cardLabels={mapResourceCardLabels(librarySections)} />
  );
}

export default async function ResourceArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isResourceArticleSlug(slug)) notFound();

  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <ArticleContent slug={slug} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
