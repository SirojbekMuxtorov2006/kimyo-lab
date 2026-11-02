"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { SearchIcon } from "lucide-react";
import { elements, categoryStyles, type ChemicalElement } from "@/data/elements";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const categoryKeys = [
  "alkali",
  "alkaline",
  "transition",
  "postTransition",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble",
] as const;

type CategoryKey = (typeof categoryKeys)[number];

export function PeriodicPreview() {
  const t = useTranslations("Periodic");
  const locale = useLocale();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategoryKey | "all">("all");
  const [selected, setSelected] = React.useState<ChemicalElement | null>(null);

  const categories = Object.fromEntries(
    categoryKeys.map((key) => [key, t(`categories.${key}`)])
  ) as Record<CategoryKey, string>;

  const filtered = elements.filter((element) => {
    const queryTrimmed = query.trim().toLowerCase();
    const localizedName = element.name[locale as keyof typeof element.name] ?? "";
    const matchesQuery =
      queryTrimmed.length === 0 ||
      element.symbol.toLowerCase().includes(queryTrimmed) ||
      localizedName.toLowerCase().includes(queryTrimmed);
    const matchesCategory = category === "all" || element.category === category;
    return matchesQuery && matchesCategory;
  });

  const visibleSet = new Set(filtered.map((element) => element.atomicNumber));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("hint")}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={(value) => setCategory(value as CategoryKey | "all")}>
          <SelectTrigger className="sm:w-60" aria-label={t("allCategories")}>
            <SelectValue>
              {category === "all" ? t("allCategories") : categories[category]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end" className="max-h-80">
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            {categoryKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {categories[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* grid */}
      <div className="relative overflow-x-auto rounded-2xl border border-border/70 bg-card p-3 sm:p-5">
        <div
          className="grid min-w-[820px] gap-1.5"
          style={{
            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
            gridTemplateRows: "repeat(4, minmax(0, 1fr))",
          }}
          role="grid"
        >
          {elements.map((element) => {
            const isVisible = visibleSet.has(element.atomicNumber);
            const styles = categoryStyles[element.category];
            return (
              <button
                key={element.atomicNumber}
                type="button"
                role="gridcell"
                tabIndex={isVisible ? 0 : -1}
                aria-label={`${element.name.ru} (${element.symbol})`}
                onClick={() => setSelected(element)}
                className={cn(
                  "group relative flex aspect-square flex-col items-center justify-center rounded-lg border p-1 text-center transition-all duration-200",
                  styles.tile,
                  isVisible
                    ? "opacity-100 hover:-translate-y-1 hover:shadow-card"
                    : "pointer-events-none opacity-0"
                )}
                style={{ gridColumn: element.grid.column, gridRow: element.grid.row }}
              >
                <span className="absolute left-1 top-1 font-mono text-[8.5px] font-semibold leading-none text-muted-foreground/80">
                  {element.atomicNumber}
                </span>
                <span className="font-display text-[15px] font-extrabold leading-none text-foreground">
                  {element.symbol}
                </span>
                <span className="mt-1 hidden text-[8px] leading-tight text-muted-foreground/80 sm:block">
                  {element.name[locale as keyof typeof element.name]?.slice(0, 8)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categoryKeys.map((key) => {
          const styles = categoryStyles[key];
          return (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[10.5px] font-semibold text-muted-foreground"
            >
              <span className={cn("size-2 rounded-full", styles.dot)} aria-hidden="true" />
              {categories[key]}
            </span>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl border font-display text-lg font-extrabold",
                      categoryStyles[selected.category].tile,
                      "text-foreground"
                    )}
                  >
                    {selected.symbol}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span>{selected.name[locale as keyof typeof selected.name]}</span>
                    <span className="text-[12px] font-medium text-muted-foreground">
                      {selected.electronConfiguration}
                    </span>
                  </span>
                </DialogTitle>
                <DialogDescription>{t("hint")}</DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-center py-2">
                <BohrAtom
                  atomicNumber={selected.atomicNumber}
                  symbol={selected.symbol}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Detail label={t("detail.atomicNumber")} value={selected.atomicNumber} />
                <Detail
                  label={t("detail.mass")}
                  value={Math.round(selected.atomicMass * 1000) / 1000}
                />
                <Detail label={t("detail.group")} value={selected.group} />
                <Detail label={t("detail.period")} value={selected.period} />
              </div>
              <div className="rounded-xl border border-border/70 bg-surface-raised p-3">
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("detail.category")}
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {categories[selected.category as CategoryKey]}
                </p>
              </div>
              <p className="rounded-xl bg-muted px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground">
                {t("detail.summary", {
                  name: selected.name[locale as keyof typeof selected.name],
                  category: categories[selected.category as CategoryKey],
                  number: selected.atomicNumber,
                  mass: Math.round(selected.atomicMass * 1000) / 1000,
                })}
              </p>
              <p className="text-[11px] text-muted-foreground">{t("dataNote")}</p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface-raised px-3.5 py-3">
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

function BohrAtom({
  atomicNumber,
  symbol,
}: {
  atomicNumber: number;
  symbol: string;
}) {
  // Calculate electron shells distribution (2, 8, 18, 32)
  const shells: number[] = [];
  let remaining = atomicNumber;
  const capacities = [2, 8, 18, 32];

  for (const cap of capacities) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, cap);
    shells.push(count);
    remaining -= count;
  }

  const center = 75;
  const baseRadius = 22;
  const step = 14;

  return (
    <div className="flex flex-col items-center">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Concentric shell orbits */}
        {shells.map((count, shellIdx) => {
          const r = baseRadius + shellIdx * step;
          return (
            <g key={shellIdx}>
              <circle
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/80"
                strokeDasharray="2 2"
              />
              {/* Electrons distributed along the ring */}
              {Array.from({ length: count }).map((_, electronIdx) => {
                const angle = (2 * Math.PI * electronIdx) / count - Math.PI / 2;
                const ex = center + r * Math.cos(angle);
                const ey = center + r * Math.sin(angle);
                return (
                  <circle
                    key={electronIdx}
                    cx={ex}
                    cy={ey}
                    r="2.5"
                    fill="#06b6d4"
                    className="shadow-sm"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Central Nucleus */}
        <circle
          cx={center}
          cy={center}
          r="14"
          fill="#2563eb"
          className="shadow-md"
        />
        <text
          x={center}
          y={center + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {symbol}
        </text>
      </svg>
      <span className="mt-1 font-mono text-[10px] text-muted-foreground">
        Elektron qobiqlari: {shells.join(" · ")}
      </span>
    </div>
  );
}
