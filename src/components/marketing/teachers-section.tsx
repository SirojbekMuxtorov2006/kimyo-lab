import { useTranslations } from "next-intl";
import { BrainCircuitIcon, Clock3Icon, GraduationCapIcon, ListChecksIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const benefits = [
  { key: "engage", icon: BrainCircuitIcon },
  { key: "time", icon: Clock3Icon },
  { key: "insight", icon: GraduationCapIcon },
  { key: "manage", icon: ListChecksIcon },
] as const;

const weeklyScores = [
  { day: "1", value: 62 },
  { day: "2", value: 71 },
  { day: "3", value: 58 },
  { day: "4", value: 83 },
  { day: "5", value: 76 },
];

export function TeachersSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Teachers");

  return (
    <section className="section-padding bg-background" id="teachers">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <Reveal delay={0.06} className="order-2 lg:order-1">
          {/* class analytics mock */}
          <div className="relative rounded-3xl border border-border/70 bg-card p-5 shadow-float sm:p-6">
            <div className="pointer-events-none absolute -left-6 -top-8 size-28 rounded-full bg-cyan-500/10 blur-2xl" />
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[15px] font-bold text-foreground">
                {t("dashboard.title")}
              </p>
              <Badge variant="demo">{t("dashboard.sample")}</Badge>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: t("dashboard.students"), value: "27" },
                { label: t("dashboard.average"), value: "84%" },
                { label: t("dashboard.active"), value: "24" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-surface-raised px-3.5 py-3 ring-1 ring-border/60">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-extrabold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-surface-raised p-4 ring-1 ring-border/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("dashboard.weekly")}
              </p>
              <div className="mt-3 flex h-28 items-end gap-2">
                {weeklyScores.map((score) => (
                  <div key={score.day} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-cyan-500/25 to-cyan-400/70"
                      style={{ height: `${score.value}%` }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{score.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-primary/5 p-3.5 ring-1 ring-primary/15">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCapIcon className="size-4" aria-hidden="true" />
              </span>
              <p className="text-[12.5px] leading-snug text-muted-foreground">
                {t("cta")}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              align={align}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li
                    key={benefit.key}
                    className="rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1">
                        <p className="text-[15px] font-bold text-foreground">
                          {t(`benefits.${benefit.key}.title`)}
                        </p>
                        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                          {t(`benefits.${benefit.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
