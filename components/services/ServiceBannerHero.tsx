import { EditorialBannerHero, type EditorialBannerHeroProps } from "@/components/inner/EditorialBannerHero";
import { ServiceFeatureGrid, type ServiceFeatureItem } from "@/components/services/ServiceFeatureGrid";

/** Compatibility wrapper: service pages retain their public component API. */
export type ServiceBannerHeroProps = EditorialBannerHeroProps;

export function ServiceBannerHero({ features, ...hero }: ServiceBannerHeroProps & { features?: ServiceFeatureItem[] }) {
  return <EditorialBannerHero {...hero}>{features ? <ServiceFeatureGrid items={features} /> : null}</EditorialBannerHero>;
}
