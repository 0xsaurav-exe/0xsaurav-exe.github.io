import { useState } from "react";
import SectionHeading from "../layout/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import StaggerContainer, { staggerItemVariantsAssemble } from "../ui/StaggerContainer";
import SectionDivider from "../ui/SectionDivider";
import { projects } from "../../data/projects";

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <>
      <SectionDivider />
      <section id="projects" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="projects"
            title="run ./projects --list"
            description="Tools I built to solve problems I kept hitting by hand. Click a card for details."
            direction="left"
          />

          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.09}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setActive}
                variants={staggerItemVariantsAssemble}
              />
            ))}
          </StaggerContainer>
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </section>
    </>
  );
}
