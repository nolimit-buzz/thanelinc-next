import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { fetchServiceDetailSections } from "@/lib/cms/client";
import { mapServiceDetail } from "@/lib/cms/mapServiceDetail";

export const metadata = {
  title: "NDPC Registration",
  description: "Registration or DPCO-filed compliance, handled end to end — certificate in 3 working days.",
};

/** The certificate/turnaround wording this mark used to carry now lives once,
 *  in the CMS `what-you-get-section`. */
function RegistrationIcon() {
  return (
    <svg width="40" height="40" fill="none" stroke="var(--color-teal-accent)" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("ndpc-registration"));
  if (!content) return <ContentUnavailable />;
  return <ServicePageTemplate content={content} icon={<RegistrationIcon />} />;
}

export default function NdpcRegistrationPage() {
  return (
    <>
      {/* W-030: matches this page's own light hero (previously defaulted to
          the dark/solid nav, a mismatch predating this plan). */}
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <Content />
      </Suspense>
      <SiteFooter />
    </>
  );
}
