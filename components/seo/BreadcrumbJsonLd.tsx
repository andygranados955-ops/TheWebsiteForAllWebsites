import { getBreadcrumbJsonLd } from "@/lib/jsonld";

type Props = {
  items: { name: string; path: string }[];
};

export function BreadcrumbJsonLd({ items }: Props) {
  const json = getBreadcrumbJsonLd(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
