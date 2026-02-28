"use client";

import type { VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DownloadCvButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export function DownloadCvButton({
  className,
  variant = "default",
  size = "default",
}: DownloadCvButtonProps) {
  const t = useTranslations("Cv");

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
