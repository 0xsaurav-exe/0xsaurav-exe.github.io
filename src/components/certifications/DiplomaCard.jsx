import { motion } from "framer-motion";
import MotionReveal from "../ui/MotionReveal";

export default function DiplomaCard({ credential }) {
  return (
    <MotionReveal direction="scale" className="hud-corners panel rounded-sm p-6 flex flex-col gap-2 relative overflow-hidden">
      {/* quiet animated corner glow to mark this as the primary credential */}
      <motion.span
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-term-green/30 blur-2xl pointer-events-none"
      />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan relative">
        primary credential
      </span>
      <h3 className="font-mono text-xl font-bold text-ink relative">{credential.title}</h3>
      <p className="font-sans text-sm text-muted relative">{credential.issuer}</p>
      <p className="font-mono text-xs text-term-dim mt-1 relative">{credential.period}</p>
    </MotionReveal>
  );
}
