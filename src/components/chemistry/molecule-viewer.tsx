"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { atomAppearance, molecules, type MoleculeId } from "@/data/molecules";
import { MoleculeDiagram } from "@/components/chemistry/molecule-diagram";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const MoleculeCanvas = dynamic(
  () => import("@/components/chemistry/molecule-canvas").then((mod) => mod.MoleculeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton className="size-3/4 rounded-3xl" />
      </div>
    ),
  }
);

function detectWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      typeof window !== "undefined" &&
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface MoleculeViewerProps {
  moleculeId: MoleculeId;
  className?: string;
  autoRotate?: boolean;
  fallbackNotice?: string;
}

export function MoleculeViewer({
  moleculeId,
  className,
  autoRotate = true,
  fallbackNotice,
}: MoleculeViewerProps) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const webgl = mounted ? detectWebgl() : false;

  const definition = molecules[moleculeId];

  return (
    <div
      className={cn("relative h-full w-full", className)}
      role="img"
      aria-label={`${definition.formula}`}
    >
      {mounted && webgl ? (
        <MoleculeCanvas moleculeId={moleculeId} autoRotate={autoRotate} className="h-full w-full" />
      ) : (
        <MoleculeDiagram moleculeId={moleculeId} className="h-full w-full" />
      )}
      {mounted && !webgl && fallbackNotice ? (
        <p className="mt-2 text-center text-[11px] font-medium text-muted-foreground">
          {fallbackNotice}
        </p>
      ) : null}
      <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between gap-2">
        {Object.entries(atomAppearance)
          .filter(([element]) => definition.atoms.some((atom) => atom.element === element))
          .map(([element, appearance]) => (
            <span
              key={element}
              className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2 py-1 text-[10px] font-bold text-muted-foreground shadow-sm ring-1 ring-border/70 backdrop-blur-sm"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: appearance.color }}
                aria-hidden="true"
              />
              {element}
            </span>
          ))}
      </div>
    </div>
  );
}
