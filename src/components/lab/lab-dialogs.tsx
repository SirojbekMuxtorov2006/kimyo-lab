import { reactions } from "@/lib/lab/chemistry";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type LabDialog = "solubility" | "reactions" | "guide" | null;

const cations = ["H⁺", "Na⁺", "K⁺", "NH₄⁺", "Mg²⁺", "Ca²⁺", "Ba²⁺", "Zn²⁺", "Cu²⁺", "Fe²⁺", "Fe³⁺", "Pb²⁺", "Ag⁺"];
// One character per cation above: E — eriydi, K — kam eriydi, N — erimaydi, - — mavjud emas / parchalanadi.
const solubility: [string, string][] = [
  ["OH⁻", "-EEENKENNNNN-"],
  ["Cl⁻", "EEEEEEEEEEEKN"],
  ["I⁻", "EEEEEEEE-E-NN"],
  ["NO₃⁻", "EEEEEEEEEEEEE"],
  ["SO₄²⁻", "EEEEEKNEEEENK"],
  ["CO₃²⁻", "-EEENNNNNN-NN"],
];

const cellStyles: Record<string, string> = {
  E: "bg-teal-400/15 text-teal-200",
  K: "bg-amber-400/15 text-amber-200",
  N: "bg-rose-400/15 text-rose-200",
  "-": "text-slate-500",
};

const guide = [
  ["Idish tanlang", "Chap paneldagi “Jihozlar” yoki pastdagi “Tezkor kirish”dan idishni stolga qo‘ying."],
  ["Reaktiv qo‘shing", "Javondagi shisha ustidagi “+” tugmasini bosing yoki shishani tanlab, pipetka (eritma) yoki shpatel (qattiq modda) bilan qo‘shing."],
  ["Sharoitni belgilang", "Kerak bo‘lsa “Qizdirish”ni yoqing. Harorat va pH “O‘lchashlar” bo‘limida ko‘rinadi."],
  ["Reaksiyani boshlang", "“Reaksiyani boshlash” tugmasini bosing va idishdagi o‘zgarishni kuzating."],
  ["Natijani tekshiring", "O‘ng paneldagi “Natija” bo‘limida tenglama, kuzatuv va izohni o‘qing; “Natijani tekshirish” ssenariy bajarilganini baholaydi."],
];

export function LabDialogs({ open, onOpenChange }: { open: LabDialog; onOpenChange: (dialog: LabDialog) => void }) {
  return (
    <Dialog open={open !== null} onOpenChange={(value) => !value && onOpenChange(null)}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto border-white/10 bg-[#0f1e2e] text-slate-100 sm:max-w-3xl">
        {open === "solubility" ? (
          <>
            <DialogHeader>
              <DialogTitle>Eruvchanlik jadvali</DialogTitle>
              <DialogDescription className="text-slate-400">
                Tuz, kislota va asoslarning suvda eruvchanligi (20 °C).
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0.5 text-center text-[12.5px]">
                <thead>
                  <tr>
                    <th />
                    {cations.map((c) => (
                      <th key={c} className="px-1.5 py-1 font-semibold text-slate-300">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {solubility.map(([anion, row]) => (
                    <tr key={anion}>
                      <th className="px-2 py-1 text-left font-semibold text-slate-300">{anion}</th>
                      {[...row].map((value, i) => (
                        <td key={cations[i]} className={cn("rounded px-1.5 py-1.5 font-semibold", cellStyles[value])}>
                          {value === "-" ? "—" : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] text-slate-400">E — eriydi · K — kam eriydi · N — erimaydi · — mavjud emas yoki suvda parchalanadi</p>
          </>
        ) : null}

        {open === "reactions" ? (
          <>
            <DialogHeader>
              <DialogTitle>Reaksiyalar</DialogTitle>
              <DialogDescription className="text-slate-400">
                Laboratoriyada bajarish mumkin bo‘lgan {reactions.length} ta reaksiya.
              </DialogDescription>
            </DialogHeader>
            <ul className="divide-y divide-white/10">
              {reactions.map((r) => (
                <li key={r.id} className="py-3">
                  <p className="font-mono text-[14px] text-white">{r.equation}</p>
                  <p className="mt-1 text-[12.5px] text-slate-400">
                    <span className="text-teal-300">{r.type}</span> · {r.observation}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {open === "guide" ? (
          <>
            <DialogHeader>
              <DialogTitle>Qo‘llanma</DialogTitle>
              <DialogDescription className="text-slate-400">Laboratoriyada tajriba o‘tkazish — besh qadam.</DialogDescription>
            </DialogHeader>
            <ol className="space-y-4">
              {guide.map(([title, text], i) => (
                <li key={title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-[13px] font-bold text-teal-200">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold">{title}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
