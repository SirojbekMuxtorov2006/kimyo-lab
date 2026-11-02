/**
 * Educational reaction engine for the virtual lab.
 * Amounts are not modelled: each substance is one "portion", and a reaction
 * consumes its reactants and adds its products to the vessel.
 */

export type SubstanceState = "aq" | "s" | "l" | "g";

export interface Substance {
  id: string;
  formula: string;
  name: string;
  category: "Kislotalar" | "Asoslar" | "Tuzlar" | "Indikatorlar" | "Metallar" | "Suv" | "Mahsulot";
  state: SubstanceState;
  /** Colour in solution, or the colour of the solid. Undefined means colourless. */
  color?: string;
}

export interface Reaction {
  id: string;
  reactants: string[];
  products: string[];
  equation: string;
  type: string;
  observation: string;
  explanation: string;
  requiresHeat?: boolean;
}

export const substances: Record<string, Substance> = {
  HCl: { id: "HCl", formula: "HCl", name: "Xlorid kislota", category: "Kislotalar", state: "aq" },
  H2SO4: { id: "H2SO4", formula: "H₂SO₄", name: "Sulfat kislota", category: "Kislotalar", state: "aq" },
  NaOH: { id: "NaOH", formula: "NaOH", name: "Natriy gidroksid", category: "Asoslar", state: "aq" },
  NaCl: { id: "NaCl", formula: "NaCl", name: "Natriy xlorid", category: "Tuzlar", state: "aq" },
  AgNO3: { id: "AgNO3", formula: "AgNO₃", name: "Kumush nitrat", category: "Tuzlar", state: "aq" },
  CuSO4: { id: "CuSO4", formula: "CuSO₄", name: "Mis(II) sulfat", category: "Tuzlar", state: "aq", color: "#2f80ed" },
  BaCl2: { id: "BaCl2", formula: "BaCl₂", name: "Bariy xlorid", category: "Tuzlar", state: "aq" },
  Na2CO3: { id: "Na2CO3", formula: "Na₂CO₃", name: "Natriy karbonat", category: "Tuzlar", state: "aq" },
  CaCO3: { id: "CaCO3", formula: "CaCO₃", name: "Kalsiy karbonat (marmar)", category: "Tuzlar", state: "s", color: "#f1f5f9" },
  Zn: { id: "Zn", formula: "Zn", name: "Rux donachalari", category: "Metallar", state: "s", color: "#94a3b8" },
  Phph: { id: "Phph", formula: "Fenolftalein", name: "Indikator", category: "Indikatorlar", state: "aq" },
  Mg: { id: "Mg", formula: "Mg", name: "Magniy lentasi", category: "Metallar", state: "s", color: "#cbd5e1" },
  Fe: { id: "Fe", formula: "Fe", name: "Temir qipiqlari", category: "Metallar", state: "s", color: "#57534e" },
  KI: { id: "KI", formula: "KI", name: "Kaliy yodid", category: "Tuzlar", state: "aq" },
  PbNO32: { id: "PbNO32", formula: "Pb(NO₃)₂", name: "Qo‘rg‘oshin(II) nitrat", category: "Tuzlar", state: "aq" },
  FeCl3: { id: "FeCl3", formula: "FeCl₃", name: "Temir(III) xlorid", category: "Tuzlar", state: "aq", color: "#d97706" },
  NaHCO3: { id: "NaHCO3", formula: "NaHCO₃", name: "Natriy gidrokarbonat", category: "Tuzlar", state: "aq" },

  H2O: { id: "H2O", formula: "H₂O", name: "Distillangan suv", category: "Suv", state: "l" },
  NaNO3: { id: "NaNO3", formula: "NaNO₃", name: "Natriy nitrat", category: "Mahsulot", state: "aq" },
  HNO3: { id: "HNO3", formula: "HNO₃", name: "Nitrat kislota", category: "Mahsulot", state: "aq" },
  Na2SO4: { id: "Na2SO4", formula: "Na₂SO₄", name: "Natriy sulfat", category: "Mahsulot", state: "aq" },
  CaCl2: { id: "CaCl2", formula: "CaCl₂", name: "Kalsiy xlorid", category: "Mahsulot", state: "aq" },
  ZnCl2: { id: "ZnCl2", formula: "ZnCl₂", name: "Rux xlorid", category: "Mahsulot", state: "aq" },
  ZnSO4: { id: "ZnSO4", formula: "ZnSO₄", name: "Rux sulfat", category: "Mahsulot", state: "aq" },
  CuCl2: { id: "CuCl2", formula: "CuCl₂", name: "Mis(II) xlorid", category: "Mahsulot", state: "aq", color: "#14b8a6" },
  AgCl: { id: "AgCl", formula: "AgCl", name: "Kumush xlorid", category: "Mahsulot", state: "s", color: "#f8fafc" },
  BaSO4: { id: "BaSO4", formula: "BaSO₄", name: "Bariy sulfat", category: "Mahsulot", state: "s", color: "#f8fafc" },
  BaCO3: { id: "BaCO3", formula: "BaCO₃", name: "Bariy karbonat", category: "Mahsulot", state: "s", color: "#f1f5f9" },
  CuOH2: { id: "CuOH2", formula: "Cu(OH)₂", name: "Mis(II) gidroksid", category: "Mahsulot", state: "s", color: "#38bdf8" },
  CuO: { id: "CuO", formula: "CuO", name: "Mis(II) oksid", category: "Mahsulot", state: "s", color: "#1f2937" },
  Cu: { id: "Cu", formula: "Cu", name: "Mis", category: "Mahsulot", state: "s", color: "#c2410c" },
  CaO: { id: "CaO", formula: "CaO", name: "Kalsiy oksid", category: "Mahsulot", state: "s", color: "#e2e8f0" },
  MgCl2: { id: "MgCl2", formula: "MgCl₂", name: "Magniy xlorid", category: "Mahsulot", state: "aq" },
  FeCl2: { id: "FeCl2", formula: "FeCl₂", name: "Temir(II) xlorid", category: "Mahsulot", state: "aq", color: "#bef264" },
  FeSO4: { id: "FeSO4", formula: "FeSO₄", name: "Temir(II) sulfat", category: "Mahsulot", state: "aq", color: "#d9f99d" },
  KNO3: { id: "KNO3", formula: "KNO₃", name: "Kaliy nitrat", category: "Mahsulot", state: "aq" },
  PbI2: { id: "PbI2", formula: "PbI₂", name: "Qo‘rg‘oshin(II) yodid", category: "Mahsulot", state: "s", color: "#facc15" },
  AgI: { id: "AgI", formula: "AgI", name: "Kumush yodid", category: "Mahsulot", state: "s", color: "#fde68a" },
  FeOH3: { id: "FeOH3", formula: "Fe(OH)₃", name: "Temir(III) gidroksid", category: "Mahsulot", state: "s", color: "#92400e" },
  CO2: { id: "CO2", formula: "CO₂", name: "Karbonat angidrid", category: "Mahsulot", state: "g" },
  H2: { id: "H2", formula: "H₂", name: "Vodorod", category: "Mahsulot", state: "g" },
};

