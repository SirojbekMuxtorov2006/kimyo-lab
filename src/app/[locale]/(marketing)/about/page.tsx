import { getTranslations } from "next-intl/server";
import { HeartHandshakeIcon, EyeIcon, GlobeIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("about", "about");
}

const valueIcons = {
  clarity: EyeIcon,
  safety: HeartHandshakeIcon,
  access: GlobeIcon,
} as const;

export default async function AboutPage() {
  const t = await getTranslations("Pages.about");
  const tAbout = await getTranslations("About");

  const values = Object.keys(valueIcons) as (keyof typeof valueIcons)[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="container-page space-y-16 py-16">
        <Reveal>
          <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                {tAbout("missionEyebrow")}
              </span>
              <h2 className="text-balance text-[26px] font-bold leading-tight sm:text-3xl">
                {tAbout("missionTitle")}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {tAbout("missionText")}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white">
              <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.28),transparent_74%)] blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-3">
                <Badge variant="dark">UZ · RU · EN</Badge>
                <p className="font-display text-2xl font-extrabold leading-snug">
                  {tAbout("approachTitle")}
                </p>
                <p className="text-[14.5px] leading-relaxed text-slate-300">
                  {tAbout("approachText")}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="space-y-6">
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((key, index) => {
                const Icon = valueIcons[key];
                return (
                  <Reveal key={key} delay={index * 0.06}>
                    <div className="card-hover h-full rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="mt-4 font-display text-[16px] font-bold text-foreground">
                        {tAbout(`values.${key}.title`)}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                        {tAbout(`values.${key}.description`)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mx-auto max-w-3xl space-y-3 text-center" aria-labelledby="approach-heading">
            <span className="eyebrow mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {tAbout("approachEyebrow")}
            </span>
            <h2 id="approach-heading" className="text-balance text-[24px] font-bold leading-tight sm:text-2xl">
              {tAbout("approachTitle")}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {tAbout("approachText")}
            </p>
          </section>
        </Reveal>
      </div>

      <CtaSection />
    </>
  );
}
