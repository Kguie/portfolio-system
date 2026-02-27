export function HeroBackgroundEffect() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(24,24,27,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.85))]" />

      <div
        className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-sky-300/25 blur-3xl"
        style={{ animation: "heroDriftOne 16s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-indigo-200/25 blur-3xl"
        style={{ animation: "heroDriftTwo 18s ease-in-out infinite" }}
      />
    </div>
  );
}
