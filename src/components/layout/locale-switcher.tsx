"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, localeShortNames, type Locale } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: string;
  short?: boolean;
}

export function LocaleSwitcher({ className, short = false }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const t = useTranslations();

  function changeLanguage(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale });
    });
  }

  const triggerLabel = `${t("Locale.label")}: ${localeNames[locale]}`;

  return (
    <Select value={locale} onValueChange={changeLanguage} disabled={isPending}>
      <SelectTrigger
        aria-label={triggerLabel}
        className={cn(
          "h-10 rounded-full gap-1.5 border-border/70 bg-card/80 px-3 text-[13px] font-semibold text-foreground shadow-none hover:bg-muted",
          short && "px-2.5",
          className
        )}
      >
        <GlobeIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        <SelectValue>
          <span aria-hidden={false}>
            {short ? localeShortNames[locale as Locale] : localeNames[locale as Locale]}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-44">
        {(Object.keys(localeNames) as Locale[]).map((item) => (
          <SelectItem key={item} value={item} className="gap-2">
            <span className="font-semibold tracking-wide text-muted-foreground">{localeShortNames[item]}</span>
            {localeNames[item]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
