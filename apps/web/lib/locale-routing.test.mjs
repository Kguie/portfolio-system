import assert from "node:assert/strict";
import test from "node:test";

import { stripLocalePrefix, toLocalePath } from "./locale-routing.mjs";

test("stripLocalePrefix handles locale roots", () => {
  assert.equal(stripLocalePrefix("/fr"), "/");
  assert.equal(stripLocalePrefix("/en"), "/");
});

test("stripLocalePrefix removes nested locale prefixes", () => {
  assert.equal(stripLocalePrefix("/fr/projects"), "/projects");
  assert.equal(stripLocalePrefix("/en/services"), "/services");
});

test("stripLocalePrefix leaves non-localized paths unchanged", () => {
  assert.equal(stripLocalePrefix("/projects"), "/projects");
  assert.equal(stripLocalePrefix("/"), "/");
});

test("toLocalePath produces english-prefixed paths", () => {
  assert.equal(toLocalePath("/fr", "en"), "/en");
  assert.equal(toLocalePath("/fr/projects", "en"), "/en/projects");
  assert.equal(toLocalePath("/projects", "en"), "/en/projects");
});

test("toLocalePath produces french-prefixed paths", () => {
  assert.equal(toLocalePath("/", "fr"), "/fr");
  assert.equal(toLocalePath("/projects", "fr"), "/fr/projects");
  assert.equal(toLocalePath("/fr/labs", "fr"), "/fr/labs");
});
