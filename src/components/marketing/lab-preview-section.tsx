import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LabPreview } from "@/components/marketing/lab-preview";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function LabPreviewSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("LabPreview");

  return (
    <section className="section-padding bg-surface-raised/60 overflow-hidden" id="laboratory">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <LabPreview />
        </Reveal>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-muted-foreground">{t("note")}</p>
          <Link
            href="/virtual-lab"
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
