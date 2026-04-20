import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { Card } from "@/components/ui/card";
import {
  docsActionLinkVariants,
  docsHeroBadgeVariants,
  docsHeroDescriptionVariants,
  docsHeroTitleVariants,
  docsHeroVariants,
  docsIconBadgeVariants,
  docsInfoBlockVariants,
  docsMetaLabelVariants,
  docsPageContainerVariants,
  docsPageShellVariants,
  docsPillVariants,
  docsSectionDescriptionVariants,
  docsSectionTitleVariants,
  docsSurfaceCardVariants,
} from "@/lib/docs-cva";
import { cn } from "@/lib/utils";

interface CatalogPageShellProps
  extends
    React.ComponentProps<"main">,
    VariantProps<typeof docsPageShellVariants> {}

export function CatalogPageShell({
  className,
  layout,
  ...props
}: CatalogPageShellProps) {
  return (
    <main
      className={cn(docsPageShellVariants({ layout }), className)}
      {...props}
    />
  );
}

export function CatalogPageContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(docsPageContainerVariants(), className)} {...props} />
  );
}

interface CatalogHeroProps
  extends
    React.ComponentProps<"section">,
    VariantProps<typeof docsHeroVariants> {}

export function CatalogHero({
  className,
  spacing,
  ...props
}: CatalogHeroProps) {
  return (
    <section
      className={cn(docsHeroVariants({ spacing }), className)}
      {...props}
    />
  );
}

export function CatalogHeroBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn(docsHeroBadgeVariants(), className)} {...props} />;
}

interface CatalogHeroTitleProps
  extends
    React.ComponentProps<"h1">,
    VariantProps<typeof docsHeroTitleVariants> {}

export function CatalogHeroTitle({
  className,
  size,
  ...props
}: CatalogHeroTitleProps) {
  return (
    <h1 className={cn(docsHeroTitleVariants({ size }), className)} {...props} />
  );
}

export function CatalogHeroDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn(docsHeroDescriptionVariants(), className)} {...props} />
  );
}

interface CatalogSectionTitleProps
  extends
    React.ComponentProps<"h2">,
    VariantProps<typeof docsSectionTitleVariants> {}

export function CatalogSectionTitle({
  className,
  size,
  ...props
}: CatalogSectionTitleProps) {
  return (
    <h2
      className={cn(docsSectionTitleVariants({ size }), className)}
      {...props}
    />
  );
}

interface CatalogSectionDescriptionProps
  extends
    React.ComponentProps<"p">,
    VariantProps<typeof docsSectionDescriptionVariants> {}

export function CatalogSectionDescription({
  className,
  tone,
  size,
  ...props
}: CatalogSectionDescriptionProps) {
  return (
    <p
      className={cn(docsSectionDescriptionVariants({ tone, size }), className)}
      {...props}
    />
  );
}

export function CatalogMetaLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn(docsMetaLabelVariants(), className)} {...props} />;
}

interface CatalogActionLinkProps
  extends
    React.ComponentProps<"span">,
    VariantProps<typeof docsActionLinkVariants> {}

export function CatalogActionLink({
  className,
  tone,
  ...props
}: CatalogActionLinkProps) {
  return (
    <span
      className={cn(docsActionLinkVariants({ tone }), className)}
      {...props}
    />
  );
}

interface CatalogPillProps
  extends React.ComponentProps<"span">, VariantProps<typeof docsPillVariants> {}

export function CatalogPill({
  className,
  tone,
  size,
  ...props
}: CatalogPillProps) {
  return (
    <span
      className={cn(docsPillVariants({ tone, size }), className)}
      {...props}
    />
  );
}

interface CatalogInfoBlockProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof docsInfoBlockVariants> {}

export function CatalogInfoBlock({
  className,
  tone,
  density,
  ...props
}: CatalogInfoBlockProps) {
  return (
    <div
      className={cn(docsInfoBlockVariants({ tone, density }), className)}
      {...props}
    />
  );
}

interface CatalogSurfaceCardProps
  extends
    React.ComponentProps<typeof Card>,
    VariantProps<typeof docsSurfaceCardVariants> {}

export function CatalogSurfaceCard({
  className,
  tone,
  overflow,
  width,
  variant = "elevated",
  ...props
}: CatalogSurfaceCardProps) {
  return (
    <Card
      variant={variant}
      className={cn(
        docsSurfaceCardVariants({ tone, overflow, width }),
        className,
      )}
      {...props}
    />
  );
}

interface CatalogIconBadgeProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof docsIconBadgeVariants> {}

export function CatalogIconBadge({
  className,
  tone,
  size,
  ...props
}: CatalogIconBadgeProps) {
  return (
    <div
      className={cn(docsIconBadgeVariants({ tone, size }), className)}
      {...props}
    />
  );
}
