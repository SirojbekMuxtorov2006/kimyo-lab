"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  RotateCcwIcon,
  PlusIcon,
  ShieldCheckIcon,
  DropletIcon,
  SparklesIcon,
  FlameIcon,
  ActivityIcon,
  ThermometerIcon,
  CheckCircle2Icon,
  FlaskConicalIcon,
  LayersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ScenarioKey = "acidBase" | "precipitate" | "gas";
type MaterialKey = "naoh" | "hcl" | "indicator" | "water";
type EquipmentKey = "beaker" | "pipette" | "flask" | "sensor";

interface ScenarioData {
  title: string;
  badge: string;
  equation: string;
  ionicEquation: string;
  reactionType: string;
  colorInitial: string;
  colorReacted: string;
  liquidGradientInitial: string;
  liquidGradientReacted: string;
  phInitial: number;
  phReacted: number;
  tempInitial: number;
  tempReacted: number;
  description: string;
  explanation: string;
  hasPrecipitate?: boolean;
  hasGas?: boolean;
  precipitateColor?: string;
  bubbleColor?: string;
}

const scenarioDetails: Record<ScenarioKey, ScenarioData> = {
  acidBase: {
    title: "Kislota-asos titrlashi",
    badge: "Neytrallanish",
    equation: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
    ionicEquation: "H⁺(aq) + OH⁻(aq) → H₂O(l)",
    reactionType: "Ekzotermik neytrallanish",
    colorInitial: "#38bdf8",
    colorReacted: "#f43f5e",
    liquidGradientInitial:
      "linear-gradient(180deg, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.65) 100%)",
    liquidGradientReacted:
      "linear-gradient(180deg, rgba(244, 63, 94, 0.55) 0%, rgba(225, 29, 72, 0.8) 100%)",
    phInitial: 1.2,
    phReacted: 11.8,
    tempInitial: 21.0,
    tempReacted: 26.8,
    description:
      "Fenolftalein indikatori kislotali muhitda rangsiz bo‘lib, NaOH qo‘shilgach va muhit ishqoriyga o‘tgach to‘q pushti rangga o‘zgaradi.",
    explanation:
      "Vodorod ioni (H⁺) va gidroksid ioni (OH⁻) birlashib, suv molekulasini hosil qiladi. Reaksiyada issiqlik ajralib chiqadi.",
  },
  precipitate: {
    title: "Cho‘kma hosil bo‘lishi",
    badge: "Almashinish",
    equation: "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)",
    ionicEquation: "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓",
    reactionType: "Geterogen cho‘kish",
    colorInitial: "#67e8f9",
    colorReacted: "#e2e8f0",
    liquidGradientInitial:
      "linear-gradient(180deg, rgba(103, 232, 249, 0.4) 0%, rgba(6, 182, 212, 0.55) 100%)",
    liquidGradientReacted:
      "linear-gradient(180deg, rgba(226, 232, 240, 0.75) 0%, rgba(203, 213, 225, 0.9) 100%)",
    phInitial: 6.5,
    phReacted: 6.8,
    tempInitial: 20.5,
    tempReacted: 21.2,
    description:
      "Kumush nitrat eritmasiga osh tuzi qo‘shilganda erimaydigan kumush xloridning oq tvorogsimon cho‘kmasi tezda hosil bo‘ladi.",
    explanation:
      "Kumush kationlari va xlor anionlari kuchli elektrostatik tortishuv bilan erimaydigan kristall panjara hosil qilib cho‘kadi.",
    hasPrecipitate: true,
    precipitateColor: "#ffffff",
  },
  gas: {
    title: "Gaz ajralib chiqishi",
    badge: "Oksidlanish-qaytarilish",
    equation: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
    ionicEquation: "Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g)↑",
    reactionType: "O‘rin olish & gaz evolyutsiyasi",
    colorInitial: "#38bdf8",
    colorReacted: "#10b981",
    liquidGradientInitial:
      "linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, rgba(2, 132, 199, 0.5) 100%)",
    liquidGradientReacted:
      "linear-gradient(180deg, rgba(52, 211, 153, 0.5) 0%, rgba(5, 150, 105, 0.7) 100%)",
    phInitial: 1.0,
    phReacted: 3.4,
    tempInitial: 21.0,
    tempReacted: 29.5,
    description:
      "Rux metali xlorid kislotaga tushganda shiddatli qaynash sodir bo‘lib, vodorod gaz pufakchalari ko‘piklanib yuqoriga ajraladi.",
    explanation:
      "Rux atomlari vodorod ionlariga o‘z elektronlarini berib oksidlanadi, vodorod esa erkin H₂ gaziga aylanib ajraladi.",
    hasGas: true,
    bubbleColor: "#6ee7b7",
  },
};