/** Reagents on the shelf, in display order. */
export const shelf = [
  "HCl", "H2SO4", "NaOH", "NaCl",
  "AgNO3", "CuSO4", "BaCl2", "Na2CO3",
  "CaCO3", "Zn", "KI", "Phph",
  "PbNO32", "FeCl3", "NaHCO3", "Mg", "Fe", "H2O",
];

export const reactions: Reaction[] = [
  {
    id: "neutralization-hcl",
    reactants: ["HCl", "NaOH"],
    products: ["NaCl", "H2O"],
    equation: "HCl + NaOH → NaCl + H₂O",
    type: "Neytrallanish",
    observation: "Eritma biroz isiydi. Fenolftalein bo‘lsa, pushti rang yo‘qoladi.",
    explanation: "Kislotadagi H⁺ ionlari asosdagi OH⁻ ionlari bilan birikib suv hosil qiladi. Eritmada tuz qoladi.",
  },
  {
    id: "neutralization-h2so4",
    reactants: ["H2SO4", "NaOH"],
    products: ["Na2SO4", "H2O"],
    equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    type: "Neytrallanish",
    observation: "Eritma isiydi, rang o‘zgarmaydi. Fenolftalein bo‘lsa, rangsizlanadi.",
    explanation: "Ikki negizli kislota ikki mol ishqor bilan to‘liq neytrallanadi va natriy sulfat hosil bo‘ladi.",
  },
  {
    id: "carbonate-marble",
    reactants: ["CaCO3", "HCl"],
    products: ["CaCl2", "H2O", "CO2"],
    equation: "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑",
    type: "Almashinish (gaz ajralishi)",
    observation: "Marmar bo‘lakchalari atrofida jadal pufakchalar paydo bo‘ladi va ular asta eriydi.",
    explanation: "Kuchli kislota karbonatni parchalaydi: hosil bo‘lgan karbonat kislota darhol CO₂ va suvga ajraladi.",
  },
  {
    id: "carbonate-soda-hcl",
    reactants: ["Na2CO3", "HCl"],
    products: ["NaCl", "H2O", "CO2"],
    equation: "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑",
    type: "Almashinish (gaz ajralishi)",
    observation: "Eritmada shiddatli “qaynash” — rangsiz gaz pufakchalari ajraladi.",
    explanation: "Karbonat ionlari H⁺ bilan bog‘lanib beqaror H₂CO₃ hosil qiladi, u CO₂ ga parchalanadi.",
  },
  {
    id: "carbonate-soda-h2so4",
    reactants: ["Na2CO3", "H2SO4"],
    products: ["Na2SO4", "H2O", "CO2"],
    equation: "Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂↑",
    type: "Almashinish (gaz ajralishi)",
    observation: "Rangsiz gaz pufakchalari ajraladi.",
    explanation: "Sulfat kislota karbonatdan kuchsizroq karbonat kislotani siqib chiqaradi, u CO₂ ga parchalanadi.",
  },
  {
    id: "silver-chloride",
    reactants: ["AgNO3", "NaCl"],
    products: ["AgCl", "NaNO3"],
    equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    type: "Almashinish (cho‘kma)",
    observation: "Bir zumda oq, “pishloqsimon” cho‘kma tushadi.",
    explanation: "Ag⁺ va Cl⁻ ionlari suvda deyarli erimaydigan AgCl hosil qiladi — bu xlorid ioniga sifat reaksiyasi.",
  },
  {
    id: "silver-chloride-acid",
    reactants: ["AgNO3", "HCl"],
    products: ["AgCl", "HNO3"],
    equation: "AgNO₃ + HCl → AgCl↓ + HNO₃",
    type: "Almashinish (cho‘kma)",
    observation: "Oq cho‘kma hosil bo‘ladi.",
    explanation: "Xlorid kislotadagi Cl⁻ ionlari kumush ionlari bilan erimaydigan tuz hosil qiladi.",
  },
  {
    id: "barium-sulfate",
    reactants: ["BaCl2", "H2SO4"],
    products: ["BaSO4", "HCl"],
    equation: "BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl",
    type: "Almashinish (cho‘kma)",
    observation: "Oq, mayda kristall cho‘kma tushadi.",
    explanation: "Ba²⁺ va SO₄²⁻ ionlari erimaydigan BaSO₄ hosil qiladi — sulfat ioniga sifat reaksiyasi.",
  },
  {
    id: "barium-sulfate-copper",
    reactants: ["BaCl2", "CuSO4"],
    products: ["BaSO4", "CuCl2"],
    equation: "BaCl₂ + CuSO₄ → BaSO₄↓ + CuCl₂",
    type: "Almashinish (cho‘kma)",
    observation: "Oq cho‘kma tushadi, eritma yashil-havorang tusga kiradi.",
    explanation: "Sulfat ionlari bariy bilan cho‘kmaga o‘tadi, eritmada mis(II) xlorid qoladi.",
  },
  {
    id: "barium-carbonate",
    reactants: ["BaCl2", "Na2CO3"],
    products: ["BaCO3", "NaCl"],
    equation: "BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl",
    type: "Almashinish (cho‘kma)",
    observation: "Oq cho‘kma hosil bo‘ladi.",
    explanation: "Bariy karbonat suvda erimaydi, shuning uchun ionlar cho‘kmaga o‘tadi.",
  },
  {
    id: "copper-hydroxide",
    reactants: ["CuSO4", "NaOH"],
    products: ["CuOH2", "Na2SO4"],
    equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
    type: "Almashinish (cho‘kma)",
    observation: "Havorang iviqsimon cho‘kma tushadi, eritmaning ko‘k rangi ochadi.",
    explanation: "Cu²⁺ ionlari OH⁻ bilan erimaydigan mis(II) gidroksid hosil qiladi.",
  },
  {
    id: "copper-oxide",
    reactants: ["CuOH2"],
    products: ["CuO", "H2O"],
    equation: "Cu(OH)₂ →(t°) CuO + H₂O",
    type: "Parchalanish (qizdirish)",
    observation: "Qizdirilganda havorang cho‘kma qorayadi.",
    explanation: "Erimaydigan asoslar qizdirilganda oksid va suvga parchalanadi. Qora modda — mis(II) oksid.",
    requiresHeat: true,
  },
  {
    id: "marble-decomposition",
    reactants: ["CaCO3"],
    products: ["CaO", "CO2"],
    equation: "CaCO₃ →(t°) CaO + CO₂↑",
    type: "Parchalanish (qizdirish)",
    observation: "Kuchli qizdirilganda marmar oqarib, uvalanuvchan bo‘ladi; gaz ajraladi.",
    explanation: "Ohaktoshni kuydirish: karbonat kalsiy oksid (so‘ndirilmagan ohak) va CO₂ ga parchalanadi.",
    requiresHeat: true,
  },
  {
    id: "zinc-hcl",
    reactants: ["Zn", "HCl"],
    products: ["ZnCl2", "H2"],
    equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    type: "O‘rin olish",
    observation: "Rux yuzasida rangsiz gaz pufakchalari ajraladi, metall asta eriydi.",
    explanation: "Faol metall kislotadagi vodorodni siqib chiqaradi. Ajralgan gaz — vodorod.",
  },
  {
    id: "zinc-h2so4",
    reactants: ["Zn", "H2SO4"],
    products: ["ZnSO4", "H2"],
    equation: "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
    type: "O‘rin olish",
    observation: "Rux yuzasida vodorod pufakchalari paydo bo‘ladi.",
    explanation: "Suyultirilgan sulfat kislota faol metallar bilan vodorod ajratib reaksiyaga kirishadi.",
  },
  {
    id: "zinc-copper",
    reactants: ["Zn", "CuSO4"],
    products: ["ZnSO4", "Cu"],
    equation: "Zn + CuSO₄ → ZnSO₄ + Cu",
    type: "O‘rin olish",
    observation: "Eritmaning ko‘k rangi yo‘qoladi, rux yuzasida qizg‘ish mis qatlami paydo bo‘ladi.",
    explanation: "Rux misdan faolroq, shuning uchun u mis ionlarini eritmadan qaytaradi.",
  },
  {
    id: "magnesium-hcl",
    reactants: ["Mg", "HCl"],
    products: ["MgCl2", "H2"],
    equation: "Mg + 2HCl → MgCl₂ + H₂↑",
    type: "O‘rin olish",
    observation: "Magniy shiddat bilan eriydi, ko‘p gaz pufakchalari ajraladi, idish isiydi.",
    explanation: "Magniy ruxdan ham faol, shuning uchun kislotadan vodorodni tezroq siqib chiqaradi.",
  },
  {
    id: "iron-hcl",
    reactants: ["Fe", "HCl"],
    products: ["FeCl2", "H2"],
    equation: "Fe + 2HCl → FeCl₂ + H₂↑",
    type: "O‘rin olish",
    observation: "Temir yuzasida sekin gaz ajraladi, eritma och yashil tusga kiradi.",
    explanation: "Temir kislota bilan temir(II) tuzini hosil qiladi — Fe²⁺ ionlari eritmani och yashil rangga bo‘yaydi.",
  },
  {
    id: "iron-copper",
    reactants: ["Fe", "CuSO4"],
    products: ["FeSO4", "Cu"],
    equation: "Fe + CuSO₄ → FeSO₄ + Cu",
    type: "O‘rin olish",
    observation: "Temir qizg‘ish mis bilan qoplanadi, ko‘k rang yashilga o‘zgaradi.",
    explanation: "Temir faollik qatorida misdan oldin turadi, shuning uchun misni tuzidan siqib chiqaradi.",
  },
  {
    id: "lead-iodide",
    reactants: ["PbNO32", "KI"],
    products: ["PbI2", "KNO3"],
    equation: "Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃",
    type: "Almashinish (cho‘kma)",
    observation: "Yorqin sariq cho‘kma tushadi — “oltin yomg‘ir”.",
    explanation: "Pb²⁺ va I⁻ ionlari suvda kam eriydigan sariq qo‘rg‘oshin(II) yodid hosil qiladi.",
  },
  {
    id: "silver-iodide",
    reactants: ["AgNO3", "KI"],
    products: ["AgI", "KNO3"],
    equation: "AgNO₃ + KI → AgI↓ + KNO₃",
    type: "Almashinish (cho‘kma)",
    observation: "Och sariq cho‘kma hosil bo‘ladi.",
    explanation: "Kumush yodid suvda erimaydi — yodid ioniga sifat reaksiyasi.",
  },
  {
    id: "iron-hydroxide",
    reactants: ["FeCl3", "NaOH"],
    products: ["FeOH3", "NaCl"],
    equation: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl",
    type: "Almashinish (cho‘kma)",
    observation: "Qo‘ng‘ir-qizil iviqsimon cho‘kma tushadi.",
    explanation: "Fe³⁺ ionlari OH⁻ bilan erimaydigan temir(III) gidroksid hosil qiladi.",
  },
  {
    id: "bicarbonate-hcl",
    reactants: ["NaHCO3", "HCl"],
    products: ["NaCl", "H2O", "CO2"],
    equation: "NaHCO₃ + HCl → NaCl + H₂O + CO₂↑",
    type: "Almashinish (gaz ajralishi)",
    observation: "Eritma ko‘piklanadi, rangsiz gaz ajraladi.",
    explanation: "Ichimlik sodasi kislotani neytrallaydi va karbonat angidrid ajratadi.",
  },
];

