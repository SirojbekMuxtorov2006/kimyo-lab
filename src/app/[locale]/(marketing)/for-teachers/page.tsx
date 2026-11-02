import { getTranslations } from "next-intl/server";
import { GraduationCapIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { TeachersSection } from "@/components/marketing/teachers-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("teachers", "for-teachers");
}

export default async function ForTeachersPage() {
  const t = await getTranslations("Pages.teachers");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={GraduationCapIcon}
      />
      <TeachersSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
