import { motion } from "framer-motion";
import SectionHeading from "../layout/SectionHeading";
import StaggerContainer from "../ui/StaggerContainer";
import SectionDivider from "../ui/SectionDivider";
import ContactChannel from "./ContactChannel";
import { profile } from "../../data/profile";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/0xsaurav-exe", href: profile.social.github },
  { label: "LinkedIn", value: "linkedin.com/in/saurav-saini-eh", href: profile.social.linkedin },
  { label: "TryHackMe", value: "tryhackme.com/p/KillerSourav", href: profile.social.tryhackme },
];

export default function Contact() {
  return (
    <>
      <SectionDivider />
      <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
        {/* soft ambient pulse behind the final CTA — a quiet "send-off" moment */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full bg-term-green/[0.05] blur-[100px] pointer-events-none -z-10"
        />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <SectionHeading
            eyebrow="contact"
            title="establish connection"
            description="Open to cybersecurity and VAPT opportunities — reach out through any of these channels."
            align="center"
            direction="scale"
          />

          <StaggerContainer className="mt-12 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto" stagger={0.1}>
            {channels.map((ch) => (
              <ContactChannel key={ch.label} {...ch} />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
