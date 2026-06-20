import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import { staggerItemVariants } from "../ui/StaggerContainer";

export default function SkillCategoryCard({ category, variants = staggerItemVariants }) {
  return (
    <GlowCard variants={variants} className="flex flex-col gap-4">
      <div>
        <p className="font-mono text-[11px] text-term-dim">{category.prompt}</p>
        <h3 className="font-mono text-base font-semibold text-ink mt-1">{category.title}</h3>
      </div>

      {/* chips stagger in sequence once the parent card is in view */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}
      >
        {category.items.map((item) => (
          <motion.span
            key={item}
            variants={{
              hidden: { opacity: 0, y: 6, scale: 0.92 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
            }}
            whileHover={{ y: -2, borderColor: "rgba(57,255,140,0.6)" }}
            className="font-mono text-[11px] text-muted border border-hairline px-2.5 py-1 rounded-sm hover:text-ink transition-colors"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </GlowCard>
  );
}
