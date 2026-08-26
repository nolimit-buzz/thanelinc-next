import { HomeHeroArtworkReview } from "@/components/design-review/HomeHeroArtworkReview";
import { Problem } from "@/components/v5/Problem";
import { SelfCheck } from "@/components/v5/SelfCheck";
import { SectorAccordion } from "@/components/v5/SectorAccordion";
import { TrackRecord } from "@/components/v5/TrackRecord";
import { Process } from "@/components/v5/Process";
import { Services } from "@/components/v5/Services";
import { Resources } from "@/components/v5/Resources";
import { PreFooter } from "@/components/v5/PreFooter";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { resources } from "@/lib/content/resources";
import { fetchHomeSections } from "@/lib/cms/client";
import {
  mapProblem,
  mapSelfCheck,
  mapSectorAccordion,
  mapTrackRecord,
  mapProcess,
  mapServices,
  mapPreFooter,
} from "@/lib/cms/mapHome";
import {
  defaultProblem,
  defaultSelfCheck,
  defaultSectorAccordion,
  defaultTrackRecord,
  defaultProcess,
  defaultServices,
  defaultPreFooter,
} from "@/lib/cms/defaultHomeContent";

/**
 * Homepage — v5 `view-home`, ported section for section (W-026).
 * Order and content are v5's. Do not reorder, restyle, or reword.
 * Section copy is fetched from the Strapi CMS (`home` single type); each
 * section falls back to the last-shipped hardcoded copy if the CMS is
 * unreachable or a section is missing, so the page never renders blank.
 */
function withSource<T>(name: string, live: T | null, fallback: T): T {
  console.log(`[cms] ${name}: ${live ? "live" : "fallback"}`);
  return live ?? fallback;
}

export default async function Home() {
  const sections = await fetchHomeSections();

  const problem = withSource("problem", mapProblem(sections), defaultProblem);
  const selfCheck = withSource("selfCheck", mapSelfCheck(sections), defaultSelfCheck);
  const sectorAccordion = withSource("sectorAccordion", mapSectorAccordion(sections), defaultSectorAccordion);
  const trackRecord = withSource("trackRecord", mapTrackRecord(sections), defaultTrackRecord);
  const process = withSource("process", mapProcess(sections), defaultProcess);
  const services = withSource("services", mapServices(sections), defaultServices);
  const preFooter = withSource("preFooter", mapPreFooter(sections), defaultPreFooter);

  return (
    <>
      <main id="view-home">
        <HomeHeroArtworkReview />
        <Problem content={problem} />
        <SelfCheck content={selfCheck} />
        <SectorAccordion content={sectorAccordion} />
        <TrackRecord content={trackRecord} />
        <Process content={process} />
        <Services content={services} />
        <Resources content={resources} />
        <PreFooter content={preFooter} />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
