import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

import { LayoutContainer } from "@/components/layout/container";
import { Panel } from "@/components/ui/panel";
import { buildLocalizedMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const caseStudyByLocale = {
  en: () => import("@/content/case-studies/event-discovery-system.en.mdx"),
  fr: () => import("@/content/case-studies/event-discovery-system.fr.mdx"),
} as const;

const caseStudyFileByLocale = {
  en: "event-discovery-system.en.mdx",
  fr: "event-discovery-system.fr.mdx",
} as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function getTableOfContents(locale: "en" | "fr") {
  const fileName = caseStudyFileByLocale[locale];
  const sourcePath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    fileName,
  );
  const source = await readFile(sourcePath, "utf8");
  const matches = Array.from(source.matchAll(/^(##|###)\s+(.+)$/gm));

  return matches.map((match) => ({
    level: match[1] === "##" ? 2 : 3,
    title: match[2].trim(),
    id: slugify(match[2]),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "fr" ? "fr" : "en";
  const title =
    resolvedLocale === "fr"
      ? "Étude de cas MoovOn"
      : "MoovOn Case Study";
  const description =
    resolvedLocale === "fr"
      ? "Architecture, compromis techniques et observabilité du système de découverte d'événements."
      : "Architecture, technical trade-offs, and observability for the event discovery system.";

  return buildLocalizedMetadata({
    locale: resolvedLocale,
    title,
    description,
    path: "/projects/event-discovery-system",
  });
}

export default async function EventDiscoverySystemPage({ params }: PageProps) {
  const { locale } = await params;

  if (!(locale in caseStudyByLocale)) {
    notFound();
  }

  const resolvedLocale = locale as keyof typeof caseStudyByLocale;
  const loader = caseStudyByLocale[resolvedLocale];
  const { default: Content } = await loader();
  const toc = await getTableOfContents(resolvedLocale);
  const tocTitle = resolvedLocale === "fr" ? "Dans cette page" : "On this page";

  return (
    <main className="py-14 sm:py-18">
      <LayoutContainer>
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="prose prose-neutral max-w-3xl dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-semibold prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2 prose-h2:tracking-tight prose-h3:tracking-tight prose-p:text-[0.98rem] prose-p:leading-7 prose-blockquote:border-l-cyan-300/65 prose-blockquote:bg-muted/25 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-foreground/85 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#0b1220] prose-pre:text-slate-100 prose-pre:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none prose-li:marker:text-cyan-300/70">
            <Content />
          </article>

          {toc.length > 0 ? (
            <aside className="hidden lg:block">
              <Panel className="sticky top-24 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.13em] text-muted-foreground">
                  {tocTitle}
                </p>
                <ul className="mt-3 space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm text-muted-foreground transition-colors hover:text-foreground ${
                          item.level === 3 ? "pl-3" : ""
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Panel>
            </aside>
          ) : null}
        </div>
      </LayoutContainer>
    </main>
  );
}
