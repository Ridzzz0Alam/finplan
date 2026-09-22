"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/site";

export function MobileNav({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={inverted ? "text-white hover:bg-white/15 md:hidden" : "md:hidden"}
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <SheetContent side="right" className="p-6">
        <SheetHeader className="p-0">
          <SheetTitle>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className={buttonVariants({ size: "lg", className: "mt-4 w-full" })}
        >
          Book a consultation
        </Link>
      </SheetContent>
    </Sheet>
  );
}
