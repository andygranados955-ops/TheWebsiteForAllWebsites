type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-12 max-w-2xl">
      {eyebrow ? (
        <p className="font-display text-sm font-medium tracking-[0.2em] text-[var(--color-muted)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-2 text-4xl tracking-tight text-[var(--color-ink)] sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
