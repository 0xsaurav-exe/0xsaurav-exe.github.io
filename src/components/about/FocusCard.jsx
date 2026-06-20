import GlowCard from "../ui/GlowCard";
import { staggerItemVariants } from "../ui/StaggerContainer";

export default function FocusCard({ label, text, variants = staggerItemVariants }) {
  return (
    <GlowCard variants={variants} className="flex flex-col gap-3">
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-cyan">{label}</span>
      <p className="font-sans text-sm text-muted leading-relaxed">{text}</p>
    </GlowCard>
  );
}
