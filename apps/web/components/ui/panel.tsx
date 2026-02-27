import * as React from "react";

import { cn } from "@/lib/utils";

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverGlow?: boolean;
};

function Panel({ className, hoverGlow = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-transparent bg-[linear-gradient(rgba(10,14,22,0.58),rgba(10,14,22,0.5)),linear-gradient(140deg,rgba(34,211,238,0.14),rgba(148,163,184,0.04),rgba(34,211,238,0.08))] [background-origin:border-box] [background-clip:padding-box,border-box] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.28),0_10px_24px_-20px_rgba(2,6,23,0.7)] backdrop-blur-sm transition-all duration-200",
        hoverGlow &&
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.3),0_14px_32px_-18px_rgba(34,211,238,0.2),0_0_0_1px_rgba(148,163,184,0.18)]",
        className,
      )}
      {...props}
    />
  );
}

function GlowCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Panel
      hoverGlow
      className={cn("bg-background/80", className)}
      {...props}
    />
  );
}

export { GlowCard, Panel };
