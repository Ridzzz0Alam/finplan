"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { MediaPanel } from "@/components/media-panel";
import { useRailScroll } from "@/hooks/use-rail-scroll";
import { insights } from "@/lib/insights";
import { cn } from "cn";

// Lime while that direction still has somewhere to go, dimmed once it doesn't.
const navButton = (enabled: boolean) =>
  cn(
    "grid size-8 place-items-center rounded-sm transition-colors",
    enabled
      ? "bg-lime text-ink hover:opacity-85"
      : "cursor-not-allowed bg-white/10 text-white/40"
  );

export function InsightsRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const { canScrollLeft, canScrollRight, scrollByCard } = useRailScroll(railRef);

  return (
    <section className="bg-ink py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-lime sm:text-3xl">
            Latest insights
          </h2>

          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-sm bg-lime px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              View all
              <ArrowRightIcon className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              className={navButton(canScrollLeft)}
            >
              <ChevronLeftIcon className="size-4" />
              <span className="sr-only">Previous insights</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              className={navButton(canScrollRight)}
            >
              <ChevronRightIcon className="size-4" />
              <span className="sr-only">Next insights</span>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar rail-gutter mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {insights.map((insight) => (
          <li
            key={insight.slug}
            className="w-[17rem] shrink-0 snap-start sm:w-[19rem]"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-tr-[2.5rem] bg-white text-ink">
              <MediaPanel
                corner="tr"
                tone={insight.tone}
                className="aspect-[4/3] rounded-tr-[2.5rem]"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs text-ink/55">
                  {insight.category}
                </p>
                <h3 className="font-heading text-lg leading-snug font-normal text-balance">
                  {insight.title}
                </h3>
                <Link
                  href="/contact"
                  className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Read full story
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
