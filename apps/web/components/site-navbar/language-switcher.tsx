"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageSwitcherProps = {
  locale: "en" | "fr";
  enHref: string;
  frHref: string;
};

export function LanguageSwitcher({ locale, enHref, frHref }: LanguageSwitcherProps) {
  return (
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
          <Link href={enHref}>EN</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={frHref}>FR</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
