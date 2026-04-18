"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  enableNavigation?: boolean;
}

export function Sidebar({
  title = "Sidebar",
  items = defaultItems,
  activeHref,
  className,
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
    <aside
      className={cn(
        "w-72 overflow-hidden rounded-[28px] border bg-card/95 shadow-soft backdrop-blur",
        className,
      )}
    >
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
              className={cn(
                "size-4 transition-transform duration-300",
                !isCollapsed && "rotate-180",
              )}
            />
          </Button>
        </div>
      </header>

      <Separator />

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
        )}
      >
        <nav className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-2 px-3 py-4">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = currentHref === item.href;
              const itemClassName = cn(
                "group flex h-11 items-center gap-3 rounded-2xl px-4 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              );

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
