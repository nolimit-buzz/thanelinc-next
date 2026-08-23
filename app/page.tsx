import { Hero } from "@/components/v5/Hero";
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

/**
 * Homepage — v5 `view-home`, ported section for section (W-026).
 * Order and content are v5's. Do not reorder, restyle, or reword.
 */
export default function Home() {
  return (
    <>
      <main id="view-home">
        <Hero />
        <Problem />
        <SelfCheck />
        <SectorAccordion />
        <TrackRecord />
        <Process />
        <Services />
        <Resources content={resources} />
        <PreFooter />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
