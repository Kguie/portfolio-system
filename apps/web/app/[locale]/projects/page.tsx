import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

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
  const t = await getTranslations({
    locale: resolvedLocale,
    namespace: "ProjectsPage",
  });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "ProjectsPage" });

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

          <div className="mx-auto mt-10 w-full max-w-5xl">
            <GlowCard className="p-6 text-left">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {t("featuredTitle")}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {t("featuredSummary")}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={swapLocalePath("/projects/event-discovery-system", resolvedLocale)}>
                    {t("featuredCta")}
                  </Link>
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                  Go API
                </span>
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                  Expo
                </span>
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                  Postgres
                </span>
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                  FCM
                </span>
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                  Observability
                </span>
              </div>
            </GlowCard>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
