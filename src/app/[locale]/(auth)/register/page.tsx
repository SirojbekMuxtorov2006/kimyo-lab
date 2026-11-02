import { getPageMetadata } from "@/lib/metadata";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthSocialButtons } from "@/components/auth/social-buttons";
import { getTranslations } from "next-intl/server";
import { UserRoundPlusIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  return getPageMetadata("register", "register");
}

export default async function RegisterPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthCard icon={UserRoundPlusIcon} title={t("registerTitle")} description={t("registerDescription")}>
      <RegisterForm />
      <AuthSocialButtons />
      <p className="text-center text-[13.5px] text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {t("signIn")}
        </Link>
      </p>
    </AuthCard>
  );
}
