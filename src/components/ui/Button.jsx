import { motion } from "framer-motion";
import useMagnetic from "../../hooks/useMagnetic";

const base =
  "relative inline-flex items-center justify-center gap-2 font-mono text-sm tracking-wide px-6 py-3 rounded-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-term-green overflow-hidden";

const variants = {
  primary: "bg-term-green text-void font-semibold hover:bg-term-green/90",
  ghost: "border border-term-dim text-term-green hover:border-term-green hover:bg-term-green/5",
  cyan: "border border-cyan-dim text-cyan hover:border-cyan hover:bg-cyan/5",
};

const glowByVariant = {
  primary: "hover:shadow-glow",
  ghost: "hover:shadow-glow-sm",
  cyan: "hover:shadow-glow-cyan",
};

/**
 * CTA button with a subtle magnetic pull toward the cursor and a glow
 * trail on hover. `magnetic` can be disabled for inline/secondary
 * buttons where the effect would feel excessive.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  as = "a",
  target,
  className = "",
  magnetic = true,
  ...rest
}) {
  const mag = useMagnetic({ strength: 8 });
  const classes = `${base} ${variants[variant]} ${glowByVariant[variant]} ${className}`;
  const MotionTag = as === "button" ? motion.button : motion.a;

  const magneticProps = magnetic
    ? { ref: mag.ref, onMouseMove: mag.onMouseMove, onMouseLeave: mag.onMouseLeave, style: mag.style }
    : {};

  return (
    <MotionTag
      href={as === "a" ? href : undefined}
      onClick={onClick}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      className={`group ${classes}`}
      {...magneticProps}
      {...rest}
    >
      {/* hover glow sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
      <span className="relative">{children}</span>
    </MotionTag>
  );
}
