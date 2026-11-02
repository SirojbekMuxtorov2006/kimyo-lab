"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FlaskConicalIcon,
  SparklesIcon,
  ActivityIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroVisual() {
  const t = useTranslations("Hero.visual");
  const prefersReduced = useReducedMotion();

  const [activeTube, setActiveTube] = React.useState<number>(0);
  const [bubbleKey, setBubbleKey] = React.useState(0);

  const tubes = [
    {
      name: "HCl + NaOH",
      label: "Titrlash",
      color: "from-sky-400 via-rose-400 to-rose-500",
      liquidColor: "rgba(244, 63, 94, 0.65)",
      ph: "7.0",
      status: "Neytral",
      equation: "HCl + NaOH → NaCl + H₂O",
    },
    {
      name: "CuSO₄ + NaOH",
      label: "Cho‘kma",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      liquidColor: "rgba(6, 182, 212, 0.7)",
      ph: "11.2",
      status: "Moviy cho‘kma",
      equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓",
    },
    {
      name: "Zn + 2HCl",
      label: "Gaz ajralishi",
      color: "from-emerald-400 via-teal-400 to-cyan-500",
      liquidColor: "rgba(16, 185, 129, 0.65)",
      ph: "3.5",
      status: "H₂↑ ajralmoqda",
      equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    },
  ];

  const current = tubes[activeTube];

  function handleTubeClick(index: number) {
    setActiveTube(index);
    setBubbleKey((prev) => prev + 1);
  }

  return (
    <div className="relative mx-auto w-full max-w-[32rem] select-none">
      {/* Ambient Radial Glows */}
      <div
        className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.35),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.30),transparent_60%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Outer Orbital Rings */}
      <div className="pointer-events-none absolute inset-2 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute inset-10 rounded-full border border-white/10" />

      {/* Main Glass Laboratory Station Card */}
      <div className="relative z-10 translate-y-2">
        <div className="glass-dark glow-ring flex w-full flex-col rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl border border-white/15">
          {/* Card Topbar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30">
                <FlaskConicalIcon className="size-4" />
              </span>
              <div>
                <p className="font-display text-[13.5px] font-bold text-white">
                  {t("labTitle")}
                </p>
                <p className="text-[11px] text-slate-400">{t("labSubtitle")}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("safeLabel")}
            </span>
          </div>

          {/* Test Tube Selector Rack (Clickable) */}
          <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10">
            {tubes.map((tube, idx) => {
              const isSelected = activeTube === idx;
              return (
                <button
                  key={tube.name}
                  type="button"
                  onClick={() => handleTubeClick(idx)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2.5 text-xs font-semibold transition-all",
                    isSelected
                      ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                  )}
                >
                  <span
                    className={cn(
                      "size-2.5 rounded-full bg-gradient-to-r",
                      tube.color
                    )}
                  />
                  <span className="truncate text-[11px]">{tube.label}</span>
                </button>
              );
            })}
          </div>

          {/* Realistic Virtual Chemistry Beaker Canvas */}
          <div className="relative mt-4 h-48 overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e213b] to-[#071120] p-4 ring-1 ring-white/15">
            {/* Liquid in Beaker */}
            <motion.div
              key={`liquid-${activeTube}`}
              initial={{ height: "45%" }}
              animate={{ height: "60%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ backgroundColor: current.liquidColor }}
              className="absolute inset-x-8 bottom-3 rounded-b-2xl transition-colors duration-500 backdrop-blur-xs"
            >
              {/* Liquid Meniscus Highlight */}
              <div className="absolute -top-1.5 inset-x-0 h-3 rounded-full bg-white/35 backdrop-blur-xs" />

              {/* Fizzy Rising Bubbles */}
              <div key={bubbleKey} className="absolute inset-0 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={
                      prefersReduced
                        ? undefined
                        : {
                            y: [0, -75],
                            x: [0, i % 2 === 0 ? 4 : -4],
                            opacity: [0, 0.9, 0],
                          }
                    }
                    transition={{
                      duration: 1.4 + (i % 3) * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    style={{ left: `${18 + i * 14}%` }}
                    className="absolute bottom-2 size-2 rounded-full bg-white/70 shadow-sm"
                  />
                ))}
              </div>
            </motion.div>

            {/* Beaker Glass Overlay with Volume Ticks */}
            <div className="absolute inset-x-6 bottom-2 top-4 flex flex-col justify-between rounded-b-3xl border-2 border-t-0 border-white/30 bg-white/[0.03] backdrop-blur-[2px] p-3">
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-200">
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-300">
                  <ActivityIcon className="size-3 text-cyan-400" />
                  pH {current.ph}
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[9.5px] font-medium text-emerald-300">
                  {current.status}
                </span>
              </div>

              {/* Beaker Ticks */}
              <div className="flex flex-col gap-3 font-mono text-[8px] text-white/40 pl-1">
                <span>- 150 ml</span>
                <span>- 100 ml</span>
                <span>- 50 ml</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[9.5px] text-slate-300">
                <span className="font-mono">{current.name}</span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <SparklesIcon className="size-3" />
                  Aktiv
                </span>
              </div>
            </div>
          </div>

          {/* Equation Banner */}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.06] px-4 py-2.5 ring-1 ring-white/15">
            <span className="font-mono text-xs font-bold tracking-wide text-white">
              {current.equation}
            </span>
            <span className="flex size-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating Atomic Model Card */}
      <div className="absolute -left-3 top-2 z-20 w-36 sm:w-40 animate-float">
        <div className="glass-dark rounded-2xl p-3 ring-1 ring-white/15 shadow-xl">
          <div className="relative mx-auto h-20 w-full">
            <div className="absolute inset-0 rounded-full border border-white/15" />
            <div className="absolute inset-3 rounded-full border border-white/10" />
            <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 shadow-[0_0_18px_rgba(6,182,212,0.7)]" />
            <span className="absolute left-2 top-5 size-1.5 rounded-full bg-white/90 animate-orbit" />
            <span className="absolute bottom-4 right-3 size-1 rounded-full bg-white/70 animate-orbit-reverse" />
          </div>
          <p className="mt-1 text-center text-[10px] font-semibold text-slate-200">
            {t("moleculeLabel")}
          </p>
        </div>
      </div>

      {/* Floating AI Chemistry Tutor Prompt Badge */}
      <div className="absolute -right-2 bottom-3 z-20 w-44 sm:w-52 animate-float delay-100">
        <div className="glass-dark rounded-2xl p-3 ring-1 ring-white/15 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            {t("aiLabel")}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-slate-200">
            {t("aiMessage")}
          </p>
        </div>
      </div>
    </div>
  );
}
