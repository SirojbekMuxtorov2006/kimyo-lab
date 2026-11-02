import { getTranslations } from "next-intl/server";
import { SparklesIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("features", "features");
}

export default async function FeaturesPage() {
  const t = await getTranslations("Pages.features");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={SparklesIcon}
      />
      <FeaturesSection align="left" />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
