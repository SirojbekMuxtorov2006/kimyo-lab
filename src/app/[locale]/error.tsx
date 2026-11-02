"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { TriangleAlertIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  const tActions = useTranslations("Actions");

  useEffect(() => {
    // Console reporting is intentional; a remote watcher is added in Phase 2.
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center"
    >
      <div className="mx-auto max-w-md space-y-5">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <TriangleAlertIcon className="size-6" aria-hidden="true" />
        </span>
        <span className="eyebrow mx-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden="true" />
          {t("eyebrow")}
        </span>
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="accentGradient" size="lg" onClick={reset}>
            {t("retry")}
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">{t("cta")}</Link>
          </Button>
        </div>
        <span className="sr-only">{tActions("backHome")}</span>
      </div>
    </div>
  );
}
