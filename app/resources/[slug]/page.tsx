import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticlePage } from "@/components/resources/ResourceArticlePage";
import { resourceArticleBySlug, resourceArticles } from "@/lib/content/resources";

export const dynamicParams = false;

export function generateStaticParams() { return resourceArticles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = resourceArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ResourceArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = resourceArticleBySlug(slug);
  if (!article) notFound();
  return <ResourceArticlePage article={article} related={resourceArticles.filter((item) => item.slug !== article.slug)} />;
}
