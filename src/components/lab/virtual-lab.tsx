"use client";

import * as React from "react";
import {
  Beaker,
  BookOpen,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Droplet,
  Eraser,
  Flame,
  FlaskConical,
  FlaskRound,
  Gauge,
  Grip,
  HelpCircle,
  History,
  Lightbulb,
  Maximize,
  Minus,
  MousePointer2,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Play,
  Plus,
  RotateCcw,
  Shovel,
  TestTube,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  estimatePh,
  runReactions,
  scenarioSteps,
  scenarios,
  shelf,
  substances,
  vesselInfo,
  type LabState,
  type Reaction,
  type ReactionRun,
  type Substance,
  type Vessel,
} from "@/lib/lab/chemistry";
import { posterCells, type Block } from "@/lib/lab/periodic";
import { LabVessel } from "./lab-vessel";
import { LabDialogs, type LabDialog } from "./lab-dialogs";
import { cn } from "@/lib/utils";

type Mode = "demo" | "practice" | "free" | "exam";
type Hints = "short" | "detailed" | "none";
type Tool = "select" | "pipette" | "spatula" | "tongs";
type LeftTab = "equipment" | "reagents" | "heating" | "measure" | "notes";
type RightTab = "guide" | "conditions" | "result" | "journal";
type Selection = { kind: "reagent" | "content"; id: string } | { kind: "vessel"; id: Vessel } | null;

interface JournalEntry {
  at: string;
  equation: string;
  scenario: string;
}

const JOURNAL_KEY = "molarya-lab-journal";
const NOTES_KEY = "molarya-lab-notes";
const MAX_CONTENTS = 6;
const vesselOrder: Vessel[] = ["tube", "flask", "round", "beaker", "dish"];
const vesselIcons: Record<Vessel, typeof FlaskConical> = {
  tube: TestTube,
  flask: FlaskConical,
  round: FlaskRound,
  beaker: Beaker,
  dish: Droplet,
};
const catalogCategories = ["Idishlar", "Kislotalar", "Asoslar", "Tuzlar", "Metallar", "Indikatorlar", "Suv"] as const;

const bottleStyles: Record<Substance["category"], string> = {
  Kislotalar: "from-rose-200 to-rose-300",
  Asoslar: "from-emerald-200 to-emerald-300",
  Tuzlar: "from-sky-200 to-sky-300",
  Indikatorlar: "from-violet-200 to-violet-300",
  Metallar: "from-zinc-200 to-zinc-300",
  Suv: "from-cyan-100 to-cyan-200",
  Mahsulot: "from-slate-200 to-slate-300",
};

const blockStyles: Record<Block, string> = {
  s: "bg-rose-300",
  d: "bg-amber-200",
  p: "bg-sky-300",
  noble: "bg-indigo-300",
  f: "bg-violet-300",
};

