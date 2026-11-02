"use client";

import Image from "next/image";
import { FlaskConical, ClipboardCheck, MonitorSmartphone } from "lucide-react";

export function SafeLabSection() {
  return (
    <section id="imkoniyatlar" className="relative overflow-hidden bg-white py-12 lg:py-20 border-t border-slate-100">
      {/* Decorative background arc on the right */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-30">
        <svg
          className="h-[520px] w-[520px] text-blue-300"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="170" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-page relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Scientist Laboratory Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 bg-slate-50">
              <Image
                src="/images/landing/scientist.png"
                alt="Xavfsiz muhitda kimyoni tushuning — laboratoriya tajribasi"
                width={840}
                height={500}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Right Column: Text & 3 Key Features */}
          <div className="lg:col-span-6 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[34px] leading-tight">
              Xavfsiz muhitda kimyoni tushuning.
            </h2>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-slate-600">
              Virtual muhitda kimyoviy reaksiyalarni o&lsquo;rganing: o&lsquo;zgarishlarni kuzating,
              mahsulotlarni o&lsquo;rganing va ko&lsquo;rganingizni tenglama bilan bog&lsquo;lang.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {/* Feature 1 */}
              <div className="space-y-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                  <FlaskConical className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                  Xavfsiz tajribalar
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Xavfli reaktivlarsiz va xatarsiz
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                  <ClipboardCheck className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                  Tushunarli natijalar
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Kuzatuvlar va izohlar
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                  <MonitorSmartphone className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                  Istalgan qurilmadan kirish
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Bevosita brauzerda ishlaydi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
