import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SafeMarkdown } from "@/components/content/SafeMarkdown";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllEssays, getEssayBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};
  return buildMetadata(
    {
      title: essay.frontmatter.title,
      description: essay.frontmatter.description,
      openGraph: {
        title: essay.frontmatter.title,
        description: essay.frontmatter.description,
        type: "article",
        publishedTime: essay.frontmatter.date,
        modifiedTime: essay.frontmatter.updated ?? essay.frontmatter.date,
      },
    },
    { path: `/essays/${slug}` },
  );
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Essays", path: "/essays" },
          { name: essay.frontmatter.title, path: `/essays/${slug}` },
        ]}
      />
      <Link
        href="/essays"
        className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        ← All essays
      </Link>
      <header className="mt-8 max-w-2xl">
        <p className="text-sm tracking-wide text-[var(--color-muted)]">
          {new Date(essay.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-[var(--color-ink)] sm:text-5xl">
          {essay.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          {essay.frontmatter.description}
        </p>
      </header>
      <SafeMarkdown
        content={essay.content}
        className="md-content mt-12 border-t border-[var(--color-border)] pt-12"
      />
    </article>
  );
}
