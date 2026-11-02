import { getTranslations } from "next-intl/server";
import { BotIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { AiPreviewSection } from "@/components/marketing/ai-preview-section";
import { StudentsSection } from "@/components/marketing/students-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("aiTutor", "ai-tutor");
}

export default async function AiTutorPage() {
  const t = await getTranslations("Pages.aiTutor");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={BotIcon}
        inverted
      />
      <AiPreviewSection />
      <StudentsSection />
    </>
  );
}
