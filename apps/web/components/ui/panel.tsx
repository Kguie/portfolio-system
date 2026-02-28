import * as React from "react";

import { cn } from "@/lib/utils";

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverGlow?: boolean;
};

function Panel({ className, hoverGlow = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-transparent bg-[linear-gradient(180deg,rgba(11,15,24,0.72),rgba(10,14,22,0.58)),linear-gradient(140deg,rgba(34,211,238,0.12),rgba(148,163,184,0.03),rgba(34,211,238,0.06))] [background-origin:border-box] [background-clip:padding-box,border-box] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),inset_0_-1px_0_rgba(0,0,0,0.3),0_12px_28px_-22px_rgba(2,6,23,0.75)] backdrop-blur-sm transition-all duration-200",
        hoverGlow &&
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.055),inset_0_-1px_0_rgba(0,0,0,0.32),0_18px_34px_-22px_rgba(34,211,238,0.16),0_0_0_1px_rgba(148,163,184,0.15)]",
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
