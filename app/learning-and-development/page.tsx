import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { LearningDevelopmentPage } from "@/components/learning-development/LearningDevelopmentPage";
import { fetchLearningDevelopmentSections } from "@/lib/cms/client";
import { mapLearningDevelopmentPage } from "@/lib/cms/mapLearningDevelopment";

export const metadata = {
  title: "Learning & Development",
  description:
    "Leadership, digital fluency, and execution capability: practical workshops, technology-enabled learning, and Strategy Lab Retreats that deliver measurable outcomes.",
};

/**
 * Page copy is fetched from the Strapi CMS (`learning-development` single type,
 * with retry on transient failure — see lib/cms/client.ts) with no fallback
 * content. Wrapped in Suspense so the fetch/retry window shows a loader,
 * matching /services and the homepage.
 */
async function LearningDevelopmentContent() {
  const content = mapLearningDevelopmentPage(await fetchLearningDevelopmentSections());
  console.log(`[cms] learning-development page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <LearningDevelopmentPage content={content} />;
}

export default function LearningAndDevelopmentPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <LearningDevelopmentContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
