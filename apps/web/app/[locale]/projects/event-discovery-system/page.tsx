import { notFound } from "next/navigation";

import { LayoutContainer } from "@/components/layout/container";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const caseStudyByLocale = {
  en: () => import("@/content/case-studies/event-discovery-system.en.mdx"),
  fr: () => import("@/content/case-studies/event-discovery-system.fr.mdx"),
} as const;

export default async function EventDiscoverySystemPage({ params }: PageProps) {
  const { locale } = await params;

  if (!(locale in caseStudyByLocale)) {
    notFound();
  }

  const loader = caseStudyByLocale[locale as keyof typeof caseStudyByLocale];
  const { default: Content } = await loader();

  return (
    <main className="py-14 sm:py-18">
      <LayoutContainer>
        <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-muted/50 prose-code:font-mono prose-code:text-[0.9em]">
          <Content />
        </article>
      </LayoutContainer>
    </main>
  );
}
