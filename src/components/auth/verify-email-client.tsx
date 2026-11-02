"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CheckCircle2Icon, Loader2Icon, MailCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

/**
 * Demo verification screen: shows a pending state and a mock "verify"
 * action — real e-mail confirmation connects in Phase 2.
 */
export function VerifyEmailClient() {
  const t = useTranslations("Auth");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function resend() {
    setStatus("sending");
    // Demo mode: no email is actually sent.
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(t("resendSuccess"));
    setStatus("done");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface-raised p-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {status === "done" ? (
            <CheckCircle2Icon className="size-5 text-success" aria-hidden="true" />
          ) : (
            <MailCheckIcon className="size-5" aria-hidden="true" />
          )}
        </span>
        <p className="text-[13.5px] leading-snug text-muted-foreground">{t("verifyHint")}</p>
      </div>
      <Input placeholder="ism@example.com" type="email" readOnly aria-label={t("verifyTitle")} />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={resend}
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <MailCheckIcon className="size-4" aria-hidden="true" />
        )}
        {t("resend")}
      </Button>
    </div>
  );
}
