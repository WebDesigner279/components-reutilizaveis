import { cva } from "class-variance-authority";

import { CatalogSurfaceCard } from "@/components/docs/catalog-primitives";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardPreviewGridVariants = cva("grid gap-4 md:grid-cols-2");

const cardPreviewMetricVariants = cva(
  "text-3xl font-semibold tracking-[-0.04em]",
);

const cardPreviewBodyTextVariants = cva(
  "text-sm leading-6 text-muted-foreground",
);

export function CardPreview() {
  return (
    <div className={cardPreviewGridVariants()}>
      <CatalogSurfaceCard tone="muted" variant="default">
        <CardHeader>
          <CardTitle>Receita mensal</CardTitle>
          <CardDescription>
            Atualizado com dados do periodo atual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={cardPreviewMetricVariants()}>R$ 24.900</p>
        </CardContent>
      </CatalogSurfaceCard>

      <CatalogSurfaceCard tone="muted" variant="default">
        <CardHeader>
          <CardTitle>Pipeline</CardTitle>
          <CardDescription>
            Resumo operacional em bloco reutilizavel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={cardPreviewBodyTextVariants()}>
            O Card funciona como base para metricas, documentacao ou areas de
            preview.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Detalhes</Button>
        </CardFooter>
      </CatalogSurfaceCard>
    </div>
  );
}
