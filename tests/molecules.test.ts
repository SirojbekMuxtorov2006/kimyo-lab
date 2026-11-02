import { describe, it, expect } from "vitest";
import { molecules, moleculeOrder, atomAppearance } from "../src/data/molecules";

describe("Molecular Structures Dataset", () => {
  it("should contain verified molecule definitions", () => {
    expect(moleculeOrder.length).toBeGreaterThan(0);

    for (const id of moleculeOrder) {
      const mol = molecules[id];
      expect(mol).toBeDefined();
      expect(mol.formula).toBeTruthy();
      expect(mol.atoms.length).toBeGreaterThan(0);
      expect(mol.bonds.length).toBeGreaterThanOrEqual(0);

      // Verify atoms have appearance defined
      for (const atom of mol.atoms) {
        expect(atomAppearance[atom.element]).toBeDefined();
        expect(atom.position.length).toBe(3);
      }

      // Verify bonds point to valid atom indices
      for (const bond of mol.bonds) {
        expect(bond.a).toBeLessThan(mol.atoms.length);
        expect(bond.b).toBeLessThan(mol.atoms.length);
        expect([1, 2]).toContain(bond.order);
      }
    }
  });
});

