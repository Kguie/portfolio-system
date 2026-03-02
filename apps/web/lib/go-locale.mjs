export function resolveLocaleFromCookieLocale(cookieLocale) {
  return cookieLocale === "fr" ? "fr" : "en";
}
