import type { Locale } from "@/i18n/routing";

export type ElementCategory =
  | "alkali"
  | "alkaline"
  | "transition"
  | "postTransition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble";

export type ElementName = Record<Locale, string>;

export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: ElementName;
  atomicMass: number;
  category: ElementCategory;
  group: number;
  period: number;
  electronConfiguration: string;
  grid: { row: number; column: number };
}

/**
 * Reviewed IUPAC-aligned subset used by the Phase 1 homepage preview.
 * Full 118-element dataset is planned for Phase 2 with backend verification.
 */
export const elements: ChemicalElement[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: { uz: "Vodorod", ru: "Водород", en: "Hydrogen" },
    atomicMass: 1.008,
    category: "nonmetal",
    group: 1,
    period: 1,
    electronConfiguration: "1s¹",
    grid: { row: 1, column: 1 },
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: { uz: "Geliy", ru: "Гелий", en: "Helium" },
    atomicMass: 4.0026,
    category: "noble",
    group: 18,
    period: 1,
    electronConfiguration: "1s²",
    grid: { row: 1, column: 18 },
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: { uz: "Litiy", ru: "Литий", en: "Lithium" },
    atomicMass: 6.94,
    category: "alkali",
    group: 1,
    period: 2,
    electronConfiguration: "[He] 2s¹",
    grid: { row: 2, column: 1 },
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: { uz: "Uglerod", ru: "Углерод", en: "Carbon" },
    atomicMass: 12.011,
    category: "nonmetal",
    group: 14,
    period: 2,
    electronConfiguration: "[He] 2s² 2p²",
    grid: { row: 2, column: 14 },
  },
  {
    atomicNumber: 7,
    symbol: "N",
    name: { uz: "Azot", ru: "Азот", en: "Nitrogen" },
    atomicMass: 14.007,
    category: "nonmetal",
    group: 15,
    period: 2,
    electronConfiguration: "[He] 2s² 2p³",
    grid: { row: 2, column: 15 },
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: { uz: "Kislorod", ru: "Кислород", en: "Oxygen" },
    atomicMass: 15.999,
    category: "nonmetal",
    group: 16,
    period: 2,
    electronConfiguration: "[He] 2s² 2p⁴",
    grid: { row: 2, column: 16 },
  },
  {
    atomicNumber: 9,
    symbol: "F",
    name: { uz: "Ftor", ru: "Фтор", en: "Fluorine" },
    atomicMass: 18.998,
    category: "halogen",
    group: 17,
    period: 2,
    electronConfiguration: "[He] 2s² 2p⁵",
    grid: { row: 2, column: 17 },
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: { uz: "Neon", ru: "Неон", en: "Neon" },
    atomicMass: 20.18,
    category: "noble",
    group: 18,
    period: 2,
    electronConfiguration: "[He] 2s² 2p⁶",
    grid: { row: 2, column: 18 },
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: { uz: "Natriy", ru: "Натрий", en: "Sodium" },
    atomicMass: 22.99,
    category: "alkali",
    group: 1,
    period: 3,
    electronConfiguration: "[Ne] 3s¹",
    grid: { row: 3, column: 1 },
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: { uz: "Magniy", ru: "Магний", en: "Magnesium" },
    atomicMass: 24.305,
    category: "alkaline",
    group: 2,
    period: 3,
    electronConfiguration: "[Ne] 3s²",
    grid: { row: 3, column: 2 },
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: { uz: "Alyuminiy", ru: "Алюминий", en: "Aluminium" },
    atomicMass: 26.982,
    category: "postTransition",
    group: 13,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p¹",
    grid: { row: 3, column: 13 },
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: { uz: "Kremniy", ru: "Кремний", en: "Silicon" },
    atomicMass: 28.085,
    category: "metalloid",
    group: 14,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p²",
    grid: { row: 3, column: 14 },
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: { uz: "Fosfor", ru: "Фосфор", en: "Phosphorus" },
    atomicMass: 30.974,
    category: "nonmetal",
    group: 15,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p³",
    grid: { row: 3, column: 15 },
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: { uz: "Oltingugurt", ru: "Сера", en: "Sulfur" },
    atomicMass: 32.06,
    category: "nonmetal",
    group: 16,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p⁴",
    grid: { row: 3, column: 16 },
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: { uz: "Xlor", ru: "Хлор", en: "Chlorine" },
    atomicMass: 35.45,
    category: "halogen",
    group: 17,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p⁵",
    grid: { row: 3, column: 17 },
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: { uz: "Argon", ru: "Аргон", en: "Argon" },
    atomicMass: 39.948,
    category: "noble",
    group: 18,
    period: 3,
    electronConfiguration: "[Ne] 3s² 3p⁶",
    grid: { row: 3, column: 18 },
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: { uz: "Kaliy", ru: "Калий", en: "Potassium" },
    atomicMass: 39.098,
    category: "alkali",
    group: 1,
    period: 4,
    electronConfiguration: "[Ar] 4s¹",
    grid: { row: 4, column: 1 },
  },
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: { uz: "Kaltsiy", ru: "Кальций", en: "Calcium" },
    atomicMass: 40.078,
    category: "alkaline",
    group: 2,
    period: 4,
    electronConfiguration: "[Ar] 4s²",
    grid: { row: 4, column: 2 },
  },
  {
    atomicNumber: 26,
    symbol: "Fe",
    name: { uz: "Temir", ru: "Железо", en: "Iron" },
    atomicMass: 55.845,
    category: "transition",
    group: 8,
    period: 4,
    electronConfiguration: "[Ar] 3d⁶ 4s²",
    grid: { row: 4, column: 8 },
  },
  {
    atomicNumber: 29,
    symbol: "Cu",
    name: { uz: "Mis", ru: "Медь", en: "Copper" },
    atomicMass: 63.546,
    category: "transition",
    group: 11,
    period: 4,
    electronConfiguration: "[Ar] 3d¹⁰ 4s¹",
    grid: { row: 4, column: 11 },
  },
  {
    atomicNumber: 30,
    symbol: "Zn",
    name: { uz: "Rux", ru: "Цинк", en: "Zinc" },
    atomicMass: 65.38,
    category: "transition",
    group: 12,
    period: 4,
    electronConfiguration: "[Ar] 3d¹⁰ 4s²",
    grid: { row: 4, column: 12 },
  },
];

