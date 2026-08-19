import { TertiaryView } from "@/components/v5/TertiaryView";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { SiteNav } from "@/components/SiteNav";

/**
 * v5 toggled this with display:none as `view-tertiary`. It becomes a real route.
 */
export default function TertiaryInstitutions() {
  return (
    <>
      <SiteNav />
      <main id="view-tertiary" style={{ paddingTop: "64px" }}>
        <TertiaryView />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
