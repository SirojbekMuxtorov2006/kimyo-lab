"use client";

import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqKeys = ["what", "safe", "languages", "school", "ai", "free", "devices", "data"] as const;

export function FaqSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Faq");

  return (
    <section className="section-padding bg-surface-raised/60" id="faq">
      <div className="container-page">
        <div className={align === "center" ? "flex flex-col items-center gap-3 text-center" : "flex flex-col gap-3"}>
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t("eyebrow")}
          </span>
          <h2 className="text-balance text-[26px] font-bold leading-tight sm:text-3xl lg:text-[34px]">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-3xl space-y-3"
        >
          {faqKeys.map((key, index) => (
            <AccordionItem key={key} value={`item-${index}`}>
              <AccordionTrigger>
                <span className="text-[15px] font-semibold text-foreground">
                  {t(`questions.${key}.question`)}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {t(`questions.${key}.answer`)}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-[13px] font-semibold text-muted-foreground">
          {t("cta")}
        </p>
      </div>
    </section>
  );
}
