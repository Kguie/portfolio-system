import type { VariantProps } from "class-variance-authority";
import { getTranslations } from "next-intl/server";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DownloadCvButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export async function DownloadCvButton({
  className,
  variant = "default",
  size = "default",
}: DownloadCvButtonProps) {
  const t = await getTranslations("Cv");

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(className)}
    >
      <a
        href="/go/cv"
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        {t("download")}
      </a>
    </Button>
  );
}
