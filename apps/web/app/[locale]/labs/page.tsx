import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/panel";
import { buildLocalizedMetadata } from "@/lib/seo";
import { swapLocalePath } from "@/lib/locale-routing.mjs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "LabsPage" });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/labs",
  });
}

export default async function LabsPage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "LabsPage" });

  const labs = [
    { key: "apiPlayground", href: "/labs" },
    { key: "aiDemoTool", href: "/labs" },
    { key: "liveMetrics", href: "/labs" },
  ] as const;

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16">
      <LayoutContainer>
        <section className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
            {labs.map((lab) => (
              <GlowCard key={lab.key} className="p-5 text-left">
                <h2 className="text-xl font-semibold tracking-tight">{t(`${lab.key}.title`)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${lab.key}.description`)}</p>
                <Button asChild variant="outline" size="sm" className="mt-5 rounded-full">
                  <Link href={swapLocalePath(lab.href, resolvedLocale)}>{t("openLabCta")}</Link>
                </Button>
              </GlowCard>
            ))}
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
