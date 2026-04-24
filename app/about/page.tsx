import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SafeMarkdown } from "@/components/content/SafeMarkdown";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getAboutMarkdown } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "About",
    description: siteConfig.seo.aboutMetaDescription,
    openGraph: {
      title: `About · ${siteConfig.name}`,
      description: siteConfig.seo.aboutMetaDescription,
    },
  },
  { path: "/about" },
);

export default function AboutPage() {
  const body = getAboutMarkdown();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <SectionHeading
        eyebrow="Hello"
        title="About Andy Granados"
        description="Who I am, what I work on at UIUC, and how to reach me."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
        <SafeMarkdown content={body} className="md-content" />

        <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6 text-sm leading-relaxed text-[var(--color-muted)]">
          <p className="font-display text-base text-[var(--color-ink)]">
            Colophon
          </p>
          <p className="mt-3">
            This site is static, fast, and free of third-party analytics. If you
            want to talk, email is best:{" "}
            <a
              className="text-[var(--color-ink)] underline decoration-[var(--color-border)] underline-offset-4"
              href={`mailto:${siteConfig.links.email}`}
            >
              {siteConfig.links.email}
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
