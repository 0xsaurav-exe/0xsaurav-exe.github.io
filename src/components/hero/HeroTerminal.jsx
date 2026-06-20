import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";

const bootLines = [
  { text: "booting 0xsaurav-exe::shell", delay: 0 },
  { text: "[OK] loading identity module", delay: 350 },
  { text: "[OK] mounting /portfolio", delay: 650 },
  { text: "[OK] verifying credentials", delay: 950 },
  { text: "[OK] access granted", delay: 1300 },
];

/**
 * The signature element: a boot sequence that types out system-check
 * lines on load, then settles into a docked terminal window that
 * frames the hero identity. This is the "engine" implying the rest
 * of the site is powered by this terminal.
 */
export default function HeroTerminal({ onBootComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        if (cancelled) return;
        setVisibleLines((prev) => (prev.includes(line.text) ? prev : [...prev, line.text]));
        if (i === bootLines.length - 1) {
          setTimeout(() => {
            if (cancelled) return;
            setBooted(true);
            onBootComplete?.();
          }, 400);
        }
      }, line.delay)
    );
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // Intentionally run once on mount only. onBootComplete is invoked via a
    // ref-stable callback from the parent; re-running this on every prop
    // change would restart the boot sequence and duplicate lines.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      layout
      className="hud-corners panel rounded-sm w-full max-w-xl mx-auto overflow-hidden"
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-hairline bg-black/30">
        <span className="h-2.5 w-2.5 rounded-full bg-term-dim/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-dim/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-green/70" />
        <span className="ml-2 font-mono text-[11px] text-muted">
          {profile.handle}@portfolio — zsh
        </span>
      </div>

      <div className="p-5 font-mono text-[13px] sm:text-sm space-y-1.5 min-h-[180px]">
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={line.startsWith("[OK]") ? "text-term-dim" : "text-muted"}
          >
            {line.startsWith("[OK]") ? (
              <>
                <span className="text-term-green">[OK]</span>
                {line.slice(4)}
              </>
            ) : (
              <span className="text-ink">{line}</span>
            )}
          </motion.div>
        ))}

        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="pt-2 text-term-green"
          >
            root@{profile.handle}:~$ <span className="animate-blink">▍</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
