import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SafeMarkdown } from "@/components/content/SafeMarkdown";
import { getAllStories, getStoryBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return buildMetadata(
    {
      title: story.frontmatter.title,
      description: story.frontmatter.description,
      openGraph: {
        title: story.frontmatter.title,
        description: story.frontmatter.description,
        type: "article",
        publishedTime: story.frontmatter.date,
        modifiedTime: story.frontmatter.updated ?? story.frontmatter.date,
      },
    },
    { path: `/stories/${slug}` },
  );
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/stories"
        className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        ← All stories
      </Link>
      <header className="mt-8 max-w-2xl">
        <p className="text-sm tracking-wide text-[var(--color-muted)]">
          {new Date(story.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-[var(--color-ink)] sm:text-5xl">
          {story.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          {story.frontmatter.description}
        </p>
      </header>
      <SafeMarkdown
        content={story.content}
        className="md-content mt-12 border-t border-[var(--color-border)] pt-12"
      />
    </article>
  );
}
