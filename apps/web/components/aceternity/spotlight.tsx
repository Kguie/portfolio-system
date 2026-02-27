type SpotlightProps = {
  className?: string;
};

export function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(52%_42%_at_50%_18%,rgba(125,211,252,0.16),transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(38%_32%_at_50%_22%,rgba(255,255,255,0.07),transparent_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_35%)]" />
    </div>
  );
}
