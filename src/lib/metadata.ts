import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/constants/site";

/**
 * Builds page metadata from the `Pages.<page>.metaTitle/metaDescription`
 * translation entries so no page titles are hardcoded.
 */
export async function getPageMetadata(
  page:
    | "about"
    | "features"
    | "virtualLab"
    | "chemistry"
    | "periodicTable"
    | "molecules"
    | "aiTutor"
    | "courses"
    | "teachers"
    | "schools"
    | "pricing"
    | "contact"
    | "faq"
    | "privacy"
    | "terms"
    | "login"
    | "register"
    | "forgotPassword"
    | "resetPassword"
    | "verifyEmail",
  path: string
): Promise<Metadata> {
  const t = await getTranslations();
  const title = t(`Pages.${page}.metaTitle` as never) as string;
  const description = t(`Pages.${page}.metaDescription` as never) as string;

  return {
    title,
    description,
    alternates: {
      canonical: `/${path}`,
      languages: {
        uz: `/${path}`,
        ru: `/ru/${path}`,
        en: `/en/${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${path}`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}
