import { useTranslations } from "next-intl";
import { ArrowRightIcon, BotIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function AiPreviewSection() {
  const t = useTranslations("AiPreview");
  const tActions = useTranslations("Actions");

  return (
    <section className="relative overflow-hidden bg-navy text-white" id="ai-tutor">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[34rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.25),transparent_72%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page section-padding relative z-10 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              align="left"
              inverted
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="mt-7 space-y-2.5">
              {(["atom", "bond", "periodic", "formula"] as const).map((key) => (
                <li key={key} className="flex items-center gap-2.5 text-[14px] text-slate-300">
                  <SparklesIcon className="size-4 text-cyan-300" aria-hidden="true" />
                  <span className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                    {t(`suggestions.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="accentGradient" size="lg" asChild>
                <Link href="/ai-tutor">
                  {tActions("askAi")}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Link
                href="/ai-tutor"
                className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
              >
                {t("cta")}
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            {/* mock chat window */}
            <div className="glass-dark glow-ring rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-white">
                    <BotIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-display text-[13px] font-bold text-white">
                    MOLARYA <span className="text-cyan-300">AI</span>
                  </span>
                </div>
                <Badge variant="demo">{t("badge")}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col items-end gap-1">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary/20 px-4 py-2.5 text-[13.5px] leading-snug text-white ring-1 ring-primary/30">
                    {t("userMessage")}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3 text-[13.5px] leading-relaxed text-slate-200 ring-1 ring-white/10">
                    <p className="font-mono text-[13px] text-cyan-200" aria-hidden="true">
                      H–O–H ≈ 104,5°
                    </p>
                    <p className="mt-1.5">{t("aiMessage")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
                <p className="text-[12.5px] text-slate-400">{t("inputPlaceholder")}</p>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-slate-400">
                <ShieldCheckIcon className="size-3.5 shrink-0 text-cyan-300" aria-hidden="true" />
                {t("disclaimer")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
