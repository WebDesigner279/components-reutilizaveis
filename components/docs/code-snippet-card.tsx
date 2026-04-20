"use client";

import { useState } from "react";
import { cva } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import { CatalogSurfaceCard } from "@/components/docs/catalog-primitives";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const codeSnippetCardHeaderVariants = cva("min-w-0 space-y-1.5");

const codeSnippetFrameVariants = cva(
  "code-scroll-shell overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950",
);

const codeSnippetToolbarVariants = cva(
  "flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:px-4",
);

const codeSnippetLanguageVariants = cva(
  "text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400",
);

const codeSnippetCopyButtonVariants = cva(
  "h-8 shrink-0 rounded-full px-2.5 text-[11px] tracking-normal sm:px-3",
  {
    variants: {
      copied: {
        true: "border-emerald-700 bg-emerald-950 text-emerald-100 hover:bg-emerald-900 hover:text-white",
        false:
          "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white",
      },
    },
    defaultVariants: {
      copied: false,
    },
  },
);

const codeSnippetScrollAreaVariants = cva(
  "code-scroll-area h-[360px] overflow-auto sm:h-[420px]",
);

const codeSnippetCopyLabelVariants = cva("hidden sm:inline");

interface CodeSnippetCardProps {
  title: string;
  description: string;
  code: string;
  language?: string;
}

export function CodeSnippetCard({
  title,
  description,
  code,
  language = "tsx",
}: CodeSnippetCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <CatalogSurfaceCard overflow="hidden">
      <CardHeader>
        <div className={codeSnippetCardHeaderVariants()}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 px-2 pb-2 sm:px-3 sm:pb-3">
        <div className={codeSnippetFrameVariants()}>
          <div className={codeSnippetToolbarVariants()}>
            <span className={codeSnippetLanguageVariants()}>{language}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={codeSnippetCopyButtonVariants({ copied })}
              aria-label={copied ? "Código copiado" : "Copiar código"}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span className={codeSnippetCopyLabelVariants()}>
                {copied ? "Copiado" : "Copiar código"}
              </span>
            </Button>
          </div>
          <div className={codeSnippetScrollAreaVariants()}>
            <div className="code-scroll-content">
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                wrapLongLines={false}
                customStyle={{
                  margin: 0,
                  minWidth: "max-content",
                  minHeight: "100%",
                  background: "transparent",
                  padding: 0,
                  fontSize: "0.875rem",
                  lineHeight: "1.75rem",
                  overflow: "visible",
                }}
                codeTagProps={{
                  style: {
                    fontFamily:
                      'var(--font-mono), "Cascadia Code", "Fira Code", Consolas, monospace',
                  },
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </CardContent>
    </CatalogSurfaceCard>
  );
}
