import { cva } from "class-variance-authority";

import { CatalogSectionDescription } from "@/components/docs/catalog-primitives";
import { Separator } from "@/components/ui/separator";

const separatorPreviewShellVariants = cva(
  "rounded-[28px] border bg-background/70 p-6",
);

const separatorPreviewStackVariants = cva("space-y-4");

const separatorPreviewHeadingVariants = cva(
  "text-sm font-medium leading-6 text-foreground",
);

const separatorPreviewSplitRowVariants = cva(
  "flex h-20 items-center justify-between gap-4 rounded-2xl border bg-card/70 px-4",
);

export function SeparatorPreview() {
  return (
    <div className={separatorPreviewShellVariants()}>
      <div className={separatorPreviewStackVariants()}>
        <div>
          <p className={separatorPreviewHeadingVariants()}>
            Separador horizontal
          </p>
          <CatalogSectionDescription>
            Usado entre blocos verticais.
          </CatalogSectionDescription>
        </div>
        <Separator />
        <div className={separatorPreviewSplitRowVariants()}>
          <span className="text-sm font-medium">Esquerda</span>
          <Separator orientation="vertical" className="h-10" />
          <span className="text-sm font-medium">Direita</span>
        </div>
      </div>
    </div>
  );
}
