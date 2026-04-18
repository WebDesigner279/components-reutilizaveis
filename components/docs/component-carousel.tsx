import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ComponentDoc } from "@/lib/component-catalog";

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
    <div
      className={cn(
        "-mx-6 w-[calc(100%+3rem)] overflow-x-auto overflow-y-hidden px-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x overscroll-x-contain sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-8 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="flex min-w-max snap-x snap-mandatory items-start gap-4 pb-2 pr-6 sm:pr-8">
        {components.map((component) =>
          (() => {
            const isCurrent = currentSlug === component.slug;

            return (
              <Link
                key={component.slug}
                href={component.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group relative w-[272px] shrink-0 snap-start rounded-[28px] border bg-background/75 p-5 shadow-soft transition-colors hover:bg-background sm:w-[280px]",
                  isCurrent &&
                    "border-primary bg-background ring-2 ring-primary/15",
                )}
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {component.category}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {component.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {component.summary}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {isCurrent ? "Visualizando" : "Abrir"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })(),
        )}
      </div>
    </div>
  );
}
