import Link from "next/link";
import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import {
  CatalogActionLink,
  CatalogMetaLabel,
  CatalogSectionDescription,
  CatalogSectionTitle,
} from "@/components/docs/catalog-primitives";
import { cn } from "@/lib/utils";
import type { ComponentDoc } from "@/lib/component-catalog";

const carouselViewportVariants = cva(
  "-mx-6 w-[calc(100%+3rem)] overflow-x-auto overflow-y-hidden px-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x overscroll-x-contain sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-8 [&::-webkit-scrollbar]:hidden",
);

const carouselTrackVariants = cva(
  "flex min-w-max snap-x snap-mandatory items-start gap-4 pb-2 pr-6 sm:pr-8",
);

const carouselItemVariants = cva(
  "group relative w-[272px] shrink-0 snap-start rounded-[28px] border bg-background/75 p-5 shadow-soft transition-colors hover:bg-background sm:w-[280px]",
  {
    variants: {
      current: {
        true: "border-primary bg-background ring-2 ring-primary/15",
        false: "",
      },
    },
    defaultVariants: {
      current: false,
    },
  },
);

const carouselIconVariants = cva(
  "size-4 transition-transform group-hover:translate-x-0.5",
);

interface ComponentCarouselProps {
  components: ComponentDoc[];
  className?: string;
  currentSlug?: string;
}

export function ComponentCarousel({
  components,
  className,
  currentSlug,
}: ComponentCarouselProps) {
  return (
    <div className={cn(carouselViewportVariants(), className)}>
      <div className={carouselTrackVariants()}>
        {components.map((component) =>
          (() => {
            const isCurrent = currentSlug === component.slug;

            return (
              <Link
                key={component.slug}
                href={component.href}
                aria-current={isCurrent ? "page" : undefined}
                className={carouselItemVariants({ current: isCurrent })}
              >
                <CatalogMetaLabel>{component.category}</CatalogMetaLabel>
                <CatalogSectionTitle className="mt-2">
                  {component.name}
                </CatalogSectionTitle>
                <CatalogSectionDescription className="mt-3">
                  {component.summary}
                </CatalogSectionDescription>
                <CatalogActionLink className="mt-5">
                  {isCurrent ? "Visualizando" : "Abrir"}
                  <ArrowRight className={carouselIconVariants()} />
                </CatalogActionLink>
              </Link>
            );
          })(),
        )}
      </div>
    </div>
  );
}
