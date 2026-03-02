import { redirect } from "next/navigation";

import { swapLocalePath } from "@/lib/locale-routing.mjs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LabsRedirectPage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";

  redirect(swapLocalePath("/systeme", resolvedLocale));
}
