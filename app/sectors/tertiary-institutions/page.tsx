import { TertiaryView } from "@/components/v5/TertiaryView";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";

/**
 * v5 toggled this with display:none as `view-tertiary`. It becomes a real route.
 */
export default function TertiaryInstitutions() {
  return (
    <>
      <main id="view-tertiary">
        <TertiaryView />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
