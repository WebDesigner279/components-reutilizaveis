import { cva } from "class-variance-authority";

export const docsPageShellVariants = cva(
  "min-h-screen overflow-x-clip px-4 py-6 sm:px-8 sm:py-8 lg:px-10",
  {
    variants: {
      layout: {
        default: "",
        centered: "flex items-center justify-center py-10",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  },
);

export const docsPageContainerVariants = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-6",
);

export const docsHeroVariants = cva(
  "rounded-[28px] border border-white/60 bg-white/75 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:rounded-[36px]",
  {
    variants: {
      spacing: {
        default: "p-5 sm:p-6 lg:p-10",
        compact: "p-5 sm:p-6",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  },
);

export const docsHeroBadgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground",
);

export const docsHeroTitleVariants = cva(
  "text-4xl font-semibold tracking-[-0.05em] text-foreground",
  {
    variants: {
      size: {
        default: "sm:text-5xl",
        display: "sm:text-5xl lg:text-6xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const docsHeroDescriptionVariants = cva(
  "max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
);

export const docsSectionTitleVariants = cva(
  "text-xl font-semibold tracking-[-0.03em] text-foreground",
  {
    variants: {
      size: {
        default: "",
        responsive: "sm:text-2xl",
        display: "text-3xl tracking-[-0.04em]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const docsSectionDescriptionVariants = cva(
  "text-sm leading-6 text-muted-foreground",
  {
    variants: {
      tone: {
        default: "",
        strong: "text-foreground",
      },
      size: {
        default: "",
        responsive: "sm:text-base",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
    },
  },
);

export const docsMetaLabelVariants = cva(
  "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
);

export const docsSurfaceCardVariants = cva("", {
  variants: {
    tone: {
      frosted: "border-white/60 bg-white/80",
      strong: "border-white/60 bg-white/85",
      muted: "bg-background/80",
    },
    overflow: {
      default: "",
      hidden: "overflow-hidden",
    },
    width: {
      default: "",
      full: "w-full",
    },
  },
  defaultVariants: {
    tone: "frosted",
    overflow: "default",
    width: "default",
  },
});

export const docsInfoBlockVariants = cva("rounded-3xl border p-4", {
  variants: {
    tone: {
      default: "bg-background/75 text-foreground",
      muted: "bg-background/70 text-muted-foreground",
    },
    density: {
      default: "",
      roomy: "leading-6",
    },
  },
  defaultVariants: {
    tone: "default",
    density: "default",
  },
});

export const docsPillVariants = cva("rounded-full px-3 py-1", {
  variants: {
    tone: {
      outlineMuted: "border text-muted-foreground",
      outlineForeground: "border bg-background/70 text-foreground",
      softPrimary: "border-transparent bg-primary/10 text-primary",
      softSecondary:
        "border-transparent bg-secondary text-secondary-foreground",
    },
    size: {
      xs: "text-xs font-medium",
      xsStrong: "text-xs font-semibold uppercase tracking-[0.16em]",
      sm: "text-sm font-medium",
    },
  },
  defaultVariants: {
    tone: "outlineMuted",
    size: "xs",
  },
});

export const docsActionLinkVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium transition-colors",
  {
    variants: {
      tone: {
        default: "text-foreground",
        muted: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export const docsIconBadgeVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      tone: {
        primary: "bg-primary/10 text-primary",
      },
      size: {
        default: "size-14",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "default",
    },
  },
);
