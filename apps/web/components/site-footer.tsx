import { CopyEmailAction } from "@/components/copy-email-action";
import { LayoutContainer } from "@/components/layout/container";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const tCv = await getTranslations("Cv");
  const tFooter = await getTranslations("Footer");

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
            href="/go/cv"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {tCv("short")}
          </a>
          <CopyEmailAction
            email="kevin.guieba@gmail.com"
            label={tFooter("copyEmailAction")}
            copiedLabel={tFooter("copiedLabel")}
            className="text-xs text-muted-foreground/90 transition-colors hover:text-foreground"
          />
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs text-muted-foreground/85">{tFooter("responseLine")}</p>
          <p>© {year} Kévin Guieba. All rights reserved.</p>
        </div>
      </LayoutContainer>
    </footer>
  );
}
