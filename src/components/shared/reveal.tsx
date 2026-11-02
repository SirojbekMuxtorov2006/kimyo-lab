"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface RevealProps
  extends Omit<
    HTMLMotionProps<"div">,
    "initial" | "whileInView" | "viewport" | "transition"
  > {
  as?: "div" | "li" | "section" | "article";
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Subtle scroll-reveal wrapper that respects prefers-reduced-motion. */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
  ...props
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once ? { once: true, margin: "-72px" } : undefined}
      transition={
        prefersReduced
          ? { duration: 0.01 }
          : { duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
