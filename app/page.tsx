import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { SelfCheckBand } from "@/components/sections/SelfCheckBand";
import { Proof } from "@/components/sections/Proof";
import { SectorDoors } from "@/components/sections/SectorDoors";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Resources } from "@/components/sections/Resources";
import { Secondary } from "@/components/sections/Secondary";

/**
 * Homepage section order follows the approved copy doc, which derives it from
 * the shared-question analysis in the Audience-Journey Matrix. Do not reorder
 * without going through that document.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <SelfCheckBand />
        <Proof />
        <SectorDoors />
        <Process />
        <Services />
        <Resources />
        <Secondary />
      </main>
      <Footer />
    </>
  );
}
