import { motion } from "framer-motion";
import { staggerItemVariants } from "./StaggerContainer";
import useTilt from "../../hooks/useTilt";

/**
 * Standard panel card used across the site: dark glass panel with
 * HUD corner brackets, an animated top border-glow line, and an
 * optional subtle 3D tilt + glare on hover.
 *
 * Props:
 *  - variants: override the entrance variant (defaults to rise-from-below;
 *    pass staggerItemVariantsLeft/Right/Assemble for section variety)
 *  - tilt: enable the cursor-tracked 3D tilt effect (default true)
 *  - accent: "green" | "cyan" — controls hover glow + border-line color
 */
export default function GlowCard({
  children,
  className = "",
  hover = true,
  tilt = true,
  accent = "green",
  variants = staggerItemVariants,
}) {
  const tiltFx = useTilt({ max: 5 });
  const accentShadow = accent === "cyan" ? "hover:shadow-glow-cyan" : "hover:shadow-glow";
  const lineColor = accent === "cyan" ? "via-cyan" : "via-term-green";

  const tiltProps = tilt
    ? {
        onMouseMove: tiltFx.onMouseMove,
        onMouseLeave: tiltFx.onMouseLeave,
        style: tiltFx.style,
      }
    : {};

  return (
    <motion.div
      ref={tilt ? tiltFx.ref : undefined}
      variants={variants}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`hud-corners panel rounded-sm p-6 relative group/card ${
        hover ? `${accentShadow} hover:border-term-dim` : ""
      } ${className}`}
      {...tiltProps}
    >
      {/* animated top border-glow line */}
      <span
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${lineColor} to-transparent opacity-0 group-hover/card:opacity-100 scale-x-0 group-hover/card:scale-x-100 origin-center transition-all duration-500`}
      />
      {tilt && (
        <motion.div
          style={tiltFx.glareStyle}
          className="absolute inset-0 rounded-sm pointer-events-none"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
