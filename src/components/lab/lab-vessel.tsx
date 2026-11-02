import * as React from "react";
import { isBasic, substances, type Vessel } from "@/lib/lab/chemistry";
import { cn } from "@/lib/utils";

// Closed outlines used both for the glass and for clipping the liquid (bottom at y≈240).
const shapes: Record<Vessel, { path: string; maxLevel: number }> = {
  tube: { path: "M84 30 L84 218 A16 16 0 0 0 116 218 L116 30 Z", maxLevel: 190 },
  flask: { path: "M86 40 L86 112 L34 222 Q27 240 46 240 L154 240 Q173 240 166 222 L114 112 L114 40 Z", maxLevel: 150 },
  round: { path: "M90 40 L90 132 A54 54 0 1 0 110 132 L110 40 Z", maxLevel: 120 },
  beaker: { path: "M42 70 L42 228 Q42 240 54 240 L146 240 Q158 240 158 228 L158 70 Z", maxLevel: 150 },
  dish: { path: "M28 204 Q100 276 172 204 Z", maxLevel: 30 },
};

function mixColors(colors: string[]) {
  if (colors.length === 0) return "rgba(186, 230, 253, 0.35)";
  const rgb = colors.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)));
  const avg = [0, 1, 2].map((c) => Math.round(rgb.reduce((sum, v) => sum + v[c], 0) / rgb.length));
  return `rgba(${avg.join(",")}, 0.6)`;
}

interface LabVesselProps {
  vessel: Vessel;
  contents: string[];
  heated: boolean;
  bubbling: boolean;
  shaking: boolean;
  className?: string;
}

export function LabVessel({ vessel, contents, heated, bubbling, shaking, className }: LabVesselProps) {
  const clipId = React.useId().replace(/:/g, "");
  const { path, maxLevel } = shapes[vessel];

  const liquids = contents.filter((id) => ["aq", "l"].includes(substances[id].state));
  const solids = contents.filter((id) => substances[id].state === "s");
  const pink = contents.includes("Phph") && isBasic(contents);
  const liquidColor = pink
    ? "rgba(236, 72, 153, 0.62)"
    : mixColors(liquids.map((id) => substances[id].color).filter((c): c is string => Boolean(c)));
  const level = liquids.length === 0 ? 0 : Math.round(maxLevel * Math.min(1, 0.2 + liquids.length * 0.16));
  const isDish = vessel === "dish";

  return (
    <svg viewBox="0 0 200 310" className={className} role="img" aria-label="Laboratoriya idishi">
      <style>{`
        @keyframes lab-bubble { 0% { transform: translateY(0); opacity: 0 } 15% { opacity: .9 } 100% { transform: translateY(-120px); opacity: 0 } }
        @keyframes lab-flame { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.15) } }
        @keyframes lab-shake { 0%,100% { transform: rotate(0) } 25% { transform: rotate(-3deg) } 75% { transform: rotate(3deg) } }
        .lab-bubble { animation: lab-bubble 1.6s ease-in infinite; transform-box: fill-box; }
        .lab-flame { animation: lab-flame .5s ease-in-out infinite; transform-origin: 100px 292px; }
        .lab-shake { animation: lab-shake .3s ease-in-out infinite; transform-origin: 100px 240px; }
        .lab-liquid { transition: fill .9s ease, y .6s ease, height .6s ease; }
      `}</style>
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`${clipId}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity=".16" />
          <stop offset=".35" stopColor="white" stopOpacity=".04" />
          <stop offset="1" stopColor="white" stopOpacity=".1" />
        </linearGradient>
      </defs>

      <g className={cn(shaking && "lab-shake")}>
        <g clipPath={`url(#${clipId})`}>
          <rect className="lab-liquid" x="0" y={240 - level} width="200" height={level} fill={liquidColor} />
          {solids.map((id, i) => {
            const s = substances[id];
            // Reagent pieces sit at the bottom; precipitates settle as a layer.
            if (["Zn", "CaCO3", "Mg", "Fe"].includes(id)) {
              return [0, 1, 2, 3].map((k) => (
                <circle
                  key={`${id}-${k}`}
                  cx={(isDish ? 76 : 80) + k * 13 + i * 4}
                  cy={(isDish ? 228 : 233) - (k % 2) * 5}
                  r="5.5"
                  fill={s.color}
                  stroke="#0f172a"
                  strokeOpacity=".3"
                />
              ));
            }
            return <rect key={id} x="0" y={(isDish ? 224 : 226) - i * 9} width="200" height="16" fill={s.color} opacity=".92" />;
          })}
          {bubbling && level > 0
            ? Array.from({ length: 10 }, (_, k) => (
                <circle
                  key={k}
                  className="lab-bubble"
                  cx={74 + ((k * 23) % 54)}
                  cy={232 - (k % 3) * 6}
                  r={2 + (k % 3)}
                  fill="white"
                  fillOpacity=".75"
                  style={{ animationDelay: `${(k * 0.17).toFixed(2)}s` }}
                />
              ))
            : null}
        </g>
        <path d={path} fill={`url(#${clipId}-glass)`} stroke="rgba(226,232,240,0.8)" strokeWidth="2.5" strokeLinejoin="round" />
      </g>

      {/* Tripod and burner */}
      <rect x="56" y="246" width="88" height="4" rx="2" fill="#64748b" />
      <path d="M64 250 L56 306 M136 250 L144 306" stroke="#475569" strokeWidth="3" />
      <rect x="88" y="290" width="24" height="16" rx="3" fill="#334155" />
      {heated ? (
        <g className="lab-flame">
          <path d="M100 252 C88 268 90 286 100 292 C110 286 112 268 100 252 Z" fill="#f97316" />
          <path d="M100 266 C94 276 95 286 100 290 C105 286 106 276 100 266 Z" fill="#60a5fa" />
        </g>
      ) : null}
    </svg>
  );
}
