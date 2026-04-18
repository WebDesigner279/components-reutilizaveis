"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

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
}

export function CodeSnippetCard({
  title,
  description,
  code,
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
      <CardHeader className="flex flex-col items-start justify-between gap-4 space-y-0 sm:flex-row">
        <div className="min-w-0 space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="shrink-0 rounded-full px-4"
          aria-label={copied ? "Codigo copiado" : "Copiar codigo"}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          <span className="hidden sm:inline">
            {copied ? "Copiado" : "Copiar codigo"}
          </span>
        </Button>
      </CardHeader>
      <CardContent className="min-w-0">
        <div className="overflow-hidden rounded-[28px] border bg-slate-950 p-4 text-xs text-slate-100 sm:p-5 sm:text-sm">
          <pre className="whitespace-pre-wrap break-words font-mono leading-6 sm:leading-7">
            {code}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
