import Image from "next/image";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  inverted?: boolean;
  /** Localized accessible name; required when the wordmark is hidden. */
  description?: string;
}

export function Logo({ className, iconOnly = false, inverted = false, description }: LogoProps) {
  const gradientId = useId();

  if (inverted) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="size-8 shrink-0"
          role="img"
        >
          <defs>
            <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6"
            stroke="#38BDF8"
            strokeWidth="1.8"
            fill="none"
            transform="rotate(-28 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6"
            stroke="#818CF8"
            strokeWidth="1.8"
            fill="none"
            transform="rotate(28 24 24)"
          />
          {/* flask in center */}
          <path
            d="M21 16h6v4l4.5 9a1.5 1.5 0 0 1-1.3 2h-12.4a1.5 1.5 0 0 1-1.3-2L21 20z"
            fill={`url(#${gradientId})`}
          />
        </svg>
        {!iconOnly && (
          <span className="font-extrabold tracking-tight text-[18px] text-white">
            MOLARYA
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/images/landing/logo.png"
        alt={description ?? "MOLARYA"}
        width={130}
        height={42}
        className={cn("h-8 w-auto object-contain", iconOnly && "w-8 object-left object-cover overflow-hidden")}
        priority
      />
    </span>
  );
}
