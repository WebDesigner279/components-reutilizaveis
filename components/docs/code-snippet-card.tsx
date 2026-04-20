"use client";

import { useEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import { Check, Copy, HandGrab } from "lucide-react";
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
import { cn } from "@/lib/utils";

const codeSnippetCardHeaderVariants = cva("min-w-0 space-y-1.5");

const codeSnippetFrameVariants = cva(
  "code-scroll-shell overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950",
);

const codeSnippetToolbarVariants = cva(
  "flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:px-4",
);

const codeSnippetToolbarMetaVariants = cva("flex items-center gap-2");

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
  "code-scroll-area relative h-[360px] overflow-auto sm:h-[420px]",
);

const codeSnippetCopyLabelVariants = cva("hidden sm:inline");

const codeSnippetDragHintVariants = cva(
  "pointer-events-none hidden items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-300/90 sm:inline-flex",
);

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
};

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
  const [canDrag, setCanDrag] = useState(false);
  const [dragging, setDragging] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    const element = scrollAreaRef.current;
    const content = scrollContentRef.current;

    if (!element || !content) {
      return;
    }

    const updateOverflow = () => {
      const nextCanDrag =
        element.scrollWidth > element.clientWidth + 1 ||
        element.scrollHeight > element.clientHeight + 1;

      setCanDrag(nextCanDrag);

      if (!nextCanDrag) {
        stopDragging();
      }
    };

    const frameId = window.requestAnimationFrame(updateOverflow);
    const resizeObserver = new ResizeObserver(updateOverflow);

    resizeObserver.observe(element);
    resizeObserver.observe(content);
    window.addEventListener("resize", updateOverflow);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [code, language]);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  function stopDragging() {
    dragStateRef.current = null;
    setDragging(false);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!canDrag) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const element = scrollAreaRef.current;

    if (!element) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };

    element.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollAreaRef.current;
    const dragState = dragStateRef.current;

    if (!element || !dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    element.scrollLeft =
      dragState.scrollLeft - (event.clientX - dragState.startX);
    element.scrollTop =
      dragState.scrollTop - (event.clientY - dragState.startY);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const element = scrollAreaRef.current;

    if (element?.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }

    stopDragging();
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
            <div className={codeSnippetToolbarMetaVariants()}>
              <span className={codeSnippetLanguageVariants()}>{language}</span>
              {canDrag ? (
                <span className={codeSnippetDragHintVariants()}>
                  <HandGrab className="size-3" />
                  arraste
                </span>
              ) : null}
            </div>
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
          <div
            ref={scrollAreaRef}
            className={cn(
              codeSnippetScrollAreaVariants(),
              canDrag
                ? dragging
                  ? "cursor-grabbing select-none"
                  : "cursor-grab"
                : "cursor-default",
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={stopDragging}
            onLostPointerCapture={stopDragging}
            role="region"
            aria-label={
              canDrag
                ? "Área rolável do código. Arraste para navegar horizontal e verticalmente."
                : "Área do código."
            }
          >
            <div ref={scrollContentRef} className="code-scroll-content">
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
