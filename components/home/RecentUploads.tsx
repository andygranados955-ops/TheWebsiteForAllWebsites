import Link from "next/link";

import {
  getRecentUploadLabel,
  type RecentUpload,
} from "@/lib/recent";

type Props = {
  items: RecentUpload[];
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RecentUploads({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="recent-heading">
      <h2
        id="recent-heading"
        className="font-display text-2xl tracking-tight text-[var(--color-ink)]"
      >
        Recently uploaded
      </h2>
      <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
        The newest essay, thought, and story from the site.
      </p>

      <ul className="mt-8 divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)]">
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
            <Link
              href={item.href}
              className="group flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-[color-mix(in_oklab,var(--color-cream)_55%,transparent)] sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs tracking-[0.18em] text-[var(--color-accent)] uppercase">
                    {getRecentUploadLabel(item.kind)}
                  </span>
                  <time
                    className="text-xs text-[var(--color-muted)]"
                    dateTime={item.date}
                  >
                    {formatDate(item.date)}
                  </time>
                </div>
                <p className="font-display mt-2 text-xl leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[color-mix(in_oklab,var(--color-ink)_88%,var(--color-accent))]">
                  {item.title}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 text-sm text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-0.5 sm:pt-6">
                Read →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
