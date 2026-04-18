import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CodeSnippetCard } from "@/components/docs/code-snippet-card";
import { ComponentCarousel } from "@/components/docs/component-carousel";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  componentCatalog,
  getComponentDoc,
  getNextComponentDoc,
  installedStack,
  sharedCssTokens,
} from "@/lib/component-catalog";

type ComponentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return componentCatalog.map((component) => ({ slug: component.slug }));
}

function renderPreview(slug: string) {
  switch (slug) {
    case "sidebar":
      return (
        <div className="flex min-h-[430px] items-start justify-start rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_36%)] p-4">
          <Sidebar />
        </div>
      );
    case "button":
      return (
        <div className="space-y-6 rounded-[28px] border bg-background/70 p-6">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Avançar">
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      );
    case "card":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background/80">
            <CardHeader>
              <CardTitle>Receita mensal</CardTitle>
              <CardDescription>
                Atualizado com dados do período atual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-[-0.04em]">
                R$ 24.900
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/80">
            <CardHeader>
              <CardTitle>Pipeline</CardTitle>
              <CardDescription>
                Resumo operacional em bloco reutilizável.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                O Card funciona como base para métricas, documentação ou áreas
                de preview.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Detalhes</Button>
            </CardFooter>
          </Card>
        </div>
      );
    case "separator":
      return (
        <div className="rounded-[28px] border bg-background/70 p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Separador horizontal
              </p>
              <p className="text-sm text-muted-foreground">
                Usado entre blocos verticais.
              </p>
            </div>
            <Separator />
            <div className="flex h-20 items-center justify-between gap-4 rounded-2xl border bg-card/70 px-4">
              <span className="text-sm font-medium">Esquerda</span>
              <Separator orientation="vertical" className="h-10" />
              <span className="text-sm font-medium">Direita</span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);
  const nextComponent = getNextComponentDoc(slug);

  if (!component) {
    notFound();
  }

  const mobileComponents = componentCatalog;

  return (
    <main className="min-h-screen overflow-x-clip px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:rounded-[36px] sm:p-6 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                Voltar para a home
              </Link>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {component.category}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                  {component.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {component.description}
                </p>
              </div>
            </div>

            {nextComponent ? (
              <div className="hidden md:flex flex-wrap gap-2">
                <Button asChild variant="outline" className="rounded-full px-4">
                  <Link href={nextComponent.href}>
                    Visualizar próximo componente
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        {mobileComponents.length > 0 ? (
          <section className="order-first md:hidden">
            <div className="px-1 pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Navegar entre componentes
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Deslize horizontalmente para abrir outro componente da
                biblioteca.
              </p>
            </div>
            <ComponentCarousel
              components={mobileComponents}
              currentSlug={slug}
            />
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/60 bg-white/80 shadow-soft">
            <CardHeader>
              <CardTitle>Preview isolado</CardTitle>
              <CardDescription>{component.summary}</CardDescription>
            </CardHeader>
            <CardContent>{renderPreview(component.slug)}</CardContent>
          </Card>

          <Card className="border-white/60 bg-white/80 shadow-soft">
            <CardHeader>
              <CardTitle>Informações básicas</CardTitle>
              <CardDescription>
                Resumo técnico direto para adoção e manutenção.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-3xl border bg-background/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Arquivos base
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm text-foreground">
                  {component.files.map((file) => (
                    <span key={file}>{file}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border bg-background/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Uso recomendado
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm leading-6 text-foreground">
                  {component.usageNotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden border-white/60 bg-white/80 shadow-soft">
            <CardHeader>
              <CardTitle>Props relevantes</CardTitle>
              <CardDescription>
                Referência rápida da API atual do componente.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 space-y-3">
              {component.props.map((item) => (
                <div
                  key={item.name}
                  className="min-w-0 overflow-hidden rounded-3xl border bg-background/75 p-4"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {item.name}
                    </span>
                    <span className="max-w-full break-words rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {item.type}
                    </span>
                    <span className="max-w-full break-words rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                      default: {item.defaultValue}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <CodeSnippetCard
            title="Código reutilizável"
            description="Snippet mínimo para uso imediato no projeto."
            code={component.snippet}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="border-white/60 bg-white/80 shadow-soft">
            <CardHeader>
              <CardTitle>Stack técnica utilizada</CardTitle>
              <CardDescription>
                Camadas diretamente envolvidas no componente e na biblioteca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {component.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border bg-background/70 px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {installedStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/60 bg-white/80 shadow-soft">
            <CardHeader>
              <CardTitle>CSS e tokens envolvidos</CardTitle>
              <CardDescription>
                Informações básicas para manter consistência visual na expansão
                da biblioteca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {component.cssNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-3xl border bg-background/75 p-4 text-sm leading-6 text-foreground"
                >
                  {note}
                </div>
              ))}
              <Separator />
              {sharedCssTokens.map((token) => (
                <div
                  key={token}
                  className="rounded-3xl border bg-background/75 p-4 text-sm leading-6 text-muted-foreground"
                >
                  {token}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
