import { getTranslations } from "next-intl/server";
import { MailIcon, MapPinIcon, Clock3Icon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/lib/constants/site";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("contact", "contact");
}

export default async function ContactPage() {
  const t = await getTranslations("Pages.contact");
  const tContact = await getTranslations("Contact");

  const info = [
    { label: tContact("info.emailTitle"), value: tContact("info.email"), icon: MailIcon },
    { label: tContact("info.locationTitle"), value: tContact("info.location"), icon: MapPinIcon },
    { label: tContact("info.hoursTitle"), value: tContact("info.hours"), icon: Clock3Icon },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="container-page grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4">
          {info.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-[14.5px] font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            );
          })}
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
            <p className="text-[13px] leading-relaxed text-amber-800 dark:text-amber-200">
              {tContact("demoNotice")}
            </p>
          </div>
          <p className="text-[13px] text-muted-foreground">
            {siteConfig.email} · {siteConfig.location}
          </p>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
