import { getTranslations } from "next-intl/server";
import { HeroMolarya } from "@/components/marketing/hero-molarya";
import { SafeLabSection } from "@/components/marketing/safe-lab-section";
import { StepProcessSection } from "@/components/marketing/step-process-section";
import { StarterExperimentsSection } from "@/components/marketing/starter-experiments-section";
import { ChemicalEngineSection } from "@/components/marketing/chemical-engine-section";
import { AudienceSection } from "@/components/marketing/audience-section";
import { ToolsSection } from "@/components/marketing/tools-section";
import { SchoolPilotSection } from "@/components/marketing/school-pilot-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default async function HomePage() {
  const t = await getTranslations("Metadata");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: t("siteName"),
    description: t("description"),
    sameAs: [
      "https://t.me/molarya_uz",
      "https://instagram.com/molarya_uz",
      "https://youtube.com/@molarya_uz",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* 1. Exact Hero Section (Screenshot 1) */}
      <HeroMolarya />

      {/* 2. Safe Chemistry Laboratory Banner (Screenshot 2) */}
      <SafeLabSection />

      {/* 3. 6 Step-by-step Process (Screenshot 3) */}
      <StepProcessSection />

      {/* 4. Starter Experiments Cards (Screenshot 4) */}
      <StarterExperimentsSection />

      {/* 5. Molarya Chemical Engine Architecture (Screenshot 5) */}
      <ChemicalEngineSection />

      <AudienceSection />
      <ToolsSection />
      <SchoolPilotSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
