"use client";
import { useEffect } from "react";

export const useHorizontallyScroll = (
  sliderRef: React.RefObject<HTMLDivElement | null>,
) => {
  return useEffect(() => {
    const el = sliderRef.current;
    const speed = 100;

    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const canScrollHorizontally = el.scrollWidth > el.clientWidth;
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (canScrollHorizontally && isVerticalScroll && el.matches(":hover")) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * speed;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [sliderRef]);
};
