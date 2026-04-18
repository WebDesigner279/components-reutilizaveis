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
- shadcn/ui
- Radix UI
- lucide-react

## Componentes documentados

- Sidebar
- Button
- Card
- Separator

## Estrutura principal

```text
app/
  page.tsx                       # home da biblioteca
  componentes/[slug]/page.tsx   # página técnica por componente
  sidebar/page.tsx              # página de demonstração adicional
components/
  sidebar.tsx
  docs/
    code-snippet-card.tsx
    component-carousel.tsx
  ui/
    button.tsx
    card.tsx
    separator.tsx
lib/
  component-catalog.ts          # catálogo, props, snippets e helpers
  utils.ts
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
