import SectionHeading from "../layout/SectionHeading";
import MotionReveal from "../ui/MotionReveal";
import StaggerContainer from "../ui/StaggerContainer";
import { staggerItemVariants } from "../ui/StaggerContainer";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { training, education, proofOfWork } from "../../data/resume";
import { profile } from "../../data/profile";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="resume"
          title="cat experience.log"
          description="Fresher / trainee profile — proof of work over a formal job history."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <MotionReveal className="hud-corners panel rounded-sm p-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan">training</span>
            <h3 className="font-mono text-lg font-semibold text-ink mt-2">{training.title}</h3>
            <p className="font-sans text-sm text-muted">
              {training.org} · {training.period}
            </p>
            <ul className="mt-4 space-y-2.5">
              {training.points.map((p, i) => (
                <li key={i} className="font-sans text-sm text-muted flex gap-2.5">
                  <span className="text-term-green font-mono shrink-0">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </MotionReveal>

          <MotionReveal delay={0.1} className="hud-corners panel rounded-sm p-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan">education</span>
            <h3 className="font-mono text-lg font-semibold text-ink mt-2">{education.degree}</h3>
            <p className="font-sans text-sm text-muted">
              {education.school} · {education.period}
            </p>
            <p className="font-sans text-sm text-muted mt-4 leading-relaxed">
              <span className="text-term-green font-mono text-xs block mb-1">relevant coursework</span>
              {education.coursework}
            </p>
          </MotionReveal>
        </div>

        <div className="mt-6">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-4 block">
            proof of work
          </span>
          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {proofOfWork.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItemVariants}
                className="font-sans text-sm text-muted border-l-2 border-term-dim pl-4 py-1"
              >
                {item}
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        <MotionReveal delay={0.2} className="mt-10 flex justify-center">
          <Button href={profile.resumeUrl} variant="primary" target="_blank">
            Download Full Resume (PDF)
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}
