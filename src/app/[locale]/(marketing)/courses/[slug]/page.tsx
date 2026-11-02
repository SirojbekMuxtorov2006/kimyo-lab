import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeftIcon, CheckIcon, Clock3Icon, LayersIcon, GraduationCapIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findCourse, sampleCourses, type Course } from "@/data/courses";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return sampleCourses.map((course) => ({
    slug: course.slug,
  }));
}

type CoursePageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: CoursePageParams) {
  const { slug } = await params;
  const course = findCourse(slug);
  const t = await getTranslations("CourseDetail");

  return {
    title: course?.title.uz ?? t("notFound"),
    description: course?.summary.uz ?? t("demoNotice"),
  };
}

export default async function CourseDetailPage({ params }: CoursePageParams) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();

  const t = await getTranslations();
  const levelLabels: Record<Course["level"], string> = {
    beginner: t("CourseCatalog.levels.beginner"),
    intermediate: t("CourseCatalog.levels.intermediate"),
    advanced: t("CourseCatalog.levels.advanced"),
  };
  const meta = {
    lessons: (count: number) => t("CourseCatalog.lessons", { count }),
    duration: (count: number) => t("CourseCatalog.duration", { count }),
    overview: t("CourseCatalog.overview"),
    outcomes: t("CourseCatalog.outcomes"),
    syllabus: t("CourseCatalog.syllabus"),
    enroll: t("CourseCatalog.enroll"),
    back: t("CourseCatalog.back"),
    sample: t("CourseCatalog.sample"),
    demoNotice: t("CourseCatalog.demoNotice"),
  };
  const tPages = await getTranslations("Pages.courses");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <PageHero
        eyebrow={`${tPages("eyebrow")} · ${levelLabels[course.level]}`}
        title={course.title[locale]}
        description={course.summary[locale]}
        inverted
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="dark">{levelLabels[course.level]}</Badge>
          <Badge variant="dark">{meta.lessons(course.lessons)}</Badge>
          <Badge variant="dark">
            <Clock3Icon aria-hidden="true" />
            {meta.duration(course.hours)}
          </Badge>
          {course.tags[locale]?.map((tag) => (
            <Badge key={tag} variant="dark">
              {tag}
            </Badge>
          ))}
        </div>
      </PageHero>

      <div className="container-page grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="space-y-10">
          <Reveal>
            <section className="space-y-3" aria-labelledby="overview">
              <h2 id="overview" className="font-display text-xl font-bold text-foreground">
                {meta.overview}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {course.description[locale]}
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="space-y-3" aria-labelledby="outcomes">
              <h2 id="outcomes" className="font-display text-xl font-bold text-foreground">
                {meta.outcomes}
              </h2>
              <ul className="grid gap-2.5">
                {course.outcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 text-[14.5px] text-foreground"
                  >
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    </span>
                    {outcome[locale]}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section className="space-y-3" aria-labelledby="syllabus">
              <h2 id="syllabus" className="font-display text-xl font-bold text-foreground">
                {meta.syllabus}
              </h2>
              <ol className="space-y-2.5">
                {course.modules.map((module, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4"
                  >
                    <span className="font-mono text-sm font-bold text-primary/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                      <p className="text-[14.5px] font-semibold text-foreground">
                        {module.title[locale]}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground">
                        <LayersIcon className="size-3.5 text-primary" aria-hidden="true" />
                        {meta.lessons(module.lessons)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        </div>

        {/* sticky enroll card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-float">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="demo">{meta.sample}</Badge>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                <GraduationCapIcon className="size-4 text-primary" aria-hidden="true" />
                {meta.lessons(course.lessons)}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{meta.demoNotice}</p>
            <Button variant="accentGradient" className="w-full">
              {meta.enroll}
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/courses">
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                {meta.back}
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
