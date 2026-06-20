import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Skills from "../components/skills/Skills";
import Projects from "../components/projects/Projects";
import Achievements from "../components/achievements/Achievements";
import Certifications from "../components/certifications/Certifications";
import ResumeSection from "../components/resume/ResumeSection";
import InteractiveTerminal from "../components/terminal/InteractiveTerminal";
import Contact from "../components/contact/Contact";
import SectionHeading from "../components/layout/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Certifications />
      <ResumeSection />

      <section id="terminal" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="terminal"
            title="./explore --interactive"
            description="The same shell this site grew out of. Try a command."
            align="center"
          />
          <div className="mt-12">
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
