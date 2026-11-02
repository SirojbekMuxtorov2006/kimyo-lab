"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2Icon, UserRoundPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher";
  terms: boolean;
};

export function RegisterForm() {
  const t = useTranslations("Auth");
  const tValidation = useTranslations("Auth.validation");

  const buildSchema = () =>
    z
      .object({
        fullName: z.string().min(2, tValidation("name")),
        email: z.string().min(1, tValidation("email")).email(tValidation("email")),
        password: z.string().min(8, tValidation("password")),
        confirmPassword: z.string(),
        role: z.enum(["student", "teacher"]),
        terms: z
          .boolean()
          .refine((value) => value === true, { error: tValidation("terms") }),
      })
      .refine((values) => values.password === values.confirmPassword, {
        path: ["confirmPassword"],
        message: tValidation("passwordMatch"),
      });

  const form = useForm<RegisterValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      terms: false,
    },
    resolver: zodResolver(buildSchema()),
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit() {
    // Demo mode: authentication backend connects in Phase 2.
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(t("registerSuccess"));
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fullName")}</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder={t("fullNamePlaceholder")} {...field} />
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("roleLabel")}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">{t("roles.student")}</SelectItem>
                  <SelectItem value="teacher">{t("roles.teacher")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordPlaceholder")}</FormLabel>
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
        </div>

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-2.5 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              </FormControl>
              <Label className="max-w-xs cursor-pointer text-[12.5px] font-normal leading-relaxed text-muted-foreground">
                {t("terms")}
              </Label>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="accentGradient" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <UserRoundPlusIcon className="size-4" aria-hidden="true" />
          )}
          {t("submitRegister")}
        </Button>
      </form>
    </Form>
  );
}
