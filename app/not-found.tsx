import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="text-sm tracking-wide text-[var(--color-muted)] uppercase">
        404
      </p>
      <h1 className="font-display mt-4 text-4xl text-[var(--color-ink)]">
        This page wandered off.
      </h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Nothing here, just quiet floorboards and an empty chair.
      </p>
      <Link
        className="mt-10 rounded-full border border-[var(--color-border)] bg-[var(--color-paper)] px-5 py-2 text-sm text-[var(--color-ink)] transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
        href="/"
      >
        Go home
      </Link>
    </div>
  );
}
