"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useRailScroll } from "@/hooks/use-rail-scroll";
import { clients, type Client } from "@/lib/clients";
import { cn } from "cn";

const treatments: Record<Client["treatment"], string> = {
  bold: "font-sans text-xl font-black tracking-tight sm:text-3xl",
  serif: "font-heading text-xl font-bold sm:text-3xl",
  wide: "font-sans text-base font-semibold tracking-[0.2em] sm:text-xl",
  mono: "font-mono text-lg font-semibold tracking-tight sm:text-2xl",
};

// Lime while that direction still has somewhere to go, dimmed once it doesn't.
const navButton = (enabled: boolean) =>
  cn(
    "grid size-8 place-items-center rounded-sm transition-colors",
    enabled
      ? "bg-lime text-ink hover:opacity-85"
      : "cursor-not-allowed bg-white/20 text-white/50"
  );

export function ClientsRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const { canScrollLeft, canScrollRight, scrollByCard } = useRailScroll(railRef);

  return (
    <section className="bg-primary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-3xl font-normal text-lime sm:text-4xl">
            Some of the firms we work with
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              className={navButton(canScrollLeft)}
            >
              <ChevronLeftIcon className="size-4" />
              <span className="sr-only">Previous clients</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              className={navButton(canScrollRight)}
            >
              <ChevronRightIcon className="size-4" />
              <span className="sr-only">Next clients</span>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar rail-gutter mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 sm:mt-14 sm:gap-8"
      >
        {clients.map((client) => (
          <li key={client.name} className="w-64 shrink-0 snap-start sm:w-72 lg:w-88">
            <div className="grid aspect-3/2 place-items-center rounded-bl-[2.5rem] bg-white px-6 text-center">
              <span
                className={cn("leading-tight text-ink", treatments[client.treatment])}
              >
                {client.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
