import type { Metadata } from "next";
import Link from "next/link";

import { HeroPortrait } from "@/components/home/HeroPortrait";
import { siteConfig } from "@/content/site";
import { buildMetadata, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: { absolute: siteConfig.seo.homeDocumentTitle },
    description: siteConfig.seo.homeMetaDescription,
    openGraph: {
      title: siteConfig.seo.homeDocumentTitle,
      description: siteConfig.seo.homeMetaDescription,
      url: canonicalUrl("/"),
    },
    twitter: {
      title: siteConfig.seo.homeDocumentTitle,
      description: siteConfig.seo.homeMetaDescription,
    },
  },
  { path: "/" },
);

export default function HomePage() {
  const highlights = siteConfig.homeHighlights;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <section
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20"
        aria-labelledby="home-heading"
      >
        <HeroPortrait />

        <div className="min-w-0 flex-1">
          <p className="font-display text-sm tracking-[0.22em] text-[var(--color-muted)] uppercase">
            Personal website
          </p>
          <h1
            id="home-heading"
            className="font-display mt-4 text-5xl tracking-tight text-[var(--color-ink)] sm:text-6xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-[var(--color-muted)] sm:text-2xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-ink)_78%,transparent)]">
            {siteConfig.homepageIntro}
          </p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="explore-heading">
        <h2
          id="explore-heading"
          className="font-display text-2xl tracking-tight text-[var(--color-ink)]"
        >
          On this site
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
          Essays, thoughts, stories, gallery, projects, and interests — linked
          from the navigation and here.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <p className="font-display text-lg text-[var(--color-ink)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.copy}
              </p>
              <span className="mt-6 inline-flex items-center text-sm text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-0.5">
                Step inside →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <nav
        className="mt-16 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]"
        aria-label="More pages"
      >
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/about"
        >
          About Andy Granados
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/projects"
        >
          Projects
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/stories"
        >
          Stories
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/interests"
        >
          Interests
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/essays"
        >
          All essays
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/thoughts"
        >
          All thoughts
        </Link>
        <Link
          className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
          href="/stories"
        >
          All stories
        </Link>
      </nav>
    </div>
  );
}
