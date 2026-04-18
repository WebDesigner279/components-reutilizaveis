"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="overflow-hidden border-white/60 bg-white/80 shadow-soft">
      <CardHeader className="space-y-1.5">
        <div className="min-w-0 space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 px-2 pb-2 sm:px-3 sm:pb-3">
        <div className="code-scroll-shell overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:px-4">
            <span>{language}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 shrink-0 rounded-full border-slate-700 bg-slate-900 px-2.5 text-[11px] tracking-normal text-slate-200 hover:bg-slate-800 hover:text-white sm:px-3"
              aria-label={copied ? "Codigo copiado" : "Copiar codigo"}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span className="hidden sm:inline">
                {copied ? "Copiado" : "Copiar codigo"}
              </span>
            </Button>
          </div>
          <div className="code-scroll-area h-[360px] overflow-auto sm:h-[420px]">
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
    </Card>
  );
}
