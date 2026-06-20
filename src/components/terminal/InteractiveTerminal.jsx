import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTerminal from "../../hooks/useTerminal";
import { profile } from "../../data/profile";

function lineColor(type) {
  if (type === "input") return "text-term-green";
  if (type === "error") return "text-red-400/80";
  if (type === "system") return "text-cyan";
  return "text-ink";
}

const SUGGESTIONS = ["help", "whoami", "projects", "skills", "contact"];

export default function InteractiveTerminal() {
  const { lines, run, navigateHistory } = useTerminal();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    run(value);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = navigateHistory("up");
      if (prev !== null) setValue(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateHistory("down");
      if (next !== null) setValue(next);
    }
  }

  function runSuggestion(cmd) {
    run(cmd);
    inputRef.current?.focus();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      animate={{
        boxShadow: focused
          ? "0 0 0 1px rgba(57,255,140,0.35), 0 0 26px rgba(57,255,140,0.12)"
          : "0 0 0 0px rgba(57,255,140,0)",
      }}
      onClick={() => inputRef.current?.focus()}
      className="hud-corners panel rounded-sm w-full max-w-3xl mx-auto overflow-hidden cursor-text"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-hairline bg-black/30">
        <span className="h-2.5 w-2.5 rounded-full bg-term-dim/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-dim/60" />
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2.5 w-2.5 rounded-full bg-term-green/70"
        />
        <span className="ml-2 font-mono text-[11px] text-muted">
          {profile.handle}@portfolio — interactive
        </span>
      </div>

      <div ref={scrollRef} className="p-5 font-mono text-[13px] sm:text-sm space-y-1 h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`${lineColor(line.type)} whitespace-pre-wrap break-words`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* command suggestion chips */}
      <div className="flex flex-wrap gap-2 px-5 pt-1 pb-3 border-t border-hairline/60">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
            whileHover={{ y: -2, borderColor: "rgba(57,255,140,0.6)" }}
            onClick={() => runSuggestion(s)}
            className="font-mono text-[11px] text-muted border border-hairline px-2.5 py-1 rounded-sm hover:text-term-green transition-colors"
          >
            {s}
          </motion.button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 py-3 border-t border-hairline">
        <span className="font-mono text-sm text-term-green shrink-0">root@{profile.handle}:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          spellCheck={false}
          placeholder="Try: help, whoami, projects"
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-ink placeholder:text-muted/50"
          aria-label="Terminal command input"
        />
      </form>
    </motion.div>
  );
}
