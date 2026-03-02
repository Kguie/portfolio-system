import assert from "node:assert/strict";
import test from "node:test";

import { getCvUrl } from "./cv.mjs";

test("getCvUrl returns french CV for fr locale", () => {
  assert.equal(getCvUrl("fr"), "/cv/kevin-guieba-cv-fr-2026.pdf");
});

test("getCvUrl returns french CV for regional french locale", () => {
  assert.equal(getCvUrl("fr-FR"), "/cv/kevin-guieba-cv-fr-2026.pdf");
});

test("getCvUrl defaults to english CV for en locale", () => {
  assert.equal(getCvUrl("en"), "/cv/kevin-guieba-cv-en-2026.pdf");
});

test("getCvUrl defaults to english CV for unknown locale", () => {
  assert.equal(getCvUrl("es"), "/cv/kevin-guieba-cv-en-2026.pdf");
});

test("getCvUrl handles empty locale safely", () => {
  assert.equal(getCvUrl(""), "/cv/kevin-guieba-cv-en-2026.pdf");
});
