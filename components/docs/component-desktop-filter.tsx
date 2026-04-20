"use client";

import Link from "next/link";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { ChevronDown, Search } from "lucide-react";

import {
  CatalogInfoBlock,
  CatalogMetaLabel,
  CatalogPill,
  CatalogSectionDescription,
  CatalogSectionTitle,
  CatalogSurfaceCard,
} from "@/components/docs/catalog-primitives";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ComponentDoc } from "@/lib/component-catalog";

const desktopFilterWrapperVariants = cva("hidden lg:block");

const desktopFilterCardVariants = cva(
  "sticky top-6 w-full max-w-[355px] justify-self-start",
);

const desktopFilterPanelBodyVariants = cva("space-y-5");

const desktopFilterCollapsibleHeaderVariants = cva(
  "flex w-full items-center justify-between gap-3 rounded-2xl border bg-background/60 px-3 py-3 text-left transition-colors hover:bg-background",
);

const desktopFilterCollapseIconVariants = cva(
  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
  {
    variants: {
      collapsed: {
        true: "-rotate-90",
        false: "rotate-0",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

const desktopFilterSearchShellVariants = cva(
  "flex items-center gap-3 rounded-2xl border bg-background/80 px-4 py-3 transition-colors focus-within:border-foreground/20 focus-within:bg-background",
);

const desktopFilterInputVariants = cva(
  "w-full border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
);

const desktopFilterListVariants = cva("flex flex-col gap-3");

const desktopFilterItemVariants = cva(
  "rounded-[24px] border bg-background/75 p-4 transition-colors hover:bg-background",
);

interface ComponentDesktopFilterProps {
  components: ComponentDoc[];
  currentSlug: string;
}

function normalizeValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function ComponentDesktopFilter({
  components,
  currentSlug,
}: ComponentDesktopFilterProps) {
  const [query, setQuery] = useState("");
  const [isResultsCollapsed, setIsResultsCollapsed] = useState(false);

  const normalizedQuery = normalizeValue(query.trim());
  const availableComponents = components.filter(
    (component) => component.slug !== currentSlug,
  );

  const filteredComponents = availableComponents.filter((component) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchableText = normalizeValue(
      [component.name, component.category, component.summary].join(" "),
    );

    return searchableText.includes(normalizedQuery);
  });

  return (
    <section className={desktopFilterWrapperVariants()}>
      <CatalogSurfaceCard className={desktopFilterCardVariants()}>
        <CardHeader>
          <div className="space-y-2">
            <CatalogMetaLabel>Navegar entre componentes</CatalogMetaLabel>
            <CardTitle>Painel de navegação</CardTitle>
          </div>
          <CardDescription>
            Use a pesquisa para localizar rapidamente outros componentes do
            catálogo.
          </CardDescription>
        </CardHeader>

        <CardContent className={desktopFilterPanelBodyVariants()}>
          <div className="space-y-2">
            <CatalogSectionTitle className="text-lg">
              Pesquisar componentes
            </CatalogSectionTitle>
            <CatalogSectionDescription>
              Busque por nome, categoria ou resumo.
            </CatalogSectionDescription>
          </div>

          <label className={desktopFilterSearchShellVariants()}>
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar componentes"
              className={desktopFilterInputVariants()}
              aria-label="Pesquisar componentes"
            />
          </label>

          <div className="space-y-3">
            <button
              type="button"
              className={desktopFilterCollapsibleHeaderVariants()}
              onClick={() => setIsResultsCollapsed((current) => !current)}
              aria-expanded={!isResultsCollapsed}
            >
              <div className="flex items-center gap-3">
                <CatalogSectionTitle className="text-lg">
                  Resultados disponíveis
                </CatalogSectionTitle>
                <CatalogPill tone="softSecondary" size="xsStrong">
                  {filteredComponents.length}
                </CatalogPill>
              </div>
              <ChevronDown
                className={desktopFilterCollapseIconVariants({
                  collapsed: isResultsCollapsed,
                })}
              />
            </button>

            {!isResultsCollapsed ? (
              filteredComponents.length > 0 ? (
                <div className={desktopFilterListVariants()}>
                  {filteredComponents.map((component) => (
                    <Link
                      key={component.slug}
                      href={component.href}
                      className={desktopFilterItemVariants()}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CatalogMetaLabel>
                            {component.category}
                          </CatalogMetaLabel>
                          <CatalogSectionTitle className="mt-2 text-xl">
                            {component.name}
                          </CatalogSectionTitle>
                        </div>
                        <CatalogPill>
                          {component.props.length} props
                        </CatalogPill>
                      </div>
                      <CatalogSectionDescription className="mt-3">
                        {component.summary}
                      </CatalogSectionDescription>
                    </Link>
                  ))}
                </div>
              ) : (
                <CatalogInfoBlock tone="muted" density="roomy">
                  Nenhum componente corresponde ao critério atual.
                </CatalogInfoBlock>
              )
            ) : null}
          </div>
        </CardContent>
      </CatalogSurfaceCard>
    </section>
  );
}
