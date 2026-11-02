import { getPageMetadata } from "@/lib/metadata";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { AuthSocialButtons } from "@/components/auth/social-buttons";
import { getTranslations } from "next-intl/server";
import { LogInIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  return getPageMetadata("login", "login");
}

export default async function LoginPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthCard icon={LogInIcon} title={t("loginTitle")} description={t("loginDescription")}>
      <LoginForm />
      <AuthSocialButtons />
      <p className="text-center text-[13.5px] text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {t("createAccount")}
        </Link>
      </p>
    </AuthCard>
  );
}
