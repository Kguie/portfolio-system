"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { GlowCard } from "@/components/ui/panel";

type MonitoringSnapshot = {
  cpu_percent?: number;
  memory_percent?: number;
  disk_percent?: number;
  pods_running?: number;
  restarts_24h?: number;
  status?: "operational" | "degraded" | "critical" | "unknown";
};

const POLL_INTERVAL_MS = 30_000;

function asFinite(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampPercent(value: number | null): number {
  if (value === null) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
}

function formatPercent(value: number | null): string {
  if (value === null) {
    return "--";
  }

  return `${value.toFixed(1)}%`;
}

function statusLabel(
  status: MonitoringSnapshot["status"],
  t: ReturnType<typeof useTranslations>,
): string {
  if (status === "critical") {
    return t("statusCritical");
  }

  if (status === "degraded") {
    return t("statusDegraded");
  }

  if (status === "operational") {
    return t("statusOperational");
  }

  return t("statusUnknown");
}

export function LiveRuntimeMetrics() {
  const t = useTranslations("LiveMetricsWidget");
  const [snapshot, setSnapshot] = useState<MonitoringSnapshot>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSnapshot() {
      try {
        const response = await fetch("/api/monitoring", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        const body = (await response.json()) as MonitoringSnapshot;
        if (!cancelled) {
          setHasError(false);
          setSnapshot(body);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
          setSnapshot({});
          setIsLoading(false);
        }
      }
    }

    void loadSnapshot();
    const intervalId = setInterval(() => {
      void loadSnapshot();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const cpu = asFinite(snapshot.cpu_percent);
  const memory = asFinite(snapshot.memory_percent);
  const disk = asFinite(snapshot.disk_percent);
  const pods = asFinite(snapshot.pods_running);
  const healthLabel = hasError
    ? t("unavailable")
    : isLoading
      ? t("loading")
      : statusLabel(snapshot.status, t);

  return (
    <div className="mt-5">
      <p className="mb-3 text-xs text-muted-foreground/85">{t("stateLabel")}: {healthLabel}</p>
      <div className="grid grid-cols-2 gap-3">
      <GlowCard className="p-3">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t("cpu")}</p>
        <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">
          {formatPercent(cpu)}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/35">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-200/62 to-sky-300/55 transition-[width] duration-500"
            style={{ width: `${clampPercent(cpu)}%` }}
          />
        </div>
      </GlowCard>
      <GlowCard className="p-3">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t("memory")}</p>
        <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">
          {formatPercent(memory)}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/35">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-200/62 to-sky-300/55 transition-[width] duration-500"
            style={{ width: `${clampPercent(memory)}%` }}
          />
        </div>
      </GlowCard>
      <GlowCard className="p-3">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t("disk")}</p>
        <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">
          {formatPercent(disk)}
        </p>
      </GlowCard>
      <GlowCard className="p-3">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t("pods")}</p>
        <p className="mt-2 text-[1.65rem] font-semibold tracking-tight text-foreground tabular-nums">
          {pods === null ? "--" : Math.round(pods)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/85">
          {t("statusLabel")}: {healthLabel}
        </p>
      </GlowCard>
      </div>
    </div>
  );
}
