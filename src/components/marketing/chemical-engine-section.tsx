"use client";

import { Check, Circle } from "lucide-react";

export function ChemicalEngineSection() {
  return (
    <section id="texnologiya" className="relative overflow-hidden bg-[#030c1e] text-white py-16 lg:py-24">
      {/* Background radial gradient glow & grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Area: 2 Columns */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading, description, callout */}
          <div className="lg:col-span-6 max-w-xl">
            <span className="text-[12px] font-bold tracking-widest text-[#38BDF8] uppercase">
              TAJRIBA QANDAY ISHLAYDI
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              Molarya Chemical Engine
            </h2>

            <p className="mt-3 text-base sm:text-lg font-bold text-slate-100 leading-snug">
              Kuzatuvni reaksiyaning kimyoviy mazmuni bilan bog&lsquo;laydi.
            </p>

            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-300">
              Mexanizm moddalar xossalari, tajriba sharoitlari va reaksiya mahsulotlarini
              bog&lsquo;laydi. Bu kuzatuvni shunchaki animatsiya orqali emas, uning sababini
              tushuntirish orqali o&lsquo;rganishga yordam beradi.
            </p>

            {/* Status callout banner */}
            <div className="mt-7 rounded-xl border border-cyan-800/40 bg-cyan-950/25 p-4 text-[13px] text-slate-300 leading-relaxed backdrop-blur-xs">
              <strong className="text-white font-semibold">Platforma rivojlanmoqda.</strong>{" "}
              Quyida mavjud imkoniyatlar va rejalashtirilgan ishlar alohida
              ko&lsquo;rsatilgan. Yangi hisoblash modellari ilmiy tekshiruvni talab qiladi.
            </div>
          </div>

          {/* Right Column: Engine Architecture Diagram */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[500px] rounded-2xl border border-cyan-900/40 bg-[#06152d]/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              {/* Top 3 Input boxes */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">Moddalar</div>
                  <div className="text-[11px] text-cyan-200/70">(xossalar)</div>
                </div>
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">Reaksiyalar</div>
                  <div className="text-[11px] text-cyan-200/70">(sharoitlar)</div>
                </div>
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">Natijalar</div>
                  <div className="text-[11px] text-cyan-200/70">(mahsulotlar)</div>
                </div>
              </div>

              {/* Connecting Down Arrows */}
              <div className="my-2.5 flex justify-around text-cyan-400">
                <span className="text-xs">↓</span>
                <span className="text-xs">↓</span>
                <span className="text-xs">↓</span>
              </div>

              {/* Central Glowing Engine Node */}
              <div className="rounded-xl border-2 border-cyan-400/80 bg-gradient-to-b from-[#0a2c5a] to-[#04152e] py-3.5 px-6 text-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <div className="text-[15px] font-bold text-white tracking-wide">Molarya</div>
                <div className="text-[15px] font-extrabold text-cyan-300 tracking-wide">
                  Chemical Engine
                </div>
              </div>

              {/* Connecting Down Arrows */}
              <div className="my-2.5 flex justify-around text-cyan-400">
                <span className="text-xs">↓</span>
                <span className="text-xs">↓</span>
                <span className="text-xs">↓</span>
              </div>

              {/* Bottom 3 Output boxes */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">2D</div>
                  <div className="text-[11px] text-cyan-200/70">tasvirlash</div>
                </div>
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">3D</div>
                  <div className="text-[11px] text-cyan-200/70">tasvirlash</div>
                </div>
                <div className="rounded-xl border border-cyan-800/50 bg-[#0a1e3b]/90 p-3 text-center">
                  <div className="text-[12.5px] font-semibold text-white">O&lsquo;rganish</div>
                  <div className="text-[11px] text-cyan-200/70">interfeys</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-cyan-900/40" />

        {/* Bottom Area: 2 Columns (Current vs Roadmap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Column 1: Mexanizm hozir */}
          <div>
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Mexanizm hozir:</span>
            </div>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Check className="size-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>Moddalar, reaksiyalar va ularning natijalarini bog&lsquo;laydi.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Check className="size-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>Virtual tajribalar uchun yagona mantiqni ta&lsquo;minlaydi.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Check className="size-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                <span>Ilmiy modelni tasvirlashdan bosqichma-bosqich ajratmoqda.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Rivojlanish yo'nalishlari */}
          <div>
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <Circle className="size-2.5 text-sky-400" aria-hidden="true" />
              <span>Rivojlanish yo&lsquo;nalishlari:</span>
            </div>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Circle className="size-3 shrink-0 text-sky-400 mt-1" aria-hidden="true" />
                <span>Modda miqdori va reaksiya sharoitlarini tekshirish.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Circle className="size-3 shrink-0 text-sky-400 mt-1" aria-hidden="true" />
                <span>Moddalarning agregat holatlarini qo&lsquo;llab-quvvatlash.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Circle className="size-3 shrink-0 text-sky-400 mt-1" aria-hidden="true" />
                <span>Termodinamika, kinetika va muvozanat.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Circle className="size-3 shrink-0 text-sky-400 mt-1" aria-hidden="true" />
                <span>Tashqi ilovalar uchun API.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Circle className="size-3 shrink-0 text-sky-400 mt-1" aria-hidden="true" />
                <span>Ilmiy tekshiruvdan keyingi maxsus yechimlar.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note at the Bottom */}
        <p className="mt-12 text-xs text-slate-400">
          O&lsquo;quv platformasi. Sanoat jarayonlarini aniq modellashtirish uchun mo&lsquo;ljallanmagan.
        </p>
      </div>
    </section>
  );
}
