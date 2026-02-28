import type { Metadata } from "next";

export type Locale = "en" | "fr";

type BuildLocalizedMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
};

function withLocalePath(locale: Locale, path: string) {
  const normalizedPath = path === "/" ? "" : path;
  return `/${locale}${normalizedPath}`;
}

export function buildLocalizedMetadata({
  locale,
  title,
  description,
  path,
}: BuildLocalizedMetadataInput): Metadata {
  const brandTitle =
    locale === "fr"
      ? "Kévin Guieba — Développeur Fullstack orienté Backend"
      : "Kévin Guieba — Fullstack Developer (Backend-Oriented)";
  const openGraphTitle = title === brandTitle ? title : `${title} — ${brandTitle}`;
  const ogImage = "/og-image.png";
  const canonicalPath = withLocalePath(locale, path);
  const enPath = withLocalePath("en", path);
  const frPath = withLocalePath("fr", path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: enPath,
        fr: frPath,
        "x-default": enPath,
      },
    },
    openGraph: {
      title: openGraphTitle,
      description,
      url: canonicalPath,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Kévin Guieba — Fullstack Developer",
        },
      ],
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [ogImage],
    },
  };
}
