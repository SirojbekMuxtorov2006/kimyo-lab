import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PeriodicPreview } from "@/components/chemistry/periodic-preview";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";

export function PeriodicSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Periodic");

  return (
    <section className="section-padding bg-surface-raised/60" id="periodic-table">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Badge variant="accent">{t("badge")}</Badge>
        </div>
        <Reveal delay={0.08} className="mt-8">
          <PeriodicPreview />
        </Reveal>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-[12.5px] text-muted-foreground">{t("dataNote")}</p>
          <Link
            href="/periodic-table"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-card transition-all hover:border-primary/40 hover:text-primary"
          >
            {t("cta")}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
