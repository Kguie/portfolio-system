"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { portfolioQA, type QAEntry, type SupportedLocale } from "@/data/portfolio-qa";

type AskPortfolioProps = {
  locale: SupportedLocale;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
};

export function AskPortfolio({
  locale,
  title,
  subtitle,
  placeholder,
  buttonLabel,
}: AskPortfolioProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<QAEntry | null>(null);

  const entries = portfolioQA[locale];

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return entries.slice(0, 5);
    }

    return entries
      .filter((entry) => {
        const haystack = `${entry.question} ${entry.answer}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [entries, query]);

  const onAsk = () => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setSelected(entries[0] ?? null);
      return;
    }

    const exact = entries.find((entry) => entry.question.toLowerCase() === q);

    if (exact) {
      setSelected(exact);
      return;
    }

    setSelected(suggestions[0] ?? null);
  };

  return (
    <div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-md border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
        />
        <Button size="sm" className="rounded-md px-4" onClick={onAsk}>
          {buttonLabel}
        </Button>
      </div>

      {suggestions.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {suggestions.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => {
                  setQuery(entry.question);
                  setSelected(entry);
                }}
                className="w-full rounded-md border border-border/60 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-cyan-300/35 hover:text-foreground"
              >
                {entry.question}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {selected ? (
        <div className="mt-4 rounded-md border border-cyan-300/25 bg-cyan-300/8 px-3 py-2.5 text-sm text-foreground/92">
          <p className="font-medium">{selected.question}</p>
          <p className="mt-1 text-muted-foreground">{selected.answer}</p>
        </div>
      ) : null}
    </div>
  );
}
