import Image from "next/image";
import { Check } from "lucide-react";

export function SchoolPilotSection() {
  return (
    <section
      id="maktab-sinovi"
      aria-labelledby="pilot-title"
      className="scroll-mt-20 border-t border-slate-100 bg-[#f7f9fd] py-14 lg:py-20"
    >
      <div className="container-page mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="max-w-md">
          <p className="text-[13px] font-semibold text-[#155EEF]">Haqiqiy sinfda sinovdan o‘tgan</p>
          <h2
            id="pilot-title"
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl"
          >
            Molaryaning ilk maktab sinovi
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            2026-yilda Molarya Tojikistonning Hisor shahridagi haqiqiy sinf sharoitida ilk maktab
            sinovidan o‘tdi. Virtual kimyo laboratoriyasi dars davomida ishlatilib, sinfdagi katta
            ekranda namoyish etildi.
          </p>
          <p className="mt-5 text-[15px] font-bold text-slate-900">Hisor, Tojikiston · 2026</p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            Sinov Molaryani maktab jihozlarida, o‘qituvchi boshchiligidagi dars jarayonida va
            haqiqiy dars paytidagi foydalanish qulayligi bo‘yicha baholashga yordam berdi.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[13px] font-semibold text-emerald-700">
            <Check className="size-4" aria-hidden="true" />
            Ilk maktab sinovi o‘tkazildi
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <figure className="col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/images/pilot/classroom-wide.jpg"
              alt="Molarya maktab darsida katta ekranda namoyish etilmoqda"
              width={1024}
              height={576}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full object-cover"
            />
            <figcaption className="px-4 py-2.5 text-[12.5px] text-slate-500">
              Molarya haqiqiy maktab darsida ishlatildi.
            </figcaption>
          </figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/pilot/screen-detail.jpg"
              alt="Sinf ekranidagi virtual laboratoriya"
              width={768}
              height={432}
              sizes="(min-width: 1024px) 360px, 50vw"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/pilot/classroom-action.jpg"
              alt="O‘qituvchi tajribani sinfga tushuntirmoqda"
              width={768}
              height={432}
              sizes="(min-width: 1024px) 360px, 50vw"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
