import { GlowCard } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type SystemSheetCardProps = {
  title: string;
  lines: string[];
  className?: string;
};

export function SystemSheetCard({ title, lines, className }: SystemSheetCardProps) {
  return (
    <GlowCard className={cn("p-4 sm:p-5 text-left", className)}>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </GlowCard>
  );
}
