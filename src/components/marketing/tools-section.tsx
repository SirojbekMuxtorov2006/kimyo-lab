import Image from "next/image";
import { Link } from "@/i18n/navigation";

const tools = [
  {
    title: "Davriy jadval",
    description: "Kimyoviy elementlar haqidagi interaktiv ma’lumotlar.",
    image: "/images/tools/periodic-table.webp",
    href: "/periodic-table",
  },
  {
    title: "Moddalarning 2D va 3D modellari",
    description: "Molekulalar va moddalar tuzilishining ko‘rgazmali tasviri.",
    image: "/images/tools/molecule-model.webp",
    href: "/molecules",
  },
  {
    title: "Natijalar va izohlar",
    description: "Reaksiya tenglamasi, kuzatuvlar va tartiblangan o‘quv ma’lumotlari.",
    image: "/images/landing/step-report.png",
    href: "/virtual-lab",
  },
  {
    title: "Moddalar katalogi",
    description: "Virtual tajribalarda ishlatiladigan xossalar, formulalar va ma’lumotlar.",
    image: "/images/landing/step-bottles.png",
    href: "/virtual-lab",
  },
];

export function ToolsSection() {
  return (
    <section id="vositalar" className="scroll-mt-20 bg-white pb-14 pt-4 lg:pb-20">
      <div className="container-page mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Tajriba uchun barcha vositalar bir joyda
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-500 sm:text-base">
          Moddalar xossalarini o‘rganing va laboratoriyadan chiqmasdan izohlarga qayting.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group flex items-center gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-[0_8px_24px_-12px_rgba(21,94,239,0.25)]"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:size-24">
                <Image
                  src={tool.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 sm:text-[17px]">{tool.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