export interface ReactionRun {
  contents: string[];
  performed: Reaction[];
}

/**
 * Applies every reaction possible with the current contents, repeating until
 * nothing else reacts (e.g. CuSO₄ + NaOH, then heating the Cu(OH)₂ formed).
 */
export function runReactions(contents: string[], heated: boolean): ReactionRun {
  let current = [...contents];
  const performed: Reaction[] = [];

  for (let pass = 0; pass < 6; pass++) {
    const reaction = reactions.find(
      (r) =>
        (!r.requiresHeat || heated) &&
        r.reactants.every((id) => current.includes(id)) &&
        // A heating-only decomposition should not pre-empt an available solution reaction.
        !(r.requiresHeat && r.reactants.length === 1 && reactions.some(
          (other) => !other.requiresHeat && other.reactants.includes(r.reactants[0]) && other.reactants.every((id) => current.includes(id))
        ))
    );
    if (!reaction) break;

    const next = [...current];
    for (const id of reaction.reactants) next.splice(next.indexOf(id), 1);
    // Gases leave the vessel; water just joins the solution.
    for (const id of reaction.products) {
      if (substances[id].state !== "g" && !next.includes(id)) next.push(id);
    }
    current = next;
    performed.push(reaction);
  }

  return { contents: current, performed };
}

