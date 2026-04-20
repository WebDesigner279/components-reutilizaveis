import Link from "next/link";
import { cva } from "class-variance-authority";
import { ArrowRight, Sparkles } from "lucide-react";

import {
  CatalogActionLink,
  CatalogHero,
  CatalogHeroBadge,
  CatalogHeroDescription,
  CatalogHeroTitle,
  CatalogInfoBlock,
  CatalogMetaLabel,
  CatalogPageContainer,
  CatalogPageShell,
  CatalogPill,
  CatalogSectionDescription,
  CatalogSectionTitle,
  CatalogSurfaceCard,
} from "@/components/docs/catalog-primitives";
import { ComponentCarousel } from "@/components/docs/component-carousel";
import {
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

const homeMobileSectionVariants = cva("md:hidden");

const homeMobileHeaderVariants = cva("px-1 pb-4");

const homeSectionGridVariants = cva(
  "grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:gap-6",
);

const homeCatalogSectionVariants = cva("hidden space-y-4 md:block");

const homeCatalogHeaderVariants = cva("space-y-2 px-1 sm:px-0");

const homeCatalogGridVariants = cva("hidden gap-4 md:grid md:grid-cols-2");

const homeCatalogItemVariants = cva(
  "group rounded-[28px] border bg-background/75 p-5 transition-colors hover:bg-background",
);

const homeCatalogItemHeaderVariants = cva(
  "flex items-start justify-between gap-3",
);

const homeStackListVariants = cva("mt-3 flex flex-wrap gap-2");

const homeTokensListVariants = cva("mt-3 flex flex-col gap-3");

export default function HomePage() {
  return (
    <CatalogPageShell>
      <CatalogPageContainer>
        <CatalogHero>
          <div className="max-w-3xl space-y-6">
            <CatalogHeroBadge>
              <Sparkles className="size-3.5" />
              Biblioteca de componentes
            </CatalogHeroBadge>

            <div className="space-y-4">
              <CatalogHeroTitle size="display">
                Catálogo para uso de componentes reutilizáveis
              </CatalogHeroTitle>
              <CatalogHeroDescription>
                Encontre aqui componentes prontos e reutilizáveis, com códigos
                limpos.
              </CatalogHeroDescription>
            </div>
          </div>
        </CatalogHero>

        <section className={homeMobileSectionVariants()}>
          <div className={homeMobileHeaderVariants()}>
            <CatalogSectionTitle>Componentes disponíveis</CatalogSectionTitle>
            <CatalogSectionDescription className="mt-2">
              Cada item abre uma área dedicada com preview isolado e
              especificações técnicas relevantes.
            </CatalogSectionDescription>
          </div>
          <ComponentCarousel components={componentCatalog} />
        </section>

        <section id="componentes" className={homeSectionGridVariants()}>
          <section className={homeCatalogSectionVariants()}>
            <div className={homeCatalogHeaderVariants()}>
              <CatalogSectionTitle size="responsive">
                Componentes disponíveis
              </CatalogSectionTitle>
              <CatalogSectionDescription className="max-w-xl">
                Cada item abre uma área dedicada com preview isolado e
                especificações técnicas relevantes.
              </CatalogSectionDescription>
            </div>
            <div className={homeCatalogGridVariants()}>
              {componentCatalog.map((component) => (
                <Link
                  key={component.slug}
                  href={component.href}
                  className={homeCatalogItemVariants()}
                >
                  <div className={homeCatalogItemHeaderVariants()}>
                    <div>
                      <CatalogMetaLabel>{component.category}</CatalogMetaLabel>
                      <CatalogSectionTitle className="mt-2">
                        {component.name}
                      </CatalogSectionTitle>
                    </div>
                    <CatalogPill>{component.props.length} props</CatalogPill>
                  </div>
                  <CatalogSectionDescription className="mt-3">
                    {component.summary}
                  </CatalogSectionDescription>
                  <CatalogActionLink className="mt-5">
                    Abrir documentação
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </CatalogActionLink>
                </Link>
              ))}
            </div>
          </section>

          <CatalogSurfaceCard overflow="hidden" className="min-w-0">
            <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
              <CardTitle className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                Base técnica da biblioteca
              </CardTitle>
              <CardDescription>
                Visão resumida da fundação instalada e dos tokens globais
                compartilhados.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 space-y-4 p-5 pt-5 sm:space-y-5 sm:p-6 sm:pt-6">
              <div className="min-w-0">
                <CatalogMetaLabel>Stack instalada</CatalogMetaLabel>
                <div className={homeStackListVariants()}>
                  {installedStack.map((item) => (
                    <CatalogPill
                      key={item}
                      tone="outlineForeground"
                      size="sm"
                      className="max-w-full break-words"
                    >
                      {item}
                    </CatalogPill>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <CatalogMetaLabel>CSS e tokens compartilhados</CatalogMetaLabel>
                <div className={homeTokensListVariants()}>
                  {sharedCssTokens.map((token) => (
                    <CatalogInfoBlock
                      key={token}
                      tone="muted"
                      density="roomy"
                      className="break-words"
                    >
                      {token}
                    </CatalogInfoBlock>
                  ))}
                </div>
              </div>
            </CardContent>
          </CatalogSurfaceCard>
        </section>
      </CatalogPageContainer>
    </CatalogPageShell>
  );
}
