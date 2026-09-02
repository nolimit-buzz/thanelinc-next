import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ContactPageBody } from "@/components/contact/ContactPageBody";
import { fetchContactSections } from "@/lib/cms/client";
import { mapContactPage } from "@/lib/cms/mapContact";

export const metadata = {
  title: "Contact",
  description: "Request a scoped proposal or talk to Thanelinc before committing.",
};

/** Copy comes from the `contact` single type; the form still posts to /api/contact. */
async function ContactContent() {
  const content = mapContactPage(await fetchContactSections());
  console.log(`[cms] contact page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <ContactPageBody content={content} />;
}

export default function ContactPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <ContactContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
