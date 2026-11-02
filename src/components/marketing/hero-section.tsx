import { useTranslations } from "next-intl";
import { ArrowRightIcon, FlaskConicalIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/marketing/hero-visual";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* background layers */}
      <div className="absolute inset-0 bg-grid-dark mask-image-x" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[36rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.34),transparent_74%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-8rem] right-[-6rem] h-[30rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.26),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 grid items-center gap-10 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-32 lg:pt-24">
        <div className="max-w-2xl">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-slate-200 ring-1 ring-white/10">
            <FlaskConicalIcon className="size-3.5 text-cyan-300" aria-hidden="true" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-6 text-[34px] font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[56px]">
            {t("titleBefore")}{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-300 sm:text-lg">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-row lg:flex-row">
            <Button
              variant="accentGradient"
              size="lg"
              asChild
              className="transition-transform"
            >
              <Link href="/virtual-lab">
                {t("primaryCta")}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/features">
                <SparklesIcon className="size-4 text-cyan-300" aria-hidden="true" />
                {t("secondaryCta")}
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { icon: ShieldCheckIcon, label: t("badges.safe") },
              { icon: SparklesIcon, label: t("trust") },
              { icon: FlaskConicalIcon, label: t("badges.languages") },
              { icon: FlaskConicalIcon, label: t("badges.browser") },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-300"
              >
                <chip.icon className="size-3.5 text-cyan-300" aria-hidden="true" />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
