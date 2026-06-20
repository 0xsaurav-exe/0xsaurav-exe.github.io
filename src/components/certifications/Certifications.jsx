import SectionHeading from "../layout/SectionHeading";
import DiplomaCard from "./DiplomaCard";
import StaggerContainer from "../ui/StaggerContainer";
import MotionReveal from "../ui/MotionReveal";
import SectionDivider from "../ui/SectionDivider";
import { staggerItemVariants } from "../ui/StaggerContainer";
import { motion } from "framer-motion";
import { mainCredential, diplomaModules, otherCertifications } from "../../data/certifications";

export default function Certifications() {
  return (
    <>
      <SectionDivider />
      <section id="certifications" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="certifications"
            title="cat training.log"
            description="Formal training and modules completed, structured for a quick scan."
            direction="right"
          />

          <div className="mt-12 grid lg:grid-cols-5 gap-6">
            {/* left column — diploma slides up first, training list follows with a delay,
                creating a layered "panel after panel" reveal */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <DiplomaCard credential={mainCredential} />

              <MotionReveal delay={0.2} direction="blur-up" className="hud-corners panel rounded-sm p-6">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-3 block">
                  other training
                </span>
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
                >
                  {otherCertifications.map((cert) => (
                    <motion.li
                      key={cert.title}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                      }}
                      className="border-l border-hairline pl-3 hover:border-term-dim transition-colors"
                    >
                      <p className="font-mono text-sm text-ink">{cert.title}</p>
                      <p className="font-sans text-xs text-muted">
                        {cert.issuer} · {cert.period}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </MotionReveal>
            </div>

            {/* right column — modules cascade in waves rather than a flat grid pop */}
            <div className="lg:col-span-3">
              <MotionReveal direction="right" delay={0.1}>
                <p className="font-mono text-xs text-muted mb-4">
                  modules completed —
                  <span className="text-term-green"> {diplomaModules.length}/12</span>
                </p>
              </MotionReveal>
              <StaggerContainer className="flex flex-wrap gap-2.5" stagger={0.05} delayChildren={0.2}>
                {diplomaModules.map((mod) => (
                  <motion.span
                    key={mod}
                    variants={staggerItemVariants}
                    whileHover={{ y: -3, scale: 1.04 }}
                    className="font-mono text-xs text-ink border border-hairline px-3 py-2 rounded-sm hover:border-term-dim hover:text-term-green hover:shadow-glow-sm transition-colors"
                  >
                    {mod}
                  </motion.span>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
