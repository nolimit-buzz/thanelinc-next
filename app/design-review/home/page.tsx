import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeHeroArtworkReview } from "@/components/design-review/HomeHeroArtworkReview";
import { Problem } from "@/components/v5/Problem";
import { PreFooter } from "@/components/v5/PreFooter";
import { Process } from "@/components/v5/Process";
import { Resources } from "@/components/v5/Resources";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { SectorAccordion } from "@/components/v5/SectorAccordion";
import { SelfCheck } from "@/components/v5/SelfCheck";
import { Services } from "@/components/v5/Services";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { TrackRecord } from "@/components/v5/TrackRecord";
import { resources } from "@/lib/content/resources";
import {
  defaultProblem,
  defaultSelfCheck,
  defaultSectorAccordion,
  defaultTrackRecord,
  defaultProcess,
  defaultServices,
  defaultPreFooter,
} from "@/lib/cms/defaultHomeContent";

export const metadata: Metadata = {
  title: "Homepage Artwork Review",
  robots: { index: false, follow: false },
};

export default function HomepageArtworkReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <main id="view-home">
        <HomeHeroArtworkReview />
        <Problem content={defaultProblem} />
        <SelfCheck content={defaultSelfCheck} />
        <SectorAccordion content={defaultSectorAccordion} />
        <TrackRecord content={defaultTrackRecord} />
        <Process content={defaultProcess} />
        <Services content={defaultServices} />
        <Resources content={resources} />
        <PreFooter content={defaultPreFooter} />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
