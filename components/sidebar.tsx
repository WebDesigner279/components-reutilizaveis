"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cva } from "class-variance-authority";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sidebarVariants = cva(
  "overflow-hidden rounded-[28px] border bg-card/95 shadow-soft backdrop-blur",
  {
    variants: {
      size: {
        default: "w-72",
        compact: "w-64",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const sidebarContentVariants = cva(
  "grid transition-[grid-template-rows] duration-300 ease-out",
  {
    variants: {
      collapsed: {
        true: "grid-rows-[0fr]",
        false: "grid-rows-[1fr]",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

const sidebarToggleIconVariants = cva(
  "size-4 transition-transform duration-300",
  {
    variants: {
      collapsed: {
        true: "",
        false: "rotate-180",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

const sidebarItemVariants = cva(
  "group flex h-11 items-center gap-3 rounded-2xl px-4 text-sm font-medium transition-all",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground shadow-sm",
        false:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const defaultItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Perfil",
    href: "perfil",
    icon: User,
  },
  {
    label: "Mensagens",
    href: "mensagens",
    icon: MessageSquare,
  },
  {
    label: "Configurações",
    href: "configuracoes",
    icon: Settings,
  },
  {
    label: "Sair",
    href: "sair",
    icon: LogOut,
  },
];

interface SidebarProps {
  title?: string;
  items?: SidebarItem[];
  activeHref?: string;
  className?: string;
  size?: "default" | "compact";
  enableNavigation?: boolean;
}

export function Sidebar({
  title = "Sidebar",
  items = defaultItems,
  activeHref,
  className,
  size = "default",
  enableNavigation = false,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedHref, setSelectedHref] = useState(
    activeHref ?? items[0]?.href ?? "",
  );
  const pathname = usePathname();
  const fallbackHref = items.some((item) => item.href === selectedHref)
    ? selectedHref
    : (items[0]?.href ?? "");
  const currentHref = enableNavigation
    ? (activeHref ?? pathname)
    : (activeHref ?? fallbackHref);

  return (
    <aside className={cn(sidebarVariants({ size }), className)}>
      <header className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Navegação
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-card-foreground">
              {title}
            </h2>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            aria-expanded={!isCollapsed}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <ChevronDown
              className={sidebarToggleIconVariants({
                collapsed: isCollapsed,
              })}
            />
          </Button>
        </div>
      </header>

      <Separator />

      <div className={sidebarContentVariants({ collapsed: isCollapsed })}>
        <nav className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-2 px-3 py-4">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = currentHref === item.href;
              const itemClassName = sidebarItemVariants({ active: isActive });

              if (enableNavigation) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={itemClassName}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.href}
                  type="button"
                  aria-pressed={isActive}
                  className={itemClassName}
                  onClick={() => setSelectedHref(item.href)}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
