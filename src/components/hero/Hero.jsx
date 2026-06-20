import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroTerminal from "./HeroTerminal";
import HeroStats from "./HeroStats";
import Button from "../ui/Button";
import { profile } from "../../data/profile";

function useTypewriter(lines, active, speed = 45, holdMs = 1400) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let timer;
    const current = lines[lineIndex];

    function tick() {
      if (i <= current.length) {
        setText(current.slice(0, i));
        i++;
        timer = setTimeout(tick, speed);
      } else {
        timer = setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % lines.length);
        }, holdMs);
      }
    }
    tick();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lineIndex]);

  return text;
}

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);
  const roleText = useTypewriter(profile.roleLines, booted);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const leftY = useTransform(scrollY, [0, 500], [0, 70]);
  const rightY = useTransform(scrollY, [0, 500], [0, 110]);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full">
        <motion.div style={{ opacity: heroOpacity }} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: identity */}
          <motion.div style={{ y: leftY }} className="flex flex-col gap-6 order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              // system identity confirmed
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.05] tracking-tight"
            >
              {profile.name}
              <motion.span
                whileHover={{ textShadow: "0 0 28px rgba(57,255,140,0.85)" }}
                transition={{ duration: 0.3 }}
                className="block text-term-green text-glow mt-1"
              >
                {profile.handle}
              </motion.span>
            </motion.h1>

            <div className="h-7 font-mono text-base sm:text-lg text-cyan">
              <span>{roleText}</span>
              <span className="animate-blink">▍</span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-md"
            >
              {profile.heroIntro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Button href="#projects" variant="primary">
                View Projects
              </Button>
              <Button href={profile.resumeUrl} variant="ghost" target="_blank">
                Download Resume
              </Button>
              <Button href="#contact" variant="cyan">
                Contact
              </Button>
            </motion.div>

            <div className="pt-3">
              <HeroStats show={booted} />
            </div>
          </motion.div>

          {/* Right: terminal — drifts slightly more than the left column on
              scroll, giving the two halves independent depth */}
          <motion.div style={{ y: rightY }} className="order-1 lg:order-2">
            <HeroTerminal onBootComplete={handleBootComplete} />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-muted flex flex-col items-center gap-2"
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-term-green"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
