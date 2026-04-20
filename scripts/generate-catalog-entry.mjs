import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const registryPath = path.join(
  projectRoot,
  "components",
  "docs",
  "preview-registry.tsx",
);

function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];
    options[key] = next && !next.startsWith("--") ? next : "true";
  }

  return options;
}

function toPascalCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function assertRequired(value, label) {
  if (!value) {
    throw new Error(`Parametro obrigatorio ausente: --${label}`);
  }
}

function buildPreviewTemplate(componentName) {
  return `import { cva } from "class-variance-authority";

import { CatalogInfoBlock } from "@/components/docs/catalog-primitives";

const ${componentName}PreviewShellVariants = cva(
  "rounded-[28px] border bg-background/70 p-6",
);

export function ${componentName}Preview() {
  return (
    <div className={${componentName}PreviewShellVariants()}>
      <CatalogInfoBlock tone="muted" density="roomy">
        Preview temporario. Substitua este bloco pela demonstracao real do componente.
      </CatalogInfoBlock>
    </div>
  );
}
`;
}

function buildDraftTemplate({
  slug,
  name,
  category,
  componentName,
  previewPath,
}) {
  return `# Draft de catalogo: ${name}

Use este draft junto com docs/catalog-authoring.md.

## Checklist

- [ ] Implementar ou revisar o componente real com variantes em cva().
- [ ] Substituir o preview placeholder em ${previewPath}.
- [ ] Registrar a entrada em lib/component-catalog.ts.
- [ ] Validar lint e build.

## Snippet para lib/component-catalog.ts

\`\`\`ts
{
  slug: "${slug}",
  name: "${name}",
  category: "${category}",
  summary: "Resumo curto do componente.",
  description: "Descricao tecnica orientada a uso real.",
  href: "/componentes/${slug}",
  files: ["components/..."],
  stack: ["React", "Tailwind CSS", "class-variance-authority"],
  cssNotes: [
    "Explique as variantes e tokens principais.",
  ],
  usageNotes: [
    "Explique como usar e quando evitar.",
  ],
  props: [
    {
      name: "variant",
      type: '"default"',
      defaultValue: '"default"',
      description: "Descreva a prop principal.",
    },
  ],
  snippet: \`import { ${name} } from "@/components/...";

export function Example() {
  return <${name} />;
}\`,
}
\`\`\`

## Registry gerada

- Preview component: ${componentName}Preview
- Arquivo de preview: ${previewPath}
- Registry de previews: components/docs/preview-registry.tsx
`;
}

async function updatePreviewRegistry({ slug, componentName, previewFileName }) {
  const registrySource = await readFile(registryPath, "utf8");
  const importLine = `import { ${componentName}Preview } from "@/components/docs/previews/${previewFileName}";`;
  const entryLine = `  ${slug}: ${componentName}Preview,`;

  let nextSource = registrySource;

  if (!registrySource.includes(importLine)) {
    nextSource = nextSource.replace(
      "// @catalog-preview-imports",
      `${importLine}\n// @catalog-preview-imports`,
    );
  }

  if (!nextSource.includes(entryLine)) {
    nextSource = nextSource.replace(
      "  // @catalog-preview-entries",
      `${entryLine}\n  // @catalog-preview-entries`,
    );
  }

  await writeFile(registryPath, nextSource, "utf8");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const slug = options.slug;
  const name = options.name;
  const category = options.category ?? "Categoria";

  assertRequired(slug, "slug");
  assertRequired(name, "name");

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(
      "O slug deve usar apenas letras minusculas, numeros e hifens.",
    );
  }

  const componentName = toPascalCase(slug);
  const previewFileName = `${slug}-preview`;
  const previewDir = path.join(projectRoot, "components", "docs", "previews");
  const draftsDir = path.join(projectRoot, "docs", "catalog-drafts");
  const previewPath = path.join(previewDir, `${previewFileName}.tsx`);
  const draftPath = path.join(draftsDir, `${slug}.md`);

  await mkdir(previewDir, { recursive: true });
  await mkdir(draftsDir, { recursive: true });

  await writeFile(previewPath, buildPreviewTemplate(componentName), {
    encoding: "utf8",
    flag: "wx",
  });

  await writeFile(
    draftPath,
    buildDraftTemplate({
      slug,
      name,
      category,
      componentName,
      previewPath: `components/docs/previews/${previewFileName}.tsx`,
    }),
    {
      encoding: "utf8",
      flag: "wx",
    },
  );

  await updatePreviewRegistry({ slug, componentName, previewFileName });

  console.log(
    `Preview criado em: components/docs/previews/${previewFileName}.tsx`,
  );
  console.log(`Draft criado em: docs/catalog-drafts/${slug}.md`);
  console.log("Atualize lib/component-catalog.ts com o snippet do draft.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
