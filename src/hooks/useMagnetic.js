import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Gives an element a subtle "magnetic" pull toward the cursor while
 * hovered — the element nudges a few px toward where the pointer is
 * within its bounds, then springs back to center on mouse leave.
 *
 * `strength` controls how far it can travel (in px). Keep this small
 * (6-14) for a premium feel; anything larger reads as gimmicky.
 *
 * Usage:
 *   const { ref, style, onMouseMove, onMouseLeave } = useMagnetic();
 *   <motion.button ref={ref} style={style} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 */
export default function useMagnetic({ strength = 10 } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 });

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}
