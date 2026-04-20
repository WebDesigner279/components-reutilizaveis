import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-3xl border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      elevated: "shadow-soft",
      ghost: "border-transparent bg-transparent shadow-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6", {
  variants: {
    spacing: {
      default: "",
      compact: "space-y-1 p-5",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

const cardTitleVariants = cva("text-xl font-semibold tracking-[-0.03em]");

const cardDescriptionVariants = cva("text-sm text-muted-foreground");

const cardContentVariants = cva("p-6 pt-0", {
  variants: {
    spacing: {
      default: "",
      compact: "p-5 pt-0",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

const cardFooterVariants = cva("flex items-center p-6 pt-0", {
  variants: {
    spacing: {
      default: "",
      compact: "p-5 pt-0",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

interface CardProps
  extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

interface CardHeaderProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof cardHeaderVariants> {}

function CardHeader({ className, spacing, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ spacing }), className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants(), className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  );
}

interface CardContentProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof cardContentVariants> {}

function CardContent({ className, spacing, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ spacing }), className)}
      {...props}
    />
  );
}

interface CardFooterProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof cardFooterVariants> {}

function CardFooter({ className, spacing, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ spacing }), className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
