import assert from "node:assert/strict";
import test from "node:test";

import {
  buildUnknownSnapshot,
  computeMonitoringStatus,
  toFiniteNumber,
} from "./monitoring-utils.mjs";

test("toFiniteNumber converts finite values", () => {
  assert.equal(toFiniteNumber("12.5"), 12.5);
  assert.equal(toFiniteNumber(7), 7);
});

test("toFiniteNumber falls back to 0 for invalid values", () => {
  assert.equal(toFiniteNumber("abc"), 0);
  assert.equal(toFiniteNumber(undefined), 0);
});

test("computeMonitoringStatus returns critical for high memory", () => {
  assert.equal(
    computeMonitoringStatus({ cpu: 30, memory: 90, restarts24h: 0 }),
    "critical",
  );
});

test("computeMonitoringStatus returns critical for high restarts", () => {
  assert.equal(
    computeMonitoringStatus({ cpu: 20, memory: 40, restarts24h: 6 }),
    "critical",
  );
});

test("computeMonitoringStatus returns degraded for medium pressure", () => {
  assert.equal(
    computeMonitoringStatus({ cpu: 81, memory: 60, restarts24h: 0 }),
    "degraded",
  );
});

test("computeMonitoringStatus returns operational for healthy values", () => {
  assert.equal(
    computeMonitoringStatus({ cpu: 40, memory: 50, restarts24h: 0 }),
    "operational",
  );
});

test("buildUnknownSnapshot returns safe fallback payload", () => {
  assert.deepEqual(buildUnknownSnapshot(), {
    cpu_percent: 0,
    memory_percent: 0,
    disk_percent: 0,
    pods_running: 0,
    restarts_24h: 0,
    status: "unknown",
  });
});