/** Phenolphthalein turns pink in basic solution. */
export function isBasic(contents: string[]) {
  return contents.includes("NaOH") || contents.includes("Na2CO3");
}

/** Rough school-level pH estimate of the solution; null when there is no liquid. */
export function estimatePh(contents: string[]): number | null {
  if (!contents.some((id) => ["aq", "l"].includes(substances[id].state))) return null;
  const has = (...ids: string[]) => ids.some((id) => contents.includes(id));
  if (has("HCl", "H2SO4", "HNO3")) return 1;
  if (has("NaOH")) return 13;
  if (has("Na2CO3")) return 11;
  if (has("NaHCO3")) return 8.3;
  if (has("FeCl3")) return 2.5;
  if (has("CuSO4", "CuCl2", "ZnCl2", "ZnSO4", "FeCl2", "FeSO4")) return 5;
  return 7;
}

export type Vessel = "tube" | "flask" | "round" | "beaker" | "dish";

export const vesselInfo: Record<Vessel, { name: string; description: string }> = {
  tube: { name: "Probirka", description: "Kichik hajmdagi reaksiyalar va qizdirish uchun." },
  flask: { name: "Konussimon kolba", description: "Gaz ajratish va eritmalarni aralashtirish uchun qulay." },
  round: { name: "Dumaloq tubli kolba", description: "Bir tekis qizdirish uchun mos." },
  beaker: { name: "Kimyoviy stakan", description: "Eritmalar va neytrallash uchun asosiy idish." },
  dish: { name: "Bug‘latish kosachasi", description: "Eritmalarni qizdirib bug‘latish uchun." },
};

