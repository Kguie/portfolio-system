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
    namespace: "ProjectsPage",
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
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

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border/70 bg-card/70 p-8 text-left shadow-sm backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("comingSoonLabel")}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-card-foreground">
              {t("comingSoonTitle")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {t("comingSoonBody")}
            </p>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
