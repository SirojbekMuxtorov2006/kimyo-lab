import { getTranslations } from "next-intl/server";
import { AtomIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { PeriodicSection } from "@/components/marketing/periodic-section";
import { MoleculesSection } from "@/components/marketing/molecules-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("chemistry", "chemistry");
}

export default async function ChemistryPage() {
  const t = await getTranslations("Pages.chemistry");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={AtomIcon}
      />
      <PeriodicSection align="left" />
      <MoleculesSection align="left" />
      <CtaSection />
    </>
  );
}
