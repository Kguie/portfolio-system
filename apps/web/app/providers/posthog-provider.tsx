"use client";

import { ReactNode, Suspense, useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { PostHogPageview } from "@/app/providers/posthog-pageview";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.posthog.com";
const posthogEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";
const shouldInitPostHog = posthogEnabled && Boolean(posthogKey);

let hasInitializedPostHog = false;

type PostHogProviderWrapperProps = {
  children: ReactNode;
};

export function PostHogProviderWrapper({ children }: PostHogProviderWrapperProps) {
  useEffect(() => {
    if (!shouldInitPostHog || hasInitializedPostHog) {
      return;
    }

    posthog.init(posthogKey as string, {
      api_host: posthogHost,
      capture_pageview: false,
      capture_pageleave: true,
    });

    hasInitializedPostHog = true;
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}

export function captureEvent(name: string, props?: Record<string, unknown>) {
  if (!shouldInitPostHog) {
    return;
  }

  posthog.capture(name, props);
}
