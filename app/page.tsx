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

/**
 * Homepage — v5 `view-home`, ported section for section (W-026).
 * Order and content are v5's. Do not reorder, restyle, or reword.
 * Section copy is fetched from the Strapi CMS (`home` single type) with no
 * fallback — a missing/invalid section is simply omitted from the page, so
 * what renders here is only ever real CMS data.
 */
function logSource(name: string, live: unknown) {
  console.log(`[cms] ${name}: ${live ? "live" : "missing"}`);
}

export default async function Home() {
  const sections = await fetchHomeSections();

  const problem = mapProblem(sections);
  const selfCheck = mapSelfCheck(sections);
  const sectorAccordion = mapSectorAccordion(sections);
  const trackRecord = mapTrackRecord(sections);
  const process = mapProcess(sections);
  const services = mapServices(sections);
  const preFooter = mapPreFooter(sections);

  logSource("problem", problem);
  logSource("selfCheck", selfCheck);
  logSource("sectorAccordion", sectorAccordion);
  logSource("trackRecord", trackRecord);
  logSource("process", process);
  logSource("services", services);
  logSource("preFooter", preFooter);

  return (
    <>
      <main id="view-home">
        <HomeHeroArtworkReview />
        {problem && <Problem content={problem} />}
        {selfCheck && <SelfCheck content={selfCheck} />}
        {sectorAccordion && <SectorAccordion content={sectorAccordion} />}
        {trackRecord && <TrackRecord content={trackRecord} />}
        {process && <Process content={process} />}
        {services && <Services content={services} />}
        <Resources content={resources} />
        {preFooter && <PreFooter content={preFooter} />}
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
