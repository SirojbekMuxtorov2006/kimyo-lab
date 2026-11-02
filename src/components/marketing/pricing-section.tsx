"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

interface Plan {
  id: string;
  name: string;
  audience: string;
  /** Monthly price in UZS; null means the price is negotiated. */
  monthly: number | null;
  unit: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Bepul",
    audience: "Tanishish uchun",
    monthly: 0,
    unit: "doimiy",
    features: [
      "Oyiga 5 ta virtual tajriba",
      "Davriy jadval va moddalar katalogi",
      "Reaksiya tenglamalari va izohlar",
    ],
    cta: "Laboratoriyani ochish",
    href: "/virtual-lab",
  },
  {
    id: "student",
    name: "O‘quvchi Pro",
    audience: "Mustaqil o‘rganuvchilar",
    monthly: 29_000,
    unit: "so‘m / oy",
    features: [
      "Cheksiz tajribalar",
      "2D va 3D modellar",
      "Tajribalar jurnali va tarixi",
      "Imtihonga tayyorlov ssenariylari",
    ],
    cta: "Pro’ni boshlash",
    href: "/register?plan=student",
  },
  {
    id: "teacher",
    name: "O‘qituvchi",
    audience: "Sinf bilan ishlash",
    monthly: 59_000,
    unit: "so‘m / oy",
    features: [
      "Katta ekran uchun namoyish rejimi",
      "35 tagacha o‘quvchi uchun sinf",
      "Topshiriqlar va baholash",
      "Tayyor dars ssenariylari",
    ],
    cta: "O‘qituvchi tarifini tanlash",
    href: "/register?plan=teacher",
    highlighted: true,
  },
  {
    id: "school",
    name: "Maktab / Oliygoh",
    audience: "Butun muassasa uchun",
    monthly: null,
    unit: "yillik litsenziya",
    features: [
      "Cheksiz o‘qituvchi va o‘quvchilar",
      "Muassasa bo‘yicha tahlillar",
      "O‘qituvchilarni o‘qitish (onboarding)",
      "3 oylik bepul pilot",
    ],
    cta: "Pilot so‘rash",
    href: "/contact?topic=school",
  },
];

const strategy = [
  {
    step: "01",
    title: "Bepul pilot",
    description:
      "Maktablarga 3 oylik bepul sinov. Hisor tajribasi kabi real darsda natija ko‘rsatamiz va o‘qituvchi fikrini yig‘amiz.",
  },
  {
    step: "02",
    title: "Maktab litsenziyasi (B2B)",
    description:
      "Asosiy daromad: yillik litsenziya — 1 o‘quvchi uchun ~6 000 so‘m/yil. Kimyo kabineti jihozlaridan 50 baravar arzon.",
  },
  {
    step: "03",
    title: "Hududiy shartnomalar (B2G)",
    description:
      "Xalq ta’limi bo‘limlari bilan tuman va viloyat miqyosida ulgurji litsenziyalar. Sotuv sikli uzun, lekin hajm katta.",
  },
  {
    step: "04",
    title: "Freemium o‘quvchilar (B2C)",
    description:
      "Bepul tarif maktabdan uyga o‘tadi: o‘quvchi uyda takrorlash va imtihonga tayyorlov uchun Pro’ga o‘tadi.",
  },
];

// Fixed grouping so server and browser render identical text ("29 000").
function formatSum(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function priceLabel(plan: Plan, billing: Billing) {
  if (plan.monthly === null) return "Kelishuv";
  if (plan.monthly === 0) return "0";
  // Yearly billing: two months free (≈17% off), shown as the monthly equivalent.
  const value = billing === "yearly" ? Math.round((plan.monthly * 10) / 12 / 100) * 100 : plan.monthly;
  return formatSum(value);
}

export function PricingSection() {
  const [billing, setBilling] = React.useState<Billing>("monthly");

  return (
    <section id="narxlar" className="scroll-mt-20 border-t border-slate-100 bg-white py-14 lg:py-20">
      <div className="container-page mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Oddiy va tushunarli narxlar
            </h2>
            <p className="mt-2 text-[14.5px] text-slate-500 sm:text-base">
              Bepul boshlang. Sinf yoki butun maktab uchun kerak bo‘lganda kengaytiring.
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="To‘lov davri"
            className="inline-grid w-fit grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1"
          >
            {(["monthly", "yearly"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={billing === mode}
                onClick={() => setBilling(mode)}
                className={cn(
                  "rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors",
                  billing === mode ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {mode === "monthly" ? "Oylik" : "Yillik · 2 oy bepul"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6",
                plan.highlighted ? "border-[#155EEF] ring-1 ring-[#155EEF]" : "border-slate-200/80"
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-6 rounded-full bg-[#155EEF] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  Tavsiya etiladi
                </span>
              ) : null}
              <h3 className="text-[16px] font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-[13px] text-slate-500">{plan.audience}</p>

              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-[30px] font-extrabold tracking-tight text-slate-900">
                  {priceLabel(plan, billing)}
                </span>
                <span className="text-[13px] font-medium text-slate-500">
                  {plan.monthly ? plan.unit : plan.monthly === 0 ? "so‘m" : ""}
                </span>
              </p>
              <p className="mt-0.5 h-4 text-[12px] text-slate-400">
                {plan.monthly === null
                  ? plan.unit
                  : plan.monthly > 0 && billing === "yearly"
                    ? `yiliga ${formatSum(plan.monthly * 10)} so‘m`
                    : plan.monthly === 0
                      ? plan.unit
                      : ""}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#155EEF]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={cn(
                  "mt-7 inline-flex items-center justify-center rounded-xl px-4 py-3 text-[14px] font-semibold transition-colors",
                  plan.highlighted
                    ? "bg-[#155EEF] text-white hover:bg-[#124bbf]"
                    : "border border-slate-200 text-slate-800 hover:bg-slate-50"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 sm:p-8 lg:mt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Biznes strategiya</h3>
            <p className="text-[13.5px] text-slate-500">Pilotdan hududiy miqyosgacha — to‘rt bosqich</p>
          </div>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strategy.map((item) => (
              <li key={item.step}>
                <span className="text-[13px] font-bold text-[#155EEF]">{item.step}</span>
                <p className="mt-1.5 text-[15px] font-bold text-slate-900">{item.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 text-[12.5px] text-slate-400">
          Narxlar QQSsiz ko‘rsatilgan. Maktab va oliygohlar uchun narx o‘quvchilar soniga qarab belgilanadi.
        </p>
      </div>
    </section>
  );
}
