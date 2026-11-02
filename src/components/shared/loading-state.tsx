"use client";

import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function LoadingState({ title, description, className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-14 text-center",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-muted">
        <Loader2Icon className="size-5 animate-spin text-primary" aria-hidden="true" />
      </span>
      <div className="max-w-sm space-y-1">
        <p className="font-display text-base font-semibold">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
