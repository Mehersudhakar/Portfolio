import About from "@/components/About";
import Certifications from "@/components/Certifications";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import CrosshairCursor from "@/components/CrosshairCursor";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Konami from "@/components/Konami";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollTopOnLoad from "@/components/ScrollTopOnLoad";
import SectionConnect from "@/components/SectionConnect";
import SectionGlitch from "@/components/SectionGlitch";
import Skills from "@/components/Skills";
import StatusBar from "@/components/StatusBar";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <ScrollTopOnLoad />
      <CrosshairCursor />
      <Konami />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Terminal />
      <CommandPalette />
      <StatusBar />
      <SectionConnect />
      <SectionGlitch />
    </>
  );
}
