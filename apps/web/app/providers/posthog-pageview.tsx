"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

const posthogEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";
const shouldTrackPageview = posthogEnabled && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!shouldTrackPageview) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, searchParams]);

  return null;
}
