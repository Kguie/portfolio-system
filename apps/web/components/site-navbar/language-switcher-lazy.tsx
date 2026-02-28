"use client";

import dynamic from "next/dynamic";

const LanguageSwitcherDynamic = dynamic(
  () =>
    import("@/components/site-navbar/language-switcher").then(
      (mod) => mod.LanguageSwitcher,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-8 w-14 rounded-full border border-border/60 bg-background/45"
      />
    ),
  },
);

type LanguageSwitcherLazyProps = {
  locale: "en" | "fr";
  enHref: string;
  frHref: string;
};

export function LanguageSwitcherLazy(props: LanguageSwitcherLazyProps) {
  return <LanguageSwitcherDynamic {...props} />;
}
