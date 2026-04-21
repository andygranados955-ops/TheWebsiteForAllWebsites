import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SafeMarkdown } from "@/components/content/SafeMarkdown";
import { getAllThoughts, getThoughtBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllThoughts().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);
  if (!thought) return {};
  return buildMetadata(
    {
      title: thought.frontmatter.title,
      description: thought.frontmatter.description,
      openGraph: {
        title: thought.frontmatter.title,
        description: thought.frontmatter.description,
        type: "article",
        publishedTime: thought.frontmatter.date,
      },
    },
    { path: `/thoughts/${slug}` },
  );
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);
  if (!thought) notFound();

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/thoughts"
        className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        ← All thoughts
      </Link>
      <header className="mt-8 max-w-2xl">
        <p className="text-sm tracking-wide text-[var(--color-muted)]">
          {new Date(thought.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-[var(--color-ink)] sm:text-5xl">
          {thought.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          {thought.frontmatter.description}
        </p>
      </header>
      <SafeMarkdown
        content={thought.content}
        className="md-content mt-12 border-t border-[var(--color-border)] pt-12"
      />
    </article>
  );
}
