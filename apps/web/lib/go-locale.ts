import { resolveLocaleFromCookieLocale as resolveFromJs } from "./go-locale.mjs";

export function resolveLocaleFromCookieLocale(cookieLocale?: string): "fr" | "en" {
  return resolveFromJs(cookieLocale) as "fr" | "en";
}
