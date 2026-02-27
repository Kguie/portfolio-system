import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LayoutContainer } from "@/components/layout/container";

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

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
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

        <section className="mx-auto mt-14 w-full max-w-6xl rounded-3xl border border-border/70 bg-card/50 p-6 text-left shadow-sm backdrop-blur sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("overviewTitle")}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {t("overviewSubtitle")}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {flowCards.map((card, index) => (
              <div
                key={card.key}
                className="contents"
              >
                <article className="group rounded-2xl border border-border/70 bg-background/80 p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(148,163,184,0.28),0_0_32px_rgba(14,165,233,0.14)]">
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
                </article>
                {index < flowCards.length - 1 ? (
                  <div className="hidden items-center justify-center text-muted-foreground md:flex">
                    <span className="text-lg">→</span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-[0.12em]">
              {t("platformLabel")}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {platformCards.map((card) => (
              <article
                key={card.key}
                className="group rounded-2xl border border-border/70 bg-background/80 p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(148,163,184,0.28),0_0_32px_rgba(14,165,233,0.14)]"
              >
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
              </article>
            ))}
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
