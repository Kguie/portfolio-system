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
  const t = await getTranslations({ locale: resolvedLocale, namespace: "ServicesPage" });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "ServicesPage" });

  const offers = ["mvp", "infra", "ai"] as const;

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
            {offers.map((offer) => (
              <GlowCard key={offer} className="p-5 text-left">
                <h2 className="text-xl font-semibold tracking-tight">{t(`${offer}.title`)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${offer}.summary`)}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {t("deliverablesLabel")}
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li>{t(`${offer}.deliverable1`)}</li>
                  <li>{t(`${offer}.deliverable2`)}</li>
                </ul>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {t("goodForLabel")}
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li>{t(`${offer}.goodFor1`)}</li>
                  <li>{t(`${offer}.goodFor2`)}</li>
                </ul>
              </GlowCard>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href={swapLocalePath("/hire", resolvedLocale)}>{t("contactCta")}</Link>
            </Button>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
