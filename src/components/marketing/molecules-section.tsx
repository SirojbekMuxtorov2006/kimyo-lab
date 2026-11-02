import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MoleculeShowcase } from "@/components/chemistry/molecule-showcase";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function MoleculesSection({ align = "center" }: { align?: "left" | "center" }) {
  const t = useTranslations("Molecules");

  return (
    <section className="section-padding bg-background" id="molecules">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align={align}
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <MoleculeShowcase />
        </Reveal>
        <div className="mt-8 flex justify-center">
          <Link
            href="/molecules"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-card transition-all hover:border-primary/40 hover:text-primary"
          >
            {t("cta")}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
