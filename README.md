# Biblioteca de Componentes Reutilizáveis

Catálogo em Next.js para consulta, preview e documentação técnica de componentes reutilizáveis.

## Visão geral

Este projeto organiza uma biblioteca de componentes com foco em uso prático e documentação direta. A home apresenta os componentes disponíveis e cada item leva para uma página técnica isolada com:

- preview visual do componente
- código reutilizável
- props relevantes
- notas de CSS
- stack técnica utilizada
- arquivos-base do componente

## Stack atual

- Next.js 16 com App Router
- React 19
- TypeScript 5.9
- Tailwind CSS 3
- class-variance-authority
- shadcn/ui
- Radix UI
- lucide-react
- Service Worker nativo para suporte a PWA

## Componentes documentados

- Sidebar
- Button
- Card
- Separator

## Estrutura principal

```text
app/
  apple-icon.tsx                # ícone Apple gerado via Next
  icon.tsx                      # ícone principal gerado via Next
  offline/page.tsx              # fallback offline
  page.tsx                       # home da biblioteca
  componentes/[slug]/page.tsx   # página técnica por componente
  sidebar/page.tsx              # página de demonstração adicional
components/
  pwa/
    service-worker-registration.tsx
  sidebar.tsx
  docs/
    catalog-primitives.tsx
    preview-registry.tsx
    previews/
    code-snippet-card.tsx
    component-carousel.tsx
  ui/
    button.tsx
    card.tsx
    separator.tsx
lib/
  component-catalog.ts          # catálogo, props, snippets e helpers
  utils.ts
public/
  manifest.json                 # manifesto instalável da PWA
  sw.js                         # service worker para cache e offline
  icon-192.svg
  icon-512.svg
  maskable-icon.svg
scripts/
  generate-catalog-entry.mjs    # scaffolding para novas entradas do catálogo
```

## Rotas

- /: home da biblioteca
- /componentes/sidebar
- /componentes/button
- /componentes/card
- /componentes/separator
- /sidebar

As páginas em /componentes/[slug] são geradas estaticamente a partir do catálogo definido em lib/component-catalog.ts.

## Como executar localmente

### Requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:3000
```

### Build de produção

```bash
npm run build
npm run start
```

## PWA

O projeto agora expõe um manifesto instalável em /manifest.json, registra um service worker próprio em /sw.js e inclui uma rota offline em /offline.

Recursos configurados:

- instalação como aplicativo em navegadores modernos
- cache offline para navegação e assets já visitados
- atualização automática do service worker com recarga controlada
- ícones dedicados para instalação, atalho e modo maskable
- rota offline para páginas ainda não armazenadas em cache

Para testar a experiência offline, acesse a aplicação pelo menos uma vez com conexão ativa e depois recarregue a home ou navegue para uma rota não visitada sem rede. A home deve ser carregada do cache e as rotas inéditas devem cair no fallback de /offline.

### Lint

```bash
npm run lint
```

## Como a biblioteca funciona

O catálogo central fica em lib/component-catalog.ts. Cada componente possui um registro com:

- slug
- nome
- categoria
- resumo
- descrição
- arquivos-base
- stack
- notas de CSS
- notas de uso
- props documentadas
- snippet de exemplo

Esse catálogo alimenta:

- os cards da home
- a navegação entre componentes
- a geração estática das páginas técnicas
- a documentação exibida em cada rota

## Convenção de estilos com cva()

O projeto usa Class Variance Authority como convenção principal para variantes visuais e estados reutilizáveis.

Regras práticas:

- componentes-base e reutilizáveis devem expor superfícies, tamanhos, espaçamentos e estados por cva()
- páginas do catálogo e componentes de documentação reutilizam variantes compartilhadas em lib/docs-cva.ts
- className continua disponível para override pontual, não para substituir a API de variantes
- tokens globais permanecem centralizados em app/globals.css

Documentação detalhada:

- docs/cva-conventions.md
- docs/catalog-authoring.md

Gerador de novas entradas:

```bash
npm run catalog:new -- --slug accordion --name "Accordion" --category "Layout"
```

## Deploy na Vercel

O projeto está compatível com deploy inicial na Vercel.

Validações já executadas:

- build de produção concluído com sucesso
- lint concluído sem erros
- rotas estáticas geradas corretamente

Passos para deploy:

1. Importar o repositório na Vercel.
2. Manter as configurações padrão para projeto Next.js.
3. Executar o deploy.

Atualmente o projeto não depende de variáveis de ambiente obrigatórias para subir a aplicação.

## Scripts disponíveis

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint ."
}
```

## Repositório

Repositório remoto atual:

https://github.com/WebDesigner279/components-reutilizaveis.git
