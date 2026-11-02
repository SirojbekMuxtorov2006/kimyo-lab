"use client";

import * as React from "react";
import { ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating back-to-top button; appears after scrolling past the hero. */
export function ScrollToTop({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-float transition-all duration-300 hover:bg-muted",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        className
      )}
    >
      <ArrowUpIcon className="size-4" aria-hidden="true" />
    </button>
  );
}
