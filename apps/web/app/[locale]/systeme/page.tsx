import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { LiveRuntimeMetrics } from "@/components/home/live-runtime-metrics";
import { SystemSheetCard } from "@/components/home/system-sheet-card";
import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/panel";
import { swapLocalePath } from "@/lib/locale-routing.mjs";
import { buildLocalizedMetadata } from "@/lib/seo";

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
    path: "/systeme",
  });
}

export default async function SystemePage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "LabsPage" });

  const systemSheetLines = [
    t("systemSheet.line1"),
    t("systemSheet.line2"),
    t("systemSheet.line3"),
    t("systemSheet.line4"),
    t("systemSheet.line5"),
    t("systemSheet.line6"),
    t("systemSheet.line7"),
  ];

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

          <GlowCard id="live-metrics" className="mx-auto mt-10 w-full max-w-5xl p-5 text-left">
            <h2 className="text-xl font-semibold tracking-tight">{t("liveMetrics.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("liveMetrics.description")}</p>
            <LiveRuntimeMetrics />
            <p className="mt-4 text-xs text-muted-foreground">{t("restrictedObservabilityNote")}</p>
            <Button asChild variant="outline" size="sm" className="mt-5 rounded-full">
              <Link href={swapLocalePath("/architecture", resolvedLocale)}>
                {t("liveMetrics.internalCta")}
              </Link>
            </Button>
          </GlowCard>

          <GlowCard className="mx-auto mt-6 w-full max-w-5xl p-5 text-left">
            <h2 className="text-xl font-semibold tracking-tight">{t("restrictedObservabilityTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("restrictedObservabilityNote")}</p>
            <Button variant="outline" size="sm" className="mt-5 rounded-full" disabled>
              {t("restrictedAccessCta")}
            </Button>
          </GlowCard>

          <div id="system-sheet">
            <SystemSheetCard
              title={t("systemSheet.title")}
              lines={systemSheetLines}
              className="mx-auto mt-6 w-full max-w-5xl"
            />
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
