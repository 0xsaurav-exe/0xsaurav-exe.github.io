import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Tracks the cursor position with spring smoothing so the glow trails
 * gently instead of snapping to the raw mouse position. Returns motion
 * values you can bind directly to a transform/translate style.
 *
 * Disabled automatically on coarse pointers (touch devices) and when
 * prefers-reduced-motion is set, since a cursor glow has no meaning there.
 */
export default function useCursorGlow({ stiffness = 120, damping = 22 } = {}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness, damping, mass: 0.4 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.4 });
  const enabledRef = useRef(true);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = finePointer && !reducedMotion;

    if (!enabledRef.current) return;

    function handleMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return { x: springX, y: springY, enabled: enabledRef.current };
}
