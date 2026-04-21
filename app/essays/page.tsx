import type { Metadata } from "next";

import { EssayEnvelope } from "@/components/essays/EssayEnvelope";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getAllEssays } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { sortEssaysNewestFirst } from "@/lib/sort";

export const metadata: Metadata = buildMetadata(
  {
    title: "Essays",
    description: siteConfig.seo.essaysIndexDescription,
    openGraph: {
      title: `Essays · ${siteConfig.name}`,
      description: siteConfig.seo.essaysIndexDescription,
    },
  },
  { path: "/essays" },
);

export default function EssaysPage() {
  const essays = sortEssaysNewestFirst(getAllEssays());

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Writing"
        title="Essays"
        description={siteConfig.essaysPageDescription}
      />

      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {essays.map((essay) => (
          <EssayEnvelope
            key={essay.slug}
            slug={essay.slug}
            title={essay.frontmatter.title}
            description={essay.frontmatter.description}
            date={essay.frontmatter.date}
          />
        ))}
      </div>
    </div>
  );
}
