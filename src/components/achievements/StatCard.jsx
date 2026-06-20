import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import { staggerItemVariantsAssemble } from "../ui/StaggerContainer";

export default function StatCard({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, stat.value]);

  const formatted = Number.isInteger(stat.value) ? Math.round(display) : display.toFixed(1);

  return (
    <GlowCard
      hover
      tilt={false}
      variants={staggerItemVariantsAssemble}
      className="text-center flex flex-col items-center gap-2"
      accent="cyan"
    >
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="font-mono text-3xl sm:text-4xl font-extrabold text-term-green text-glow"
      >
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </motion.div>
      <p className="font-sans text-xs text-muted leading-snug max-w-[14ch]">{stat.label}</p>
    </GlowCard>
  );
}
