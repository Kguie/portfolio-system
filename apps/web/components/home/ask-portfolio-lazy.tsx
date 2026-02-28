"use client";

import dynamic from "next/dynamic";

import type { SupportedLocale } from "@/data/portfolio-qa";

const AskPortfolioDynamic = dynamic(
  () => import("@/components/home/ask-portfolio").then((mod) => mod.AskPortfolio),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3" aria-hidden>
        <div className="h-5 w-40 rounded bg-muted/45" />
        <div className="h-4 w-72 rounded bg-muted/35" />
        <div className="h-9 w-full rounded-md bg-muted/35" />
        <div className="h-8 w-full rounded-md bg-muted/30" />
      </div>
    ),
  },
);

type AskPortfolioLazyProps = {
  locale: SupportedLocale;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
};

export function AskPortfolioLazy(props: AskPortfolioLazyProps) {
  return <AskPortfolioDynamic {...props} />;
}
