"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CheckCircle2Icon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

type Role = "student" | "teacher" | "school" | "other";

/** Demo mode: opens the visitor's mail client, no backend call (Phase 2). */
export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  const buildSchema = () =>
    z.object({
      name: z.string().min(2, t("validation.name")),
      email: z.string().email(t("validation.email")),
      role: z.enum(["student", "teacher", "school", "other"]),
      message: z.string().min(10, t("validation.message")),
      consent: z
        .boolean()
        .refine((value) => value === true, { error: t("validation.consent") }),
    });

  type ContactSchema = ReturnType<typeof buildSchema>;
  type ContactValues = z.output<ContactSchema>;

  const form = useForm<ContactValues>({
    defaultValues: { name: "", email: "", role: "student", message: "", consent: false },
    resolver: zodResolver(buildSchema()),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactValues) {
    // Demo mode: no network request — open the visitor's email client.
    const subject = encodeURIComponent(`MOLARYA UZ — ${t(`roles.${values.role}`)}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`
    );
    window.location.assign(
      `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    );
    toast.success(t("success"));
    form.reset();
  }

  const roles: Role[] = ["student", "teacher", "school", "other"];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className={cn(
          "space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-8",
          className
        )}
      >
        <div className="space-y-1.5">
          <h2 className="font-display text-lg font-bold text-foreground">{t("formTitle")}</h2>
          <p className="text-[13.5px] text-muted-foreground">{t("formDescription")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("namePlaceholder")} autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t("emailPlaceholder")} autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("role")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {t(`roles.${role}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message")}</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder={t("messagePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(checked === true ? true : false)}
                />
              </FormControl>
              <Label className="max-w-lg text-[13px] font-normal leading-relaxed text-muted-foreground">
                {t("consent")}
              </Label>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" variant="accentGradient" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <SendIcon className="size-4" aria-hidden="true" />
            )}
            {t("submit")}
          </Button>
          <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <CheckCircle2Icon className="size-3.5 text-success" aria-hidden="true" />
            {t("demoNotice")} · {tCommon("demoNotice")}
          </p>
        </div>
      </form>
    </Form>
  );
}
