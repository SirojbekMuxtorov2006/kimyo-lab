import { useTranslations } from "next-intl";
import { Building2Icon, PiggyBankIcon, SaveIcon, ChartNoAxesColumnIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const benefits = [
  { key: "safety", icon: PiggyBankIcon },
  { key: "budget", icon: SaveIcon },
  { key: "deploy", icon: Building2Icon },
  { key: "analytics", icon: ChartNoAxesColumnIcon },
] as const;

export function SchoolsSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Schools");
  const tActions = useTranslations("Actions");

  return (
    <section className="section-padding bg-surface-raised/60" id="schools">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.key} delay={index * 0.06}>
                <div className="card-hover group h-full rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-[16px] font-bold text-foreground">
                        {t(`benefits.${benefit.key}.title`)}
                      </h3>
                      <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                        {t(`benefits.${benefit.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <p className="text-[13px] text-muted-foreground">{t("benefits.deploy.description")}</p>
          <Button variant="accentGradient" asChild>
            <Link href="/for-schools">
              {tActions("contactSales")}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
