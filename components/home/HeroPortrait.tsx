import Image from "next/image";

import { siteConfig } from "@/content/site";

function outerShape(shape: (typeof siteConfig)["profileImageShape"]) {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "square":
      return "rounded-lg";
    case "soft":
    default:
      return "rounded-[2rem]";
  }
}

function innerShape(shape: (typeof siteConfig)["profileImageShape"]) {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "square":
      return "rounded-md";
    case "soft":
    default:
      return "rounded-[1.65rem]";
  }
}

/**
 * Hero portrait / logo — path and mask from `content/site.ts`.
 */
export function HeroPortrait() {
  const {
    profileImageSrc,
    profileImageAlt,
    profileImageShape,
    profileImageFit,
    profileImageBlendMode,
    profileImageBackdrop,
    profileShowPlaceholderHint,
  } = siteConfig;

  const blendClass =
    profileImageBlendMode === "screen"
      ? "mix-blend-screen"
      : profileImageBlendMode === "multiply"
        ? "mix-blend-multiply"
        : "";

  const innerBackdropClass =
    profileImageBlendMode === "normal"
      ? profileImageBackdrop === "white"
        ? "bg-white"
        : "bg-transparent"
      : "bg-transparent";

  return (
    <div className="flex shrink-0 justify-center lg:w-[min(100%,260px)] lg:justify-start">
      <figure className="w-full max-w-[240px]">
        <div
          className={`relative aspect-square w-full p-[6px] ${outerShape(profileImageShape)} bg-transparent shadow-[0_18px_44px_rgba(42,33,24,0.12)] ring-1 ring-[color-mix(in_oklab,var(--color-ink)_12%,transparent)]`}
        >
          <div
            className={`relative aspect-square w-full overflow-hidden ${innerBackdropClass} ${innerShape(profileImageShape)}`}
          >
            <Image
              src={profileImageSrc}
              alt={profileImageAlt}
              fill
              priority
              sizes="(max-width: 640px) 200px, 240px"
              className={`${
                profileImageFit === "contain"
                  ? "object-contain p-[10%]"
                  : "object-cover"
              } ${blendClass}`.trim()}
            />
          </div>
        </div>
        {profileShowPlaceholderHint ? (
          <figcaption className="mt-3 text-center text-[0.7rem] leading-snug text-[var(--color-muted)] lg:text-left">
            Placeholder — set{" "}
            <code className="whitespace-nowrap rounded bg-[var(--color-paper)] px-1 py-0.5 font-mono text-[0.65rem] text-[var(--color-ink)]">
              profileImageSrc
            </code>{" "}
            in{" "}
            <code className="whitespace-nowrap rounded bg-[var(--color-paper)] px-1 py-0.5 font-mono text-[0.65rem] text-[var(--color-ink)]">
              content/site.ts
            </code>
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
