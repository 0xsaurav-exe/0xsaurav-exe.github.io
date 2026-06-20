import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import { staggerItemVariants } from "../ui/StaggerContainer";

export default function ProjectCard({ project, onOpen, variants = staggerItemVariants }) {
  return (
    <GlowCard variants={variants} className="flex flex-col gap-4 cursor-pointer" hover>
      <button onClick={() => onOpen(project)} className="group text-left flex flex-col gap-4 w-full">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-lg font-semibold text-ink group-hover:text-term-green transition-colors">
            {project.name}
          </h3>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="font-mono text-[10px] text-term-dim border border-hairline px-2 py-0.5 rounded-sm whitespace-nowrap group-hover:border-term-dim group-hover:text-term-green transition-colors"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mr-1 text-term-green"
            >
              $
            </motion.span>
            {project.terminalCmd}
          </motion.span>
        </div>
        <p className="font-mono text-xs text-cyan">{project.tagline}</p>
        <p className="font-sans text-sm text-muted leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-muted border border-hairline px-2 py-1 rounded-sm group-hover:border-term-dim/70 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-term-green mt-1 inline-flex items-center gap-1">
          view details
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </span>
      </button>
    </GlowCard>
  );
}
