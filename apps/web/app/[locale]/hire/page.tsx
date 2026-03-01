import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CopyEmailAction } from "@/components/copy-email-action";
import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GlowCard, Panel } from "@/components/ui/panel";
import { buildLocalizedMetadata } from "@/lib/seo";

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
  const availabilityItems = [
    t("availabilityPoint1"),
    t("availabilityPoint2"),
    t("availabilityPoint3"),
    t("availabilityPoint4"),
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
              <h2 className="text-xl font-semibold tracking-tight">{t("availabilityTitle")}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {availabilityItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Panel>

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
              <h2 className="text-xl font-semibold tracking-tight">{t("finalCtaTitle")}</h2>
              <p className="mt-2 text-sm text-white/60">{t("responseLine")}</p>
              <div className="mt-5">
                <Button
                  asChild
                  className="group rounded-full px-5 shadow-[0_0_0_1px_rgba(125,211,252,0.22)] transition-shadow hover:shadow-[0_0_18px_rgba(34,211,238,0.28)]"
                >
                  <a
                    href="mailto:kevin.guieba@gmail.com"
                    className="inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m4.8 7.1 7.2 5.8 7.2-5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t("finalCtaButton")}
                  </a>
                </Button>
              </div>
              <CopyEmailAction
                email="kevin.guieba@gmail.com"
                label={t("copyEmailAction")}
                copiedLabel={t("copiedLabel")}
                className="mt-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              />
            </Panel>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
