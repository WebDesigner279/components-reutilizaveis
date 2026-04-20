# Fluxo para novas páginas e componentes do catálogo

Use este fluxo sempre que adicionar um componente novo à biblioteca ou criar uma nova página de catálogo.

## 1. Criar o componente com API visual previsível

- Declare estados, superfícies, tamanhos e densidades em cva().
- Exponha props de variante nomeadas antes de depender de className.
- Use cn() apenas para combinar o retorno do cva() com overrides pontuais.

## 2. Reaproveitar a camada visual do catálogo

- Para páginas do catálogo, prefira as primitivas em components/docs/catalog-primitives.tsx.
- Para padrões compartilhados de classe, use lib/docs-cva.ts.
- Só crie cva local na página quando o bloco for realmente exclusivo daquela rota.

## 3. Registrar o componente no catálogo

- Adicione a entrada em lib/component-catalog.ts.
- Preencha summary, description, files, stack, cssNotes, usageNotes, props e snippet.
- Documente apenas variantes e props que realmente existem na API final.

### Gerador recomendado

Use o gerador para criar o preview placeholder e um draft inicial:

```bash
npm run catalog:new -- --slug accordion --name "Accordion" --category "Layout"
```

O comando cria:

- components/docs/previews/accordion-preview.tsx
- docs/catalog-drafts/accordion.md
- registro do preview em components/docs/preview-registry.tsx

## 4. Adicionar preview da página técnica

- Prefira criar o preview em components/docs/previews e registrá-lo em components/docs/preview-registry.tsx.
- Reuse CatalogSurfaceCard, CatalogInfoBlock, CatalogPill, CatalogMetaLabel e demais primitivas antes de criar markup novo.
- Evite reintroduzir switch grande em app/componentes/[slug]/page.tsx.

## 5. Validar consistência

- Verifique se não há grupos grandes de classes repetidos fora de cva().
- Verifique se novas variantes têm consumo real.
- Rode npm run lint e npm run build.

## Exemplo mínimo de página usando primitivas

```tsx
import {
  CatalogHero,
  CatalogHeroDescription,
  CatalogHeroTitle,
  CatalogPageContainer,
  CatalogPageShell,
  CatalogSurfaceCard,
} from "@/components/docs/catalog-primitives";

export default function ExamplePage() {
  return (
    <CatalogPageShell>
      <CatalogPageContainer>
        <CatalogHero>
          <CatalogHeroTitle>Novo componente</CatalogHeroTitle>
          <CatalogHeroDescription>
            Página construída com as primitivas padronizadas do catálogo.
          </CatalogHeroDescription>
        </CatalogHero>

        <CatalogSurfaceCard>
          Conteúdo estruturado da documentação.
        </CatalogSurfaceCard>
      </CatalogPageContainer>
    </CatalogPageShell>
  );
}
```

## Exemplo de fluxo recomendado

1. Rode npm run catalog:new com slug, nome e categoria.
2. Substitua o preview placeholder pelo preview real em components/docs/previews.
3. Copie o snippet do draft para lib/component-catalog.ts.
4. Revise a documentação técnica e valide com lint e build.
