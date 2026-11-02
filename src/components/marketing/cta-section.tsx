import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-r from-[#eef4ff] to-[#f7f9fd]">
      <div className="container-page mx-auto flex max-w-7xl items-center justify-between gap-10 py-14 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            Formuladan tajribaga.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-[17px]">
            Laboratoriyani oching, moddalarni tanlang va kimyoning amalda qanday ishlashini kuzating.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/virtual-lab"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#124bbf] active:scale-[0.98]"
            >
              Laboratoriyani ochish
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#texnologiya"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 active:scale-[0.98]"
            >
              Texnologiya haqida bilish
            </Link>
          </div>
        </div>
        <Image
          src="/images/landing/step-beaker.png"
          alt=""
          width={180}
          height={180}
          className="hidden h-auto w-36 shrink-0 md:block lg:w-44"
        />
      </div>
    </section>
  );
}
