import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { DownloadCvButton } from "@/components/download-cv-button";
import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GlowCard, Panel } from "@/components/ui/panel";
import { buildLocalizedMetadata } from "@/lib/seo";
import { swapLocalePath } from "@/lib/locale-routing.mjs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "HirePage" });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/hire",
  });
}

export default async function HirePage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "HirePage" });
  const bringItems = [
    t("bringPoint1"),
    t("bringPoint2"),
    t("bringPoint3"),
    t("bringPoint4"),
    t("bringPoint5"),
  ];
  const stackItems = [
    t("stackItem1"),
    t("stackItem2"),
    t("stackItem3"),
    t("stackItem4"),
    t("stackItem5"),
    t("stackItem6"),
    t("stackItem7"),
  ];

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16">
      <LayoutContainer>
        <section className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground/90">
            {t("locationLine")}
          </p>

          <div className="mx-auto mt-10 grid w-full gap-4 md:grid-cols-2">
            <GlowCard className="p-6 text-left">
              <h2 className="text-xl font-semibold tracking-tight">{t("whoTitle")}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("whoBody")}</p>
            </GlowCard>

            <GlowCard className="p-6 text-left">
              <h2 className="text-xl font-semibold tracking-tight">{t("bringTitle")}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {bringItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlowCard>

            <Panel className="p-6 text-left md:col-span-2">
              <h2 className="text-xl font-semibold tracking-tight">{t("searchTitle")}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("searchPrimary")}</p>
              <p className="mt-2 text-sm text-muted-foreground/90">{t("searchSecondary")}</p>
            </Panel>

            <Panel className="p-6 text-left md:col-span-2">
              <h2 className="text-xl font-semibold tracking-tight">{t("careerTitle")}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("careerBody")}</p>
            </Panel>

            <GlowCard className="p-6 text-left md:col-span-2">
              <h2 className="text-xl font-semibold tracking-tight">{t("stackTitle")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-foreground/88"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>

            <Panel className="p-6 text-left md:col-span-2">
              <h2 className="text-xl font-semibold tracking-tight">{t("ctaTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("ctaSubtitle")}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <DownloadCvButton className="rounded-full px-5" />
                <Button asChild variant="outline" className="rounded-full px-5">
                  <a href="mailto:kevin.guieba@gmail.com">{t("emailCta")}</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-5">
                  <Link href={swapLocalePath("/projects", resolvedLocale)}>{t("projectsCta")}</Link>
                </Button>
              </div>
            </Panel>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
