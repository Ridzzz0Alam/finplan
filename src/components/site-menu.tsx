"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";

import { navTree, type NavNode } from "@/lib/nav";
import { cn } from "cn";

export function SiteMenuTrigger({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="site-menu-panel"
      aria-label={open ? "Close menu" : "Open menu"}
      className="flex h-10 items-center gap-2 rounded-sm px-2 text-sm font-medium text-white transition-colors outline-none hover:bg-white/10 focus-visible:bg-white/10"
    >
      {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
    </button>
  );
}

/**
 * Cascading columns: the first holds the top level, and expanding an entry
 * opens its children in the next column along, as deep as the tree goes.
 * `trail` holds the expanded index per column, so it doubles as the state for
 * which columns are visible at all.
 */
export function SiteMenuPanel({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [trail, setTrail] = useState<number[]>([0]);

  const columns: NavNode[][] = [navTree];
  let level = 0;
  while (level < trail.length) {
    const children = columns[level][trail[level]]?.children;
    if (!children?.length) break;
    columns.push(children);
    level += 1;
  }

  const toggle = (column: number, index: number) => {
    setTrail((current) =>
      current[column] === index
        ? current.slice(0, column)
        : [...current.slice(0, column), index]
    );
  };

  return (
    <div
      id="site-menu-panel"
      className="h-[calc(100dvh-4rem)] overflow-auto px-4 pt-10 pb-16 sm:px-6"
    >
      <div className="flex gap-10 sm:pl-9">
        {columns.map((nodes, column) => (
          <ul
            key={column}
            className={cn(
              "flex shrink-0 flex-col",
              column === 0 ? "w-56 gap-4 sm:w-64" : "w-56 gap-3 sm:w-64"
            )}
          >
            {nodes.map((node, index) => {
              const expanded = trail[column] === index;
              const hasChildren = Boolean(node.children?.length);

              const label = cn(
                "text-left transition-colors",
                column === 0 ? "text-2xl font-medium" : "text-base",
                expanded
                  ? "text-lime underline underline-offset-4"
                  : node.href
                    ? "text-white/85 hover:text-white"
                    : "text-white/60"
              );

              return (
                <li key={node.title} className="flex items-start gap-4">
                  {node.href ? (
                    <Link
                      href={node.href}
                      onClick={onNavigate}
                      aria-current={pathname === node.href ? "page" : undefined}
                      className={label}
                    >
                      {node.title}
                    </Link>
                  ) : (
                    <span className={label}>{node.title}</span>
                  )}

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggle(column, index)}
                      aria-expanded={expanded}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${node.title}`}
                      className="ml-auto shrink-0 rounded-sm p-1 text-white/70 transition-colors outline-none hover:text-white focus-visible:text-white"
                    >
                      {expanded ? (
                        <MinusIcon className="size-5" />
                      ) : (
                        <PlusIcon className="size-5" />
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
