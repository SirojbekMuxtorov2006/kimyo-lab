import { getTranslations } from "next-intl/server";
import { ArrowLeftIcon, FileTextIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";

type SectionKey = "collect" | "use" | "storage" | "rights" | "contact" | "accept" | "content" | "ip" | "disclaimer";

const privacySections: SectionKey[] = ["collect", "use", "storage", "rights", "contact"];
const termsSections: SectionKey[] = ["accept", "use", "content", "ip", "disclaimer", "contact"];

export async function LegalDocument({ variant }: { variant: "privacy" | "terms" }) {
  const t = await getTranslations(`Pages.${variant}`);
  const sections = variant === "privacy" ? privacySections : termsSections;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} icon={FileTextIcon} />

      <div className="container-page max-w-3xl space-y-10 py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="demo">{t("updated")}</Badge>
        </div>

        <Reveal>
          <p className="rounded-2xl border border-border/70 bg-card p-5 text-[14.5px] leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </Reveal>

        <div className="space-y-4">
          {sections.map((key, index) => (
            <Reveal key={key} delay={index * 0.04}>
              <section className="space-y-2 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] font-bold text-primary/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[17px] font-bold text-foreground">
                    {t(`sections.${key}.title`)}
                  </h2>
                </div>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-start">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeftIcon className="size-4" aria-hidden="true" />
              {t("back")}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
