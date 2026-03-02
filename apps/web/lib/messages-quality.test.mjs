import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frPath = path.resolve(__dirname, "../messages/fr.json");
const enPath = path.resolve(__dirname, "../messages/en.json");

const fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

function keySet(value, prefix = "") {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([k, v]) =>
    keySet(v, prefix ? `${prefix}.${k}` : k),
  );
}

const criticalNamespaces = [
  "Home",
  "LabsPage",
  "LiveMetricsWidget",
  "MonitoringBadge",
  "Footer",
];

for (const namespace of criticalNamespaces) {
  test(`messages parity for namespace ${namespace}`, () => {
    assert.equal(typeof fr[namespace], "object", `Missing fr namespace: ${namespace}`);
    assert.equal(typeof en[namespace], "object", `Missing en namespace: ${namespace}`);

    const frKeys = new Set(keySet(fr[namespace]));
    const enKeys = new Set(keySet(en[namespace]));

    assert.deepEqual(
      [...frKeys].sort(),
      [...enKeys].sort(),
      `Mismatched keys in namespace ${namespace}`,
    );
  });
}
