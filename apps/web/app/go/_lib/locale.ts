import type { NextRequest } from "next/server";

export function resolveLocaleFromRequest(request: NextRequest): "fr" | "en" {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  return cookieLocale === "fr" ? "fr" : "en";
}
