import { useTranslations } from "next-intl";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCommon = useTranslations("Common");

  return (
    <div className="relative flex min-h-dvh flex-col bg-surface-raised">
      {/* ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(37,99,235,0.10),transparent_55%),radial-gradient(circle_at_85%_110%,rgba(6,182,212,0.10),transparent_55%)]"
        aria-hidden="true"
      />

      <header className="relative z-10 flex items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={`${tCommon("home")} — MOLARYA UZ`}
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <LocaleSwitcher short />
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16 pt-4 sm:px-8">
        {children}
      </main>

      <footer className="relative z-10 pb-6">
        <Link
          href="/"
          className="mx-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          {tCommon("back")}
        </Link>
      </footer>
    </div>
  );
}
