import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  description: "Engineering portfolio with architecture, projects, services, and labs.",
  openGraph: {
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Kévin Guieba — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og"],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
