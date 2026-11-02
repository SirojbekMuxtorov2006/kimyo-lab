import { useTranslations } from "next-intl";
import { CompassIcon, ArrowRightIcon, MailIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  const tActions = useTranslations("Actions");

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent_75%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-lg space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-200 ring-1 ring-white/10">
          <CompassIcon className="size-3.5" aria-hidden="true" />
          {t("eyebrow")}
        </span>
        <p className="font-display text-7xl font-extrabold tracking-tight text-white/90">404</p>
        <h1 className="text-balance text-2xl font-bold leading-tight sm:text-3xl">{t("title")}</h1>
        <p className="text-[15px] leading-relaxed text-slate-300">{t("description")}</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="accentGradient" size="lg" asChild>
            <Link href="/">
              {t("cta")}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild className="bg-white/10 text-white hover:bg-white/15">
            <Link href="/contact">
              <MailIcon className="size-4" aria-hidden="true" />
              {t("secondary")}
            </Link>
          </Button>
        </div>
      </div>
      <span className="sr-only">{tActions("backHome")}</span>
    </div>
  );
}
