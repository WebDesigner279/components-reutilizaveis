import Link from "next/link";
import { WifiOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
      <Card className="w-full max-w-xl border-white/60 bg-white/85 shadow-soft">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <WifiOff className="size-7" />
          </div>
          <CardTitle className="text-3xl tracking-[-0.04em]">
            Você está offline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            A aplicação continua disponível para conteúdos já visitados. Quando
            a conexão voltar, o catálogo será atualizado automaticamente.
          </p>
          <div className="flex justify-center">
            <Button asChild className="rounded-full px-5">
              <Link href="/">Voltar para a biblioteca</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
