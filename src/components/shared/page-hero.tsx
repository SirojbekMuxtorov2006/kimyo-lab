import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  inverted?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Compact page intro used at the top of marketing subpages.
 * `inverted` renders the dark navy variant used by feature pages.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  inverted = false,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b px-6 py-16 sm:py-20",
        inverted ? "border-white/10 bg-navy text-white" : "border-border/60 bg-background",
        className
      )}
    >
      {inverted ? (
        <>
          <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.3),transparent_75%)] blur-3xl"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="container-page relative z-10 flex flex-col items-center gap-4 text-center">
        {Icon ? (
          <span
            className={cn(
              "inline-flex size-12 items-center justify-center rounded-2xl",
              inverted ? "bg-white/10 text-cyan-300 ring-1 ring-white/15" : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="size-6" aria-hidden="true" />
          </span>
        ) : null}
        <span
          className={cn("eyebrow", inverted && "text-cyan-300")}
        >
          <span
            className={cn("h-1.5 w-1.5 rounded-full", inverted ? "bg-cyan-400" : "bg-primary")}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
        <h1
          className={cn(
            "max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[44px]",
            inverted ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "max-w-2xl text-balance text-[15.5px] leading-relaxed sm:text-base",
              inverted ? "text-slate-300" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-2">{children}</div> : null}
      </div>
    </section>
  );
}
