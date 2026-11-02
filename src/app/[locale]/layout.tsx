import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers/providers";
import { siteConfig } from "@/lib/constants/site";
import "@/styles/tailwind-compiled.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s · MOLARYA UZ",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "kimyo",
    "virtual laboratoriya",
    "AI repetitor",
    "davriy jadval",
    "3D molekulalar",
    "kimyo ta'limi",
    "O'zbekiston",
    "EdTech",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "uz_UZ",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#071120" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
