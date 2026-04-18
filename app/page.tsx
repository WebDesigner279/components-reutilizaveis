import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { ComponentCarousel } from "@/components/docs/component-carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  componentCatalog,
  installedStack,
  sharedCssTokens,
} from "@/lib/component-catalog";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:rounded-[36px] sm:p-6 lg:p-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="size-3.5" />
              Biblioteca de componentes
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
                Catálogo para uso de componentes reutilizáveis
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Encontre aqui componentes prontos e reutilizáveis, com códigos
                limpos.
              </p>
            </div>
          </div>
        </section>

        <section className="md:hidden">
          <div className="px-1 pb-4">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
              Componentes disponiveis
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Cada item abre uma area dedicada com preview isolado e
              especificacoes tecnicas relevantes.
            </p>
          </div>
          <ComponentCarousel components={componentCatalog} />
        </section>

        <section
          id="componentes"
          className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:gap-6"
        >
          <section className="hidden space-y-4 md:block">
            <div className="space-y-2 px-1 sm:px-0">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                Componentes disponiveis
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Cada item abre uma area dedicada com preview isolado e
                especificacoes tecnicas relevantes.
              </p>
            </div>
            <div className="hidden gap-4 md:grid md:grid-cols-2">
              {componentCatalog.map((component) => (
                <Link
                  key={component.slug}
                  href={component.href}
                  className="group rounded-[28px] border bg-background/75 p-5 transition-colors hover:bg-background"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {component.category}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground">
                        {component.name}
                      </h2>
                    </div>
                    <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {component.props.length} props
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {component.summary}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Abrir documentacao
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Card className="min-w-0 overflow-hidden border-white/60 bg-white/80 shadow-soft">
            <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
              <CardTitle className="text-xl sm:text-2xl">
                Base tecnica da biblioteca
              </CardTitle>
              <CardDescription>
                Visao resumida da fundacao instalada e dos tokens globais
                compartilhados.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 space-y-4 p-5 pt-5 sm:space-y-5 sm:p-6 sm:pt-6">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Stack instalada
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {installedStack.map((item) => (
                    <span
                      key={item}
                      className="max-w-full break-words rounded-full border bg-background/70 px-3 py-1 text-sm font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  CSS e tokens compartilhados
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {sharedCssTokens.map((token) => (
                    <div
                      key={token}
                      className="break-words rounded-3xl border bg-background/70 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {token}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
