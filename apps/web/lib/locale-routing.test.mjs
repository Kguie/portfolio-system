import assert from "node:assert/strict";
import test from "node:test";

import { stripLocalePrefix, swapLocalePath, toLocalePath } from "./locale-routing.mjs";

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

test("toLocalePath produces unprefixed english paths", () => {
  assert.equal(toLocalePath("/fr", "en"), "/");
  assert.equal(toLocalePath("/fr/projects", "en"), "/projects");
  assert.equal(toLocalePath("/projects", "en"), "/projects");
});

test("toLocalePath produces french-prefixed paths", () => {
  assert.equal(toLocalePath("/", "fr"), "/fr");
  assert.equal(toLocalePath("/projects", "fr"), "/fr/projects");
  assert.equal(toLocalePath("/fr/labs", "fr"), "/fr/labs");
});

test("swapLocalePath switches from /fr to explicit /en", () => {
  assert.equal(swapLocalePath("/fr", "en"), "/en");
});

test("swapLocalePath switches nested french path to explicit english path", () => {
  assert.equal(swapLocalePath("/fr/architecture", "en"), "/en/architecture");
});

test("swapLocalePath switches between /en and /fr both ways", () => {
  assert.equal(swapLocalePath("/en", "fr"), "/fr");
  assert.equal(swapLocalePath("/fr", "en"), "/en");
});
