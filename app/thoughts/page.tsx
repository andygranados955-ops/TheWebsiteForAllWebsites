import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getAllThoughts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { sortThoughtsNewestFirst } from "@/lib/sort";

export const metadata: Metadata = buildMetadata(
  {
    title: "Thoughts",
    description: siteConfig.seo.thoughtsIndexDescription,
    openGraph: {
      title: `Thoughts · ${siteConfig.name}`,
      description: siteConfig.seo.thoughtsIndexDescription,
    },
  },
  { path: "/thoughts" },
);

export default function ThoughtsPage() {
  const thoughts = sortThoughtsNewestFirst(getAllThoughts());

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Notebook"
        title="Thoughts"
        description="Quick pieces. Less polish, more pulse."
      />

      <ul className="divide-y divide-[var(--color-border)]">
        {thoughts.map((t) => (
          <li key={t.slug} className="py-8">
            <Link href={`/thoughts/${t.slug}`} className="group block">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-display text-2xl leading-tight text-[var(--color-ink)] transition-colors group-hover:text-[color-mix(in_oklab,var(--color-ink)_88%,var(--color-accent))]">
                  {t.frontmatter.title}
                </h2>
                <time
                  className="shrink-0 text-sm text-[var(--color-muted)]"
                  dateTime={t.frontmatter.date}
                >
                  {new Date(t.frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-muted)]">
                {t.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
