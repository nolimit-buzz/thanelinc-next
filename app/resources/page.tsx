import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ResourcesLibraryPage } from "@/components/resources/ResourcesLibraryPage";
import { fetchResourcesSections } from "@/lib/cms/client";
import { mapResourcesPage } from "@/lib/cms/mapResources";

export const metadata = {
  title: "Resource Library",
  description: "Explainers, articles, news and training updates for compliance owners.",
};

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
