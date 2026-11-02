export const siteConfig = {
  name: "MOLARYA UZ",
  tagline: "Kimyoni ko‘r, tajriba qil va tushun!",
  description:
    "Virtual kimyo laboratoriyasi, interaktiv 3D molekulalar va AI repetitor — O‘zbekiston ta’limi uchun.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://molarya.uz",
  email: "hello@molarya.uz",
  phone: "+998 (71) 200-00-00",
  location: "Toshkent, O‘zbekiston",
  social: {
    telegram: "https://t.me/molarya_uz",
    instagram: "https://instagram.com/molarya_uz",
    youtube: "https://youtube.com/@molarya_uz",
  },
} as const;

export type PublicNavItem = {
  labelKey:
    | "home"
    | "features"
    | "forWhom"
    | "experiments"
    | "howItWorks"
    | "technology"
    | "tools"
    | "schoolTrial"
    | "laboratory"
    | "courses"
    | "teachers"
    | "pricing";
  href: string;
};

export const publicNavigation: PublicNavItem[] = [
  { labelKey: "features", href: "/#imkoniyatlar" },
  { labelKey: "forWhom", href: "/#kimlar-uchun" },
  { labelKey: "experiments", href: "/#tajribalar" },
  { labelKey: "howItWorks", href: "/#qanday-ishlaydi" },
  { labelKey: "technology", href: "/#texnologiya" },
  { labelKey: "tools", href: "/#vositalar" },
  { labelKey: "schoolTrial", href: "/#maktab-sinovi" },
  { labelKey: "pricing", href: "/#narxlar" },
];

export type FooterLink = {
  labelKey:
    | "features"
    | "lab"
    | "aiTutor"
    | "periodicTable"
    | "molecules"
    | "courses"
    | "teachers"
    | "schools"
    | "about"
    | "contact"
    | "faq"
    | "pricing"
    | "privacy"
    | "terms";
  href: string;
};

export const footerColumns: { titleKey: "platform" | "resources" | "company" | "legal"; links: FooterLink[] }[] = [
  {
    titleKey: "platform",
    links: [
      { labelKey: "features", href: "/features" },
      { labelKey: "lab", href: "/virtual-lab" },
      { labelKey: "aiTutor", href: "/ai-tutor" },
      { labelKey: "periodicTable", href: "/periodic-table" },
      { labelKey: "molecules", href: "/molecules" },
    ],
  },
  {
    titleKey: "resources",
    links: [
      { labelKey: "courses", href: "/courses" },
      { labelKey: "teachers", href: "/for-teachers" },
      { labelKey: "schools", href: "/for-schools" },
      { labelKey: "faq", href: "/faq" },
    ],
  },
  {
    titleKey: "company",
    links: [
      { labelKey: "about", href: "/about" },
      { labelKey: "contact", href: "/contact" },
      { labelKey: "pricing", href: "/pricing" },
    ],
  },
  {
    titleKey: "legal",
    links: [
      { labelKey: "privacy", href: "/privacy" },
      { labelKey: "terms", href: "/terms" },
    ],
  },
];
