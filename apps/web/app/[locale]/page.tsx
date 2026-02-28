import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { Spotlight } from "@/components/aceternity/spotlight";
import { AskPortfolioLazy } from "@/components/home/ask-portfolio-lazy";
import { DownloadCvButton } from "@/components/download-cv-button";
import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GlowCard, Panel } from "@/components/ui/panel";
import { swapLocalePath } from "@/lib/locale-routing.mjs";
import { buildLocalizedMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ArchitectureNodeProps = {
  title: string;
  subtitle: string;
  kind: "mobile" | "api" | "services" | "platform";
  connectRight?: boolean;
};

function ArchitectureNode({
  title,
  subtitle,
  kind,
  connectRight = false,
}: ArchitectureNodeProps) {
  const icon =
    kind === "mobile" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <rect x="7" y="2.8" width="10" height="18.4" rx="2.3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="17.8" r="0.9" fill="currentColor" />
      </svg>
    ) : kind === "api" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ) : kind === "services" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <rect x="3" y="4" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="4" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="14" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 10v4M7 10l5 4M17 10l-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <ellipse cx="12" cy="6.5" rx="7" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 6.5v7c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5v-7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 10c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );

  return (
    <GlowCard className="group relative p-3.5 sm:p-4">
      {connectRight ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-3 -translate-y-1/2 sm:block"
        >
          <span className="block h-px w-full bg-gradient-to-r from-cyan-300/55 to-cyan-300/0" />
          <span className="absolute inset-0 blur-[1px] bg-cyan-300/35" />
        </span>
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/0 transition-colors group-hover:border-cyan-300/18"
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 transition-colors group-hover:border-cyan-300/40 group-hover:text-cyan-100">
          {icon}
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm text-foreground/92">{subtitle}</p>
    </GlowCard>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: resolvedLocale, namespace: "Home" });

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const tHome = await getTranslations({ locale: resolvedLocale, namespace: "Home" });

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16">
      <Spotlight />
      <LayoutContainer>
        <section className="relative isolate mx-auto w-full max-w-4xl text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 -z-10 h-56 w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(55%_62%_at_50%_50%,rgba(34,211,238,0.22),rgba(34,211,238,0.06)_45%,transparent_75%)] blur-2xl sm:h-64"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground sm:text-sm">
            {tHome("heroName")}
          </p>
          <p className="mt-2 text-sm font-normal tracking-[0.04em] text-foreground/76 sm:text-base">
            {tHome("heroRole")}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground/84 sm:text-sm">
            {tHome("heroSpecialization")}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
            {tHome("headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {tHome("subheadline")}
          </p>
          <Panel className="mx-auto mt-6 flex max-w-fit flex-wrap items-center justify-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground sm:text-sm">
            <span className="font-medium text-foreground/90">{tHome("statusLabel")}:</span>
            <span>{tHome("statusBuilding")}</span>
            <span className="opacity-55">•</span>
            <span>{tHome("statusGoApi")}</span>
            <span className="opacity-55">•</span>
            <span>{tHome("statusExpoClient")}</span>
            <span className="opacity-55">•</span>
            <span>{tHome("statusObservability")}</span>
          </Panel>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="rounded-full bg-gradient-to-r from-cyan-300/45 via-sky-300/35 to-cyan-300/45 p-[1px] shadow-[0_0_0_1px_rgba(125,211,252,0.22),0_0_22px_rgba(34,211,238,0.15)]">
              <Button asChild size="lg" className="rounded-full bg-background px-6 text-foreground hover:bg-background/90">
                <Link href={swapLocalePath("/architecture", resolvedLocale)}>
                  {tHome("ctaArchitecture")}
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href={swapLocalePath("/hire", resolvedLocale)}>
                {tHome("ctaWorkWithMe")}
              </Link>
            </Button>
            <DownloadCvButton variant="outline" size="lg" className="rounded-full px-6" />
          </div>
        </section>

        <section className="mx-auto mt-10 grid w-full max-w-6xl gap-4 md:grid-cols-5">
          <Panel className="md:col-span-3 p-6 text-left">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {tHome("aboutTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {tHome("aboutBody")}
            </p>
          </Panel>
          <GlowCard className="md:col-span-2 p-6 text-left">
            <h2 className="text-xl font-semibold tracking-tight">
              {tHome("impactTitle")}
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>{tHome("impactPoint1")}</li>
              <li>{tHome("impactPoint2")}</li>
              <li>{tHome("impactPoint3")}</li>
              <li>{tHome("impactPoint4")}</li>
            </ul>
          </GlowCard>
        </section>

        <section className="mx-auto mt-14 grid w-full max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Panel className="order-1 md:col-span-2 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {tHome("panelArchitectureTitle")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {tHome("panelArchitectureSubtitle")}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href={swapLocalePath("/architecture", resolvedLocale)}>
                  {tHome("panelArchitectureCta")}
                </Link>
              </Button>
            </div>
            <div className="relative mt-5">
              <div className="relative grid gap-3 sm:grid-cols-4">
                <ArchitectureNode
                  kind="mobile"
                  title={tHome("architectureFlowMobile")}
                  subtitle="Expo"
                  connectRight
                />
                <ArchitectureNode
                  kind="api"
                  title={tHome("architectureFlowApi")}
                  subtitle="Go"
                  connectRight
                />
                <ArchitectureNode
                  kind="services"
                  title={tHome("architectureFlowServices")}
                  subtitle={tHome("architectureFlowServicesStack")}
                  connectRight
                />
                <ArchitectureNode
                  kind="platform"
                  title={tHome("architectureFlowPlatform")}
                  subtitle={tHome("architectureFlowPlatformStack")}
                />
              </div>
            </div>
          </Panel>

          <Panel className="order-4 md:order-2 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {tHome("panelMetricsTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tHome("panelMetricsSubtitle")}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.02em] text-muted-foreground/65">
                  {tHome("metricsDemoNote")}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <GlowCard className="p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">CPU</p>
                <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">{tHome("metricCpu")}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/35">
                  <div className="metric-shimmer h-full w-[43%] rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-200/62 to-sky-300/55" />
                </div>
              </GlowCard>
              <GlowCard className="p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Memory</p>
                <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">{tHome("metricMemory")}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/35">
                  <div className="metric-shimmer h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-200/62 to-sky-300/55" />
                </div>
              </GlowCard>
              <GlowCard className="p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Requests</p>
                <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">{tHome("metricRequests")}</p>
              </GlowCard>
              <GlowCard className="p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Uptime</p>
                <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">{tHome("metricUptime")}</p>
              </GlowCard>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full rounded-full">
              <Link href={swapLocalePath("/labs", resolvedLocale)}>
                {tHome("panelMetricsCta")}
              </Link>
            </Button>
          </Panel>

          <Panel className="order-2 md:order-3 md:col-span-2 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {tHome("panelCaseStudyTitle")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {tHome("panelCaseStudySubtitle")}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link
                  href={swapLocalePath(
                    "/projects/event-discovery-system",
                    resolvedLocale,
                  )}
                >
                  {tHome("panelCaseStudyCta")}
                </Link>
              </Button>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              <GlowCard className="p-4 text-sm text-muted-foreground">
                <p>{tHome("caseStudyPoint1")}</p>
              </GlowCard>
              <GlowCard className="p-4 text-sm text-muted-foreground">
                <p>{tHome("caseStudyPoint2")}</p>
              </GlowCard>
              <GlowCard className="p-4 text-sm text-muted-foreground">
                <p>{tHome("caseStudyPoint3")}</p>
              </GlowCard>
            </ul>
          </Panel>

          <Panel className="order-3 md:order-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {tHome("panelServicesTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tHome("panelServicesSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <GlowCard className="p-3">
                <p className="text-sm font-medium">{tHome("serviceItem1")}</p>
              </GlowCard>
              <GlowCard className="p-3">
                <p className="text-sm font-medium">{tHome("serviceItem2")}</p>
              </GlowCard>
              <GlowCard className="p-3">
                <p className="text-sm font-medium">{tHome("serviceItem3")}</p>
              </GlowCard>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full rounded-full">
              <Link href={swapLocalePath("/services", resolvedLocale)}>
                {tHome("panelServicesCta")}
              </Link>
            </Button>
          </Panel>

          <Panel className="order-5 md:order-5 md:col-span-2 xl:col-span-3 p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {tHome("panelLabsTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tHome("panelLabsSubtitle")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href={swapLocalePath("/labs", resolvedLocale)}>
                      {tHome("labsShortcut1")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href={swapLocalePath("/projects", resolvedLocale)}>
                      {tHome("labsShortcut2")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href={swapLocalePath("/labs", resolvedLocale)}>
                      {tHome("labsShortcut3")}
                    </Link>
                  </Button>
                </div>
              </div>
              <GlowCard className="p-4 sm:p-5">
                <AskPortfolioLazy
                  locale={resolvedLocale}
                  title={tHome("askTitle")}
                  subtitle={tHome("askSubtitle")}
                  placeholder={tHome("askPlaceholder")}
                  buttonLabel={tHome("askButton")}
                />
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-full">
                  <Link href={swapLocalePath("/labs", resolvedLocale)}>
                    {tHome("panelLabsCta")}
                  </Link>
                </Button>
              </GlowCard>
            </div>
          </Panel>
        </section>
      </LayoutContainer>
    </main>
  );
}
