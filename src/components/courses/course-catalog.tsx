import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, Clock3Icon, GraduationCapIcon, LayersIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleCourses, type Course } from "@/data/courses";
import { Reveal } from "@/components/shared/reveal";
import type { Locale } from "@/i18n/routing";

const levelBadgeVariant = {
  beginner: "success",
  intermediate: "accent",
  advanced: "default",
} as const;

export async function CourseCatalog() {
  const t = await getTranslations("CourseCatalog");
  const locale = (await getLocale()) as Locale;
  const strings = {
    badge: t("badge"),
    sample: t("sample"),
    note: t("note"),
    levels: {
      beginner: t("levels.beginner"),
      intermediate: t("levels.intermediate"),
      advanced: t("levels.advanced"),
    },
    lessons: (count: number) => t("lessons", { count }),
    duration: (count: number) => t("duration", { count }),
    levelLabel: t("level"),
    viewCourse: t("viewCourse"),
  };

  return (
    <div className="container-page section-padding">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="demo">
          {strings.badge} · {strings.sample}
        </Badge>
        <p className="max-w-md text-[13px] text-muted-foreground">{strings.note}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sampleCourses.map((course, index) => (
          <CourseCard key={course.slug} course={course} locale={locale} strings={strings} delay={index * 0.06} />
        ))}
      </div>
    </div>
  );
}

interface CourseCardStrings {
  badge: string;
  sample: string;
  note: string;
  levels: Record<Course["level"], string>;
  lessons: (count: number) => string;
  duration: (count: number) => string;
  levelLabel: string;
  viewCourse: string;
}

export function CourseCard({
  course,
  locale,
  strings,
  delay = 0,
}: {
  course: Course;
  locale: Locale;
  strings: CourseCardStrings;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="card-hover group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={levelBadgeVariant[course.level]}>{strings.levels[course.level]}</Badge>
          {course.tags[locale]?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-1.5">
          <h2 className="font-display text-[19px] font-bold leading-snug text-foreground group-hover:text-primary">
            {course.title[locale]}
          </h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            {course.summary[locale]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <LayersIcon className="size-3.5 text-primary" aria-hidden="true" />
            {strings.lessons(course.lessons)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3Icon className="size-3.5 text-primary" aria-hidden="true" />
            {strings.duration(course.hours)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCapIcon className="size-3.5 text-primary" aria-hidden="true" />
            {strings.levelLabel} · {strings.levels[course.level]}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <Button variant="accentGradient" size="sm" asChild>
            <Link href={`/courses/${course.slug}`}>
              {strings.viewCourse}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
