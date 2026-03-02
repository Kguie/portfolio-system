import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const localizedRoutes = [
  "/en",
  "/fr",
  "/en/architecture",
  "/fr/architecture",
  "/en/projects",
  "/fr/projects",
  "/en/services",
  "/fr/services",
  "/en/hire",
  "/fr/hire",
  "/en/systeme",
  "/fr/systeme",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return localizedRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/en" || route === "/fr" ? 1 : 0.7,
  }));
}
