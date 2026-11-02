"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface ExperimentCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const experiments: ExperimentCard[] = [
  {
    id: "neutralization",
    title: "Kislota va asosning neytrallanishi",
    description: "HCl + NaOH → NaCl + H₂O",
    image: "/images/landing/exp-neutralization.png",
    tags: ["Kislotalar", "Asoslar"],
  },
  {
    id: "heating",
    title: "Qizdirish tajribasi",
    description: "Qurilma, qizdirish va natijani kuzatish",
    image: "/images/landing/exp-heating.png",
    tags: ["Qizdirish", "Qurilma"],
  },
  {
    id: "solutions",
    title: "Eritmalardagi reaksiyalar",
    description: "Eritma va reaksiya mahsulotlaridagi o'zgarishlarni kuzating",
    image: "/images/landing/exp-solutions.png",
    tags: ["Eritmalar", "Kuzatuv"],
  },
  {
    id: "reagents",
    title: "Reaktivlar bilan ishlash",
    description: "Moddalarni tanlab, belgilangan tajriba ssenariysini boshlang",
    image: "/images/landing/exp-reagents.png",
    tags: ["Reaktivlar", "Amaliyot"],
  },
];

export function StarterExperimentsSection() {
  return (
    <section id="tajribalar" className="bg-white py-14 lg:py-20 border-t border-slate-100">
      <div className="container-page mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title on Left, Link on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
              Kimyoni o&lsquo;rganishni nimadan boshlash mumkin
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-base text-slate-500">
              Tajriba misollari. Laboratoriyada tajribani tanlab, boshlang.
            </p>
          </div>

          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155EEF] hover:text-[#124bbf] transition-colors self-start sm:self-auto"
          >
            Laboratoriyani ochish
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {/* 4 Experiment Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:shadow-lg hover:border-slate-300"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-mono">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="p-5 pt-0">
                <Link
                  href={`/virtual-lab?exp=${exp.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:text-[#124bbf] transition-colors"
                >
                  Laboratoriyaga o&lsquo;tish
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
