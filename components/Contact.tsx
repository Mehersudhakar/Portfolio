import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-6">
            contact
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            Have a target to test, a system to harden, or a role to fill?
          </h3>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 text-muted max-w-xl">
            I&apos;m open to offensive security, application security, and AI
            security roles, plus selective contract engagements.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-2xl">
            <a
              href="mailto:msabbi2022@gmail.com"
              className="group flex items-center gap-3 border border-border rounded-lg p-4 hover:border-accent/60 transition-colors"
            >
              <Mail size={18} className="text-accent" />
              <div>
                <div className="text-xs font-mono text-muted">email</div>
                <div className="text-sm text-fg">msabbi2022@gmail.com</div>
              </div>
            </a>
            <a
              href="tel:+12403400064"
              className="group flex items-center gap-3 border border-border rounded-lg p-4 hover:border-accent/60 transition-colors"
            >
              <Phone size={18} className="text-accent" />
              <div>
                <div className="text-xs font-mono text-muted">phone</div>
                <div className="text-sm text-fg">(240) 340-0064</div>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/meher-sudhakar"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border border-border rounded-lg p-4 hover:border-accent/60 transition-colors"
            >
              <Linkedin size={18} className="text-accent" />
              <div>
                <div className="text-xs font-mono text-muted">linkedin</div>
                <div className="text-sm text-fg">/in/meher-sudhakar</div>
              </div>
            </a>
            <a
              href="https://github.com/Mehersudhakar"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border border-border rounded-lg p-4 hover:border-accent/60 transition-colors"
            >
              <Github size={18} className="text-accent" />
              <div>
                <div className="text-xs font-mono text-muted">github</div>
                <div className="text-sm text-fg">@Mehersudhakar</div>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <a
            href="/Meher_Sudhakar_Abbireddi_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-accent text-bg font-medium text-sm px-5 py-2.5 rounded-md hover:bg-accent/90 transition-colors"
          >
            <Download size={15} />
            Download resume (PDF)
          </a>
        </Reveal>
      </div>
    </section>
  );
}