export interface LabState {
  vessel: Vessel;
  contents: string[];
  heated: boolean;
  history: string[];
}

export interface Scenario {
  id: string;
  title: string;
  tag: string;
  goal: string;
  equation?: string;
  reagents: string[];
  vessel?: Vessel;
  heat: boolean;
  /** Reactions that complete the scenario, in order. */
  targets: string[];
  instructions: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "reagents",
    title: "Karbonat angidrid olish",
    tag: "o‘quv reaksiyasi",
    goal: "Pufakchalar orqali CO₂ ajralishini kuzatish.",
    equation: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)",
    reagents: ["CaCO3", "HCl"],
    vessel: "flask",
    heat: false,
    targets: ["carbonate-marble"],
    instructions: [
      "Markaziy zonaga konussimon kolbani qo‘ying.",
      "Qattiq moddani shpatel bilan, eritmani pipetka bilan qo‘shing.",
      "Qizdirishni yoqmang: reaksiya oddiy sharoitda boradi.",
      "Natijani tekshiring va kuzatuvni yo‘riqnoma bilan solishtiring.",
    ],
  },
  {
    id: "neutralization",
    title: "Kislota va asosning neytrallanishi",
    tag: "neytrallanish",
    goal: "Indikator yordamida ishqorni kislota bilan neytrallash.",
    equation: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
    reagents: ["NaOH", "Phph", "HCl"],
    vessel: "beaker",
    heat: false,
    targets: ["neutralization-hcl"],
    instructions: [
      "Kimyoviy stakanni tanlang.",
      "NaOH eritmasi va fenolftalein qo‘shing — eritma pushti bo‘ladi.",
      "Xlorid kislotani pipetka bilan qo‘shing va reaksiyani boshlang.",
      "Rangsizlanish — muhit neytral bo‘lganini bildiradi.",
    ],
  },
  {
    id: "heating",
    title: "Qizdirish tajribasi",
    tag: "parchalanish",
    goal: "Mis(II) gidroksid olish va uni qizdirib parchalash.",
    equation: "Cu(OH)₂(s) →(t°) CuO(s) + H₂O(l)",
    reagents: ["CuSO4", "NaOH"],
    vessel: "tube",
    heat: true,
    targets: ["copper-hydroxide", "copper-oxide"],
    instructions: [
      "Probirkaga CuSO₄ va NaOH eritmalarini qo‘shing.",
      "Reaksiyani boshlang — havorang cho‘kma tushadi.",
      "Qizdirgichni yoqing va reaksiyani yana boshlang.",
      "Cho‘kma qorayishini kuzating: CuO hosil bo‘ldi.",
    ],
  },
  {
    id: "solutions",
    title: "Xlorid ioniga sifat reaksiyasi",
    tag: "cho‘kma",
    goal: "Kumush nitrat yordamida xlorid ionini aniqlash.",
    equation: "AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)",
    reagents: ["AgNO3", "NaCl"],
    vessel: "tube",
    heat: false,
    targets: ["silver-chloride"],
    instructions: [
      "Probirkani tanlang.",
      "NaCl va AgNO₃ eritmalarini pipetka bilan qo‘shing.",
      "Reaksiyani boshlang va oq cho‘kmani kuzating.",
    ],
  },
  {
    id: "golden-rain",
    title: "“Oltin yomg‘ir”",
    tag: "cho‘kma",
    goal: "Sariq qo‘rg‘oshin(II) yodid cho‘kmasini olish.",
    equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)",
    reagents: ["PbNO32", "KI"],
    vessel: "beaker",
    heat: false,
    targets: ["lead-iodide"],
    instructions: [
      "Kimyoviy stakanni tanlang.",
      "Pb(NO₃)₂ va KI eritmalarini qo‘shing.",
      "Reaksiyani boshlang va sariq cho‘kmani kuzating.",
    ],
  },
  {
    id: "free",
    title: "Erkin tajriba",
    tag: "erkin rejim",
    goal: "Istalgan reaktivlarni aralashtirib, nima sodir bo‘lishini tekshirish.",
    reagents: [],
    heat: false,
    targets: [],
    instructions: [
      "Idish tanlang va kamida ikkita reaktiv qo‘shing.",
      "Kerak bo‘lsa qizdirishni yoqing va reaksiyani boshlang.",
      "Natija bo‘limida tenglama va izohni o‘qing.",
    ],
  },
];

