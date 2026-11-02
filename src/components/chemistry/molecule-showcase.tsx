"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { MoleculeViewer } from "@/components/chemistry/molecule-viewer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { molecules, moleculeOrder, type MoleculeId } from "@/data/molecules";
import { cn } from "@/lib/utils";

interface MoleculeShowcaseProps {
  className?: string;
}

export function MoleculeShowcase({ className }: MoleculeShowcaseProps) {
  const t = useTranslations("Molecules");
  const [active, setActive] = React.useState<MoleculeId>(moleculeOrder[0]);

  return (
    <Tabs
      value={active}
      onValueChange={(value) => setActive(value as MoleculeId)}
      className={cn("flex flex-col gap-6", className)}
    >
      <TabsList className="mx-auto flex-wrap">
        {moleculeOrder.map((id) => (
          <TabsTrigger key={id} value={id}>
            {t(`data.${id}.name`)}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {moleculeOrder.map((id) => (
          <TabsContent key={id} value={id} className="outline-none">
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-foreground/[0.03] shadow-card">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent_72%)]"
                aria-hidden="true"
              />
              <div className="relative aspect-[16/11] w-full p-4 sm:p-6">
                <MoleculeViewer
                  moleculeId={id}
                  autoRotate
                  fallbackNotice={t("controls.fallback")}
                />
              </div>
              <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                <Badge variant="accent">{t("badge")}</Badge>
                <span className="font-mono text-[11px] font-bold tracking-wide text-muted-foreground">
                  {t(`data.${id}.name`)}
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoRow label={t("info.formula")} value={molecules[id].formula} mono />
              <InfoRow label={t("info.mass")} value={molecules[id].molarMass} />
              <InfoRow
                label={t("info.atoms")}
                value={molecules[id].atoms.length.toString()}
              />
              <InfoRow
                label={t("info.geometry")}
                value={t(`data.${id}.geometry`)}
              />
            </div>
            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                {t("info.verified")}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {t(`data.${id}.description`)}
              </p>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl bg-surface-raised px-3.5 py-3 ring-1 ring-border/60">
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-[14px] font-bold text-foreground",
          mono && "font-mono tracking-wide"
        )}
      >
        {value}
      </p>
    </div>
  );
}
