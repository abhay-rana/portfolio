import { Navbar } from "~/components/ui/Navbar";
import { Footer } from "~/components/ui/Footer";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { Projects } from "~/components/sections/Projects";
import { TechStack } from "~/components/sections/TechStack";
import { Experience } from "~/components/sections/Experience";
import { Blog } from "~/components/sections/Blog";
import { Testimonials } from "~/components/sections/Testimonials";
import { ResumeCTA } from "~/components/sections/ResumeCTA";
import { Contact } from "~/components/sections/Contact";
import { StarField } from "~/components/effects/StarField";
import { CursorFollower } from "~/components/effects/CursorFollower";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <StarField />
      <Navbar />
      <main className="relative z-10 pt-16">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <Blog />
        <Testimonials />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
