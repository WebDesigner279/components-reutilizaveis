import Link from "next/link";
import { notFound } from "next/navigation";
import { cva } from "class-variance-authority";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  CatalogActionLink,
  CatalogHero,
  CatalogHeroDescription,
  CatalogHeroTitle,
  CatalogInfoBlock,
  CatalogMetaLabel,
  CatalogPageContainer,
  CatalogPageShell,
  CatalogPill,
  CatalogSectionDescription,
  CatalogSurfaceCard,
} from "@/components/docs/catalog-primitives";
import { CodeSnippetCard } from "@/components/docs/code-snippet-card";
import { ComponentCarousel } from "@/components/docs/component-carousel";
import { renderComponentPreview } from "@/components/docs/preview-registry";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
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

const componentPageHeroLayoutVariants = cva(
  "flex flex-wrap items-start justify-between gap-4",
);

const componentPageHeroContentVariants = cva("max-w-3xl space-y-4");

const componentPageNextActionVariants = cva("hidden md:flex flex-wrap gap-2");

const componentPageMobileCarouselVariants = cva("order-first md:hidden");

const componentPageMobileCarouselHeaderVariants = cva("px-1 pb-4");

const componentPageSectionGridVariants = cva(
  "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
);

const componentPageReferenceGridVariants = cva(
  "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
);

const componentPageSupportGridVariants = cva(
  "grid gap-6 lg:grid-cols-[1fr_1fr]",
);

