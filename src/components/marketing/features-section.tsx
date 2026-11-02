import { useTranslations } from "next-intl";
import {
  ArrowRightIcon,
  AtomIcon,
  BotIcon,
  BookOpenIcon,
  ChartPieIcon,
  FlaskConicalIcon,
  ShapesIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const featureIcons = {
  lab: FlaskConicalIcon,
  ai: BotIcon,
  molecules: ShapesIcon,
  periodic: AtomIcon,
  courses: BookOpenIcon,
  analytics: ChartPieIcon,
} as const;

export function FeaturesSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Features");
  const tNav = useTranslations("Nav");
  const featureKeys = Object.keys(featureIcons) as (keyof typeof featureIcons)[];

  return (
    <section className="section-padding bg-surface-raised/60" id="features">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[key];
            const isWide = index === 2 || index === 5;
            return (
              <Reveal key={key} delay={index * 0.06} className={cn(isWide && "md:col-span-2")}>
                <div
                  className={cn(
                    "card-hover group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card",
                    isWide && "lg:flex-row lg:items-center lg:gap-6"
                  )}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  {isWide ? (
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-white shadow-glow">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {t("badge")}
                    </Badge>
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/features"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-card transition-all hover:border-primary/40 hover:text-primary"
          >
            {tNav("features")}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
