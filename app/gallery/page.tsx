import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { getGallery } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Pictures",
    description: siteConfig.seo.galleryIndexDescription,
    openGraph: {
      title: `Pictures · ${siteConfig.name}`,
      description: siteConfig.seo.galleryIndexDescription,
    },
  },
  { path: "/gallery" },
);

export default function GalleryPage() {
  const images = getGallery();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Album"
        title="Pictures"
        description="Photos and small artifacts from lab life, meals, prototypes, and everyday scenes."
      />

      <div className="columns-1 gap-6 sm:columns-2">
        {images.map((img) => (
          <figure
            key={img.src}
            className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full bg-[color-mix(in_oklab,var(--color-paper)_70%,var(--color-cream))]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
            </div>
            {img.caption ? (
              <figcaption className="px-4 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {img.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
