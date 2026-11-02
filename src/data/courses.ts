import type { Locale } from "@/i18n/routing";

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type Localized = Record<Locale, string>;

export interface Course {
  slug: string;
  level: CourseLevel;
  lessons: number;
  hours: number;
  title: Localized;
  summary: Localized;
  description: Localized;
  outcomes: Localized[];
  modules: { title: Localized; lessons: number }[];
  tags: { uz: string[]; ru: string[]; en: string[] };
}

/**
 * Sample catalogue for Phase 1. Clearly labelled as demo content.
 * Real course data is served by `coursesApi` in Phase 2.
 */
export const sampleCourses: Course[] = [
  {
    slug: "kimyo-asoslari",
    level: "beginner",
    lessons: 24,
    hours: 12,
    title: {
      uz: "Kimyo asoslari",
      ru: "Основы химии",
      en: "Chemistry foundations",
    },
    summary: {
      uz: "Materiya, atom va reaksiyalar haqidagi birinchi izchil tushunchalar.",
      ru: "Первые последовательные представления о веществе, атоме и реакциях.",
      en: "Your first coherent picture of matter, atoms and reactions.",
    },
    description: {
      uz: "Bu kurs kimyoni noldan boshlovchilar uchun tayyorlangan. Ko‘rgazmali vaziyatlar va virtual tajribalar yordamida materiya, atom tuzilishi, aralashmalar va oddiy reaksiyalarni tushunasiz.",
      ru: "Курс подготовлен для начинающих с нуля. С помощью наглядных ситуаций и виртуальных экспериментов вы поймёте вещество, строение атома, смеси и простые реакции.",
      en: "This course is designed for complete beginners. With clear examples and virtual experiments, you will understand matter, atomic structure, mixtures and simple reactions.",
    },
    outcomes: [
      {
        uz: "Materiya va atom tuzilishini tushunish",
        ru: "Понимать вещество и строение атома",
        en: "Understand matter and atomic structure",
      },
      {
        uz: "Oddiy kimyoviy reaksiyalarni o‘zaro bog‘lash",
        ru: "Связывать между собой простые химические реакции",
        en: "Connect simple chemical reactions",
      },
      {
        uz: "Laboratoriya xavfsizligi asoslarini bilish",
        ru: "Знать основы безопасности в лаборатории",
        en: "Know the basics of laboratory safety",
      },
    ],
    modules: [
      {
        title: {
          uz: "Materiya va holatlari",
          ru: "Вещество и его состояния",
          en: "Matter and its states",
        },
        lessons: 6,
      },
      {
        title: {
          uz: "Atom va elektronlar",
          ru: "Атом и электроны",
          en: "Atoms and electrons",
        },
        lessons: 6,
      },
      {
        title: {
          uz: "Aralashmalar va eritmalar",
          ru: "Смеси и растворы",
          en: "Mixtures and solutions",
        },
        lessons: 6,
      },
      {
        title: {
          uz: "Oddiy reaksiyalarga kirish",
          ru: "Введение в простые реакции",
          en: "Introduction to simple reactions",
        },
        lessons: 6,
      },
    ],
    tags: {
      uz: ["7-sinf", "Asoslar"],
      ru: ["7 класс", "Основы"],
      en: ["Grade 7", "Basics"],
    },
  },
  {
    slug: "atom-va-boglanishlar",
    level: "intermediate",
    lessons: 21,
    hours: 10,
    title: {
      uz: "Atom va kimyoviy bog‘lanishlar",
      ru: "Атом и химические связи",
      en: "Atoms and chemical bonding",
    },
    summary: {
      uz: "Elektronlar qanday bog‘lanish yaratadi va molekulalarning shaklining kelib chiqishi.",
      ru: "Как электроны создают связь и откуда берётся форма молекул.",
      en: "How electrons form bonds and where molecular shapes come from.",
    },
    description: {
      uz: "Kursda ion, kovalent va metall bog‘lanishlarning kelib chiqishini ko‘rgazmali modellar orqali tushunasiz. Molekula geometriyasi va xossalari orasidagi bog‘liqlikni virtual tajribalar bilan ko‘rasiz.",
      ru: "Курс наглядно объясняет ионную, ковалентную и металлическую связь. Связь геометрии молекул с их свойствами вы увидите в виртуальных экспериментах.",
      en: "The course explains ionic, covalent and metallic bonding with clear models. You will see how molecular geometry relates to properties in virtual experiments.",
    },
    outcomes: [
      {
        uz: "Bog‘lanish turlarini ajratish",
        ru: "Различать типы связи",
        en: "Distinguish types of bonding",
      },
      {
        uz: "Molekula shakllarining kelib chiqishini tushunish",
        ru: "Понимать происхождение формы молекул",
        en: "Understand what shapes molecules",
      },
      {
        uz: "Davr va guruh qonuniyatlarini ko‘rish",
        ru: "Видеть закономерности периодов и групп",
        en: "Spot periodic and group trends",
      },
    ],
    modules: [
      {
        title: {
          uz: "Elektron energiya darajalari",
          ru: "Электронные энергетические уровни",
          en: "Electron energy levels",
        },
        lessons: 5,
      },
      {
        title: {
          uz: "Ion va kovalent bog‘lanish",
          ru: "Ионная и ковалентная связь",
          en: "Ionic and covalent bonding",
        },
        lessons: 6,
      },
      {
        title: {
          uz: "Molekula geometriyasi",
          ru: "Геометрия молекул",
          en: "Molecular geometry",
        },
        lessons: 5,
      },
      {
        title: {
          uz: "Bog‘lanish va xossalarning o‘zaro aloqasi",
          ru: "Связь и свойства",
          en: "Bonds and properties",
        },
        lessons: 5,
      },
    ],
    tags: {
      uz: ["8–9-sinf"],
      ru: ["8–9 класс"],
      en: ["Grades 8–9"],
    },
  },
  {
    slug: "organik-kimyo-asoslari",
    level: "intermediate",
    lessons: 32,
    hours: 16,
    title: {
      uz: "Organik kimyo asoslari",
      ru: "Основы органической химии",
      en: "Basics of organic chemistry",
    },
    summary: {
      uz: "Uglerod dunyosiga ko‘rgazmali kirish, oddiy uglevodorodlardan guruhlargacha.",
      ru: "Наглядное введение в мир углерода, от простых углеводородов до функциональных групп.",
      en: "A clear introduction to carbon, from simple hydrocarbons to functional groups.",
    },
    description: {
      uz: "Kursda uglerod atomining bog‘lanish qobiliyati, oddiy uglevodorodlar va asosiy organik guruhlar ko‘rgazmali 3D modellar yordamida tushuntiriladi. Organik molekulalarning kundalik hayotdagi rolini kuzatasiz.",
      ru: "В курсе наглядно, с помощью 3D-моделей объясняется связующая способность атома углерода, простые углеводороды и основные функциональные группы.",
      en: "The course uses clear 3D models to explain carbon’s bonding ability, simple hydrocarbons and the main functional groups.",
    },
    outcomes: [
      {
        uz: "Uglerod bog‘lanishlarini vizual tushunish",
        ru: "Наглядно понимать связи углерода",
        en: "Understand carbon bonding visually",
      },
      {
        uz: "Oddiy organik molekulalarni ajratish",
        ru: "Различать простые органические молекулы",
        en: "Tell simple organic molecules apart",
      },
      {
        uz: "Organik kimyoning amaliy rolini ko‘rish",
        ru: "Видеть практическую роль органической химии",
        en: "See the practical role of organic chemistry",
      },
    ],
    modules: [
      {
        title: {
          uz: "Uglerodning roli",
          ru: "Роль углерода",
          en: "The role of carbon",
        },
        lessons: 8,
      },
      {
        title: {
          uz: "Uglevodorodlar",
          ru: "Углеводороды",
          en: "Hydrocarbons",
        },
        lessons: 8,
      },
      {
        title: {
          uz: "Funktsional guruhlar",
          ru: "Функциональные группы",
          en: "Functional groups",
        },
        lessons: 8,
      },
      {
        title: {
          uz: "Organik kimyo kundalik hayotda",
          ru: "Органическая химия в жизни",
          en: "Organic chemistry in daily life",
        },
        lessons: 8,
      },
    ],
    tags: {
      uz: ["10–11-sinf", "Organik"],
      ru: ["10–11 класс", "Органика"],
      en: ["Grades 10–11", "Organic"],
    },
  },
  {
    slug: "universitetga-tayyorgarlik",
    level: "advanced",
    lessons: 40,
    hours: 20,
    title: {
      uz: "Universitetga tayyorgarlik",
      ru: "Подготовка к вступительным тестам",
      en: "University entry preparation",
    },
    summary: {
      uz: "Imtihon talab darajasidagi mavzular va amaliy masalalar bilan kuchli asos yaratish.",
      ru: "Прочное основание на уровне требований вступительного теста: темы и задачи.",
      en: "A strong foundation at entry-test level, with topics and problems.",
    },
    description: {
      uz: "Kurs universitetga kirish uchun muhim bo‘lgan nazariy mavzular, hisoblash masalalari va imtihon formatidagi mashqlarni birlashtiradi. Tahlillar kuchli va kuchsiz tomonlaringizni ko‘rsatadi.",
      ru: "Курс объединяет ключевые теоретические темы, расчётные задачи и практику в формате экзамена. Аналитика показывает сильные и слабые стороны.",
      en: "The course merges key theory topics, calculation problems and exam-style practice. Analytics show strengths and weak areas.",
    },
    outcomes: [
      {
        uz: "Imtihon darajasidagi masalalarni yechish",
        ru: "Решать задачи уровня экзамена",
        en: "Solve exam-level problems",
      },
      {
        uz: "Murakkab shartlarni tez qo‘llash",
        ru: "Быстро применять сложные условия",
        en: "Apply complex conditions quickly",
      },
      {
        uz: "O‘z xatolarini tahlil qilish",
        ru: "Анализировать свои ошибки",
        en: "Analyse your own mistakes",
      },
    ],
    modules: [
      {
        title: {
          uz: "Asosiy nazariya va formulalar",
          ru: "Ключевая теория и формулы",
          en: "Key theory and formulas",
        },
        lessons: 10,
      },
      {
        title: {
          uz: "Hisoblash masalalari",
          ru: "Расчётные задачи",
          en: "Calculation problems",
        },
        lessons: 10,
      },
      {
        title: {
          uz: "Reaksiyalar tahlili",
          ru: "Анализ реакций",
          en: "Solving reactions",
        },
        lessons: 10,
      },
      {
        title: {
          uz: "Imtihon formatidagi mashqlar",
          ru: "Практика в формате экзамена",
          en: "Exam-style practice",
        },
        lessons: 10,
      },
    ],
    tags: {
      uz: ["11+", "Litsey"],
      ru: ["11+", "Лицей"],
      en: ["11+", "Lyceum"],
    },
  },
];

export function findCourse(slug: string) {
  return sampleCourses.find((course) => course.slug === slug);
}
