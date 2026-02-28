import { LayoutContainer } from "@/components/layout/container";
import { getCvUrl } from "@/lib/cv";
import { getLocale, getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const locale = await getLocale();
  const t = await getTranslations("Cv");
  const cvUrl = getCvUrl(locale);

  return (
    <footer className="border-t border-border/70 bg-background/70">
      <LayoutContainer className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex flex-wrap items-center gap-4">
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com/kguie"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="https://linkedin.com/in/kguieba"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="mailto:kevin.guieba@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Email
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {t("short")}
          </a>
        </div>
        <p>© {year} Portfolio. All rights reserved.</p>
      </LayoutContainer>
    </footer>
  );
}
