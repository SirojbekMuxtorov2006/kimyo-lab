"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { atomAppearance, molecules, type MoleculeId } from "@/data/molecules";
import { cn } from "@/lib/utils";

const ORIGIN = { x: 110, y: 78 };
const SCALE = 62;

interface MoleculeDiagramProps {
  moleculeId: MoleculeId;
  className?: string;
}

/** Screen-reader-friendly 2D fallback shown when WebGL is unavailable. */
export function MoleculeDiagram({ moleculeId, className }: MoleculeDiagramProps) {
  const prefersReduced = useReducedMotion();
  const definition = molecules[moleculeId];

  const nodes = definition.atoms.map((atom) => {
    const [x, y] = atom.position;
    return {
      ...atom,
      cx: ORIGIN.x + x * SCALE,
      cy: ORIGIN.y - y * SCALE,
    };
  });

  const bondNodes = definition.bonds.map((bond) => ({
    a: nodes[bond.a],
    b: nodes[bond.b],
    order: bond.order,
  }));

  return (
    <motion.svg
      viewBox="0 0 220 156"
      role="img"
      aria-label={`${definition.formula} — 2D`}
      className={cn("h-auto w-full", className)}
      initial={prefersReduced ? undefined : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: prefersReduced ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {bondNodes.map((bond, index) => {
        const dx = bond.b.cx - bond.a.cx;
        const dy = bond.b.cy - bond.a.cy;
        const length = Math.hypot(dx, dy) || 1;
        const unitX = dx / length;
        const unitY = dy / length;
        const offset = 4;
        const lineOffsetX = (unitY * offset) / 2;
        const lineOffsetY = (-unitX * offset) / 2;
        return (
          <g key={`bond-${index}`}>
            {bond.order === 2 ? (
              <React.Fragment>
                <line
                  x1={bond.a.cx + lineOffsetX}
                  y1={bond.a.cy + lineOffsetY}
                  x2={bond.b.cx + lineOffsetX}
                  y2={bond.b.cy + lineOffsetY}
                  stroke="#94a3b8"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <line
                  x1={bond.a.cx - lineOffsetX}
                  y1={bond.a.cy - lineOffsetY}
                  x2={bond.b.cx - lineOffsetX}
                  y2={bond.b.cy - lineOffsetY}
                  stroke="#94a3b8"
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </React.Fragment>
            ) : (
              <line
                x1={bond.a.cx}
                y1={bond.a.cy}
                x2={bond.b.cx}
                y2={bond.b.cy}
                stroke="#94a3b8"
                strokeWidth={5}
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
      {nodes.map((node, index) => (
        <g key={`atom-${index}`}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={atomAppearance[node.element].radius * 13}
            fill={atomAppearance[node.element].color}
            stroke="rgba(15,23,42,0.16)"
            strokeWidth={1}
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={node.element === "C" ? "#f8fafc" : "#0f172a"}
          >
            {node.element}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}
