import { useTranslations } from "next-intl";
import { AtomIcon, EyeIcon, ShieldCheckIcon, TimerIcon, GraduationCapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const benefits = [
  { key: "safe", icon: ShieldCheckIcon },
  { key: "pace", icon: TimerIcon },
  { key: "visual", icon: EyeIcon },
  { key: "help", icon: GraduationCapIcon },
] as const;

const weeklyBars = [42, 58, 36, 68, 54, 78, 62];

export function StudentsSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Students");

  return (
    <section className="section-padding bg-surface-raised/60" id="students">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
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

        <Reveal delay={0.1}>
          {/* learning dashboard mock */}
          <div className="relative rounded-3xl border border-border/70 bg-card p-5 shadow-float sm:p-6">
            <div className="pointer-events-none absolute -right-6 -top-8 size-28 rounded-full bg-primary/10 blur-2xl" />
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[15px] font-bold text-foreground">
                {t("dashboard.title")}
              </p>
              <Badge variant="success">55%</Badge>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface-raised p-4 ring-1 ring-border/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("dashboard.weekly")}
                </p>
                <div className="mt-3 flex h-24 items-end gap-1.5">
                  {weeklyBars.map((value, index) => (
                    <span
                      key={index}
                      className="w-full rounded-md bg-gradient-to-t from-primary/25 to-primary/70"
                      style={{ height: `${value}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-surface-raised p-4 ring-1 ring-border/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("dashboard.progress")}
                </p>
                <div className="relative mx-auto mt-3 flex size-24 items-center justify-center rounded-full"
                  style={{
                    background: "conic-gradient(#2563EB 0deg, #06B6D4 198deg, #e2e8f0 198deg, #e2e8f0 360deg)",
                  }}
                >
                  <span className="absolute inset-2 flex items-center justify-center rounded-full bg-surface-raised text-[15px] font-extrabold text-foreground">
                    55%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card p-3.5">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <AtomIcon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("dashboard.lesson")}
                  </p>
                  <p className="truncate text-[13px] font-bold text-foreground">
                    {t("dashboard.lessonName")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card p-3.5">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                  <ShieldCheckIcon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("dashboard.lab")}
                  </p>
                  <p className="truncate text-[13px] font-bold text-foreground">
                    {t("dashboard.labName")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
