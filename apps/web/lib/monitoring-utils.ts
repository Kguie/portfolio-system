import {
  buildUnknownSnapshot as buildUnknownSnapshotFromJs,
  computeMonitoringStatus as computeMonitoringStatusFromJs,
  toFiniteNumber as toFiniteNumberFromJs,
} from "./monitoring-utils.mjs";

export type MonitoringStatus = "operational" | "degraded" | "critical" | "unknown";

export function toFiniteNumber(value: unknown): number {
  return toFiniteNumberFromJs(value);
}

export function computeMonitoringStatus(input: {
  cpu: number;
  memory: number;
  restarts24h: number;
}): Exclude<MonitoringStatus, "unknown"> {
  return computeMonitoringStatusFromJs(input) as Exclude<MonitoringStatus, "unknown">;
}

export function buildUnknownSnapshot(): {
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  pods_running: number;
  restarts_24h: number;
  status: "unknown";
} {
  return buildUnknownSnapshotFromJs() as {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
    pods_running: number;
    restarts_24h: number;
    status: "unknown";
  };
}
