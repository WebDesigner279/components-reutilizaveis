import type { ComponentType, ReactNode } from "react";

import { ButtonPreview } from "@/components/docs/previews/button-preview";
import { CardPreview } from "@/components/docs/previews/card-preview";
import { SeparatorPreview } from "@/components/docs/previews/separator-preview";
import { SidebarPreview } from "@/components/docs/previews/sidebar-preview";
// @catalog-preview-imports

export type ComponentPreview = ComponentType;

export const componentPreviewRegistry: Partial<
  Record<string, ComponentPreview>
> = {
  button: ButtonPreview,
  card: CardPreview,
  separator: SeparatorPreview,
  sidebar: SidebarPreview,
  // @catalog-preview-entries
};

export function getComponentPreview(slug: string) {
  return componentPreviewRegistry[slug] ?? null;
}

export function renderComponentPreview(slug: string): ReactNode | null {
  const PreviewComponent = getComponentPreview(slug);

  return PreviewComponent ? <PreviewComponent /> : null;
}
