import assert from "node:assert/strict";
import test from "node:test";

import { resolveLocaleFromCookieLocale } from "./go-locale.mjs";

test("resolveLocaleFromCookieLocale returns fr for fr cookie", () => {
  assert.equal(resolveLocaleFromCookieLocale("fr"), "fr");
});

test("resolveLocaleFromCookieLocale defaults to en when cookie missing", () => {
  assert.equal(resolveLocaleFromCookieLocale(undefined), "en");
});

test("resolveLocaleFromCookieLocale defaults to en for unsupported locale", () => {
  assert.equal(resolveLocaleFromCookieLocale("es"), "en");
});
