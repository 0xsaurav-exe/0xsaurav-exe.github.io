import { motion } from "framer-motion";

/**
 * A thin horizontal line that animates its width from 0 to full as it
 * scrolls into view, with a small glowing node at the center. Used
 * between sections as a quiet "system boundary" cue rather than plain
 * empty space.
 */
export default function SectionDivider() {
  return (
    <div className="relative h-px w-full max-w-6xl mx-auto px-5 sm:px-8 my-2">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full bg-gradient-to-r from-transparent via-hairline to-transparent origin-center"
      />
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-term-green shadow-glow-sm"
      />
    </div>
  );
}
