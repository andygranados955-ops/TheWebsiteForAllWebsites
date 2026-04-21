import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-paper)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg text-[var(--color-ink)]">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {siteConfig.bio}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Contact
          </p>
          <p className="mt-3 text-sm">
            <a
              className="text-[var(--color-ink)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-accent)]"
              href={`mailto:${siteConfig.links.email}`}
            >
              {siteConfig.links.email}
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
        <p className="text-xs text-[var(--color-muted)]">
          © {year} {siteConfig.author}. Built with care; no trackers here.
        </p>
      </div>
    </footer>
  );
}
