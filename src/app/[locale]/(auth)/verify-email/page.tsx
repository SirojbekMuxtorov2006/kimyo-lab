import { getPageMetadata } from "@/lib/metadata";
import { AuthCard } from "@/components/auth/auth-card";
import { VerifyEmailClient } from "@/components/auth/verify-email-client";
import { MailCheckIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return getPageMetadata("verifyEmail", "verify-email");
}

export default async function VerifyEmailPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthCard icon={MailCheckIcon} title={t("verifyTitle")} description={t("verifyDescription")}>
      <VerifyEmailClient />
    </AuthCard>
  );
}
