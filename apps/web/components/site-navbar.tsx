"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { LanguageSwitcherLazy } from "@/components/site-navbar/language-switcher-lazy";
import { Button } from "@/components/ui/button";
import { swapLocalePath } from "@/lib/locale-routing.mjs";

type SiteNavbarProps = {
  locale: "en" | "fr";
};

const navItems = [
  { key: "architecture", href: "/architecture" },
  { key: "projects", href: "/projects" },
  { key: "labs", href: "/labs" },
  { key: "services", href: "/services" },
  { key: "hire", href: "/hire" },
] as const;

type ExternalProfileLinkProps = {
  href: string;
  label: string;
  icon: "github" | "linkedin" | "email";
};

function ExternalProfileLink({ href, label, icon }: ExternalProfileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/55 bg-background/35 text-foreground/70 transition-colors hover:border-cyan-300/28 hover:text-foreground"
    >
      {icon === "github" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.36-1.18-3.36-1.18a2.64 2.64 0 0 0-1.1-1.45c-.9-.62.06-.6.06-.6a2.1 2.1 0 0 1 1.52 1.03 2.13 2.13 0 0 0 2.9.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.94a3.85 3.85 0 0 1 1.03-2.68 3.57 3.57 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.55 9.55 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.39.84.43 1.83.1 2.65a3.84 3.84 0 0 1 1.02 2.68c0 3.84-2.33 4.68-4.56 4.93a2.39 2.39 0 0 1 .68 1.86v2.77c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      ) : null}
      {icon === "linkedin" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.06c.54-1.02 1.84-2.1 3.79-2.1 4.06 0 4.81 2.67 4.81 6.14V21h-4v-5.68c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3V21h-4V9Z" />
        </svg>
      ) : null}
      {icon === "email" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
          <rect x="3.2" y="5.5" width="17.6" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </a>
  );
}

function normalizeForActivePath(pathname: string) {
  if (pathname === "/fr" || pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/fr/")) {
    return pathname.slice(3);
  }

  if (pathname.startsWith("/en/")) {
    return pathname.slice(3);
  }

  return pathname;
}

export function SiteNavbar({ locale }: SiteNavbarProps) {
  const tNav = useTranslations("Nav");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = pathname || "/";
  const activePath = normalizeForActivePath(currentPath);
  const query = searchParams.toString();
  const enHref = swapLocalePath(currentPath, "en");
  const frHref = swapLocalePath(currentPath, "fr");
  const homeHref = swapLocalePath("/", locale);
  const enSwitchHref = query ? `${enHref}?${query}` : enHref;
  const frSwitchHref = query ? `${frHref}?${query}` : frHref;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[linear-gradient(180deg,rgba(10,14,22,0.78),rgba(10,14,22,0.56))] backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(10,14,22,0.68),rgba(10,14,22,0.46))]">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href={homeHref}
            className="rounded-md px-1 text-sm font-semibold tracking-[0.01em] text-foreground/92 transition-colors hover:text-foreground"
            aria-label="Go to homepage"
          >
            Kévin Guieba
          </Link>
          <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              activePath === item.href ||
              activePath.startsWith(`${item.href}/`);

            return (
              <Button
                key={item.key}
                asChild
                variant="ghost"
                size="sm"
                className="group relative rounded-full px-3.5 font-medium tracking-[0.01em] text-foreground/82 transition-colors hover:text-foreground"
              >
                <Link href={swapLocalePath(item.href, locale)}>
                  <span>{tNav(item.key)}</span>
                  <span
                    className={`pointer-events-none absolute inset-x-2 -bottom-1.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/90 to-cyan-300/0 blur-[0.5px] transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              </Button>
            );
          })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ExternalProfileLink
            href="/go/github"
            label="Open GitHub profile"
            icon="github"
          />
          <ExternalProfileLink
            href="/go/linkedin"
            label="Open LinkedIn profile"
            icon="linkedin"
          />
          <ExternalProfileLink
            href="/go/contact"
            label="Send email"
            icon="email"
          />
          <LanguageSwitcherLazy
            locale={locale}
            enHref={enSwitchHref}
            frHref={frSwitchHref}
          />
        </div>
      </div>
    </header>
  );
}
