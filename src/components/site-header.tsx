"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { SiteMenuPanel, SiteMenuTrigger } from "@/components/site-menu";

type Panel = "menu" | "language" | null;

export function SiteHeader() {
  // Only one panel is ever open: both expand the bar, so they would otherwise
  // fight over the same space.
  const [panel, setPanel] = useState<Panel>(null);
  const menuOpen = panel === "menu";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink text-white">
      {/* Full-bleed bar: menu and language on the left, logo centred on the
          viewport, contact on the right. Items align to the top of the bar so
          the panels below can expand it downwards. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 px-4 sm:px-6">
        <div className="flex items-start gap-1 justify-self-start">
          <div className="flex h-16 items-center">
            <SiteMenuTrigger
              open={menuOpen}
              onToggle={() => setPanel(menuOpen ? null : "menu")}
            />
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

      {menuOpen && <SiteMenuPanel onNavigate={() => setPanel(null)} />}
    </header>
  );
}
