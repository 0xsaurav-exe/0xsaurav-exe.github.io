import SectionHeading from "../layout/SectionHeading";
import SkillCategoryCard from "./SkillCategoryCard";
import StaggerContainer, {
  staggerItemVariantsLeft,
  staggerItemVariantsRight,
} from "../ui/StaggerContainer";
import SectionDivider from "../ui/SectionDivider";
import { skillCategories } from "../../data/skills";

export default function Skills() {
  return (
    <>
      <SectionDivider />
      <section id="skills" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="skills"
            title="ls -la ./skills"
            description="Grouped by where they get used — not a wall of percentage bars."
            direction="right"
          />

          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.12}>
            {skillCategories.map((cat, i) => (
              <SkillCategoryCard
                key={cat.id}
                category={cat}
                variants={i % 2 === 0 ? staggerItemVariantsLeft : staggerItemVariantsRight}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
