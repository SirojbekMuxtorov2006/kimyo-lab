import { useTranslations } from "next-intl";
import { QuoteIcon } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";

const people = [
  { key: "student", avatar: "12", initials: "Sample" },
  { key: "teacher", avatar: "34", initials: "Sample" },
  { key: "school", avatar: "56", initials: "Sample" },
] as const;

export function TestimonialsSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Testimonials");
  const tCommon = useTranslations("Common");

  return (
    <section className="section-padding bg-background" id="testimonials">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <div className="mt-4 flex justify-center">
          <Badge variant="demo">{t("badge")}</Badge>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14">
          {people.map((person, index) => (
            <Reveal key={person.key} delay={index * 0.08}>
              <figure className="card-hover flex h-full flex-col gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <QuoteIcon className="size-4" aria-hidden="true" />
                </span>
                <blockquote className="text-[15px] leading-relaxed text-foreground/90">
                  “{t(`items.${person.key}.quote`)}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-2">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-[12px] font-bold text-secondary-foreground">
                    {person.avatar.slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-foreground">
                      {t(`items.${person.key}.name`)}
                    </p>
                    <p className="text-[11.5px] text-muted-foreground">
                      {t(`items.${person.key}.role`)}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          {tCommon("sample")}: {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
