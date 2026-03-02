"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type MonitoringResponse = {
  status?: "operational" | "degraded" | "critical" | "unknown";
};

const POLL_INTERVAL_MS = 30_000;

function statusStyles(
  status: MonitoringResponse["status"],
  t: ReturnType<typeof useTranslations>,
) {
  if (status === "critical") {
    return {
      dot: "bg-rose-400",
      text: "text-rose-300",
      label: t("critical"),
    };
  }

  if (status === "degraded") {
    return {
      dot: "bg-amber-400",
      text: "text-amber-300",
      label: t("degraded"),
    };
  }

  if (status === "operational") {
    return {
      dot: "bg-emerald-400",
      text: "text-emerald-300",
      label: t("operational"),
    };
  }

  return {
    dot: "bg-zinc-400",
    text: "text-muted-foreground",
    label: t("unknown"),
  };
}

export function MonitoringStatusBadge() {
  const t = useTranslations("MonitoringBadge");
  const [status, setStatus] = useState<MonitoringResponse["status"]>("unknown");

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/monitoring", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        const body = (await response.json()) as MonitoringResponse;
        if (!cancelled) {
          setStatus(body.status ?? "unknown");
        }
      } catch {
        if (!cancelled) {
          setStatus("unknown");
        }
      }
    }

    void loadStatus();
    const intervalId = setInterval(() => {
      void loadStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const badge = statusStyles(status, t);

  return (
    <p className={`inline-flex items-center gap-2 text-xs ${badge.text}`}>
      <span className={`h-2 w-2 rounded-full ${badge.dot}`} aria-hidden />
      <span>{t("label")}: {badge.label}</span>
    </p>
  );
}
