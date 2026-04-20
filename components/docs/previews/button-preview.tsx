import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const buttonPreviewShellVariants = cva(
  "space-y-6 rounded-[28px] border bg-background/70 p-6",
);

const buttonPreviewRowVariants = cva("flex flex-wrap gap-3");

export function ButtonPreview() {
  return (
    <div className={buttonPreviewShellVariants()}>
      <div className={buttonPreviewRowVariants()}>
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <Separator />
      <div className={buttonPreviewRowVariants()}>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Avancar">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
