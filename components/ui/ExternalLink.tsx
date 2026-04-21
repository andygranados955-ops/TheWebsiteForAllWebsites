import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/**
 * External links: noopener + noreferrer, optional sponsored/ugc for user-generated contexts.
 */
export function ExternalLink({
  children,
  rel,
  target = "_blank",
  ...rest
}: Props) {
  const base = "noopener noreferrer";
  const merged = rel ? `${base} ${rel}`.trim() : base;
  return (
    <a target={target} rel={merged} {...rest}>
      {children}
    </a>
  );
}
