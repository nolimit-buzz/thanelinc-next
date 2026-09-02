import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { fetchSectorDetailSections } from "@/lib/cms/client";
import { mapSectorDetail } from "@/lib/cms/mapSectorDetail";
import { sectorsPublicSectorContent } from "@/lib/content/sectorsPublicSector";

// See the note on /sectors/tertiary-institutions: metadata stays local.
export const metadata = {
  title: sectorsPublicSectorContent.title,
  description: sectorsPublicSectorContent.summary,
};

async function PublicSectorContent() {
  const content = mapSectorDetail(await fetchSectorDetailSections("public-sector"));
  console.log(`[cms] public-sector page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <GuidedSectorPageTemplate content={content} />;
}

export default function PublicSectorPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <PublicSectorContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
