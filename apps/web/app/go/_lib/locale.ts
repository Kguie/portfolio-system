import type { NextRequest } from "next/server";

function getLocaleFromPathname(pathname: string): "fr" | "en" | null {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return "fr";
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return null;
}

export function resolveLocaleFromRequest(request: NextRequest): "fr" | "en" {
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const fromReferer = getLocaleFromPathname(refererUrl.pathname);

      if (fromReferer) {
        return fromReferer;
      }
    } catch {
      // Ignore malformed referer and continue with cookie fallback.
    }
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  return cookieLocale === "fr" ? "fr" : "en";
}
