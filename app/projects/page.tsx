import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Projects",
    description: siteConfig.seo.projectsIndexDescription,
    openGraph: {
      title: `Projects · ${siteConfig.name}`,
      description: siteConfig.seo.projectsIndexDescription,
    },
  },
  { path: "/projects" },
);

export default function ProjectsPage() {
  const items = getProjects();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        description={siteConfig.projectsPageDescription}
      />

      <ol className="space-y-10">
        {items.map((item, i) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 border-b border-[var(--color-border)] pb-10 last:border-0 sm:flex-row sm:gap-10"
          >
            <p className="font-display w-28 shrink-0 text-sm tracking-wide text-[var(--color-muted)] uppercase">
              {item.year}
            </p>
            <div>
              <p className="font-display text-2xl text-[var(--color-ink)]">
                <span className="mr-2 text-[var(--color-accent)]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {item.title}
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-ink)_78%,transparent)]">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
