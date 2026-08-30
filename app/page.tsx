import { Suspense } from "react";
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
import { HomeLoading } from "@/components/v5/HomeLoading";
import { fetchHomeSections } from "@/lib/cms/client";
import {
  mapHero,
  mapProblem,
  mapSelfCheck,
  mapSectorAccordion,
  mapTrackRecord,
  mapProcess,
  mapServices,
  mapResources,
  mapPreFooter,
} from "@/lib/cms/mapHome";

function logSource(name: string, live: unknown) {
  console.log(`[cms] ${name}: ${live ? "live" : "missing"}`);
}

/**
 * Homepage — v5 `view-home`, ported section for section (W-026).
 * Order and content are v5's. Do not reorder, restyle, or reword.
 * Section copy is fetched from the Strapi CMS (`home` single type, with retry
 * on transient failure — see lib/cms/client.ts) with no fallback content — a
 * missing/invalid section is simply omitted from the page. Wrapped in
 * Suspense so the fetch/retry window shows a loader instead of a blank page.
 */
async function HomeContent() {
  const sections = await fetchHomeSections();

  const hero = mapHero(sections);
  const problem = mapProblem(sections);
  const selfCheck = mapSelfCheck(sections);
  const sectorAccordion = mapSectorAccordion(sections);
  const trackRecord = mapTrackRecord(sections);
  const process = mapProcess(sections);
  const services = mapServices(sections);
  const resources = mapResources(sections);
  const preFooter = mapPreFooter(sections);

  logSource("hero", hero);
  logSource("problem", problem);
  logSource("selfCheck", selfCheck);
  logSource("sectorAccordion", sectorAccordion);
  logSource("trackRecord", trackRecord);
  logSource("process", process);
  logSource("services", services);
  logSource("resources", resources);
  logSource("preFooter", preFooter);

  const allMissing =
    !hero &&
    !problem &&
    !selfCheck &&
    !sectorAccordion &&
    !trackRecord &&
    !process &&
    !services &&
    !resources &&
    !preFooter;

  return (
    <main id="view-home">
      {allMissing && (
        <div role="alert" style={{ padding: "80px 24px", textAlign: "center" }}>
          We&apos;re having trouble loading this page right now. Please refresh.
        </div>
      )}
      {hero && <HomeHeroArtworkReview content={hero} />}
      {problem && <Problem content={problem} />}
      {selfCheck && <SelfCheck content={selfCheck} />}
      {sectorAccordion && <SectorAccordion content={sectorAccordion} />}
      {trackRecord && <TrackRecord content={trackRecord} />}
      {process && <Process content={process} />}
      {services && <Services content={services} />}
      {resources && <Resources content={resources} />}
      {preFooter && <PreFooter content={preFooter} />}
      <ScrollReveals />
    </main>
  );
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
