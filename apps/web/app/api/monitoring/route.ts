import { NextResponse } from "next/server";
import {
  buildUnknownSnapshot,
  computeMonitoringStatus,
  toFiniteNumber,
} from "@/lib/monitoring-utils";

export const revalidate = 30;

const VM_BASE_URL = process.env.VM_BASE_URL;
const VM_BASIC_USER = process.env.VM_BASIC_USER;
const VM_BASIC_PASS = process.env.VM_BASIC_PASS;

const QUERY_TIMEOUT_MS = 5_000;
const VM_QUERY_PATHS = ["api/v1/query", "prometheus/api/v1/query"] as const;

// Fixed query map prevents PromQL injection from request input.
const QUERIES = {
  cpu: '100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100)',
  memory:
    "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100",
  disk:
    '(1 - (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})) * 100',
  podsRunning: 'count(kube_pod_status_phase{namespace="prod",phase="Running"})',
  restarts24h:
    'sum(increase(kube_pod_container_status_restarts_total{namespace="prod"}[24h]))',
} as const;

async function vmQuery(query: string): Promise<number> {
  if (!VM_BASE_URL || !VM_BASIC_USER || !VM_BASIC_PASS) {
    throw new Error("VictoriaMetrics environment variables are not configured.");
  }

  const controller = new AbortController();
  // Timeout avoids hanging requests and keeps endpoint latency predictable.
  const timeoutId = setTimeout(() => controller.abort(), QUERY_TIMEOUT_MS);

  try {
    const baseUrl = VM_BASE_URL.endsWith("/") ? VM_BASE_URL : `${VM_BASE_URL}/`;
    const auth = Buffer.from(`${VM_BASIC_USER}:${VM_BASIC_PASS}`).toString(
      "base64",
    );

    let lastErrorMessage = "unknown VictoriaMetrics error";

    for (const queryPath of VM_QUERY_PATHS) {
      const endpoint = new URL(queryPath, baseUrl);
      endpoint.searchParams.set("query", query);

      const response = await fetch(endpoint.toString(), {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        lastErrorMessage = `path=${queryPath} status=${response.status}`;
        continue;
      }

      const payload = (await response.json()) as {
        data?: { result?: Array<{ value?: [number, string] }> };
      };
      const raw = payload.data?.result?.[0]?.value?.[1];

      // Missing/empty metric samples are treated as zero-value signals.
      return toFiniteNumber(raw);
    }

    throw new Error(
      `VictoriaMetrics request failed for all known paths (${lastErrorMessage}).`,
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("VictoriaMetrics request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET() {
  try {
    // Server-side only keeps Basic Auth credentials out of the browser.
    const results = await Promise.allSettled([
      vmQuery(QUERIES.cpu),
      vmQuery(QUERIES.memory),
      vmQuery(QUERIES.disk),
      vmQuery(QUERIES.podsRunning),
      vmQuery(QUERIES.restarts24h),
    ]);

    if (results.some((result) => result.status === "rejected")) {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error("VictoriaMetrics query failed", {
            query: Object.keys(QUERIES)[index],
            error:
              result.reason instanceof Error
                ? result.reason.message
                : "unknown error",
          });
        }
      });

      return NextResponse.json({
        ...buildUnknownSnapshot(),
      });
    }

    const [cpu, memory, disk, podsRunning, restarts24h] = results.map(
      (result) => (result as PromiseFulfilledResult<number>).value,
    );

    const status = computeMonitoringStatus({
      cpu,
      memory,
      restarts24h,
    });

    return NextResponse.json({
      cpu_percent: cpu,
      memory_percent: memory,
      disk_percent: disk,
      pods_running: podsRunning,
      restarts_24h: restarts24h,
      status,
    });
  } catch {
    return NextResponse.json({ status: "unknown" });
  }
}
