import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { TeamPage } from "@/components/about/TeamPage";
import { teamPageContent } from "@/lib/content/team";

export const metadata = { title: teamPageContent.title, description: teamPageContent.summary };

export default function TeamRoute() {
  return <><SiteNav variant="light" /><TeamPage content={teamPageContent} /><SiteFooter /></>;
}
