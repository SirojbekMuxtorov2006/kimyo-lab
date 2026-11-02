import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/constants/site";
import { Logo } from "@/components/shared/logo";

const links = [
  { label: "Laboratoriya", href: "/virtual-lab" },
  { label: "Narxlar", href: "/pricing" },
  { label: "Maktablar uchun", href: "/for-schools" },
  { label: "Aloqa", href: "/contact" },
  { label: "Maxfiylik", href: "/privacy" },
  { label: "Shartlar", href: "/terms" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container-page mx-auto flex max-w-7xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/" className="inline-flex w-fit rounded-lg">
            <Logo />
          </Link>
          <p className="text-[14px] text-slate-500">
            Virtual kimyo laboratoriyasi va rivojlanayotgan texnologik platforma.
          </p>
        </div>
        <nav aria-label="Pastki navigatsiya" className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[13.5px] text-slate-500 transition-colors hover:text-[#155EEF]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-page mx-auto flex max-w-7xl flex-col gap-1 border-t border-slate-100 py-5 text-[12.5px] text-slate-400 sm:flex-row sm:justify-between">
        <p>© 2026 Molarya. Barcha huquqlar himoyalangan.</p>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-[#155EEF]">
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
