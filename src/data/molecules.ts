export type MoleculeId = "water" | "methane" | "co2" | "ammonia";

export type AtomElement = "H" | "O" | "C" | "N";

export interface MoleculeAtom {
  element: AtomElement;
  position: [number, number, number];
}

export interface MoleculeBond {
  a: number;
  b: number;
  order: 1 | 2;
}

export interface MoleculeDefinition {
  id: MoleculeId;
  formula: string;
  /** g/mol */
  molarMass: string;
  /** translation key under `Molecules.data` */
  dataKey: "water" | "methane" | "co2" | "ammonia";
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
}

/**
 * Reviewed ball-and-stick coordinates (approximate, educational scale).
 * Only simple, verified molecules are included in Phase 1.
 */
export const molecules: Record<MoleculeId, MoleculeDefinition> = {
  water: {
    id: "water",
    formula: "H₂O",
    molarMass: "18,015",
    dataKey: "water",
    atoms: [
      { element: "O", position: [0, 0.12, 0] },
      { element: "H", position: [0.82, -0.42, 0] },
      { element: "H", position: [-0.82, -0.42, 0] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
    ],
  },
  methane: {
    id: "methane",
    formula: "CH₄",
    molarMass: "16,043",
    dataKey: "methane",
    atoms: [
      { element: "C", position: [0, 0, 0] },
      { element: "H", position: [0.89, 0.89, 0.89] },
      { element: "H", position: [-0.89, -0.89, 0.89] },
      { element: "H", position: [-0.89, 0.89, -0.89] },
      { element: "H", position: [0.89, -0.89, -0.89] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
      { a: 0, b: 3, order: 1 },
      { a: 0, b: 4, order: 1 },
    ],
  },
  co2: {
    id: "co2",
    formula: "CO₂",
    molarMass: "44,009",
    dataKey: "co2",
    atoms: [
      { element: "C", position: [0, 0, 0] },
      { element: "O", position: [1.16, 0, 0] },
      { element: "O", position: [-1.16, 0, 0] },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2, order: 2 },
    ],
  },
  ammonia: {
    id: "ammonia",
    formula: "NH₃",
    molarMass: "17,031",
    dataKey: "ammonia",
    atoms: [
      { element: "N", position: [0, 0.15, 0] },
      { element: "H", position: [0.97, -0.31, 0] },
      { element: "H", position: [-0.49, -0.31, 0.85] },
      { element: "H", position: [-0.49, -0.31, -0.85] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
      { a: 0, b: 3, order: 1 },
    ],
  },
};

export const moleculeOrder: MoleculeId[] = ["water", "methane", "co2", "ammonia"];

export const atomAppearance: Record<AtomElement, { color: string; radius: number; label: string }> = {
  H: { color: "#e2e8f0", radius: 0.3, label: "H" },
  O: { color: "#ef4444", radius: 0.52, label: "O" },
  C: { color: "#1e293b", radius: 0.5, label: "C" },
  N: { color: "#3b82f6", radius: 0.48, label: "N" },
};
