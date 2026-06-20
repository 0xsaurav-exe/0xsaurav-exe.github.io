import { motion, AnimatePresence } from "framer-motion";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ transformPerspective: 1000 }}
            className="hud-corners relative bg-panel border border-hairline rounded-sm max-w-lg w-full p-7 max-h-[85vh] overflow-y-auto"
          >
            {/* top glow line, drawn in after the panel settles */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-term-green to-transparent origin-center"
            />

            <motion.button
              whileHover={{ rotate: 90, color: "#39FF8C" }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 font-mono text-muted text-lg leading-none"
            >
              ×
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="font-mono text-[11px] text-term-dim">${project.terminalCmd} --details</span>
              <h3 className="font-mono text-2xl font-bold text-ink mt-2">{project.name}</h3>
              <p className="font-mono text-sm text-cyan mt-1">{project.tagline}</p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 mt-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } } }}
            >
              {project.stack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  className="font-mono text-[10px] text-muted border border-hairline px-2 py-1 rounded-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.ul
              className="mt-5 space-y-3"
              initial="hidden"
              animate="visible"
              variants={listVariants}
            >
              {project.details.map((line, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="font-sans text-sm text-muted leading-relaxed flex gap-2"
                >
                  <span className="text-term-green font-mono shrink-0">▸</span>
                  {line}
                </motion.li>
              ))}
            </motion.ul>

            {project.github !== "#" && (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ y: -2 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-mono text-sm border border-term-dim text-term-green px-4 py-2.5 rounded-sm hover:border-term-green hover:shadow-glow-sm transition-all"
              >
                view on github →
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
