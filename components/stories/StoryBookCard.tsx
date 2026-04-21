"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionLink = motion(Link);

type Props = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

function usePrefersNoHover() {
  const [noHover, setNoHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setNoHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return noHover;
}

function PageLines() {
  return (
    <div className="flex h-full flex-col gap-2 px-4 py-5">
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className="h-px w-full bg-[color-mix(in_oklab,var(--color-ink)_14%,transparent)]"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function StoryBookCard({ slug, title, description, date }: Props) {
  const reduce = useReducedMotion();
  const noHover = usePrefersNoHover();
  const canAnimate = !reduce && !noHover;

  return (
    <article>
      <MotionLink
        href={`/stories/${slug}`}
        className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-cream)]"
        initial="rest"
        animate="rest"
        whileHover={canAnimate ? "hover" : undefined}
        whileFocus={canAnimate ? "hover" : undefined}
        variants={{ rest: {}, hover: {} }}
      >
        <div className="relative mx-auto w-full max-w-[286px]">
          <div
            className="pointer-events-none absolute -bottom-2 left-[12%] right-[12%] z-0 h-4 rounded-[50%] bg-[#2a2118]/[0.12] blur-md"
            aria-hidden
          />

          <div className="relative z-[1] h-[188px] w-full [perspective:1400px]">
            <motion.div
              className="absolute inset-0 rounded-xl border border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-[#f9f4ea] shadow-[0_12px_30px_rgba(42,33,24,0.12)]"
              variants={{
                rest: { rotateY: 0, x: 0 },
                hover: {
                  rotateY: -17,
                  x: -3,
                  transition: {
                    duration: reduce ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            >
              <PageLines />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-xl border border-[color-mix(in_oklab,var(--color-ink)_13%,transparent)] bg-gradient-to-br from-[#d6c3ad] to-[#b89f85] shadow-[0_16px_34px_rgba(42,33,24,0.18)]"
              variants={{
                rest: { rotateY: 0 },
                hover: {
                  rotateY: -56,
                  transition: {
                    duration: reduce ? 0 : 0.52,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            >
              <div className="flex h-full flex-col justify-end p-5">
                <span className="text-xs tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink)_52%,transparent)] uppercase">
                  Story
                </span>
                <p className="font-display mt-2 text-lg leading-tight text-[var(--color-ink)]">
                  {title}
                </p>
              </div>
            </motion.div>

            <div
              className="pointer-events-none absolute left-0 top-2 bottom-2 z-[3] w-[8px] rounded-l-xl bg-[color-mix(in_oklab,var(--color-ink)_18%,transparent)]"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-5 md:hidden">
          <p className="font-display text-lg text-[var(--color-ink)]">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
          <p className="mt-3 text-xs tracking-wide text-[var(--color-muted)] uppercase">
            {date}
          </p>
        </div>

        <div className="mt-5 hidden text-center md:block">
          <p className="font-display text-lg text-[var(--color-ink)]">{title}</p>
        </div>
      </MotionLink>
    </article>
  );
}