const materials: MaterialKey[] = ["naoh", "hcl", "indicator", "water"];
const equipment: EquipmentKey[] = ["beaker", "pipette", "flask", "sensor"];

export function LabPreview() {
  const t = useTranslations("LabPreview");
  const prefersReduced = useReducedMotion();

  const [scenario, setScenario] = React.useState<ScenarioKey>("acidBase");
  const [reactedStep, setReactedStep] = React.useState<number>(0);
  const [isDropping, setIsDropping] = React.useState(false);
  const [isStirring, setIsStirring] = React.useState(false);
  const [isHeating, setIsHeating] = React.useState(false);
  const [selectedMaterials, setSelectedMaterials] = React.useState<MaterialKey[]>([
    "hcl",
    "indicator",
  ]);
  const [selectedEquipment, setSelectedEquipment] = React.useState<EquipmentKey[]>([
    "beaker",
    "pipette",
    "sensor",
  ]);

  const current = scenarioDetails[scenario];
  const isFullyReacted = reactedStep >= 3;

  // Reset progress when switching scenario
  function handleScenarioChange(newScenario: ScenarioKey) {
    setScenario(newScenario);
    setReactedStep(0);
    setIsDropping(false);
    setIsStirring(false);
    setIsHeating(false);
  }

  // Add droplet action
  function handleAddDrop() {
    if (isDropping) return;
    setIsDropping(true);

    setTimeout(() => {
      setReactedStep((prev) => Math.min(prev + 1, 3));
      setIsDropping(false);
    }, 700);
  }

  // Reset workbench
  function handleReset() {
    setReactedStep(0);
    setIsDropping(false);
    setIsStirring(false);
    setIsHeating(false);
  }

  // Progress percentage
  const progressPercent = (reactedStep / 3) * 100;

  // Dynamic values based on reaction progress
  const currentPh = (
    current.phInitial +
    (current.phReacted - current.phInitial) * (reactedStep / 3)
  ).toFixed(1);

  const currentTemp = (
    current.tempInitial +
    (current.tempReacted - current.tempInitial) * (reactedStep / 3) +
    (isHeating ? 14.5 : 0)
  ).toFixed(1);

  const liquidGradient =
    reactedStep === 0
      ? current.liquidGradientInitial
      : reactedStep === 3
        ? current.liquidGradientReacted
        : `linear-gradient(180deg, rgba(147, 197, 253, 0.5) 0%, rgba(168, 85, 247, 0.55) 100%)`;

  return (
    <div className="overflow-hidden rounded-3xl border border-border/80 bg-card p-3 shadow-float sm:p-6">
      {/* Top Header & Scenario Tabs */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FlaskConicalIcon className="size-4" aria-hidden="true" />
            </span>
            <h3 className="font-display text-base font-bold text-foreground">
              {current.title}
            </h3>
            <Badge variant="accent">{current.badge}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("note")}</p>
        </div>

        <Tabs
          value={scenario}
          onValueChange={(val) => handleScenarioChange(val as ScenarioKey)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="acidBase">{t("tabs.acidBase")}</TabsTrigger>
            <TabsTrigger value="precipitate">{t("tabs.precipitate")}</TabsTrigger>
            <TabsTrigger value="gas">{t("tabs.gas")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Workbench Grid */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[14rem_minmax(0,1fr)_18rem]">
        {/* Left Side: Reagents & Apparatus Catalog */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface-raised p-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {t("sidebar.materials")}
            </p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {materials.map((key) => {
                const isSelected = selectedMaterials.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setSelectedMaterials((prev) =>
                        prev.includes(key)
                          ? prev.filter((item) => item !== key)
                          : [...prev, key]
                      )
                    }
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all",
                      isSelected
                        ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted"
                    )}
                  >
                    <span>{t(`materials.${key}`)}</span>
                    <PlusIcon
                      className={cn(
                        "size-3.5 transition-transform",
                        isSelected && "rotate-45 text-primary"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {t("sidebar.equipment")}
            </p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {equipment.map((key) => {
                const isSelected = selectedEquipment.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setSelectedEquipment((prev) =>
                        prev.includes(key)
                          ? prev.filter((item) => item !== key)
                          : [...prev, key]
                      )
                    }
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all",
                      isSelected
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 shadow-sm"
                        : "border-border/60 bg-card text-muted-foreground hover:border-cyan-500/30 hover:bg-muted"
                    )}
                  >
                    <span>{t(`equipment.${key}`)}</span>
                    <CheckCircle2Icon
                      className={cn(
                        "size-3.5 opacity-40",
                        isSelected && "opacity-100 text-cyan-500"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Safety Note */}
          <div className="mt-auto flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-[11.5px] leading-snug text-emerald-800 dark:text-emerald-300">
            <ShieldCheckIcon className="size-4 shrink-0 mt-0.5 text-emerald-500" />
            <span>Virtual xavfsiz rejim: barcha reaksiyalar xavfsiz modellashtirilgan.</span>
          </div>
        </div>

        {/* Center Canvas: Interactive Glass Beaker Simulation */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-navy/90 via-[#0a182c] to-[#071120] p-5 text-white shadow-inner min-h-[26rem]">
          {/* Ambient Lighting & Grid */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.15),transparent_70%)]"
            aria-hidden="true"
          />

          {/* Top Sensor Indicators */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white shadow-sm ring-1 ring-white/15">
                <ActivityIcon className="size-3.5 text-cyan-400" />
                pH: <span className="text-cyan-300 font-extrabold">{currentPh}</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white shadow-sm ring-1 ring-white/15">
                <ThermometerIcon className="size-3.5 text-rose-400" />
                T: <span className="text-rose-300 font-extrabold">{currentTemp} °C</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col gap-1 w-20">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                {isFullyReacted ? "Reaksiya tugadi" : `Bosqich ${reactedStep + 1}/4`}
              </div>
            </div>
          </div>

          {/* Beaker & Glassware Core */}
          <div className="relative my-auto flex flex-col items-center justify-center py-4">
            {/* Pipette Dropper Tool (hanging above beaker) */}
            <div className="relative z-20 flex flex-col items-center -mb-2">
              <div className="h-10 w-2.5 rounded-t-sm border border-white/40 bg-white/20 backdrop-blur-sm" />
              <div className="h-3 w-1.5 rounded-b-sm bg-white/60" />

              {/* Falling Drop Animation */}
              <AnimatePresence>
                {isDropping && (
                  <motion.div
                    key="drop"
                    initial={{ y: 0, opacity: 1, scale: 0.8 }}
                    animate={{ y: 44, opacity: 0, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeIn" }}
                    className="absolute top-12 size-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Glass Beaker Container */}
            <div className="relative h-56 w-44 rounded-b-3xl border-2 border-t-0 border-white/40 bg-white/[0.04] p-1 shadow-2xl backdrop-blur-md">
              {/* Beaker Rim Highlight */}
              <div className="absolute -top-1.5 -inset-x-2 h-2 rounded-full border border-white/50 bg-white/20 shadow-sm" />

              {/* Volume Graduation Lines */}
              <div className="absolute left-2 top-8 flex flex-col gap-5 text-[9px] font-mono text-white/50 select-none">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-[1px] bg-white/50" /> 200 ml
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-[1px] bg-white/50" /> 150 ml
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-[1px] bg-white/50" /> 100 ml
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-[1px] bg-white/50" /> 50 ml
                </span>
              </div>

              {/* Liquid Body */}
              <div
                className="absolute inset-x-1.5 bottom-1.5 rounded-b-[22px] transition-all duration-700 ease-out"
                style={{
                  height: `${50 + reactedStep * 8}%`,
                  background: liquidGradient,
                }}
              >
                {/* Surface Meniscus Curve */}
                <div className="absolute -top-1 inset-x-0 h-2 rounded-full bg-white/30 backdrop-blur-xs" />

                {/* Stirring Vortex Animation */}
                {isStirring && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    className="absolute left-1/2 top-1 size-8 -translate-x-1/2 rounded-full border-t border-white/60 opacity-75"
                  />
                )}

                {/* Precipitate Flakes Layer (when scenario is precipitate) */}
                {current.hasPrecipitate && reactedStep > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-2 bottom-1 h-3 rounded-b-xl bg-white/80 shadow-[0_0_10px_white]"
                  />
                )}

                {/* Gas Effervescence Bubbles */}
                {(current.hasGas || reactedStep > 0) && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div
                        key={i}
                        animate={
                          prefersReduced
                            ? undefined
                            : {
                                y: [-10, -110],
                                x: [0, (i % 2 === 0 ? 6 : -6)],
                                opacity: [0, 0.9, 0],
                              }
                        }
                        transition={{
                          duration: 1.5 + (i % 3) * 0.4,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeOut",
                        }}
                        style={{ left: `${15 + i * 13}%` }}
                        className="absolute bottom-2 size-2 rounded-full bg-white/70 shadow-sm"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Glass Reflection Highlight */}
              <div className="pointer-events-none absolute right-2 top-4 bottom-4 w-1.5 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
            </div>

            {/* Magnetic Stir Plate & Heating Base */}
            <div className="relative mt-1 h-5 w-52 rounded-lg border border-white/20 bg-slate-800/90 shadow-lg flex items-center justify-between px-3">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300">
                Molarya Digital Base
              </span>
              <span className="size-2 rounded-full bg-cyan-400" />
            </div>
          </div>

          {/* Interactive Action Controls Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/10">
            <Button
              type="button"
              size="sm"
              variant="accentGradient"
              onClick={handleAddDrop}
              disabled={isDropping || isFullyReacted}
              className="gap-1.5 shadow-md"
            >
              <DropletIcon className="size-3.5" />
              <span>{isFullyReacted ? "Yakunlandi" : "Reaktiv qo‘shish"}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setIsStirring((prev) => !prev)}
              className={cn(
                "gap-1.5 bg-white/10 text-white hover:bg-white/20 border-white/15",
                isStirring && "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
              )}
            >
              <SparklesIcon className="size-3.5" />
              <span>{isStirring ? "Aralashmoqda" : "Aralashtirish"}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setIsHeating((prev) => !prev)}
              className={cn(
                "gap-1.5 bg-white/10 text-white hover:bg-white/20 border-white/15",
                isHeating && "bg-rose-500/20 text-rose-300 border-rose-500/40"
              )}
            >
              <FlameIcon className="size-3.5" />
              <span>{isHeating ? "Qizdirilmoqda" : "Qizdirish"}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="gap-1.5 text-white/80 hover:text-white hover:bg-white/10"
            >
              <RotateCcwIcon className="size-3.5" />
              <span>Qayta boshlash</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Scientific Equations & Educational Notes */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-surface-raised p-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tenglama va tahlil
              </span>
              <Badge variant="success" className="text-[10px]">
                {current.reactionType}
              </Badge>
            </div>

            {/* Balanced Equation */}
            <div className="mt-2.5 rounded-xl border border-primary/20 bg-card p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Tenglashtirilgan tenglama
              </p>
              <p className="mt-1 font-mono text-xs font-bold text-foreground">
                {current.equation}
              </p>
            </div>

            {/* Ionic Equation */}
            <div className="mt-2 rounded-xl border border-border/60 bg-card p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Qisqa ionli ko‘rinishi
              </p>
              <p className="mt-1 font-mono text-[11.5px] font-semibold text-cyan-600 dark:text-cyan-300">
                {current.ionicEquation}
              </p>
            </div>
          </div>

          {/* Observation Text */}
          <div className="rounded-xl border border-border/60 bg-card p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Tajriba kuzatuvi
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground">
              {current.description}
            </p>
          </div>

          {/* Scientific Mechanism */}
          <div className="mt-auto rounded-xl border border-border/60 bg-muted/60 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <LayersIcon className="size-3 text-primary" />
              Molekulyar mexanizm
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
              {current.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
