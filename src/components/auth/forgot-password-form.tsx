"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2Icon, KeyRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ForgotValues = { email: string };

export function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Auth.validation");

  const form = useForm<ForgotValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(
      z.object({
        email: z.string().min(1, tValidation("email")).email(tValidation("email")),
      })
    ),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit() {
    // Demo mode: reset email service connects in Phase 2.
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(t("forgotSuccess"));
    form.reset();
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
        <Button type="submit" variant="accentGradient" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <KeyRoundIcon className="size-4" aria-hidden="true" />
          )}
          {t("sendResetLink")}
        </Button>
      </form>
    </Form>
  );
}
