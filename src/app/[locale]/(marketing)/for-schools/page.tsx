import { getTranslations } from "next-intl/server";
import { Building2Icon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SchoolsSection } from "@/components/marketing/schools-section";
import { ContactForm } from "@/components/shared/contact-form";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("schools", "for-schools");
}

export default async function ForSchoolsPage() {
  const t = await getTranslations("Pages.schools");
  const tContact = await getTranslations("Contact");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={Building2Icon}
      />
      <SchoolsSection />
      <div className="container-page grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4 rounded-2xl border border-border/70 bg-surface-raised p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-foreground">
            {tContact("info.emailTitle")}
          </h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            {tContact("info.hours")}: {tContact("info.location")}
          </p>
          <div className="space-y-2 text-[14px]">
            <p className="font-semibold text-foreground">{tContact("info.email")}</p>
            <p className="text-muted-foreground">{tContact("info.location")}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
