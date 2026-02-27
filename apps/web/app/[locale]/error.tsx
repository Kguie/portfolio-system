"use client";

import { useEffect } from "react";

import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Keep this logged for debugging in production error reports.
    console.error(error);
  }, [error]);

  return (
    <main className="py-20">
      <LayoutContainer>
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Something went wrong
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Unexpected error
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Please try again. If the problem continues, contact support.
          </p>
          <div className="mt-8">
            <Button className="rounded-full px-6" onClick={reset}>
              Try again
            </Button>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
