import { useTranslations } from "next-intl";
import { AtomIcon, LanguagesIcon, BotIcon, ShieldCheckIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const statIcons = {
  elements: AtomIcon,
  languages: LanguagesIcon,
  ai: BotIcon,
  safety: ShieldCheckIcon,
} as const;

export function StatsSection() {
  const t = useTranslations("Stats");
  const statKeys = Object.keys(statIcons) as (keyof typeof statIcons)[];

  return (
    <section className="section-padding bg-background" id="stats">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
          {statKeys.map((key, index) => {
            const Icon = statIcons[key];
            return (
              <Reveal key={key} delay={index * 0.08}>
                <div className="card-hover flex h-full flex-col gap-2 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                    {t(`items.${key}.value`)}
                  </p>
                  <p className="text-[15px] font-semibold text-foreground">
                    {t(`items.${key}.label`)}
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/80">{t("note")}</p>
      </div>
    </section>
  );
}