export const categoryStyles: Record<ElementCategory, { badge: string; tile: string; dot: string }> = {
  alkali: {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20",
    tile: "bg-rose-500/[0.07] hover:bg-rose-500/[0.14] border-rose-500/20",
    dot: "bg-rose-500",
  },
  alkaline: {
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20",
    tile: "bg-orange-500/[0.07] hover:bg-orange-500/[0.14] border-orange-500/20",
    dot: "bg-orange-500",
  },
  transition: {
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    tile: "bg-amber-500/[0.07] hover:bg-amber-500/[0.14] border-amber-500/20",
    dot: "bg-amber-500",
  },
  postTransition: {
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    tile: "bg-emerald-500/[0.07] hover:bg-emerald-500/[0.14] border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  metalloid: {
    badge: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    tile: "bg-teal-500/[0.07] hover:bg-teal-500/[0.14] border-teal-500/20",
    dot: "bg-teal-500",
  },
  nonmetal: {
    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    tile: "bg-blue-500/[0.07] hover:bg-blue-500/[0.14] border-blue-500/20",
    dot: "bg-blue-500",
  },
  halogen: {
    badge: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
    tile: "bg-violet-500/[0.07] hover:bg-violet-500/[0.14] border-violet-500/20",
    dot: "bg-violet-500",
  },
  noble: {
    badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
    tile: "bg-cyan-500/[0.07] hover:bg-cyan-500/[0.14] border-cyan-500/20",
    dot: "bg-cyan-500",
  },
};