const componentPageInfoListVariants = cva("mt-3 flex flex-col gap-2 text-sm", {
  variants: {
    tone: {
      default: "text-foreground",
      roomy: "leading-6 text-foreground",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

const componentPagePropsListVariants = cva("min-w-0 space-y-3");

const componentPagePropsItemVariants = cva(
  "min-w-0 overflow-hidden rounded-3xl border bg-background/75 p-4",
);

const componentPagePropsMetaVariants = cva(
  "flex min-w-0 flex-wrap items-center gap-2",
);

const componentPageChipListVariants = cva("flex flex-wrap gap-2");

type ComponentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return componentCatalog.map((component) => ({ slug: component.slug }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);
  const nextComponent = getNextComponentDoc(slug);
  const preview = renderComponentPreview(slug);

  if (!component) {
    notFound();
  }

  const mobileComponents = componentCatalog;

  return (
    <CatalogPageShell>
      <CatalogPageContainer>
        <CatalogHero>
          <div className={componentPageHeroLayoutVariants()}>
            <div className={componentPageHeroContentVariants()}>
              <Link href="/" className="inline-flex">
                <CatalogActionLink tone="muted">
                  <ArrowLeft className="size-4" />
                  Voltar para a home
                </CatalogActionLink>
              </Link>
              <div>
                <CatalogMetaLabel>{component.category}</CatalogMetaLabel>
                <CatalogHeroTitle className="mt-3">
                  {component.name}
                </CatalogHeroTitle>
                <CatalogHeroDescription className="mt-4">
                  {component.description}
                </CatalogHeroDescription>
              </div>
            </div>

            {nextComponent ? (
              <div className={componentPageNextActionVariants()}>
                <Button asChild variant="outline" className="rounded-full px-4">
                  <Link href={nextComponent.href}>
                    Visualizar próximo componente
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </CatalogHero>

        {mobileComponents.length > 0 ? (
          <section className={componentPageMobileCarouselVariants()}>
            <div className={componentPageMobileCarouselHeaderVariants()}>
              <CatalogMetaLabel>Navegar entre componentes</CatalogMetaLabel>
              <CatalogSectionDescription tone="strong" className="mt-2">
                Deslize horizontalmente para abrir outro componente da
                biblioteca.
              </CatalogSectionDescription>
            </div>
            <ComponentCarousel
              components={mobileComponents}
              currentSlug={slug}
            />
          </section>
        ) : null}

        <section className={componentPageSectionGridVariants()}>
          <CatalogSurfaceCard>
            <CardHeader>
              <CardTitle>Preview isolado</CardTitle>
              <CardDescription>{component.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              {preview ? (
                preview
              ) : (
                <CatalogInfoBlock tone="muted" density="roomy">
                  Preview ainda nao registrado para este componente.
                </CatalogInfoBlock>
              )}
            </CardContent>
          </CatalogSurfaceCard>

          <CatalogSurfaceCard>
            <CardHeader>
              <CardTitle>Informações básicas</CardTitle>
              <CardDescription>
                Resumo técnico direto para adoção e manutenção.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CatalogInfoBlock tone="muted">
                <CatalogMetaLabel>Arquivos base</CatalogMetaLabel>
                <div className={componentPageInfoListVariants()}>
                  {component.files.map((file) => (
                    <span key={file}>{file}</span>
                  ))}
                </div>
              </CatalogInfoBlock>
              <CatalogInfoBlock tone="muted">
                <CatalogMetaLabel>Uso recomendado</CatalogMetaLabel>
                <div
                  className={componentPageInfoListVariants({ tone: "roomy" })}
                >
                  {component.usageNotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </CatalogInfoBlock>
            </CardContent>
          </CatalogSurfaceCard>
        </section>

        <section className={componentPageReferenceGridVariants()}>
          <CatalogSurfaceCard overflow="hidden">
            <CardHeader>
              <CardTitle>Props relevantes</CardTitle>
              <CardDescription>
                Referência rápida da API atual do componente.
              </CardDescription>
            </CardHeader>
            <CardContent className={componentPagePropsListVariants()}>
              {component.props.map((item) => (
                <div
                  key={item.name}
                  className={componentPagePropsItemVariants()}
                >
                  <div className={componentPagePropsMetaVariants()}>
                    <CatalogPill tone="softPrimary" size="xsStrong">
                      {item.name}
                    </CatalogPill>
                    <CatalogPill
                      tone="softSecondary"
                      className="max-w-full break-words"
                    >
                      {item.type}
                    </CatalogPill>
                    <CatalogPill className="max-w-full break-words">
                      default: {item.defaultValue}
                    </CatalogPill>
                  </div>
                  <CatalogSectionDescription className="mt-3">
                    {item.description}
                  </CatalogSectionDescription>
                </div>
              ))}
            </CardContent>
          </CatalogSurfaceCard>

          <CodeSnippetCard
            title="Código reutilizável"
            description="Snippet mínimo para uso imediato no projeto."
            code={component.snippet}
          />
        </section>

        <section className={componentPageSupportGridVariants()}>
          <CatalogSurfaceCard>
            <CardHeader>
              <CardTitle>Stack técnica utilizada</CardTitle>
              <CardDescription>
                Camadas diretamente envolvidas no componente e na biblioteca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className={componentPageChipListVariants()}>
                {component.stack.map((item) => (
                  <CatalogPill key={item} tone="outlineForeground" size="sm">
                    {item}
                  </CatalogPill>
                ))}
              </div>
              <Separator />
              <div className={componentPageChipListVariants()}>
                {installedStack.map((item) => (
                  <CatalogPill key={item} tone="softSecondary" size="sm">
                    {item}
                  </CatalogPill>
                ))}
              </div>
            </CardContent>
          </CatalogSurfaceCard>

          <CatalogSurfaceCard>
            <CardHeader>
              <CardTitle>CSS e tokens envolvidos</CardTitle>
              <CardDescription>
                Informações básicas para manter consistência visual na expansão
                da biblioteca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {component.cssNotes.map((note) => (
                <CatalogInfoBlock key={note} density="roomy">
                  {note}
                </CatalogInfoBlock>
              ))}
              <Separator />
              {sharedCssTokens.map((token) => (
                <CatalogInfoBlock key={token} tone="muted" density="roomy">
                  {token}
                </CatalogInfoBlock>
              ))}
            </CardContent>
          </CatalogSurfaceCard>
        </section>
      </CatalogPageContainer>
    </CatalogPageShell>
  );
}
