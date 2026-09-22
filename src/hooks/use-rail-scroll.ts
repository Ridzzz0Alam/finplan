"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * Tracks how far a horizontally scrolling rail can still travel, so the
 * prev/next buttons can light up only in the directions that are available.
 *
 * The initial state matches what the server renders (nothing scrolled yet,
 * more content to the right), so the first client render hydrates cleanly and
 * the real measurement lands in the effect straight after.
 */
export function useRailScroll(ref: RefObject<HTMLElement | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const measure = useCallback(() => {
    const rail = ref.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 1);
    setCanScrollRight(rail.scrollLeft < maxScroll - 1);
  }, [ref]);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;

    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [ref, measure]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const rail = ref.current;
      if (!rail) return;
      const card = rail.querySelector("li");
      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 16;
      const step = card ? card.clientWidth + gap : rail.clientWidth * 0.8;
      rail.scrollBy({ left: step * direction, behavior: "smooth" });
    },
    [ref]
  );

  return { canScrollLeft, canScrollRight, scrollByCard };
}
