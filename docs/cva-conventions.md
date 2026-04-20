# Convenções de uso com cva()

Este projeto adota Class Variance Authority como padrão para declarar superfícies, estados e densidade visual de componentes reutilizáveis e da camada de documentação.

## Regras base

- Use cva() para classes estruturais, estados interativos e variações semânticas previsíveis.
- Use cn() apenas para compor o retorno de cva() com className externo ou pequenos ajustes contextuais.
- Prefira adicionar uma variante nomeada antes de repetir a mesma combinação de classes em duas ou mais telas.
- Deixe className como escape hatch, não como API principal de estilização.
- Tokens globais de cor, raio e ring continuam em app/globals.css; cva() consome esses tokens, não os substitui.

## Onde declarar variantes

- components/ui: variantes de design system e componentes-base.
- components: variantes de componentes reutilizáveis compostos.
- lib/docs-cva.ts: padrões compartilhados da camada de documentação e páginas do catálogo.
- components/docs/catalog-primitives.tsx: camada de composição para futuras páginas do catálogo.
- app: variantes locais apenas quando o estilo for exclusivo de uma rota e não tiver potencial claro de reuso.

## Convenção de nomes

- Use o padrão nomeDoComponenteVariants para a casca principal.
- Use nomes específicos como headerVariants, itemVariants ou badgeVariants para subpartes relevantes.
- Nomeie variantes por intenção, como variant, size, tone, spacing, state, current, active.
- Evite nomes ambíguos como type ou mode quando a intenção visual puder ser descrita melhor.

## Ordem de decisão

1. Existe um componente-base que já resolve o caso? Reutilize a variante existente.
2. Existe uma primitiva pronta em components/docs/catalog-primitives.tsx? Reutilize-a.
3. Existe repetição em duas ou mais páginas do catálogo? Extraia para lib/docs-cva.ts.
4. O estilo é exclusivo de uma única rota? Declare um cva local no próprio arquivo.
5. Só reste className para ajustes pontuais ou composição final.

## Fluxo para novas entradas do catálogo

- Crie o componente com variantes declaradas em cva().
- Reaproveite components/docs/catalog-primitives.tsx na página do catálogo.
- Registre previews em components/docs/preview-registry.tsx, com componentes dedicados em components/docs/previews.
- Atualize lib/component-catalog.ts com a API real do componente.
- Registre o preview em app/componentes/[slug]/page.tsx.
- Consulte docs/catalog-authoring.md antes de abrir novas exceções locais.

## Exemplo recomendado

```tsx
const panelVariants = cva("rounded-3xl border", {
  variants: {
    tone: {
      default: "bg-background text-foreground",
      muted: "bg-background/70 text-muted-foreground",
    },
    spacing: {
      default: "p-6",
      compact: "p-4",
    },
  },
  defaultVariants: {
    tone: "default",
    spacing: "default",
  },
});

function Panel({ className, tone, spacing }: PanelProps) {
  return <div className={cn(panelVariants({ tone, spacing }), className)} />;
}
```

## Anti-padrões

- Concatenar ternários extensos dentro de className quando a condição representa uma variante estável.
- Duplicar grupos grandes de classes entre home, páginas técnicas e componentes de documentação.
- Introduzir variantes que nunca são expostas nem consumidas.
- Usar cva() para tokens globais ou estilos que pertencem à base do CSS global.