const modes: { id: Mode; label: string; hint: string }[] = [
  { id: "demo", label: "Namoyish", hint: "Namoyish: tajriba bosqichma-bosqich avtomatik bajariladi." },
  { id: "practice", label: "Amaliyot", hint: "Amaliyot: mos asboblardan foydalanib, qurilmani yig‘ing." },
  { id: "free", label: "Erkin", hint: "Erkin: istalgan moddalarni aralashtirib ko‘ring." },
  { id: "exam", label: "Baholash", hint: "Baholash: bosqichlar yashirilgan — tajribani mustaqil bajaring." },
];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); data just won't persist.
  }
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function VirtualLab({ initialScenario }: { initialScenario?: string }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const demoToken = React.useRef(0);

  const [scenarioId, setScenarioId] = React.useState(
    scenarios.some((s) => s.id === initialScenario) ? initialScenario! : "reagents"
  );
  const [mode, setMode] = React.useState<Mode>(initialScenario === "free" ? "free" : "practice");
  const [hints, setHints] = React.useState<Hints>("short");
  const [guided, setGuided] = React.useState(true);
  const [tool, setTool] = React.useState<Tool>("select");
  const [leftTab, setLeftTab] = React.useState<LeftTab>("equipment");
  const [rightTab, setRightTab] = React.useState<RightTab>("guide");
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  const [catalogCategory, setCatalogCategory] = React.useState<(typeof catalogCategories)[number]>("Idishlar");
  const [dialog, setDialog] = React.useState<LabDialog>(null);

  const [vessel, setVessel] = React.useState<Vessel | null>(null);
  const [contents, setContents] = React.useState<string[]>([]);
  const [undoStack, setUndoStack] = React.useState<{ vessel: Vessel | null; contents: string[] }[]>([]);
  const [heated, setHeated] = React.useState(false);
  const [warm, setWarm] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);
  const [lastRun, setLastRun] = React.useState<{ performed: Reaction[] } | null>(null);
  const [running, setRunning] = React.useState(false);
  const [demoPlaying, setDemoPlaying] = React.useState(false);
  const [gas, setGas] = React.useState(false);
  const [selected, setSelected] = React.useState<Selection>(null);
  const [zoom, setZoom] = React.useState(100);
  const [message, setMessage] = React.useState<string | null>(null);
  const [mistakes, setMistakes] = React.useState(0);
  const [verdict, setVerdict] = React.useState<{ ok: boolean; text: string } | null>(null);
  const [journal, setJournal] = React.useState<JournalEntry[]>([]);
  const [notes, setNotes] = React.useState("");

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const steps = scenarioSteps(scenario);
  const labState: LabState = { vessel: vessel ?? "tube", contents, heated, history };
  const doneSteps = vessel ? steps.map((step) => step.done(labState)) : steps.map(() => false);
  const completed = doneSteps.filter(Boolean).length;
  const nextStepIndex = doneSteps.indexOf(false);
  const busy = running || demoPlaying;

  React.useEffect(() => {
    if (!gas) return;
    const timer = window.setTimeout(() => setGas(false), 4500);
    return () => window.clearTimeout(timer);
  }, [gas]);

  // Stop a running demo when the component unmounts.
  React.useEffect(() => () => void (demoToken.current += 1), []);

  // What guided mode points at next.
  const guideTarget: { kind: "vessel" | "reagent"; id: string } | null = (() => {
    if (!guided || mode === "exam" || mode === "free" || scenario.targets.length === 0) return null;
    if (scenario.vessel && vessel !== scenario.vessel && !history.includes(scenario.targets[0])) {
      return { kind: "vessel", id: scenario.vessel };
    }
    const reagent = scenario.reagents.find((id) => !contents.includes(id) && !history.includes(scenario.targets[0]));
    return reagent ? { kind: "reagent", id: reagent } : null;
  })();

  function snapshot() {
    setUndoStack((stack) => [...stack.slice(-19), { vessel, contents }]);
  }

  function resetLab() {
    demoToken.current += 1;
    setDemoPlaying(false);
    setVessel(null);
    setContents([]);
    setUndoStack([]);
    setHeated(false);
    setWarm(false);
    setHistory([]);
    setLastRun(null);
    setRunning(false);
    setGas(false);
    setSelected(null);
    setMistakes(0);
    setVerdict(null);
    setMessage(null);
  }

  function selectScenario(id: string) {
    resetLab();
    setScenarioId(id);
    setMode(id === "free" ? "free" : mode === "free" ? "practice" : mode);
    setRightTab("guide");
  }

  function placeVessel(id: Vessel) {
    if (busy) return;
    if (vessel !== id) snapshot();
    setVessel(id);
    setSelected({ kind: "vessel", id });
    setMessage(`${vesselInfo[id].name} stolga qo‘yildi.`);
  }

  function addReagent(id: string, via: Tool | "auto" = "auto") {
    if (busy) return;
    const s = substances[id];
    if (!vessel) {
      setMessage("Avval idish tanlang: “Jihozlar” yoki “Tezkor kirish”dan.");
      return;
    }
    if (via === "pipette" && s.state === "s") {
      setMistakes((m) => m + 1);
      setMessage(`${s.formula} — qattiq modda. Uni shpatel bilan oling.`);
      return;
    }
    if (via === "spatula" && s.state !== "s") {
      setMistakes((m) => m + 1);
      setMessage(`${s.formula} — eritma. Uni pipetka bilan qo‘shing.`);
      return;
    }
    if (contents.includes(id)) {
      setMessage(`${s.formula} idishda allaqachon bor.`);
      return;
    }
    if (contents.length >= MAX_CONTENTS) {
      setMessage("Idish to‘ldi. Keraksiz moddani olib tashlang yoki idishni tozalang.");
      return;
    }
    snapshot();
    setContents([...contents, id]);
    setVerdict(null);
    setMessage(`${s.formula} ${vesselInfo[vessel].name.toLowerCase()}ga qo‘shildi.`);
  }

  function onBottleClick(id: string) {
    if (tool === "pipette" || tool === "spatula") return addReagent(id, tool);
    if (tool === "tongs") {
      setMessage("Qisqich idishdagi qattiq moddani olish uchun. Idishdagi moddani tanlang.");
      return;
    }
    setSelected({ kind: "reagent", id });
    setMessage(`${substances[id].formula} tanlandi — pipetka yoki shpatel bilan qo‘shing.`);
  }

  function removeFromVessel(id: string) {
    if (busy) return;
    snapshot();
    setContents(contents.filter((c) => c !== id));
    setSelected(null);
    setMessage(`${substances[id].formula} idishdan olib tashlandi.`);
  }

  function onContentClick(id: string) {
    if (tool === "tongs") {
      if (substances[id].state !== "s") {
        setMistakes((m) => m + 1);
        setMessage("Qisqich bilan faqat qattiq moddani olish mumkin.");
        return;
      }
      return removeFromVessel(id);
    }
    setSelected({ kind: "content", id });
    setMessage(`Idishdagi ${substances[id].formula} tanlandi.`);
  }

  function removeSelected() {
    if (selected?.kind === "content") return removeFromVessel(selected.id);
    if (selected?.kind === "vessel" && vessel) {
      snapshot();
      setVessel(null);
      setContents([]);
      setHeated(false);
      setSelected(null);
      setMessage("Idish stoldan olib tashlandi.");
      return;
    }
    setMessage("Olib tashlash uchun idishdagi modda yoki idishni tanlang.");
  }

  function clearVessel() {
    if (busy) return;
    snapshot();
    setContents([]);
    setHeated(false);
    setWarm(false);
    setGas(false);
    setSelected(null);
    setMessage("Idish tozalandi.");
  }

  function undo() {
    const previous = undoStack.at(-1);
    if (!previous || busy) return;
    setUndoStack(undoStack.slice(0, -1));
    setVessel(previous.vessel);
    setContents(previous.contents);
    setMessage("Oxirgi amal bekor qilindi.");
  }

  function toggleHeat() {
    if (busy) return;
    if (!vessel) {
      setMessage("Qizdirish uchun avval idish qo‘ying.");
      return;
    }
    setHeated(!heated);
    setMessage(heated ? "Qizdirgich o‘chirildi." : "Qizdirgich yoqildi.");
  }

  function commitRun(result: ReactionRun) {
    setLastRun({ performed: result.performed });
    setRightTab("result");
    if (result.performed.length === 0) {
      if (mode !== "free") setMistakes((m) => m + 1);
      setMessage("Reaksiya kuzatilmadi.");
      return;
    }
    setContents(result.contents);
    setHistory((h) => [...h, ...result.performed.map((r) => r.id)]);
    if (result.performed.some((r) => r.products.some((p) => substances[p].state === "g"))) setGas(true);
    if (result.performed.some((r) => r.type === "Neytrallanish" || r.id === "magnesium-hcl")) setWarm(true);
    setMessage(result.performed.at(-1)!.observation);

    const entries = result.performed.map((r) => ({ at: new Date().toISOString(), equation: r.equation, scenario: scenario.title }));
    const next = [...entries.reverse(), ...readStorage<JournalEntry[]>(JOURNAL_KEY, [])].slice(0, 30);
    setJournal(next);
    writeStorage(JOURNAL_KEY, next);
  }

  function startReaction() {
    if (busy) return;
    if (!vessel || contents.length === 0) {
      setMessage("Idishga reaktiv qo‘shing, so‘ng reaksiyani boshlang.");
      return;
    }
    snapshot();
    setRunning(true);
    window.setTimeout(() => {
      setRunning(false);
      commitRun(runReactions(contents, heated));
    }, 900);
  }

  async function playDemo() {
    if (scenario.targets.length === 0) {
      setMessage("Namoyish uchun ssenariy tanlang.");
      return;
    }
    resetLab();
    const token = ++demoToken.current;
    const alive = () => demoToken.current === token;
    setDemoPlaying(true);
    setRightTab("guide");

    const target = scenario.vessel ?? "beaker";
    await wait(500);
    if (!alive()) return;
    setVessel(target);
    setMessage(`${vesselInfo[target].name} stolga qo‘yildi.`);

    let current: string[] = [];
    for (const id of scenario.reagents) {
      await wait(900);
      if (!alive()) return;
      current = [...current, id];
      setContents(current);
      setMessage(`${substances[id].formula} qo‘shildi.`);
    }

    let isHeated = false;
    for (let pass = 0; pass < 2; pass++) {
      await wait(800);
      if (!alive()) return;
      setRunning(true);
      await wait(900);
      if (!alive()) return;
      setRunning(false);
      const result = runReactions(current, isHeated);
      current = result.contents;
      commitRun(result);
      if (!scenario.heat || isHeated) break;
      await wait(1400);
      if (!alive()) return;
      isHeated = true;
      setHeated(true);
      setRightTab("guide");
      setMessage("Qizdirgich yoqildi.");
    }
    setDemoPlaying(false);
  }

  function chooseMode(next: Mode) {
    setVerdict(null);
    if (next === "free") {
      selectScenario("free");
      setMode("free");
      return;
    }
    if (scenario.id === "free") {
      resetLab();
      setScenarioId("reagents");
    }
    setMode(next);
    if (next === "demo") void playDemo();
  }

  function checkResult() {
    if (scenario.targets.length === 0) {
      setVerdict(
        history.length > 0
          ? { ok: true, text: `Erkin rejimda ${history.length} ta reaksiya bajarildi. Natijalar jurnalda saqlandi.` }
          : { ok: false, text: "Hali reaksiya bajarilmadi." }
      );
      return;
    }
    const done = scenario.targets.every((t) => history.includes(t));
    if (mode === "exam") {
      const score = Math.max(0, Math.round((completed / steps.length) * 100) - mistakes * 10);
      setVerdict({ ok: done, text: `Baho: ${score}/100. Bajarilgan bosqichlar: ${completed}/${steps.length}, xatolar: ${mistakes}.` });
      return;
    }
    setVerdict(
      done
        ? { ok: true, text: "To‘g‘ri! Tajriba muvaffaqiyatli bajarildi — kuzatuvni tenglama bilan solishtiring." }
        : { ok: false, text: `Hali tugamadi. Keyingi qadam: ${steps[nextStepIndex]?.label ?? "reaksiyani boshlang"}.` }
    );
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  }

  const temperature = heated ? 85 : warm ? 29 : 22;
  const ph = estimatePh(contents);
  const volume = contents.filter((id) => ["aq", "l"].includes(substances[id].state)).length * 10;
  const statusText =
    message ??
    (guided && nextStepIndex >= 0 && mode !== "exam" && mode !== "free"
      ? `Keyingi qadam: ${steps[nextStepIndex].label}`
      : "Reaktiv tanlang yoki idishni stolga qo‘ying");
  const showSteps = mode !== "exam" && hints !== "none";

  const selectedLabel =
    selected?.kind === "vessel"
      ? { title: vesselInfo[selected.id].name, text: vesselInfo[selected.id].description }
      : selected
        ? {
            title: `${substances[selected.id].formula} — ${substances[selected.id].name}`,
            text: `${substances[selected.id].category} · ${substances[selected.id].state === "s" ? "qattiq modda (shpatel)" : "eritma (pipetka)"}${
              selected.kind === "content" ? " · idishda" : ""
            }`,
          }
        : null;

  const panel = "rounded-2xl border border-white/10 bg-white/[0.03]";
  const toolButton = (active: boolean) =>
    cn(
      "flex flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-[12px] font-semibold transition-colors disabled:opacity-40",
      active ? "border-teal-400/50 bg-teal-500/80 text-[#04211f]" : "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08]"
    );
  const sectionLabel = "text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400";

  return (
    <div ref={rootRef} className="flex min-h-dvh flex-col bg-[#0b1622] text-slate-100 lg:h-dvh lg:overflow-hidden">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/10 bg-[#0d1a2a] px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white">
            <FlaskConical className="size-4.5 text-[#155EEF]" aria-hidden="true" />
          </span>
          <span className="text-[17px] font-bold">Molarya</span>
        </Link>
        <nav aria-label="Laboratoriya navigatsiyasi" className="mx-auto flex min-w-0 items-center gap-1 overflow-x-auto text-[14px] font-semibold">
          <Link href="/periodic-table" className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Davriy jadval</Link>
          <button type="button" onClick={() => setDialog("solubility")} className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Eruvchanlik</button>
          <span className="whitespace-nowrap border-b-2 border-teal-400 px-3 py-2 text-white" aria-current="page">Laboratoriya</span>
          <Link href="/molecules" className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Molekulalar</Link>
          <button type="button" onClick={() => setDialog("reactions")} className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Reaksiyalar</button>
          <Link href="/courses" className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Kurslar</Link>
          <button type="button" onClick={() => setDialog("guide")} className="whitespace-nowrap rounded-lg px-3 py-2 text-slate-300 hover:text-white">Qo‘llanma</button>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setDialog("guide")} aria-label="Yordam" className="flex size-8 items-center justify-center rounded-full bg-[#155EEF] text-white">
            <HelpCircle className="size-4.5" aria-hidden="true" />
          </button>
          <Link href="/login" className="hidden text-[15px] font-semibold sm:block">Kirish</Link>
        </div>
      </header>

      <div
        className={cn(
          "grid min-h-0 flex-1 grid-cols-1",
          leftOpen && rightOpen && "lg:grid-cols-[300px_minmax(0,1fr)_340px]",
          leftOpen && !rightOpen && "lg:grid-cols-[300px_minmax(0,1fr)_56px]",
          !leftOpen && rightOpen && "lg:grid-cols-[56px_minmax(0,1fr)_340px]",
          !leftOpen && !rightOpen && "lg:grid-cols-[56px_minmax(0,1fr)_56px]"
        )}
      >
        {/* Left panel */}
        <aside className="order-2 min-h-0 overflow-y-auto border-white/10 bg-[#0d1a2a] lg:order-1 lg:border-r">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 p-3">
            {leftOpen ? <h2 className="pl-1 text-[15px] font-bold">Laboratoriya</h2> : null}
            <button
              type="button"
              onClick={() => setLeftOpen(!leftOpen)}
              aria-label={leftOpen ? "Panelni yig‘ish" : "Panelni ochish"}
              className="hidden size-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/[0.07] lg:flex"
            >
              {leftOpen ? <PanelLeftClose className="size-4" aria-hidden="true" /> : <PanelLeftOpen className="size-4" aria-hidden="true" />}
            </button>
          </div>

          {leftOpen ? (
            <div className="space-y-4 p-3">
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ["equipment", "Jihozlar", FlaskConical],
                    ["reagents", "Reaktivlar", Beaker],
                    ["heating", "Qizdirish", Flame],
                    ["measure", "O‘lchashlar", Gauge],
                    ["notes", "Qaydlar", NotebookPen],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      if (id === "notes") setNotes(readStorage(NOTES_KEY, ""));
                      setLeftTab(id);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors",
                      leftTab === id ? "bg-teal-500/80 text-[#04211f]" : "text-slate-300 hover:bg-white/[0.06]"
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>

              <div className={cn(panel, "space-y-3 p-3")}>
                <div>
                  <p className={sectionLabel}>Sahna amallari</p>
                  <p className="mt-0.5 text-[13.5px] font-semibold">Stoldagi jihozni tanlang</p>
                </div>
                <p className={sectionLabel}>Ko‘rish</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button type="button" onClick={() => setTool("select")} className={toolButton(tool === "select")}>
                    <MousePointer2 className="size-4" aria-hidden="true" />
                    Tanlash
                  </button>
                  <button type="button" onClick={() => setZoom((z) => Math.min(150, z + 10))} className={toolButton(false)}>
                    <ZoomIn className="size-4" aria-hidden="true" />
                    Yaqinroq
                  </button>
                  <button type="button" onClick={() => setZoom((z) => Math.max(60, z - 10))} className={toolButton(false)}>
                    <ZoomOut className="size-4" aria-hidden="true" />
                    Uzoqroq
                  </button>
                </div>
                <p className={sectionLabel}>Tajriba asboblari</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button type="button" onClick={() => setTool("pipette")} className={toolButton(tool === "pipette")}>
                    <Droplet className="size-4" aria-hidden="true" />
                    Pipetka
                  </button>
                  <button type="button" onClick={() => setTool("spatula")} className={toolButton(tool === "spatula")}>
                    <Shovel className="size-4" aria-hidden="true" />
                    Shpatel
                  </button>
                  <button type="button" onClick={() => setTool("tongs")} className={toolButton(tool === "tongs")}>
                    <Grip className="size-4" aria-hidden="true" />
                    Qisqich
                  </button>
                  <button type="button" onClick={() => setLeftTab("measure")} className={toolButton(leftTab === "measure")}>
                    <Gauge className="size-4" aria-hidden="true" />
                    O‘lchash
                  </button>
                  <button type="button" onClick={toggleHeat} disabled={busy} className={toolButton(heated)}>
                    <Flame className="size-4" aria-hidden="true" />
                    Qizdirish
                  </button>
                </div>
                <p className={sectionLabel}>Boshqarish</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button type="button" onClick={clearVessel} disabled={busy} className={toolButton(false)}>
                    <Eraser className="size-4" aria-hidden="true" />
                    Tozalash
                  </button>
                  <button type="button" onClick={removeSelected} disabled={busy} className={toolButton(false)}>
                    <Trash2 className="size-4" aria-hidden="true" />
                    Olib tashlash
                  </button>
                  <button type="button" onClick={undo} disabled={busy || undoStack.length === 0} className={toolButton(false)}>
                    <Undo2 className="size-4" aria-hidden="true" />
                    Bekor qilish
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-teal-400/25 bg-teal-400/[0.07] p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-300">Tanlangan jihoz</p>
                <p className="mt-1 text-[14px] font-semibold">{selectedLabel?.title ?? "Jihoz tanlanmagan"}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-400">
                  {selectedLabel?.text ?? "Katalogdan yoki stoldan jihozni tanlang; mavjud amallar shu yerda ko‘rinadi."}
                </p>
                {selected?.kind === "reagent" ? (
                  <button
                    type="button"
                    onClick={() => addReagent(selected.id)}
                    disabled={busy}
                    className="mt-2.5 w-full rounded-lg bg-teal-500/80 py-2 text-[13px] font-semibold text-[#04211f] hover:bg-teal-400"
                  >
                    Idishga qo‘shish
                  </button>
                ) : null}
                {selected?.kind === "content" ? (
                  <button
                    type="button"
                    onClick={() => removeFromVessel(selected.id)}
                    disabled={busy}
                    className="mt-2.5 w-full rounded-lg border border-white/15 py-2 text-[13px] font-semibold hover:bg-white/[0.07]"
                  >
                    Idishdan olib tashlash
                  </button>
                ) : null}
              </div>

              {leftTab === "equipment" ? (
                <div>
                  <h3 className="text-[17px] font-bold">Jihozlar</h3>
                  <p className="mt-1 text-[12.5px] text-slate-400">Idishni stolga qo‘ying. Asosiy idish markaziy joyni egallaydi.</p>
                  <ul className="mt-3 space-y-2">
                    {vesselOrder.map((id) => {
                      const Icon = vesselIcons[id];
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => placeVessel(id)}
                            className={cn(
                              panel,
                              "flex w-full items-center gap-3 p-3 text-left hover:bg-white/[0.06]",
                              vessel === id && "border-teal-400/50",
                              guideTarget?.kind === "vessel" && guideTarget.id === id && "ring-2 ring-amber-300/70"
                            )}
                          >
                            <Icon className="size-5 shrink-0 text-sky-300" aria-hidden="true" />
                            <span className="min-w-0">
                              <span className="block text-[13.5px] font-semibold">{vesselInfo[id].name}</span>
                              <span className="block text-[12px] leading-snug text-slate-400">{vesselInfo[id].description}</span>
                            </span>
                            <span className="ml-auto shrink-0 text-[11.5px] font-semibold text-teal-300">
                              {vessel === id ? "stolda" : scenario.vessel === id ? "kerakli" : "qo‘yish"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {leftTab === "reagents" ? (
                <div>
                  <h3 className="text-[17px] font-bold">Reaktivlar</h3>
                  <p className="mt-1 text-[12.5px] text-slate-400">Bosing — idishga qo‘shiladi ({contents.length}/{MAX_CONTENTS}).</p>
                  <ul className="mt-3 space-y-1.5">
                    {shelf.map((id) => (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => addReagent(id)}
                          disabled={busy}
                          className={cn(panel, "flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-white/[0.06]", contents.includes(id) && "border-teal-400/40")}
                        >
                          <span className="w-16 shrink-0 text-[13.5px] font-semibold">{substances[id].formula}</span>
                          <span className="min-w-0 flex-1 truncate text-[12px] text-slate-400">{substances[id].name}</span>
                          <Plus className="size-4 shrink-0 text-teal-300" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {leftTab === "heating" ? (
                <div className="space-y-3">
                  <h3 className="text-[17px] font-bold">Qizdirish</h3>
                  <button
                    type="button"
                    onClick={toggleHeat}
                    disabled={busy}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold",
                      heated ? "bg-orange-500/80 text-white" : "border border-white/10 hover:bg-white/[0.06]"
                    )}
                  >
                    <Flame className="size-4" aria-hidden="true" />
                    {heated ? "Spirt lampasini o‘chirish" : "Spirt lampasini yoqish"}
                  </button>
                  <p className="text-[13px] text-slate-400">Harorat: <span className="font-semibold text-white">{temperature} °C</span></p>
                  <p className="text-[12.5px] leading-relaxed text-slate-400">
                    Parchalanish reaksiyalari (masalan, Cu(OH)₂ yoki CaCO₃) faqat qizdirilganda boradi.
                  </p>
                </div>
              ) : null}

              {leftTab === "measure" ? (
                <div>
                  <h3 className="text-[17px] font-bold">O‘lchashlar</h3>
                  <dl className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      ["Harorat", `${temperature} °C`],
                      ["pH", ph === null ? "—" : String(ph)],
                      ["Hajm", `${volume} ml`],
                      ["Moddalar", String(contents.length)],
                    ].map(([label, value]) => (
                      <div key={label} className={cn(panel, "p-3")}>
                        <dt className="text-[11.5px] text-slate-400">{label}</dt>
                        <dd className="mt-0.5 text-[18px] font-bold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[12px] text-slate-500">pH — maktab darajasidagi taxminiy qiymat.</p>
                </div>
              ) : null}

              {leftTab === "notes" ? (
                <div>
                  <h3 className="text-[17px] font-bold">Qaydlar</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      writeStorage(NOTES_KEY, e.target.value);
                    }}
                    rows={8}
                    placeholder="Kuzatuvlaringizni yozing — ular shu brauzerda saqlanadi."
                    className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-[#0b1622] p-3 text-[13.5px] text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </aside>

        {/* Scene */}
        <section className="order-1 flex min-h-0 flex-col lg:order-2">
          {/* Wall: shelf and poster */}
          <div className="relative flex shrink-0 gap-6 bg-gradient-to-b from-[#59636f] to-[#424b56] px-5 pb-3 pt-5">
            <div className="min-w-0">
              <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                {shelf.slice(0, 12).map((id) => {
                  const s = substances[id];
                  return (
                    <div key={id} className="relative w-[78px]">
                      <span className="absolute left-1/2 top-0 h-3 w-7 -translate-x-1/2 rounded-t-md bg-[#151a21]" aria-hidden="true" />
                      <button
                        type="button"
                        onClick={() => onBottleClick(id)}
                        aria-label={`${s.formula} — ${s.name}`}
                        className={cn(
                          "mt-2.5 flex h-[74px] w-full flex-col items-center justify-center rounded-xl bg-gradient-to-b p-1.5 shadow-[0_6px_14px_rgba(0,0,0,.25)] transition-transform hover:-translate-y-0.5",
                          bottleStyles[s.category],
                          contents.includes(id) && "ring-2 ring-teal-300",
                          selected?.kind === "reagent" && selected.id === id && "ring-2 ring-white",
                          guideTarget?.kind === "reagent" && guideTarget.id === id && "ring-2 ring-amber-300 animate-pulse"
                        )}
                      >
                        <span className="w-full rounded-md bg-white/90 px-1 py-1.5 text-center">
                          <span className="block truncate text-[12px] font-bold text-slate-900">{s.formula}</span>
                          <span className="block truncate text-[8.5px] text-slate-500">{s.category}</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => addReagent(id)}
                        aria-label={`${s.formula} qo‘shish`}
                        className="absolute -right-1.5 top-0 flex size-6 items-center justify-center rounded-full bg-teal-400 text-[#04211f] shadow hover:bg-teal-300"
                      >
                        <Plus className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#2b323b]" aria-hidden="true" />
            </div>

            <div className="ml-auto hidden w-[clamp(220px,32%,380px)] shrink-0 self-start rounded-md bg-[#f5f1e8] p-3 shadow-[0_10px_24px_rgba(0,0,0,.3)] xl:block">
              <p className="text-center text-[12px] font-bold text-slate-800">Kimyoviy elementlar davriy jadvali</p>
              <div className="mt-2 grid grid-cols-[repeat(18,minmax(0,1fr))] gap-[2px]">
                {posterCells.map((cell) => (
                  <span
                    key={cell.z}
                    title={`${cell.z} ${cell.symbol}`}
                    style={{ gridRow: cell.row >= 9 ? cell.row + 1 : cell.row, gridColumn: cell.column }}
                    className={cn("flex aspect-square items-center justify-center rounded-[2px] text-[7px] font-bold text-slate-800", blockStyles[cell.block])}
                  >
                    {cell.symbol}
                  </span>
                ))}
                <span style={{ gridRow: 8, gridColumn: 1 }} className="h-1" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Control strip */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-y border-white/10 bg-[#101e2d] px-3 py-2">
            <div className="flex items-center rounded-xl border border-white/10">
              <button type="button" onClick={() => setZoom((z) => Math.max(60, z - 10))} aria-label="Kichraytirish" className="flex size-9 items-center justify-center hover:bg-white/[0.07]">
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <span className="w-12 text-center text-[13px] font-semibold">{zoom}%</span>
              <button type="button" onClick={() => setZoom((z) => Math.min(150, z + 10))} aria-label="Kattalashtirish" className="flex size-9 items-center justify-center hover:bg-white/[0.07]">
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
            <button type="button" onClick={() => setZoom(100)} className="rounded-xl border border-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/[0.07]">
              Qurilmani to‘liq ko‘rsatish
            </button>
            <div className="ml-auto flex items-center gap-1 rounded-xl border border-white/10 p-1">
              <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Boshqarish</span>
              <button
                type="button"
                onClick={() => setGuided(true)}
                className={cn("rounded-lg px-2.5 py-1 text-[12.5px] font-semibold", guided ? "bg-teal-400 text-[#04211f]" : "text-slate-300")}
              >
                Yo‘riqnoma bilan
              </button>
              <button
                type="button"
                onClick={() => setGuided(false)}
                className={cn("rounded-lg px-2.5 py-1 text-[12.5px] font-semibold", !guided ? "bg-teal-400 text-[#04211f]" : "text-slate-300")}
              >
                Qo‘lda
              </button>
            </div>
            <button type="button" onClick={toggleFullscreen} aria-label="To‘liq ekran" className="flex size-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/[0.07]">
              <Maximize className="size-4" aria-hidden="true" />
            </button>
          </div>

          {/* Bench */}
          <div className="relative flex min-h-[420px] flex-1 flex-col items-center justify-end overflow-hidden bg-[radial-gradient(ellipse_at_50%_80%,#26313d_0%,#141c25_70%)] px-4 pb-4 pt-16">
            <p
              className="absolute left-1/2 top-3 z-10 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-teal-400/30 bg-[#0f2a2c]/90 px-4 py-2 text-center text-[13px] font-medium text-teal-100"
              aria-live="polite"
            >
              {statusText}
            </p>
            <div className="flex min-h-[200px] w-full flex-1 items-end justify-center" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "50% 100%" }}>
              {vessel ? (
                <LabVessel
                  vessel={vessel}
                  contents={contents}
                  heated={heated}
                  bubbling={gas || running}
                  shaking={running}
                  className="h-full max-h-[340px] w-auto"
                />
              ) : (
                <div className="mb-16 rounded-2xl border border-dashed border-white/20 px-6 py-8 text-center text-[13.5px] text-slate-400">
                  Stol bo‘sh.
                  <br />
                  Idishni “Jihozlar” yoki “Tezkor kirish”dan qo‘ying.
                </div>
              )}
            </div>

            {contents.length > 0 ? (
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {contents.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onContentClick(id)}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[12.5px] font-medium",
                      selected?.kind === "content" && selected.id === id ? "bg-white text-slate-900" : "bg-white/10 text-slate-200 hover:bg-white/20"
                    )}
                  >
                    {substances[id].formula}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={startReaction}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-[14px] font-semibold text-[#04211f] hover:bg-teal-300 disabled:opacity-50"
              >
                <Play className="size-4" aria-hidden="true" />
                {running ? "Reaksiya ketmoqda…" : demoPlaying ? "Namoyish…" : "Reaksiyani boshlash"}
              </button>
              <button
                type="button"
                onClick={toggleHeat}
                disabled={busy}
                aria-pressed={heated}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[14px] font-medium",
                  heated ? "border-orange-400/60 bg-orange-400/15 text-orange-200" : "border-white/10 hover:bg-white/[0.07]"
                )}
              >
                <Flame className="size-4" aria-hidden="true" />
                {heated ? "Qizdirish yoqilgan" : "Qizdirish"}
              </button>
            </div>

            {/* Quick access */}
            <div className="mt-4 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0f1b29]/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,.3)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[14.5px] font-bold">Tezkor kirish</p>
                  <p className="text-[12px] text-slate-400">
                    {catalogCategory} · {catalogCategory === "Idishlar" ? vesselOrder.length : shelf.filter((id) => substances[id].category === catalogCategory).length} ta · Stolda: {vessel ? 1 : 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCatalogOpen(true);
                      setLeftOpen(true);
                      setLeftTab("reagents");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/[0.07]"
                  >
                    <BookOpen className="size-4" aria-hidden="true" />
                    Katalogni ochish
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatalogOpen(!catalogOpen)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-[13px] font-semibold hover:bg-white/[0.07]"
                  >
                    {catalogOpen ? "Yig‘ish" : "Yoyish"}
                  </button>
                </div>
              </div>
              {catalogOpen ? (
                <>
                  <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                    {catalogCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCatalogCategory(category)}
                        className={cn(
                          "whitespace-nowrap rounded-lg px-3 py-2 text-[12.5px] font-semibold",
                          catalogCategory === category ? "bg-teal-400 text-[#04211f]" : "border border-white/10 text-slate-300 hover:bg-white/[0.06]"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {catalogCategory === "Idishlar"
                      ? vesselOrder.map((id) => {
                          const Icon = vesselIcons[id];
                          return (
                            <div key={id} className={cn(panel, "flex w-[200px] shrink-0 items-center gap-2.5 p-2.5")}>
                              <Icon className="size-7 shrink-0 text-sky-300" aria-hidden="true" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold">{vesselInfo[id].name}</p>
                                <p className="text-[11.5px] text-slate-400">{scenario.vessel === id ? "kerakli" : "idish"}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => placeVessel(id)}
                                aria-label={`${vesselInfo[id].name}ni qo‘yish`}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-[#04211f] hover:bg-teal-300"
                              >
                                <Plus className="size-4" strokeWidth={3} aria-hidden="true" />
                              </button>
                            </div>
                          );
                        })
                      : shelf
                          .filter((id) => substances[id].category === catalogCategory)
                          .map((id) => (
                            <div key={id} className={cn(panel, "flex w-[200px] shrink-0 items-center gap-2.5 p-2.5")}>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold">{substances[id].formula}</p>
                                <p className="truncate text-[11.5px] text-slate-400">{substances[id].name}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => addReagent(id)}
                                aria-label={`${substances[id].formula} qo‘shish`}
                                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-[#04211f] hover:bg-teal-300"
                              >
                                <Plus className="size-4" strokeWidth={3} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {/* Right panel */}
        <aside className="order-3 flex min-h-0 flex-col border-white/10 bg-[#0d1a2a] lg:border-l">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 p-3">
            {rightOpen ? <h2 className="pl-1 text-[15px] font-bold">Tajriba jarayoni</h2> : null}
            <button
              type="button"
              onClick={() => setRightOpen(!rightOpen)}
              aria-label={rightOpen ? "Panelni yig‘ish" : "Panelni ochish"}
              className="hidden size-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/[0.07] lg:flex"
            >
              {rightOpen ? <PanelRightClose className="size-4" aria-hidden="true" /> : <PanelRightOpen className="size-4" aria-hidden="true" />}
            </button>
          </div>

          {rightOpen ? (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
                <div className={cn(panel, "p-4")}>
                  <p className={sectionLabel}>Joriy ssenariy</p>
                  <p className="mt-1 text-[17px] font-bold">{scenario.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-teal-400/40 px-2.5 py-0.5 text-[12px] font-semibold text-teal-200">{scenario.tag}</span>
                    <select
                      value={scenario.id}
                      onChange={(e) => selectScenario(e.target.value)}
                      aria-label="Ssenariyni almashtirish"
                      className="ml-auto rounded-lg border border-white/10 bg-[#0b1622] px-2 py-1 text-[12.5px] text-slate-300"
                    >
                      {scenarios.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div role="tablist" className="grid grid-cols-4 gap-1 rounded-xl border border-white/10 p-1">
                  {(
                    [
                      ["guide", "Yo‘riqnoma"],
                      ["conditions", "Sharoitlar"],
                      ["result", "Natija"],
                      ["journal", "Jurnal"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={rightTab === id}
                      onClick={() => {
                        if (id === "journal") setJournal(readStorage<JournalEntry[]>(JOURNAL_KEY, []));
                        setRightTab(id);
                      }}
                      className={cn(
                        "rounded-lg py-2 text-[12.5px] font-semibold",
                        rightTab === id ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {rightTab === "guide" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {modes.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => chooseMode(m.id)}
                          disabled={demoPlaying && m.id === "demo"}
                          className={cn(
                            "rounded-xl py-2.5 text-[15px] font-bold transition-colors",
                            mode === m.id ? "bg-[#155EEF] text-white" : "border border-white/10 hover:bg-white/[0.06]"
                          )}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <p className="border-l-2 border-teal-400 pl-3 text-[13px] text-slate-300">{modes.find((m) => m.id === mode)!.hint}</p>
                    {mode === "demo" && !demoPlaying ? (
                      <button type="button" onClick={() => void playDemo()} className="w-full rounded-xl border border-white/10 py-2 text-[13px] font-semibold hover:bg-white/[0.06]">
                        Namoyishni qayta ko‘rish
                      </button>
                    ) : null}

                    <label className="block">
                      <span className="text-[13px] text-slate-400">Izohlar</span>
                      <select
                        value={hints}
                        onChange={(e) => setHints(e.target.value as Hints)}
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0b1622] px-3 py-2.5 text-[13.5px] text-slate-200"
                      >
                        <option value="short">Qisqa maslahatlar</option>
                        <option value="detailed">Batafsil izohlar</option>
                        <option value="none">Maslahatsiz</option>
                      </select>
                    </label>

                    <div>
                      <h3 className="text-[18px] font-bold">{scenario.title}</h3>
                      <p className="mt-1.5 text-[13.5px] text-slate-300">
                        <span className="font-semibold text-white">Maqsad:</span> {scenario.goal}
                      </p>
                      {scenario.equation ? <p className="mt-2 font-mono text-[13px] text-slate-200">{scenario.equation}</p> : null}
                    </div>

                    {scenario.reagents.length > 0 ? (
                      <div className={cn(panel, "divide-y divide-white/5 text-[13px]")}>
                        <p className={cn(sectionLabel, "px-3 py-2")}>Reaktivlar</p>
                        {scenario.reagents.map((id) => {
                          const ok = contents.includes(id) || history.includes(scenario.targets[0]);
                          return (
                            <p key={id} className="flex items-center gap-2 px-3 py-2">
                              {ok ? <CheckCircle2 className="size-4 text-teal-400" aria-hidden="true" /> : <Circle className="size-4 text-slate-600" aria-hidden="true" />}
                              {substances[id].formula}
                              <span className={cn("ml-auto text-[11px] font-bold uppercase", ok ? "text-teal-300" : "text-amber-300")}>{ok ? "qo‘shildi" : "kerak"}</span>
                            </p>
                          );
                        })}
                        {scenario.vessel ? (
                          <>
                            <p className={cn(sectionLabel, "px-3 py-2")}>Jihoz</p>
                            <p className="flex items-center gap-2 px-3 py-2">
                              {vessel === scenario.vessel ? <CheckCircle2 className="size-4 text-teal-400" aria-hidden="true" /> : <Circle className="size-4 text-slate-600" aria-hidden="true" />}
                              {vesselInfo[scenario.vessel].name}
                              <span className={cn("ml-auto text-[11px] font-bold uppercase", vessel === scenario.vessel ? "text-teal-300" : "text-amber-300")}>
                                {vessel === scenario.vessel ? "stolda" : "kerak"}
                              </span>
                            </p>
                          </>
                        ) : null}
                        <p className={cn(sectionLabel, "px-3 py-2")}>Sharoit</p>
                        <p className="flex items-center gap-2 px-3 py-2">
                          <CheckCircle2 className={cn("size-4", !scenario.heat || heated ? "text-teal-400" : "text-slate-600")} aria-hidden="true" />
                          {scenario.heat ? "Qizdirish kerak" : "Qizdirish talab qilinmaydi"}
                        </p>
                      </div>
                    ) : null}

                    {showSteps ? (
                      <div>
                        <p className={sectionLabel}>Bosqichlar · {completed}/{steps.length}</p>
                        <ol className="mt-2 space-y-2">
                          {steps.map((step, i) => (
                            <li key={step.label} className="flex items-start gap-2.5 text-[13.5px]">
                              {doneSteps[i] ? (
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden="true" />
                              ) : (
                                <Circle className={cn("mt-0.5 size-4 shrink-0", i === nextStepIndex ? "text-amber-300" : "text-slate-600")} aria-hidden="true" />
                              )}
                              <span className={doneSteps[i] ? "text-slate-500 line-through decoration-slate-600" : "text-slate-200"}>{step.label}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}

                    {hints === "detailed" && mode !== "exam" ? (
                      <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-400">
                        {scenario.instructions.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}

                {rightTab === "conditions" ? (
                  <dl className={cn(panel, "divide-y divide-white/5 text-[13.5px]")}>
                    {[
                      ["Idish", vessel ? vesselInfo[vessel].name : "qo‘yilmagan"],
                      ["Qizdirish", heated ? "yoqilgan" : "o‘chirilgan"],
                      ["Harorat", `${temperature} °C`],
                      ["pH", ph === null ? "—" : String(ph)],
                      ["Hajm", `${volume} ml`],
                      ["Tarkib", contents.length ? contents.map((id) => substances[id].formula).join(", ") : "bo‘sh"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 px-3 py-2.5">
                        <dt className="text-slate-400">{label}</dt>
                        <dd className="text-right font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {rightTab === "result" ? (
                  <div className="space-y-3">
                    {!lastRun ? (
                      <p className="text-[13.5px] text-slate-400">Hali reaksiya boshlanmadi. Reaktivlarni qo‘shib, “Reaksiyani boshlash”ni bosing.</p>
                    ) : lastRun.performed.length === 0 ? (
                      <div className={cn(panel, "p-4")}>
                        <p className="text-[15px] font-semibold">Reaksiya kuzatilmadi</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                          Bu moddalar orasida cho‘kma, gaz yoki suv hosil bo‘lmaydi — ionlar eritmada o‘zgarmay qoladi.
                          {!heated ? " Ba’zi reaksiyalar uchun qizdirish kerak." : ""}
                        </p>
                      </div>
                    ) : (
                      lastRun.performed.map((r) => (
                        <div key={r.id} className={cn(panel, "p-4")}>
                          <p className="text-[11.5px] font-bold uppercase tracking-wider text-teal-300">{r.type}</p>
                          <p className="mt-2 font-mono text-[14.5px] text-white">{r.equation}</p>
                          <p className={cn(sectionLabel, "mt-3")}>Kuzatuv</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate-300">{r.observation}</p>
                          {hints !== "none" ? (
                            <>
                              <p className={cn(sectionLabel, "mt-3")}>Nega?</p>
                              <p className="mt-1 text-[13px] leading-relaxed text-slate-300">{r.explanation}</p>
                            </>
                          ) : null}
                        </div>
                      ))
                    )}
                  </div>
                ) : null}

                {rightTab === "journal" ? (
                  journal.length === 0 ? (
                    <p className="text-[13.5px] text-slate-400">Jurnal bo‘sh. Bajarilgan reaksiyalar shu yerda saqlanadi.</p>
                  ) : (
                    <div>
                      <ul className="space-y-2">
                        {journal.map((entry, i) => (
                          <li key={`${entry.at}-${i}`} className={cn(panel, "px-3 py-2.5")}>
                            <p className="font-mono text-[12.5px] text-slate-100">{entry.equation}</p>
                            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-slate-500">
                              <History className="size-3" aria-hidden="true" />
                              {new Date(entry.at).toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" })} · {entry.scenario}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          setJournal([]);
                          writeStorage(JOURNAL_KEY, []);
                        }}
                        className="mt-3 text-[12.5px] text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
                      >
                        Jurnalni tozalash
                      </button>
                    </div>
                  )
                ) : null}

                {verdict ? (
                  <p
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-[13.5px]",
                      verdict.ok ? "border-teal-400/40 bg-teal-400/10 text-teal-100" : "border-amber-400/40 bg-amber-400/10 text-amber-100"
                    )}
                  >
                    {verdict.text}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 border-t border-white/10 p-3">
                <button type="button" onClick={checkResult} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] py-3 text-[14px] font-semibold hover:bg-white/[0.1]">
                  <ClipboardCheck className="size-4" aria-hidden="true" />
                  Natijani tekshirish
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetLab();
                    setMessage("Tajriba qayta boshlandi.");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/40 bg-rose-500/15 py-3 text-[14px] font-semibold text-rose-100 hover:bg-rose-500/25"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Tajribani qayta boshlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setJournal(readStorage<JournalEntry[]>(JOURNAL_KEY, []));
                    setRightTab("journal");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-2.5 text-[13.5px] font-semibold hover:bg-white/[0.05]"
                >
                  <History className="size-4" aria-hidden="true" />
                  Tajribalar tarixi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHints("detailed");
                    setGuided(true);
                    setRightTab("guide");
                  }}
                  className="flex w-full items-center justify-center gap-2 py-1.5 text-[13px] font-semibold text-slate-300 underline underline-offset-4 hover:text-white"
                >
                  <Lightbulb className="size-4" aria-hidden="true" />
                  Maslahatlarni yana ko‘rsatish
                </button>
              </div>
            </>
          ) : null}
        </aside>
      </div>

      <LabDialogs open={dialog} onOpenChange={setDialog} />
    </div>
  );
}
