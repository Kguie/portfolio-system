"use client";

import type { VariantProps } from "class-variance-authority";
import { useLocale, useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import { getCvUrl } from "@/lib/cv";
import { cn } from "@/lib/utils";

type DownloadCvButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export function DownloadCvButton({
  className,
  variant = "default",
  size = "default",
}: DownloadCvButtonProps) {
  const locale = useLocale();
  const t = useTranslations("Cv");
  const cvUrl = getCvUrl(locale);

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(className)}
    >
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        {t("download")}
      </a>
    </Button>
  );
}
