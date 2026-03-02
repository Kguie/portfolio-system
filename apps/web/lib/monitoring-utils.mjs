export function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function computeMonitoringStatus({ cpu, memory, restarts24h }) {
  if (memory > 85 || restarts24h > 5) {
    return "critical";
  }

  if (memory > 70 || cpu > 80) {
    return "degraded";
  }

  return "operational";
}

export function buildUnknownSnapshot() {
  return {
    cpu_percent: 0,
    memory_percent: 0,
    disk_percent: 0,
    pods_running: 0,
    restarts_24h: 0,
    status: "unknown",
  };
}
