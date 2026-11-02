import { useTranslations } from "next-intl";
import { CompassIcon, FlaskConicalIcon, LightbulbIcon, TrophyIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const stepIcons = {
  choose: CompassIcon,
  experiment: FlaskConicalIcon,
  understand: LightbulbIcon,
  master: TrophyIcon,
} as const;

export function HowItWorksSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("HowItWorks");
  const stepKeys = Object.keys(stepIcons) as (keyof typeof stepIcons)[];

  return (
    <section className="section-padding bg-background" id="how-it-works">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <ol className="relative mt-12 grid gap-5 lg:grid-cols-4">
          {stepKeys.map((key, index) => {
            const Icon = stepIcons[key];
            return (
              <Reveal key={key} delay={index * 0.08} as="li" className="relative">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-float">
                  <div className="pointer-events-none absolute inset-x-0 -top-16 h-24 bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm font-bold text-primary/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-foreground">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
                {index < stepKeys.length - 1 ? (
                  <span
                    className="pointer-events-none absolute -right-2.5 top-1/2 hidden h-px w-5 bg-border lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
