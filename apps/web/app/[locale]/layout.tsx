import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

const locales = ["en", "fr"] as const;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const brandTitle =
    resolvedLocale === "fr"
      ? "Kévin Guieba — Développeur Fullstack orienté Backend"
      : "Kévin Guieba — Fullstack Developer (Backend-Oriented)";
  const brandDescription =
    resolvedLocale === "fr"
      ? "Développeur fullstack orienté backend et architecture. Je conçois des applications prêtes pour la production, du mobile au backend."
      : "Fullstack developer focused on backend and scalable systems. I build production-ready applications across web, mobile and backend environments.";

  return {
    title: {
      default: brandTitle,
      template: `%s — ${brandTitle}`,
    },
    description: brandDescription,
    openGraph: {
      title: brandTitle,
      description: brandDescription,
      type: "website",
      siteName: brandTitle,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Kévin Guieba — Fullstack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandTitle,
      description: brandDescription,
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteNavbar locale={locale} />
      {children}
      <SiteFooter />
      {isProduction ? <SpeedInsights /> : null}
    </NextIntlClientProvider>
  );
}
