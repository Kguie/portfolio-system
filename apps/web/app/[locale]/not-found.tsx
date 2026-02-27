import Link from "next/link";

import { LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function LocaleNotFound() {
  return (
    <main className="py-20">
      <LayoutContainer>
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            The page you requested does not exist or has moved.
          </p>
          <div className="mt-8">
            <Button asChild className="rounded-full px-6">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </section>
      </LayoutContainer>
    </main>
  );
}
