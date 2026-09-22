import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "cn";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading text-lg font-bold tracking-tight",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-7 place-items-center rounded-sm font-sans text-xs font-bold",
          inverted
            ? "bg-white/15 text-white ring-1 ring-white/30"
            : "bg-primary text-primary-foreground"
        )}
      >
        FP
      </span>
      {siteConfig.name}
    </Link>
  );
}
