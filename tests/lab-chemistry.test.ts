import { describe, expect, it } from "vitest";
import { isBasic, reactions, runReactions, scenarioSteps, scenarios, substances } from "../src/lib/lab/chemistry";
import { posterCells } from "../src/lib/lab/periodic";

describe("lab reaction engine", () => {
  it("references only known substances", () => {
    for (const r of reactions) {
      for (const id of [...r.reactants, ...r.products]) expect(substances[id], `${r.id}: ${id}`).toBeDefined();
    }
  });

  it("neutralizes acid with base", () => {
    const run = runReactions(["NaOH", "Phph", "HCl"], false);
    expect(run.performed.map((r) => r.id)).toEqual(["neutralization-hcl"]);
    expect(isBasic(run.contents)).toBe(false);
  });

  it("releases gas from marble and HCl", () => {
    const run = runReactions(["CaCO3", "HCl"], false);
    expect(run.contents).toEqual(["CaCl2", "H2O"]);
  });

  it("needs heat to decompose copper(II) hydroxide", () => {
    expect(runReactions(["CuSO4", "NaOH"], false).contents).toContain("CuOH2");
    const heated = runReactions(["CuSO4", "NaOH"], true);
    expect(heated.performed.map((r) => r.id)).toEqual(["copper-hydroxide", "copper-oxide"]);
    expect(heated.contents).toContain("CuO");
  });

  it("prefers the acid reaction over heating marble", () => {
    expect(runReactions(["CaCO3", "HCl"], true).performed[0].id).toBe("carbonate-marble");
  });

  it("reports no reaction for spectator ions", () => {
    expect(runReactions(["NaCl", "NaOH"], false).performed).toHaveLength(0);
  });
});

describe("periodic poster layout", () => {
  const at = (symbol: string) => {
    const cell = posterCells.find((c) => c.symbol === symbol)!;
    return [cell.row, cell.column];
  };

  it("places all 118 elements in distinct cells", () => {
    expect(posterCells).toHaveLength(118);
    expect(new Set(posterCells.map((c) => `${c.row}-${c.column}`)).size).toBe(118);
  });

  it("uses the standard table shape", () => {
    expect(at("He")).toEqual([1, 18]);
    expect(at("B")).toEqual([2, 13]);
    expect(at("La")).toEqual([6, 3]);
    expect(at("Ce")).toEqual([9, 4]);
    expect(at("Lu")).toEqual([9, 17]);
    expect(at("Hf")).toEqual([6, 4]);
    expect(at("Lr")).toEqual([10, 17]);
    expect(at("Og")).toEqual([7, 18]);
  });
});

describe("scenarios", () => {
  it("complete through their target reactions", () => {
    for (const scenario of scenarios.filter((s) => s.targets.length > 0)) {
      const run = runReactions(scenario.reagents, scenario.heat);
      expect(run.performed.map((r) => r.id), scenario.id).toEqual(scenario.targets);
      const state = { vessel: scenario.vessel!, contents: run.contents, heated: scenario.heat, history: scenario.targets };
      expect(scenarioSteps(scenario).every((step) => step.done(state)), scenario.id).toBe(true);
    }
  });
});
