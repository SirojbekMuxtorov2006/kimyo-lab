"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "group rounded-xl border border-border bg-card transition-colors data-[state=open]:border-primary/30 data-[state=open]:bg-card",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-xl p-5 text-left text-[15px] font-semibold leading-relaxed transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring active:scale-[0.995]",
          className
        )}
        {...props}
      >
        {children}
        <span className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted transition-colors group-data-[state=open]:border-primary/30 group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary">
          <ChevronDownIcon className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
