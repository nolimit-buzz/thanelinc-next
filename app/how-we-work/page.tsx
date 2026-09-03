import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { HowWeWorkPage } from "@/components/how-we-work/HowWeWorkPage";
import { fetchHowWeWorkSections } from "@/lib/cms/client";
import { mapHowWeWorkPage } from "@/lib/cms/mapHowWeWork";
import { howWeWorkContent } from "@/lib/content/howWeWork";

export const metadata = {
  title: howWeWorkContent.title,
  description: howWeWorkContent.summary,
};

/**
 * Copy comes from the `how-we-work` single type. The in-page section nav is
 * structural rather than editorial and has no CMS field, so it still comes from
 * lib/content/howWeWork.ts.
 */
async function HowWeWorkContent() {
  const content = mapHowWeWorkPage(await fetchHowWeWorkSections());
  console.log(`[cms] how-we-work page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <HowWeWorkPage content={content} sectionNav={howWeWorkContent.sectionNav} />;
}

export default function HowWeWorkRoute() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <HowWeWorkContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
