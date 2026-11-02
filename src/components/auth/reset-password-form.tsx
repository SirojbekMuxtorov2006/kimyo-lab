"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2Icon, ShieldCheckIcon } from "lucide-react";
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

type ResetValues = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Auth.validation");

  const form = useForm<ResetValues>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(
      z
        .object({
          password: z.string().min(8, tValidation("password")),
          confirmPassword: z.string(),
        })
        .refine((values) => values.password === values.confirmPassword, {
          path: ["confirmPassword"],
          message: tValidation("passwordMatch"),
        })
    ),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit() {
    // Demo mode: reset flow connects to the backend in Phase 2.
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(t("resetSuccess"));
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPassword")}</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword")}</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="accentGradient" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ShieldCheckIcon className="size-4" aria-hidden="true" />
          )}
          {t("submitReset")}
        </Button>
      </form>
    </Form>
  );
}
