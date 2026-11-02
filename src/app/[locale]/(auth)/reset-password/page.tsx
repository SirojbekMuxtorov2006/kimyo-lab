import { getPageMetadata } from "@/lib/metadata";
import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { ShieldCheckIcon } from "lucide-react";

export async function generateMetadata() {
  return getPageMetadata("resetPassword", "reset-password");
}

export default async function ResetPasswordPage() {
  const t = await getTranslations();

  return (
    <AuthCard icon={ShieldCheckIcon} title={t("Auth.resetTitle")} description={t("Auth.resetDescription")}>
      <Badge variant="demo">{t("Common.demo")}</Badge>
      <ResetPasswordForm />
    </AuthCard>
  );
}
