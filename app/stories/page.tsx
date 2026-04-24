import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { StoryBookCard } from "@/components/stories/StoryBookCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getAllStories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { sortStoriesNewestFirst } from "@/lib/sort";

export const metadata: Metadata = buildMetadata(
  {
    title: "Stories",
    description: siteConfig.seo.storiesIndexDescription,
    openGraph: {
      title: `Stories · ${siteConfig.name}`,
      description: siteConfig.seo.storiesIndexDescription,
    },
  },
  { path: "/stories" },
);

export default function StoriesPage() {
  const stories = sortStoriesNewestFirst(getAllStories());

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
        ]}
      />
      <SectionHeading
        eyebrow="Fiction shelf"
        title="Stories"
        description={siteConfig.storiesPageDescription}
      />

      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {stories.map((story) => (
          <StoryBookCard
            key={story.slug}
            slug={story.slug}
            title={story.frontmatter.title}
            description={story.frontmatter.description}
            date={story.frontmatter.date}
          />
        ))}
      </div>
    </div>
  );
}
