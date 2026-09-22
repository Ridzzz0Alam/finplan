"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { SiteMenuPanel, SiteMenuTrigger } from "@/components/site-menu";
import { cn } from "cn";

type Panel = "menu" | "language" | null;

/**
 * Routes that open with a dark, full-bleed hero the bar can sit on top of.
 * Everywhere else starts on a light section, so the bar keeps its own
 * background or its white text would land on white.
 */
const heroRoutes = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Only one panel is ever open: both expand the bar, so they would otherwise
  // fight over the same space.
  const [panel, setPanel] = useState<Panel>(null);
  const menuOpen = panel === "menu";
  // Held one beat past close so the panel can play its exit before unmounting.
  // Mounting happens in the click handler; only the unmount needs to wait.
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    if (menuOpen || !menuMounted) return;
    const timer = setTimeout(() => setMenuMounted(false), 160);
    return () => clearTimeout(timer);
  }, [menuOpen, menuMounted]);

  const toggleMenu = () => {
    if (menuOpen) {
      setPanel(null);
      return;
    }
    setMenuMounted(true);
    setPanel("menu");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Picks up a restored scroll position on back/forward, on the next frame
    // rather than synchronously inside the effect.
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  // The menu covers the viewport, so the page behind it should not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // An open panel always needs its own background: it covers the page, and the
  // hero would otherwise show through the menu. The scrolled bar is glass:
  // ink/65 is as sheer as it goes while white labels still clear 4.5:1 against
  // the worst case, a white section passing underneath.
  const blendsWithHero = heroRoutes.has(pathname) && !scrolled && !panel;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300",
        panel
          ? "bg-ink"
          : blendsWithHero
            ? "bg-transparent"
            : "bg-ink/65 backdrop-blur-sm"
      )}
    >
      {/* Full-bleed bar: menu and language on the left, logo centred on the
          viewport, contact on the right. Items align to the top of the bar so
          the panels below can expand it downwards. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 px-4 sm:px-6">
        <div className="flex items-start gap-1 justify-self-start">
          <div className="flex h-16 items-center">
            <SiteMenuTrigger open={menuOpen} onToggle={toggleMenu} />
          </div>
          <LanguageSwitcher
            open={panel === "language"}
            onOpenChange={(open) => setPanel(open ? "language" : null)}
          />
        </div>

        <Logo inverted className="h-16 justify-self-center text-white" />

        <div className="flex h-16 items-center justify-self-end">
          <Link
            href="/contact"
            aria-label="Contact us"
            onClick={() => setPanel(null)}
            className="flex h-10 items-center gap-2 rounded-sm px-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <span className="hidden sm:inline">Contact us</span>
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>
      </div>

      {menuMounted && (
        <SiteMenuPanel closing={!menuOpen} onNavigate={() => setPanel(null)} />
      )}
    </header>
  );
}
