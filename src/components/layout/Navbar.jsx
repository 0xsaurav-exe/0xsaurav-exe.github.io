import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../data/profile";
import useMagnetic from "../../hooks/useMagnetic";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#achievements", label: "achievements" },
  { href: "#certifications", label: "certs" },
  { href: "#terminal", label: "terminal" },
  { href: "#contact", label: "contact" },
];

function NavLink({ href, label }) {
  return (
    <a href={href} className="relative group/nav text-muted hover:text-term-green transition-colors">
      {label}
      <span className="absolute left-0 -bottom-1 h-px w-0 bg-term-green group-hover/nav:w-full transition-all duration-300 ease-out" />
    </a>
  );
}

function TalkButton() {
  const mag = useMagnetic({ strength: 6 });
  return (
    <motion.a
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={mag.style}
      href="#contact"
      className="hidden md:inline-flex font-mono text-xs border border-term-dim text-term-green px-4 py-2 rounded-sm hover:border-term-green hover:shadow-glow-sm transition-all"
    >
      let's talk
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-hairline" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#top"
          whileHover={{ textShadow: "0 0 16px rgba(57,255,140,0.7)" }}
          className="font-mono text-sm font-semibold text-term-green text-glow"
        >
          {profile.handle}
        </motion.a>

        <ul className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wide">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink href={l.href} label={l.label} />
            </li>
          ))}
        </ul>

        <TalkButton />

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden font-mono text-term-green text-xl leading-none px-2 py-1"
        >
          {open ? "×" : "≡"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-void/95 border-b border-hairline"
          >
            <ul className="flex flex-col gap-1 px-5 py-4 font-mono text-sm text-muted">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 hover:text-term-green transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
