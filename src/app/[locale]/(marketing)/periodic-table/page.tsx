import { getTranslations } from "next-intl/server";
import { TableIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { PeriodicPreview } from "@/components/chemistry/periodic-preview";
import { Reveal } from "@/components/shared/reveal";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("periodicTable", "periodic-table");
}

export default async function PeriodicTablePage() {
  const t = await getTranslations("Pages.periodicTable");
  const tPeriodic = await getTranslations("Periodic");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={TableIcon}
      />
      <div className="container-page py-14">
        <Reveal>
          <PeriodicPreview />
        </Reveal>
        <p className="mt-8 text-center text-[12.5px] text-muted-foreground">
          {tPeriodic("dataNote")}
        </p>
      </div>
    </>
  );
}
