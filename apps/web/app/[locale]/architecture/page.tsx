import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LayoutContainer } from "@/components/layout/container";
import { GlowCard, Panel } from "@/components/ui/panel";
import { buildLocalizedMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({
    locale: resolvedLocale,
    namespace: "ArchitecturePage",
  });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/architecture",
  });
}

export default async function ArchitecturePage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({
    locale: resolvedLocale,
    namespace: "ArchitecturePage",
  });

  const flowCards = [
    { key: "mobile", tech: "Expo" },
    { key: "api", tech: "Go" },
    { key: "services", tech: t("cards.services.tech") },
  ] as const;

  const platformCards = [
    { key: "postgres", tech: "PostgreSQL" },
    { key: "fcm", tech: "Firebase Cloud Messaging" },
    { key: "observability", tech: t("cards.observability.tech") },
  ] as const;

  const topCards = [...flowCards] as const;

  function NodeCard({
    card,
  }: {
    card: { key: string; tech: string };
  }) {
    return (
      <GlowCard className="relative h-full min-h-[15.25rem] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.13em] text-muted-foreground">
          {t(`cards.${card.key}.title`)}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("labels.role")}:</span>{" "}
          {t(`cards.${card.key}.role`)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("labels.tech")}:</span> {card.tech}
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>{t(`cards.${card.key}.bullet1`)}</li>
          <li>{t(`cards.${card.key}.bullet2`)}</li>
        </ul>
      </GlowCard>
    );
  }

  return (
    <main className="relative py-16 sm:py-20">
      <LayoutContainer>
        <section className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        <Panel className="mx-auto mt-14 w-full max-w-6xl rounded-3xl p-6 text-left sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("overviewTitle")}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {t("overviewSubtitle")}
          </p>

          <div className="relative mt-8 space-y-10">
            <div className="relative">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block">
                <div className="mx-auto h-px w-[66%] bg-gradient-to-r from-cyan-300/0 via-cyan-300/55 to-cyan-300/0" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {topCards.map((card) => (
                  <NodeCard key={card.key} card={card} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -top-10 left-0 right-0 hidden h-12 md:block">
                <span className="absolute left-[83.333%] top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-cyan-300/35" />
                <span className="absolute left-[16.666%] right-[16.666%] top-6 h-px bg-gradient-to-r from-cyan-300/35 via-cyan-300/60 to-cyan-300/35" />
                <span className="absolute left-[16.666%] top-6 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-cyan-300/35" />
                <span className="absolute left-1/2 top-6 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-cyan-300/35" />
                <span className="absolute left-[83.333%] top-6 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 to-cyan-300/35" />
              </div>

              <div className="mb-5 flex items-center gap-3 text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium uppercase tracking-[0.12em]">
                  {t("platformLabel")}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {platformCards.map((card) => (
                  <NodeCard key={card.key} card={card} />
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <section className="mx-auto mt-6 grid w-full max-w-6xl gap-4 md:grid-cols-3">
          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold tracking-tight">{t("overviewSection.title")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>{t("overviewSection.point1")}</li>
              <li>{t("overviewSection.point2")}</li>
              <li>{t("overviewSection.point3")}</li>
            </ul>
          </GlowCard>
          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold tracking-tight">{t("decisionsSection.title")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>{t("decisionsSection.point1")}</li>
              <li>{t("decisionsSection.point2")}</li>
              <li>{t("decisionsSection.point3")}</li>
            </ul>
          </GlowCard>
          <GlowCard className="p-5">
            <h3 className="text-lg font-semibold tracking-tight">{t("scalingSection.title")}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>{t("scalingSection.point1")}</li>
              <li>{t("scalingSection.point2")}</li>
              <li>{t("scalingSection.point3")}</li>
            </ul>
          </GlowCard>
        </section>
      </LayoutContainer>
    </main>
  );
}
