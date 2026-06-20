import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Default "rise from below" item variant — used by GlowCard and any
// child that doesn't need a directional entrance.
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const staggerItemVariantsLeft = {
  hidden: { opacity: 0, x: -26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const staggerItemVariantsRight = {
  hidden: { opacity: 0, x: 26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// "Assemble" variant — slight scale + offset, reads as a dashboard
// element snapping into place. Good for stat/achievement-style grids.
export const staggerItemVariantsAssemble = {
  hidden: { opacity: 0, scale: 0.9, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/**
 * Wrap a list of children to get a sequenced reveal as the container
 * scrolls into view. Children should use one of the exported variants
 * above (staggerItemVariants / *Left / *Right / *Assemble) via their
 * own `variants` prop — StaggerContainer only orchestrates the timing.
 *
 * `stagger` controls the delay between each child (seconds).
 */
export default function StaggerContainer({
  children,
  className = "",
  amount = 0.15,
  stagger = 0.1,
  delayChildren = 0.05,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}
