import { LayoutContainer } from "@/components/layout/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/70">
      <LayoutContainer className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-4">
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="transition-colors hover:text-foreground" href="mailto:hello@example.com">
            Email
          </a>
        </div>
        <p>© {year} Portfolio. All rights reserved.</p>
      </LayoutContainer>
    </footer>
  );
}
