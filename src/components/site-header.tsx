"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { mainNav } from "@/lib/site";
import { cn } from "cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The home page opens with a full-bleed hero, so the bar floats over it
  // until the reader scrolls past the fold.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero
          ? "bg-transparent text-white"
          : "border-b border-border/60 bg-background/90 text-foreground backdrop-blur-md"
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium transition-opacity hover:opacity-70",
                overHero ? "text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="justify-self-start md:justify-self-center">
          <Logo inverted={overHero} />
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <Link
            href="/contact"
            className={cn(
              "hidden items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 md:inline-flex",
              overHero ? "text-white" : "text-foreground"
            )}
          >
            Contact us
            <ArrowRightIcon className="size-4" />
          </Link>
          <MobileNav inverted={overHero} />
        </div>
      </div>
    </header>
  );
}
