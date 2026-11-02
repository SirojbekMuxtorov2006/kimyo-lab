"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2Icon, LogInIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

export function LoginForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Auth.validation");

  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: true },
    resolver: zodResolver(
      z.object({
        email: z.string().min(1, tValidation("email")).email(tValidation("email")),
        password: z.string().min(8, tValidation("password")),
        remember: z.boolean(),
      })
    ),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: LoginValues) {
    // Demo mode: authentication backend connects in Phase 2.
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(t("loginSuccess"));
    form.reset({ email: values.email, password: "", remember: values.remember });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailPlaceholder")}</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder={t("emailPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordPlaceholder")}</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" placeholder={t("passwordPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-3">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                </FormControl>
                <Label className="cursor-pointer text-[13px] font-normal text-muted-foreground">
                  {t("remember")}
                </Label>
              </FormItem>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-[13px] font-semibold text-primary underline-offset-4 hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Button type="submit" variant="accentGradient" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <LogInIcon className="size-4" aria-hidden="true" />
          )}
          {t("submitLogin")}
        </Button>
      </form>
    </Form>
  );
}
