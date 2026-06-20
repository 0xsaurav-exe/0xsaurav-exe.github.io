import { motion } from "framer-motion";
import SectionHeading from "../layout/SectionHeading";
import StatCard from "./StatCard";
import StaggerContainer from "../ui/StaggerContainer";
import MotionReveal from "../ui/MotionReveal";
import SectionDivider from "../ui/SectionDivider";
import { achievements, achievementNotes } from "../../data/achievements";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Achievements() {
  return (
    <>
      <SectionDivider />
      <section id="achievements" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="achievements"
            title="cat metrics.log"
            description="Numbers from labs, CTFs, and competitive exploitation environments."
            direction="scale"
          />

          <StaggerContainer className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {achievements.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </StaggerContainer>

          <MotionReveal delay={0.15} direction="scale" className="mt-8 hud-corners panel rounded-sm p-6">
            <motion.ul
              className="space-y-2.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={listVariants}
            >
              {achievementNotes.map((note, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="font-mono text-sm text-muted flex gap-2.5"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="text-term-green"
                  >
                    [+]
                  </motion.span>
                  {note}
                </motion.li>
              ))}
            </motion.ul>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
