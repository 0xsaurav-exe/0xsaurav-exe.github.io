import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

function getInitial(direction, distance) {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -distance, filter: "blur(0px)" };
    case "right":
      return { opacity: 0, x: distance, filter: "blur(0px)" };
    case "blur-up":
      return { opacity: 0, y: distance, filter: "blur(8px)" };
    case "scale":
      return { opacity: 0, scale: 0.94, y: distance * 0.4 };
    case "up":
    default:
      return { opacity: 0, y: distance, filter: "blur(0px)" };
  }
}

const settled = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

/**
 * Reusable scroll-triggered reveal wrapper.
 *
 * direction: "up" (default) | "left" | "right" | "blur-up" | "scale"
 *   - use "left"/"right" to alternate entrance direction section to section
 *   - use "blur-up" for a softer, more cinematic reveal on hero-adjacent content
 *   - use "scale" for stat/dashboard-style elements that should feel like they "assemble"
 */
export default function MotionReveal({
  children,
  delay = 0,
  distance = 28,
  duration = 0.65,
  direction = "up",
  className = "",
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={getInitial(direction, distance)}
      whileInView={settled}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
