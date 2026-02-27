"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { swapLocalePath, toLocalePath } from "@/lib/locale-routing.mjs";
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

export function SiteNavbar({ locale }: SiteNavbarProps) {
  const tNav = useTranslations("Nav");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = pathname || "/";
  const query = searchParams.toString();
  const enHref = swapLocalePath(currentPath, "en");
  const frHref = swapLocalePath(currentPath, "fr");
  const enSwitchHref = query ? `${enHref}?${query}` : enHref;
  const frSwitchHref = query ? `${frHref}?${query}` : frHref;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.key}
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full text-foreground/85 transition-colors hover:text-foreground"
            >
              <Link href={toLocalePath(item.href, locale)}>
                {tNav(item.key)}
              </Link>
            </Button>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              aria-label="Switch language"
              className="rounded-full transition-colors"
            >
              {locale.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-28">
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
