import { getPageMetadata } from "@/lib/metadata";
import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { getTranslations } from "next-intl/server";
import { KeyRoundIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  return getPageMetadata("forgotPassword", "forgot-password");
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthCard icon={KeyRoundIcon} title={t("forgotTitle")} description={t("forgotDescription")}>
      <ForgotPasswordForm />
      <p className="text-center text-[13.5px] text-muted-foreground">
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {t("backToLogin")}
        </Link>
      </p>
    </AuthCard>
  );
}
