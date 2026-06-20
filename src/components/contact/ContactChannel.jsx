import { motion } from "framer-motion";
import { staggerItemVariantsAssemble } from "../ui/StaggerContainer";
import useMagnetic from "../../hooks/useMagnetic";

export default function ContactChannel({ label, value, href }) {
  const mag = useMagnetic({ strength: 7 });
  const external = href.startsWith("http");

  return (
    <motion.a
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={mag.style}
      variants={staggerItemVariantsAssemble}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -4 }}
      className="hud-corners panel relative rounded-sm p-5 text-left overflow-hidden hover:shadow-glow-sm hover:border-term-dim transition-shadow duration-300 group/ch"
    >
      <span className="absolute bottom-0 left-0 h-px w-0 bg-term-green group-hover/ch:w-full transition-all duration-400 ease-out" />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan">{label}</span>
      <p className="font-mono text-sm text-ink mt-1.5 break-all group-hover/ch:text-term-green transition-colors">
        {value}
      </p>
    </motion.a>
  );
}
