import { GraduationCap, Presentation, Landmark } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "O‘quvchilar uchun",
    description:
      "Tajribalarni bajaring va formulalarni kuzatuvlar bilan bog‘lang. Mavzuni o‘z sur’atingizda takrorlang.",
  },
  {
    icon: Presentation,
    title: "O‘qituvchilar uchun",
    description:
      "Sinfda reaksiyalarni ko‘rsatib, nima va nega o‘zgarganini muhokama qiling.",
  },
  {
    icon: Landmark,
    title: "Maktablar va oliygohlar uchun",
    description:
      "Har bir qurilmaga dastur o‘rnatmasdan darslarda virtual tajribalardan foydalaning.",
  },
];

export function AudienceSection() {
  return (
    <section id="kimlar-uchun" className="scroll-mt-20 border-t border-slate-100 bg-white py-14 lg:py-20">
      <div className="container-page mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Bitta laboratoriya. Turli ehtiyojlar.
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-500 sm:text-base">
          Mustaqil mashq, sinfdagi tushuntirish va o‘qituvchi boshchiligidagi darslar uchun.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10 lg:gap-5">
          {audiences.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 transition-colors hover:border-blue-200"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#155EEF]">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
