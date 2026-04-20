import Link from "next/link";
import { cva } from "class-variance-authority";
import { WifiOff } from "lucide-react";

import {
  CatalogIconBadge,
  CatalogPageShell,
  CatalogSectionDescription,
  CatalogSurfaceCard,
} from "@/components/docs/catalog-primitives";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const offlineActionRowVariants = cva("flex justify-center");

export default function OfflinePage() {
  return (
    <CatalogPageShell layout="centered">
      <CatalogSurfaceCard tone="strong" width="full" className="max-w-xl">
        <CardHeader className="space-y-4 text-center">
          <CatalogIconBadge className="mx-auto">
            <WifiOff className="size-7" />
          </CatalogIconBadge>
          <CardTitle className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
            Você está offline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <CatalogSectionDescription size="responsive">
            A aplicação continua disponível para conteúdos já visitados. Quando
            a conexão voltar, o catálogo será atualizado automaticamente.
          </CatalogSectionDescription>
          <div className={offlineActionRowVariants()}>
            <Button asChild className="rounded-full px-5">
              <Link href="/">Voltar para a biblioteca</Link>
            </Button>
          </div>
        </CardContent>
      </CatalogSurfaceCard>
    </CatalogPageShell>
  );
}
