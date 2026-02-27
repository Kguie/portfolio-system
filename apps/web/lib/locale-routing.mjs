export function stripLocalePrefix(pathname) {
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

export function toLocalePath(pathname, locale) {
  const basePath = stripLocalePrefix(pathname);

  if (locale === "fr") {
    return basePath === "/" ? "/fr" : `/fr${basePath}`;
  }

  return basePath;
}

export function swapLocalePath(pathname, locale) {
  const basePath = stripLocalePrefix(pathname);
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}
