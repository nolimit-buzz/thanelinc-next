import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { AboutPage } from "@/components/about/AboutPage";
import { fetchAboutSections, fetchCredentialsSections, fetchTeamSections } from "@/lib/cms/client";
import { mapAboutPage, mapCredentialsPage, mapTeamPage } from "@/lib/cms/mapAbout";

export const metadata = {
  title: "About Thanelinc",
  description:
    "Thanelinc is an NDPC-licensed Data Protection Compliance Organization, with credentials you can view directly.",
};

/**
 * Page copy comes from three Strapi single types — `about` plus the `credentials`
 * and `team` types this page renders inline as its #credentials and #team bands.
 * They are fetched in parallel and treated as one editorial unit: if any of them
 * fails to map, the whole page shows ContentUnavailable rather than a page
 * silently missing its team or credentials.
 */
async function AboutContent() {
  const [aboutSections, credentialsSections, teamSections] = await Promise.all([
    fetchAboutSections(),
    fetchCredentialsSections(),
    fetchTeamSections(),
  ]);

  const content = mapAboutPage(aboutSections);
  const credentialsContent = mapCredentialsPage(credentialsSections);
  const teamContent = mapTeamPage(teamSections);
  console.log(`[cms] about page: ${content && credentialsContent && teamContent ? "live" : "missing"}`);

  if (!content || !credentialsContent || !teamContent) return <ContentUnavailable />;
  return <AboutPage content={content} credentialsContent={credentialsContent} teamContent={teamContent} />;
}

export default function AboutRoute() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <AboutContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
