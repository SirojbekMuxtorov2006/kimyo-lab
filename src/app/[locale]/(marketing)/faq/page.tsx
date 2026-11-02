import { getTranslations } from "next-intl/server";
import { CircleHelpIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("faq", "faq");
}

export default async function FaqPage() {
  const t = await getTranslations("Pages.faq");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={CircleHelpIcon}
      />
      <FaqSection />
      <CtaSection />
    </>
  );
}