export interface ScenarioStep {
  label: string;
  done: (s: LabState) => boolean;
}

export function scenarioSteps(scenario: Scenario): ScenarioStep[] {
  if (scenario.targets.length === 0) {
    return [
      { label: "Kamida ikkita reaktiv qo‘shing", done: (s) => s.contents.length >= 2 || s.history.length > 0 },
      { label: "Reaksiyani boshlang", done: (s) => s.history.length > 0 },
    ];
  }
  const allDone = (s: LabState) => scenario.targets.every((t) => s.history.includes(t));
  const firstDone = (s: LabState) => s.history.includes(scenario.targets[0]);
  const steps: ScenarioStep[] = [];
  if (scenario.vessel) {
    const vessel = scenario.vessel;
    steps.push({ label: `${vesselInfo[vessel].name}ni tanlang`, done: (s) => s.vessel === vessel || allDone(s) });
  }
  for (const id of scenario.reagents) {
    steps.push({ label: `${substances[id].formula} qo‘shing`, done: (s) => s.contents.includes(id) || firstDone(s) });
  }
  if (scenario.heat) {
    steps.push({ label: "Reaksiyani boshlang", done: firstDone });
    steps.push({ label: "Qizdirgichni yoqing", done: (s) => s.heated || allDone(s) });
    steps.push({ label: "Qizdirib, reaksiyani yana boshlang", done: allDone });
  } else {
    steps.push({ label: "Reaksiyani boshlang", done: allDone });
  }
  return steps;
}
