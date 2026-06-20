import { motion, useScroll, useTransform } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * Fixed ambient backdrop: faint grid with slow drift, soft radial glows,
 * a faint scanline sweep, and scroll-linked intensity (the grid and
 * glows fade in/out subtly as the user moves through sections so the
 * background never feels perfectly static).
 *
 * All continuous drift/sweep animation is skipped when the user prefers
 * reduced motion — only the static layered look remains.
 *
 * Tuning:
 *  - grid drift speed/distance: the `animate` block on .grid-backdrop below
 *  - scroll intensity range: the useTransform input/output ranges
 *  - glow blob positions/sizes: the three absolute divs
 */
export default function CyberGridBackground() {
  const { scrollYProgress } = useScroll();
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.35, 0.55]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 1]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 grid-backdrop"
        animate={reducedMotion ? {} : { backgroundPosition: ["0px 0px", "44px 44px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <motion.div style={{ opacity: glowOpacity }}>
        <motion.div
          className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-term-green/[0.06] blur-[120px]"
          animate={reducedMotion ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan/[0.05] blur-[120px]"
          animate={reducedMotion ? {} : { x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-term-green/[0.04] blur-[110px]"
          animate={reducedMotion ? {} : { x: [0, 18, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* faint scanline sweep */}
      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-term-green/[0.025] to-transparent"
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      )}

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/0 to-void" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,#05080A_95%)]" />
    </div>
  );
}
