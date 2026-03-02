import type { VariantProps } from "class-variance-authority";
import { getTranslations } from "next-intl/server";

import { Button, buttonVariants } from "@/components/ui/button";
import { getCvUrl } from "@/lib/cv";
import { cn } from "@/lib/utils";

type DownloadCvButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  locale: "en" | "fr";
};

export async function DownloadCvButton({
  locale,
  className,
  variant = "default",
  size = "default",
}: DownloadCvButtonProps) {
  const t = await getTranslations("Cv");
  const cvHref = getCvUrl(locale);

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(className)}
    >
      <a
        href={cvHref}
        download
      >
        {t("download")}
      </a>
    </Button>
  );
}
