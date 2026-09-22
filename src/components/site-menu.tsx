"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navTree, type NavNode } from "@/lib/nav";
import { cn } from "cn";

/**
 * Three bars that fold into a cross when the menu opens.
 *
 * The outer bars are placed symmetrically as percentages, not fixed offsets:
 * the box is sized by --bar-icon, which is 1.5rem over the hero and 1.25rem
 * once the bar condenses. Any symmetric inset keeps the three gaps even at
 * both sizes, where a fixed px offset can only be right at one of them.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span aria-hidden className="relative block size-(--bar-icon) transition-all duration-300 ease-out">
      <span
        className={cn(bar, open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[15%]")}
      />
      <span
        className={cn(
          bar,
          "top-1/2 -translate-y-1/2",
          open && "scale-x-0 opacity-0"
        )}
      />
      <span
        className={cn(
          bar,
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-[15%]"
        )}
      />
    </span>
  );
}

/** A plus whose vertical stroke rotates away to leave a minus. */
function ExpandGlyph({ expanded }: { expanded: boolean }) {
  return (
    <span aria-hidden className="relative block size-4">
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          expanded ? "rotate-0" : "rotate-90"
        )}
      />
    </span>
  );
}

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
      className="flex h-10 items-center gap-2 rounded-sm px-2 text-(length:--bar-label) font-medium text-white transition-all duration-300 ease-out outline-none hover:bg-white/10 focus-visible:bg-white/10"
    >
      <MenuGlyph open={open} />
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
export function SiteMenuPanel({
  closing,
  onNavigate,
}: {
  closing: boolean;
  onNavigate: () => void;
}) {
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
      data-closing={closing || undefined}
      className="menu-panel h-[calc(100dvh-var(--bar-height))] overflow-auto pt-10 pb-16"
    >
      {/* Same container as the bar. The extra left padding lands the first
          column under the trigger's label rather than under its icon: the
          bar's own px-6 plus the icon (20px) and its 8px gap. */}
      <div className="mx-auto flex w-full max-w-[97.5rem] gap-10 px-4 sm:px-6 sm:pl-13">
        {columns.map((nodes, column) => (
          <ul
            // Keying on the parent's index restarts the animation whenever a
            // different branch fills this column.
            key={`${column}-${trail[column - 1] ?? "root"}`}
            className="menu-column flex w-56 shrink-0 flex-col gap-3 sm:w-64"
          >
            {nodes.map((node, index) => {
              const expanded = trail[column] === index;
              const hasChildren = Boolean(node.children?.length);

              const label = cn(
                "text-left transition-all duration-200",
                column === 0 ? "text-2xl font-medium" : "text-base",
                expanded
                  ? "text-lime underline underline-offset-4"
                  : node.href
                    ? "text-white/85 hover:translate-x-1 hover:text-white"
                    : "text-white/60"
              );

              return (
                <li
                  key={node.title}
                  className="menu-item flex items-start gap-4"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
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
                      className="mt-1.5 ml-auto shrink-0 rounded-sm p-1 text-white/70 transition-colors outline-none hover:text-white focus-visible:text-white"
                    >
                      <ExpandGlyph expanded={expanded} />
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
