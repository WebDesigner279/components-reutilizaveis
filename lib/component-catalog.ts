export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  href: string;
  files: string[];
  stack: string[];
  cssNotes: string[];
  usageNotes: string[];
  props: ComponentPropDoc[];
  snippet: string;
}

export const installedStack = [
  "Next.js 16 App Router",
  "React 19",
  "TypeScript 5.9",
  "Tailwind CSS 3",
  "shadcn/ui",
  "lucide-react",
  "Radix UI",
];

export const sharedCssTokens = [
  "--background / --foreground para base visual da aplicação",
  "--primary / --primary-foreground para ações e estados ativos",
  "--secondary / --muted / --accent para superfícies e feedback visual",
  "--radius para padronizar cantos entre componentes",
  "Classes Tailwind compostas com cn() e tailwind-merge",
];

export const componentCatalog: ComponentDoc[] = [
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Navegação",
    summary:
      "Menu lateral reutilizável com estado ativo local e modo opcional de navegação real.",
    description:
      "Componente pensado para dashboards e áreas autenticadas, com estrutura pronta para ser encaixada em layouts maiores.",
    href: "/componentes/sidebar",
    files: [
      "components/sidebar.tsx",
      "components/ui/button.tsx",
      "components/ui/separator.tsx",
    ],
    stack: [
      "React Client Component",
      "lucide-react",
      "shadcn/ui Button",
      "shadcn/ui Separator",
    ],
    cssNotes: [
      "Usa bg-card, text-card-foreground e shadow-soft para a casca principal.",
      "Estado ativo usa bg-primary e text-primary-foreground.",
      "Expandir e colapsar depende de transição em grid-template-rows.",
    ],
    usageNotes: [
      "Por padrão não navega; cada clique apenas muda o item ativo localmente.",
      "Quando enableNavigation=true, a renderização volta a usar links reais.",
      "Aceita items customizados para plugar menus de diferentes módulos.",
    ],
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: '"Sidebar"',
        description: "Título exibido no cabeçalho do bloco.",
      },
      {
        name: "items",
        type: "SidebarItem[]",
        defaultValue: "defaultItems",
        description: "Coleção de links e ícones exibidos na navegação.",
      },
      {
        name: "activeHref",
        type: "string",
        defaultValue: "primeiro item valido",
        description: "Define explicitamente qual item deve aparecer ativo.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description:
          "Permite estender o container externo com classes adicionais.",
      },
      {
        name: "enableNavigation",
        type: "boolean",
        defaultValue: "false",
        description: "Alterna entre seleção local e navegação real por links.",
      },
    ],
    snippet: `import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen items-start gap-6 p-6">
      <Sidebar title="Workspace" />
      <section className="flex-1 rounded-3xl border bg-card p-6">
        Conteúdo principal
      </section>
    </div>
  );
}`,
  },
  {
    slug: "button",
    name: "Button",
    category: "Ação",
    summary:
      "Botão base com variantes visuais, tamanhos e suporte a composição com Slot.",
    description:
      "Componente central para ações da interface, pronto para links, ícones e estados visuais consistentes.",
    href: "/componentes/button",
    files: ["components/ui/button.tsx", "lib/utils.ts"],
    stack: [
      "class-variance-authority",
      "@radix-ui/react-slot",
      "Tailwind CSS",
      "tailwind-merge",
    ],
    cssNotes: [
      "As variantes são definidas com cva() para manter consistência e extensibilidade.",
      "focus-visible:ring usa os tokens globais de ring e background.",
      "As classes para ícones já padronizam tamanho e comportamento de SVG.",
    ],
    usageNotes: [
      "Serve como base para CTAs, navegação contextual e ações auxiliares.",
      "A prop asChild permite reutilizar a estilização em links e outros elementos.",
      "As variantes default, secondary, outline, ghost e link já estão disponíveis.",
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        defaultValue: '"default"',
        description: "Seleciona a variante visual do botão.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        defaultValue: '"default"',
        description: "Controla altura, padding e formato do componente.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description:
          "Repassa a renderização para outro elemento mantendo a estilização.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Permite estender as classes finais do componente.",
      },
    ],
    snippet: `import { Button } from "@/components/ui/button";

export function Actions() {
  return (
    <div className="flex gap-3">
      <Button>Salvar</Button>
      <Button variant="outline">Cancelar</Button>
    </div>
  );
}`,
  },
  {
    slug: "card",
    name: "Card",
    category: "Estrutura",
    summary:
      "Bloco estrutural para agrupar conteúdo com header, content, footer e slots semânticos.",
    description:
      "Ideal para montar painéis, blocos de documentação, resumos e áreas de preview com separação visual consistente.",
    href: "/componentes/card",
    files: ["components/ui/card.tsx", "lib/utils.ts"],
    stack: ["React", "Tailwind CSS", "cn() para composição de classes"],
    cssNotes: [
      "A casca principal usa rounded-3xl, border e bg-card como base neutra.",
      "Os subslots mantêm padding padrão para acelerar composição em páginas técnicas.",
      "Aceita className em todos os blocos para refinamentos locais.",
    ],
    usageNotes: [
      "Funciona melhor como container de documentação, métricas ou previews isolados.",
      "Os subcomponentes são opcionais e podem ser combinados conforme a necessidade.",
      "Os data-slot facilitam inspeção e testes estruturais.",
    ],
    props: [
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description:
          "Disponível em Card e nos subcomponentes para ajuste fino do layout.",
      },
      {
        name: "...props",
        type: "React.ComponentProps<'div' | 'p'>",
        defaultValue: "nativo do elemento",
        description:
          "Todos os atributos HTML relevantes são repassados ao elemento base.",
      },
    ],
    snippet: `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita mensal</CardTitle>
        <CardDescription>Resumo consolidado do período</CardDescription>
      </CardHeader>
      <CardContent>R$ 24.900,00</CardContent>
    </Card>
  );
}`,
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    summary:
      "Divisor horizontal ou vertical para organizar blocos de conteúdo sem ruído visual.",
    description:
      "Componente fino e utilitário para separar áreas da interface mantendo aderência aos tokens de border.",
    href: "/componentes/separator",
    files: ["components/ui/separator.tsx", "lib/utils.ts"],
    stack: ["@radix-ui/react-separator", "React forwardRef", "Tailwind CSS"],
    cssNotes: [
      "A cor base usa bg-border para acompanhar os tokens do tema.",
      "Aceita orientation horizontal e vertical com dimensões ajustadas automaticamente.",
      "Pode receber className adicional para espessura ou margem local.",
    ],
    usageNotes: [
      "Indicada para dividir listas, painéis, headers e blocos de documentação.",
      "Por padrão renderiza como decorativa, sem semântica extra para leitores de tela.",
      "Pode ser combinada com containers flex ou stacks verticais sem configuração adicional.",
    ],
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Define o eixo visual do divisor.",
      },
      {
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description:
          "Indica se o separador é apenas visual ou semânticamente relevante.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Permite ajustar tamanho, margens e densidade visual.",
      },
    ],
    snippet: `import { Separator } from "@/components/ui/separator";

export function SectionDivider() {
  return (
    <div className="space-y-4">
      <div>Cabeçalho</div>
      <Separator />
      <div>Conteúdo</div>
    </div>
  );
}`,
  },
];

export function getComponentDoc(slug: string) {
  return componentCatalog.find((component) => component.slug === slug);
}

export function getNextComponentDoc(slug: string) {
  const currentIndex = componentCatalog.findIndex(
    (component) => component.slug === slug,
  );

  if (currentIndex === -1) {
    return undefined;
  }

  return componentCatalog[(currentIndex + 1) % componentCatalog.length];
}
