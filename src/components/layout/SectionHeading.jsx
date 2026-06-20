import MotionReveal from "../ui/MotionReveal";
import { motion } from "framer-motion";

/**
 * Consistent section header: eyebrow label (process step name, not a number —
 * these aren't a numbered sequence) + large heading + optional description.
 *
 * `direction` is forwarded to MotionReveal so each section can choose
 * its own entrance ("up" | "left" | "right" | "blur-up" | "scale").
 */
export default function SectionHeading({ eyebrow, title, description, align = "left", direction = "up" }) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <MotionReveal direction={direction} className={`flex flex-col gap-3 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          // {eyebrow}
        </motion.span>
      )}
      <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink tracking-tight">
        {title}
      </h2>
      {description && <p className="text-muted font-sans text-base leading-relaxed">{description}</p>}
    </MotionReveal>
  );
}
