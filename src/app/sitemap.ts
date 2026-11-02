import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleCourses } from "@/data/courses";
import { siteConfig } from "@/lib/constants/site";

type ChangeFrequency = "weekly" | "monthly" | "yearly";

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

const publicPaths: SitemapEntry[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "features", priority: 0.9, changeFrequency: "monthly" },
  { path: "virtual-lab", priority: 0.9, changeFrequency: "weekly" },
  { path: "chemistry", priority: 0.8, changeFrequency: "monthly" },
  { path: "periodic-table", priority: 0.8, changeFrequency: "monthly" },
  { path: "molecules", priority: 0.8, changeFrequency: "monthly" },
  { path: "ai-tutor", priority: 0.8, changeFrequency: "monthly" },
  { path: "courses", priority: 0.8, changeFrequency: "weekly" },
  ...sampleCourses.map((course) => ({
    path: `courses/${course.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as ChangeFrequency,
  })),
  { path: "for-teachers", priority: 0.7, changeFrequency: "monthly" },
  { path: "for-schools", priority: 0.7, changeFrequency: "monthly" },
  { path: "pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "about", priority: 0.5, changeFrequency: "monthly" },
  { path: "contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "terms", priority: 0.3, changeFrequency: "yearly" },
];

function localeUrl(locale: string, path: string) {
  const base =
    locale === routing.defaultLocale ? siteConfig.url : `${siteConfig.url}/${locale}`;
  return path ? `${base}/${path}` : base;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-30T00:00:00.000Z");

  return publicPaths.flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, entry.path),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [alt, localeUrl(alt, entry.path)])
        ),
      },
    }))
  );
}
