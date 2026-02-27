"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { swapLocalePath } from "@/lib/locale-routing.mjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            className="rounded-md px-1 text-sm font-semibold tracking-[0.08em] text-foreground/92 uppercase transition-colors hover:text-foreground"
            aria-label="Go to homepage"
          >
            KGUIE
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              aria-label="Switch language"
              className="rounded-full border-border/70 bg-background/55 px-4 font-medium tracking-[0.02em] text-foreground transition-colors hover:bg-background/80"
            >
              {locale.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-28 border-border/70 bg-background/95">
            <DropdownMenuItem asChild>
              <Link href={enSwitchHref}>EN</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={frSwitchHref}>FR</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
