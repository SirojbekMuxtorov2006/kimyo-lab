import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** Shared shell for all auth screens (login, register, password flows). */
export function AuthCard({
  icon: Icon,
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  const t = useTranslations("Auth");

  return (
    <Card className={cn("w-full max-w-md shadow-float", className)}>
      <CardHeader>
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        <p className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 text-[12px] leading-snug text-muted-foreground">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
          {t("demoNotice")}
        </p>
        {footer}
      </CardContent>
    </Card>
  );
}
