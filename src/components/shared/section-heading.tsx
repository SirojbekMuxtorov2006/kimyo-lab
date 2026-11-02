import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingLevel?: "h2" | "h3";
  inverted?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  headingLevel: Heading = "h2",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow",
            inverted && "text-cyan-300"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              inverted ? "bg-cyan-400" : "bg-primary"
            )}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "text-balance text-[26px] font-bold leading-[1.15] sm:text-3xl lg:text-[34px]",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed sm:text-base",
            inverted ? "text-slate-300/90" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
