"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "molarya-newsletter-demo";

type NewsletterValues = {
  email: string;
};

export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations("Footer.newsletter");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewsletterValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .min(1, { message: t("error") })
          .email({ message: t("error") }),
      })
    ),
  });

  const onSubmit = async (values: NewsletterValues) => {
    setIsSubmitting(true);
    // Demo mode: no network request. Clearly stored locally only.
    try {
      window.localStorage.setItem(STORAGE_KEY, values.email);
      await new Promise((resolve) => setTimeout(resolve, 450));
      toast.success(t("success"));
      form.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-2", className)}
        noValidate
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    aria-label={t("title")}
                    className="border-border/80 bg-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="min-h-4" />
              </FormItem>
            )}
          />
          <Button type="submit" variant="accentGradient" className="shrink-0" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <SendIcon className="size-4" aria-hidden="true" />
            )}
            {t("title")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
