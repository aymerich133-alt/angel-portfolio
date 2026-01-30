"use client";

import { useEffect, useRef } from "react";

export function useFishLane() {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const fishes = Array.from(
      lane.querySelectorAll<HTMLElement>("[data-fish]")
    );

    const onScroll = () => {
      const delta = lane.scrollLeft - scrollRef.current;
      scrollRef.current = lane.scrollLeft;

      fishes.forEach((fish, i) => {
        const depth = (i % 3) - 1; // -1, 0, 1
        const swim = delta * 0.25 * depth;
        const tilt = delta * 0.08;

        fish.style.transform = `
          translateY(${swim}px)
          rotate(${tilt}deg)
        `;
      });

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        fishes.forEach((fish) => {
          fish.style.transform = "translateY(0) rotate(0deg)";
        });
      });
    };

    lane.addEventListener("scroll", onScroll, { passive: true });
    return () => lane.removeEventListener("scroll", onScroll);
  }, []);

  return { laneRef };
}
