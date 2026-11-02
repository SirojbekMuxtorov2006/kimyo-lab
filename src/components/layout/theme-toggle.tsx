"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const t = useTranslations();

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted ? (isDark ? t("Common.light") : t("Common.dark")) : t("Common.theme");

  return (
    <button
      type="button"
      aria-label={`${t("A11y.toggleTheme")}: ${label}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <MoonIcon className="size-[18px]" aria-hidden="true" />
        ) : (
          <SunIcon className="size-[18px]" aria-hidden="true" />
        )
      ) : (
        <span className="size-[18px] rounded-full bg-muted" aria-hidden="true" />
      )}
    </button>
  );
}
