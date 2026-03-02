import type { NextRequest } from "next/server";
import { resolveLocaleFromCookieLocale } from "@/lib/go-locale";

export function resolveLocaleFromRequest(request: NextRequest): "fr" | "en" {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  return resolveLocaleFromCookieLocale(cookieLocale);
}
