import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getInterests } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Interests",
    description: siteConfig.seo.interestsIndexDescription,
    openGraph: {
      title: `Interests · ${siteConfig.name}`,
      description: siteConfig.seo.interestsIndexDescription,
    },
  },
  { path: "/interests" },
);

export default function InterestsPage() {
  const blocks = getInterests();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Curiosities"
        title="Interests"
        description="A living list, more compass than catalog."
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {blocks.map((block) => (
          <section
            key={block.title}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-sm"
          >
            <h2 className="font-display text-2xl text-[var(--color-ink)]">
              {block.title}
            </h2>
            <ul className="mt-4 space-y-3 text-[color-mix(in_oklab,var(--color-ink)_82%,transparent)]">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
