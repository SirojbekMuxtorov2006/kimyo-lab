"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:shadow-float group-[.toaster]:border-border group-[.toaster]:rounded-xl",
          description: "group-[.description]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
