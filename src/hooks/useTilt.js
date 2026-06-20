import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Subtle 3D tilt that responds to cursor position within a card's
 * bounds, plus a small glare highlight that can be layered on top.
 *
 * `max` is the maximum rotation in degrees — keep this low (4-8) so it
 * reads as "depth" rather than a spinning gimmick.
 *
 * Usage:
 *   const tilt = useTilt();
 *   <motion.div ref={tilt.ref} style={tilt.style} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
 *     ...
 *     <motion.div style={tilt.glareStyle} className="absolute inset-0 pointer-events-none" />
 *   </motion.div>
 */
export default function useTilt({ max = 6 } = {}) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.4 };
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);
  const glareOpacity = useTransform(sRotateX, [-max, 0, max], [0.12, 0, 0.12]);

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * max * 2);
    rotateX.set(-(py - 0.5) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return {
    ref,
    style: {
      rotateX: sRotateX,
      rotateY: sRotateY,
      transformPerspective: 800,
    },
    glareStyle: {
      opacity: glareOpacity,
      background: useTransform(
        [glareX, glareY],
        ([gx, gy]) =>
          `radial-gradient(circle at ${gx}% ${gy}%, rgba(57,255,140,0.5), transparent 60%)`
      ),
    },
    onMouseMove,
    onMouseLeave,
  };
}
