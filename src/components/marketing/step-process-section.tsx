"use client";

import Image from "next/image";

interface StepItem {
  number: string;
  title: string;
  description: string;
  image?: string;
  formula?: {
    reactants: string;
    products: string;
  };
}

const steps: StepItem[] = [
  {
    number: "1",
    title: "Moddalarni tanlang",
    description: "Kerakli reaktivlarni katalogdan toping.",
    image: "/images/landing/step-bottles.png",
  },
  {
    number: "2",
    title: "Qurilmani yig'ing",
    description: "Tajriba uchun idishlar va jihozlarni qo'shing.",
    image: "/images/landing/step-distillation.png",
  },
  {
    number: "3",
    title: "Sharoitlarni belgilang",
    description: "Reaksiyani tayyorlab, boshlang.",
    image: "/images/landing/step-burner.png",
  },
  {
    number: "4",
    title: "O'zgarishlarni kuzating",
    description: "Tajriba davomida nima bo'lishini kuzating.",
    image: "/images/landing/step-beaker.png",
  },
  {
    number: "5",
    title: "Reaksiyani tahlil qiling",
    description: "Natijani kimyoviy tenglama bilan bog'lang.",
    formula: {
      reactants: "CaCO₃ + 2HCl →",
      products: "CaCl₂ + H₂O + CO₂↑",
    },
  },
  {
    number: "6",
    title: "Natijani saqlang",
    description: "Darsda yoki takrorlash paytida tajribaga qayting.",
    image: "/images/landing/step-report.png",
  },
];

export function StepProcessSection() {
  return (
    <section id="qanday-ishlaydi" className="bg-white py-14 lg:py-20 border-t border-slate-100">
      <div className="container-page mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            Birinchi moddadan reaksiyani tushunishgacha
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-slate-500">
            Reaktivni tanlashdan saqlangan natijagacha oltita tushunarli qadam.
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:border-slate-300 min-h-[168px]"
            >
              {/* Top row: Number badge & visual */}
              <div className="flex items-start justify-between">
                <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-[13px] font-bold text-[#155EEF]">
                  {step.number}
                </span>

                <div className="h-12 flex items-center justify-end">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={52}
                      height={48}
                      className="h-11 w-auto object-contain"
                    />
                  ) : step.formula ? (
                    <div className="text-right font-mono text-[11.5px] font-semibold text-slate-700 leading-tight">
                      <div>{step.formula.reactants}</div>
                      <div>{step.formula.products}</div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Bottom text */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
