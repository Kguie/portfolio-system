import { LayoutContainer } from "@/components/layout/container";
import { MonitoringStatusBadge } from "@/components/monitoring-status-badge";
import { getCvUrl } from "@/lib/cv";
import { getTranslations } from "next-intl/server";

type SiteFooterProps = {
  locale: "en" | "fr";
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const tCv = await getTranslations("Cv");
  const cvHref = getCvUrl(locale);

  return (
    <footer className="border-t border-border/70 bg-background/70">
      <LayoutContainer className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex flex-wrap items-center gap-4">
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com/kguie"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="https://www.linkedin.com/in/kguieba"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="mailto:kevin.guieba@gmail.com"
          >
            Email
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href={cvHref}
            download
          >
            {tCv("short")}
          </a>
        </div>
        <div className="space-y-1 text-center sm:text-right">
          <MonitoringStatusBadge />
          <p>© {year} Kévin Guieba. All rights reserved.</p>
        </div>
      </LayoutContainer>
    </footer>
  );
}
