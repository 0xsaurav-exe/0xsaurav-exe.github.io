import { motion } from "framer-motion";
import { profile } from "../../data/profile";

export default function HeroStats({ show }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="flex flex-wrap gap-2.5"
    >
      {profile.quickFacts.map((fact) => (
        <span
          key={fact.label}
          className="font-mono text-[11px] tracking-wide text-muted border border-hairline px-3 py-1.5 rounded-sm bg-panel/50"
        >
          <span className="text-term-green">{fact.label}:</span> {fact.value}
        </span>
      ))}
    </motion.div>
  );
}
