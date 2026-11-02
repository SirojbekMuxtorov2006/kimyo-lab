"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Demo-only social entry points.
 * OAuth providers connect in Phase 2 — clicking shows an informative toast.
 */
export function AuthSocialButtons() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");

  function showDemoToast() {
    toast.info(`${tCommon("demo")} — Phase 2`);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("or")}
        </span>
        <Separator className="flex-1" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="outline" onClick={showDemoToast}>
          {t("continueWithGoogle")}
        </Button>
        <Button type="button" variant="outline" onClick={showDemoToast}>
          {t("continueWithTelegram")}
        </Button>
      </div>
    </div>
  );
}
