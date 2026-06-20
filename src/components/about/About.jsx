import SectionHeading from "../layout/SectionHeading";
import FocusCard from "./FocusCard";
import StaggerContainer, { staggerItemVariantsAssemble } from "../ui/StaggerContainer";
import MotionReveal from "../ui/MotionReveal";
import SectionDivider from "../ui/SectionDivider";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";

const terminalLines = [
  { cmd: "$ whoami", out: profile.handle },
  { cmd: "$ cat focus.txt", out: "Linux PrivEsc · VAPT · Web Testing" },
  { cmd: "$ cat status.txt", out: "Trainee — actively building, always learning" },
];

export default function About() {
  return (
    <>
      <SectionDivider />
      <section id="about" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="about"
            title="cat about.txt"
            description="The short version: I learn by breaking things, then figuring out exactly why they broke."
            direction="left"
          />

          <div className="mt-12 grid lg:grid-cols-5 gap-6">
            {/* terminal snippet panel — slides in from the left */}
            <MotionReveal direction="left" delay={0.1} className="lg:col-span-2">
              <div className="hud-corners panel rounded-sm h-full p-6 font-mono text-[13px] leading-relaxed">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-hairline">
                  <span className="h-2 w-2 rounded-full bg-term-dim/60" />
                  <span className="text-muted text-[11px]">whoami.sh</span>
                </div>
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={line.cmd}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
                  >
                    <p className="text-term-green">{line.cmd}</p>
                    <p className="text-muted mb-3">{line.out}</p>
                  </motion.div>
                ))}
              </div>
            </MotionReveal>

            {/* focus cards — rise from below with a blur-in, assembled in sequence */}
            <StaggerContainer
              className="lg:col-span-3 grid sm:grid-cols-2 gap-5"
              stagger={0.12}
            >
              <FocusCard label="Who I Am" text={profile.about.whoIAm} variants={staggerItemVariantsAssemble} />
              <FocusCard
                label="What I Focus On"
                text={profile.about.whatIFocusOn}
                variants={staggerItemVariantsAssemble}
              />
              <FocusCard
                label="Problems I Like"
                text={profile.about.problemsILike}
                variants={staggerItemVariantsAssemble}
              />
              <FocusCard
                label="Current Direction"
                text={profile.about.currentDirection}
                variants={staggerItemVariantsAssemble}
              />
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
