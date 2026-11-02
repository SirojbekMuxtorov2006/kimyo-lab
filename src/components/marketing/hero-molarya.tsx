"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  FlaskConical,
  Laptop,
  Box,
  Languages,
  ShieldCheck,
  Building2,
} from "lucide-react";

export function HeroMolarya() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Subtle background orbital rings and decorative glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <svg
          className="absolute -right-20 -top-20 h-[680px] w-[680px] text-blue-500/10 lg:h-[840px] lg:w-[840px]"
          viewBox="0 0 800 800"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="280" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="180" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="680" cy="400" r="8" fill="#3B82F6" fillOpacity="0.4" />
          <circle cx="220" cy="400" r="6" fill="#06B6D4" fillOpacity="0.5" />
          <circle cx="400" cy="120" r="7" fill="#6366F1" fillOpacity="0.4" />
        </svg>
        <svg
          className="absolute -left-28 top-1/4 h-[500px] w-[500px] text-blue-400/10"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="250" cy="250" rx="230" ry="110" stroke="currentColor" strokeWidth="1" transform="rotate(-30 250 250)" />
          <circle cx="120" cy="200" r="5" fill="#3B82F6" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="container-page relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left Column */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-1 text-[13px] font-semibold text-[#155EEF]">
              <FlaskConical className="size-4 text-[#155EEF]" aria-hidden="true" />
              <span>Virtual kimyo laboratoriyasi</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-[34px] font-extrabold tracking-tight text-[#155EEF] leading-[1.12] sm:text-5xl lg:text-[52px]">
              Kimyoni tushunish
              <br />
              osonroq,
              <br />
              agar reaksiyani
              <br />
              ko&lsquo;rsangiz.
            </h1>

            {/* Description Paragraph */}
            <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-slate-600 max-w-xl">
              Maktablar va oliygohlar uchun virtual laboratoriya. Moddalarni tanlang,
              qurilmani yig&lsquo;ing va reaksiyalarni kuzating. Nima yuz bergani va uning
              sababini bevosita brauzerda tushuning.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/virtual-lab"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#124bbf] active:scale-[0.98]"
              >
                Laboratoriyani ochish
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#qanday-ishlaydi"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 active:scale-[0.98]"
              >
                Qanday ishlaydi
              </Link>
            </div>

            {/* Feature Badges (2 rows matching screenshot) */}
            <div className="mt-9 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-slate-700 shadow-2xs">
                  <Laptop className="size-4 text-[#155EEF]" aria-hidden="true" />
                  <span>Brauzerda ishlaydi</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-slate-700 shadow-2xs">
                  <Box className="size-4 text-[#155EEF]" aria-hidden="true" />
                  <span>2D va 3D tasvirlash</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-slate-700 shadow-2xs">
                  <Languages className="size-4 text-[#155EEF]" aria-hidden="true" />
                  <span>Ko&lsquo;p tilli interfeys</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-slate-700 shadow-2xs">
                  <ShieldCheck className="size-4 text-[#155EEF]" aria-hidden="true" />
                  <span>Xavfsiz va tejamkor</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-slate-700 shadow-2xs">
                  <Building2 className="size-4 text-[#155EEF]" aria-hidden="true" />
                  <span>Maktablar va oliygohlar uchun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Laptop Mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] lg:max-w-[620px] transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="/images/landing/hero-laptop.png"
                alt="Molarya virtual kimyo laboratoriyasi interfeysi"
                width={840}
                height={560}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
