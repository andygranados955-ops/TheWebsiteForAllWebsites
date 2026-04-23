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

function LetterSheet() {
  return (
    <div
      className="flex h-full flex-col justify-start gap-[0.35rem] px-[7%] pt-[9%] pb-[7%]"
      aria-hidden
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-px w-full shrink-0 bg-[color-mix(in_oklab,var(--color-ink)_06%,transparent)]"
        />
      ))}
    </div>
  );
}

/**
 * Mechanical model (explicit rest / hover):
 *
 * DOM:
 *   MotionLink
 *     └─ .card (positions shadow + face)
 *          └─ .face [overflow:hidden; clips everything; perspective for flap only]
 *               1) .layer-back
 *               2) .layer-letter (motion; translateY 0 at rest)
 *               3) .layer-pocket (single lower rectangle, no side segments)
 *               4) .layer-flap (motion; rotateX 0 at rest)
 *
 * Layer order (back → front): back (1) → letter (10) → pocket (20) → flap (30).
 *
 * Closed transforms: flap rotateX = 0; letter translateY = 0 (no pre-offset).
 * Hover transforms: flap rotateX = -72deg (large, unmistakable); letter translateY = -82% of its height after delay.
 *
 * Airtight closed: face clips; letter anchored bottom, height ~48%, top ~52%, fully under pocket (from 47%) and under closed flap; no box-shadow on letter at rest.
 */
export function EssayEnvelope({ slug, title, description, date }: Props) {
  const reduce = useReducedMotion();
  const noHover = usePrefersNoHover();
  const canAnimate = !reduce && !noHover;
  const uid = slug.replace(/[^a-zA-Z0-9]/g, "") || "essay";

  const flapOpen = {
    duration: reduce ? 0 : 0.48,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const letterRise = {
    delay: reduce ? 0 : 0.32,
    duration: reduce ? 0 : 0.58,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  const letterFall = {
    duration: reduce ? 0 : 0.36,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  return (
    <article>
      <MotionLink
        href={`/essays/${slug}`}
        className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-cream)]"
        initial="rest"
        animate="rest"
        whileHover={canAnimate ? "hover" : undefined}
        whileFocus={canAnimate ? "hover" : undefined}
        variants={{ rest: {}, hover: {} }}
      >
        <div className="relative mx-auto w-full max-w-[276px]">
          <div
            className="pointer-events-none absolute -bottom-2 left-[7%] right-[7%] z-0 h-4 rounded-[50%] bg-[#2a2118]/[0.09] blur-md"
            aria-hidden
          />

          {/* Outer rectangular card: overflow clips all layers; nothing protrudes at rest */}
          <div
            className="relative z-[1] aspect-[2/1] w-full overflow-hidden rounded-xl border border-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] bg-[#cfc0ae] shadow-[0_12px_28px_rgba(42,33,24,0.11)]"
            style={{ perspective: "1100px" }}
          >
            {/* Layer 1: envelope back */}
            <div
              className="absolute inset-0 z-[1] bg-gradient-to-b from-[#ebe3d7] to-[#d4c8ba]"
              aria-hidden
            />

            {/* Layer 2: letter between back and pocket; rest = no transform; fully hidden behind pocket + flap */}
            <motion.div
              className="absolute bottom-0 z-[10] overflow-hidden rounded-[1px] border border-[color-mix(in_oklab,var(--color-ink)_08%,transparent)] bg-[#f8f6f1]"
              style={{
                left: "11%",
                right: "11%",
                height: "48%",
              }}
              variants={{
                rest: {
                  y: 0,
                  boxShadow: "none",
                  transition: letterFall,
                },
                hover: {
                  y: "-82%",
                  boxShadow: "0 4px 18px rgba(42,33,24,0.12)",
                  transition: letterRise,
                },
              }}
            >
              <LetterSheet />
            </motion.div>

            {/* Layer 3: single front pocket / lower body (no side wings, no curved V) */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 top-[47%] z-[20] border-t border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-gradient-to-b from-[#c9b8a6] to-[#a89882] shadow-[inset_0_8px_16px_rgba(42,33,24,0.1)]"
              aria-hidden
            />

            {/* Layer 4: top flap hinge at top; rest rotateX 0 (flat closed); hover opens wide */}
            <motion.div
              className="absolute inset-x-0 top-0 z-[30] h-[50%] will-change-transform"
              style={{
                transformOrigin: "50% 0%",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              variants={{
                rest: {
                  rotateX: 0,
                  transition: flapOpen,
                },
                hover: {
                  rotateX: -72,
                  transition: flapOpen,
                },
              }}
            >
              <svg
                viewBox="0 0 200 100"
                className="h-full w-full block"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`flap-${uid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#efe8dc" />
                    <stop offset="55%" stopColor="#e3d7c8" />
                    <stop offset="100%" stopColor="#d0c2b0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0 L200 0 L200 10 L100 100 L0 10 Z"
                  fill={`url(#flap-${uid})`}
                />
                <path
                  d="M0 10 L100 100 L200 10"
                  fill="none"
                  stroke="rgba(42,33,24,0.1)"
                  strokeWidth="1.1"
                />
              </svg>
            </motion.div>
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
