const symbols = (
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr " +
  "Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu " +
  "Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr " +
  "Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og"
).split(" ");

export type Block = "s" | "p" | "d" | "f" | "noble";

export interface PosterCell {
  z: number;
  symbol: string;
  /** 1-based grid row; rows 9 and 10 hold the lanthanides and actinides. */
  row: number;
  column: number;
  block: Block;
}

const periodStarts = [1, 3, 11, 19, 37, 55, 87];

function place(z: number): { row: number; column: number } {
  const period = periodStarts.findLastIndex((start) => z >= start) + 1;
  const i = z - periodStarts[period - 1];
  if (period === 1) return { row: 1, column: i === 0 ? 1 : 18 };
  if (period <= 3) return { row: period, column: i < 2 ? i + 1 : i + 11 };
  if (period <= 5) return { row: period, column: i + 1 };
  // Periods 6–7: La/Ac stay in group 3, Ce–Lu and Th–Lr move to the f-block rows.
  if (i < 3) return { row: period, column: i + 1 };
  if (i <= 16) return { row: period + 3, column: i + 1 };
  return { row: period, column: i - 13 };
}

export const posterCells: PosterCell[] = symbols.map((symbol, index) => {
  const z = index + 1;
  const { row, column } = place(z);
  const block: Block =
    row >= 9 ? "f" : column === 18 ? "noble" : column <= 2 ? "s" : column >= 13 ? "p" : "d";
  return { z, symbol, row, column, block };
});
