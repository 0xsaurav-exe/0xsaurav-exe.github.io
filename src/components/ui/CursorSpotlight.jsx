import { motion } from "framer-motion";
import useCursorGlow from "../../hooks/useCursorGlow";

/**
 * A soft, dual-tone radial glow that trails the cursor across the whole
 * page. Pure decoration — pointer-events: none — and skipped entirely
 * on touch devices / reduced-motion since it has no meaning there.
 *
 * Tuning:
 *  - SIZE controls the glow diameter.
 *  - Opacity values below control intensity; keep these low, the glow
 *    should be felt more than seen.
 *  - useCursorGlow's stiffness/damping controls how "laggy" the trail is.
 */
const SIZE = 480;

export default function CursorSpotlight() {
  const { x, y, enabled } = useCursorGlow();

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-[5] mix-blend-screen"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(57,255,140,0.10) 0%, rgba(47,224,232,0.05) 38%, transparent 72%)",
        borderRadius: "50%",
        willChange: "transform",
      }}
    />
  );
}
