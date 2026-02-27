import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { Spotlight } from "@/components/aceternity/spotlight";
import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { toLocalePath } from "@/lib/locale-routing.mjs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "Home" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const tHome = await getTranslations({ locale: resolvedLocale, namespace: "Home" });

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16">
      <Spotlight />
      <LayoutContainer>
        <section className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
            {tHome("headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {tHome("subheadline")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href={toLocalePath("/architecture", resolvedLocale)}>
                {tHome("ctaArchitecture")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href={toLocalePath("/hire", resolvedLocale)}>
                {tHome("ctaWorkWithMe")}
              </Link>
            </Button>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
