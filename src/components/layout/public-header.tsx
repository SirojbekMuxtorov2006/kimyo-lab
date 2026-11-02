"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { MenuIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { publicNavigation } from "@/lib/constants/site";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const t = useTranslations("Nav");
  const tLocale = useTranslations("Locale");
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.endsWith(href);

  return (
    <header data-slot="public-header" className="sticky top-0 z-50 w-full">
      <div className={cn(
        "transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-card/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-md"
      )}>
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
            aria-label={`${t("home")} — MOLARYA UZ`}
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label={t("mobileTitle")}>
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap px-2.5 py-1.5 text-[13.5px] font-medium transition-colors rounded-lg",
                  isActive(item.href)
                    ? "text-[#155EEF] font-semibold"
                    : "text-slate-700 hover:text-[#155EEF]"
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LocaleSwitcher short />
            </div>
            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex whitespace-nowrap items-center gap-2 rounded-xl bg-[#155EEF] hover:bg-[#124bbf] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-xs transition-all active:scale-95"
            >
              {t("openLab")}
              <span aria-hidden="true">→</span>
            </Link>

            <div className="flex items-center gap-2 xl:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-expanded={open}
                    className="size-9 rounded-xl"
                  >
                    <MenuIcon className="size-5" aria-hidden="true" />
                    <span className="sr-only">{t("mobileTitle")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[19.5rem] gap-0 overflow-y-auto p-0">
                  <SheetHeader className="mt-2">
                    <SheetTitle>
                      <Logo description={t("mobileTitle")} />
                    </SheetTitle>
                    <SheetDescription>{t("mobileDescription")}</SheetDescription>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col gap-1 border-t border-border/60 pt-4" aria-label={t("mobileTitle")}>
                    {publicNavigation.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-[14.5px] font-semibold transition-colors",
                            isActive(item.href)
                              ? "bg-secondary text-secondary-foreground"
                              : "text-foreground/80 hover:bg-muted"
                          )}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-6 space-y-3 border-t border-border/60 p-4">
                    <p className="eyebrow">{tLocale("label")}</p>
                    <LocaleSwitcher className="w-full justify-between" />
                    <div className="pt-2">
                      <Button asChild className="w-full rounded-xl bg-[#155EEF] hover:bg-[#124bbf] text-white">
                        <Link href="/virtual-lab">
                          {t("openLab")} →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
