import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { swapLocalePath } from "./locale-routing.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, "../app/[locale]");

const requiredRoutePages = [
  "page.tsx",
  "architecture/page.tsx",
  "projects/page.tsx",
  "projects/event-discovery-system/page.tsx",
  "labs/page.tsx",
  "services/page.tsx",
  "hire/page.tsx",
  "not-found.tsx",
  "error.tsx",
];

const navLinks = ["/architecture", "/projects", "/labs", "/services", "/hire"];

test("required localized route files exist", () => {
  for (const routeFile of requiredRoutePages) {
    const fullPath = path.join(appDir, routeFile);
    assert.equal(fs.existsSync(fullPath), true, `Missing route file: ${routeFile}`);
  }
});

test("navbar links resolve correctly for english locale", () => {
  for (const href of navLinks) {
    assert.equal(swapLocalePath(href, "en"), `/en${href}`);
  }
});

test("navbar links resolve correctly for french locale", () => {
  for (const href of navLinks) {
    assert.equal(swapLocalePath(href, "fr"), `/fr${href}`);
  }
});
