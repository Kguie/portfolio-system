import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Portfolio Control Panel",
    template: "%s | Portfolio Control Panel",
  },
  description: "Engineering portfolio with architecture, projects, services, and labs.",
  openGraph: {
    title: "Portfolio Control Panel",
    description: "Engineering portfolio with architecture, projects, services, and labs.",
    type: "website",
    siteName: "Portfolio Control Panel",
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
