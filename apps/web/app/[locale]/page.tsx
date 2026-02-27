import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const tNav = await getTranslations("Nav");
  const tHome = await getTranslations("Home");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans">
      <main className="w-full max-w-4xl space-y-10 rounded-2xl bg-white p-10 shadow-sm">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-zinc-700">
          <span>{tNav("architecture")}</span>
          <span>{tNav("projects")}</span>
          <span>{tNav("labs")}</span>
          <span>{tNav("services")}</span>
          <span>{tNav("hire")}</span>
          <span>{tNav("blog")}</span>
        </nav>

        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            {tHome("headline")}
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            {tHome("subheadline")}
          </p>
        </section>

        <section className="flex flex-wrap gap-3">
          <button className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white">
            {tHome("ctaArchitecture")}
          </button>
          <button className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800">
            {tHome("ctaCaseStudy")}
          </button>
          <button className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800">
            {tHome("ctaWorkWithMe")}
          </button>
        </section>
      </main>
    </div>
  );
}
