import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/register", "/forgot-password", "/reset-password", "/verify-email"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
