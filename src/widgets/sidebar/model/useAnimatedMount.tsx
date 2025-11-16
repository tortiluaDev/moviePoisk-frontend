import { useEffect, useState } from "react";

export function useAnimatedMount({
  isVisible,
  duration,
}: {
  isVisible: boolean;
  duration: number;
}) {
  const [isRendering, setIsRendering] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendering(true);
      requestAnimationFrame(() => setIsAnimating(true));
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsRendering(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  return { isRendering, isAnimating };
}
