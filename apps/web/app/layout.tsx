import type { Metadata } from "next";
import { PostHogProviderWrapper } from "@/app/providers/posthog-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const defaultTitle = "Kévin Guieba — Fullstack Developer (Backend-Oriented)";
const defaultDescription =
  "Fullstack developer focused on backend and scalable systems. I build production-ready applications across web, mobile and backend environments.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    siteName: defaultTitle,
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
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <PostHogProviderWrapper>{children}</PostHogProviderWrapper>
      </body>
    </html>
  );
}
