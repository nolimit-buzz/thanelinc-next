import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ResourcesLibraryPage } from "@/components/resources/ResourcesLibraryPage";
import { fetchResourcesSections } from "@/lib/cms/client";
import { mapResourcesPage } from "@/lib/cms/mapResources";

export async function generateMetadata(): Promise<Metadata> {
  const content = mapResourcesPage(await fetchResourcesSections());
  if (!content) return {};
  return { title: content.hero.metaTitle, description: content.hero.metaDescription };
}

/**
 * Page copy is fetched from the Strapi CMS (`resources` single type, with retry
 * on transient failure — see lib/cms/client.ts) with no fallback content.
 */
async function ResourcesContent() {
  const content = mapResourcesPage(await fetchResourcesSections());
  console.log(`[cms] resources page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <ResourcesLibraryPage content={content} />;
}

export default function ResourcesPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <ResourcesContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
