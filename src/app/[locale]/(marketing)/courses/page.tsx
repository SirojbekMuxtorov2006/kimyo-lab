import { getTranslations } from "next-intl/server";
import { BookOpenIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { CourseCatalog } from "@/components/courses/course-catalog";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("courses", "courses");
}

export default async function CoursesPage() {
  const t = await getTranslations("Pages.courses");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={BookOpenIcon}
      />
      <CourseCatalog />
    </>
  );
}
