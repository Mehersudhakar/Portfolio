import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import Reveal from "./Reveal";

const links = [
  {
    icon: Mail,
    value: "msabbi2022@gmail.com",
    href: "mailto:msabbi2022@gmail.com",
  },
  {
    icon: Phone,
    value: "(240) 340-0064",
    href: "tel:+12403400064",
  },
  {
    icon: Linkedin,
    value: "/in/meher-sudhakar",
    href: "https://linkedin.com/in/meher-sudhakar",
    external: true,
  },
  {
    icon: Github,
    value: "@Mehersudhakar",
    href: "https://github.com/Mehersudhakar",
    external: true,
  },
];

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
            I&apos;m open to penetration testing, offensive security,
            application security, and AI security roles.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-col gap-4">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.value}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2.5 text-fg hover:text-accent transition-colors"
                >
                  <Icon
                    size={18}
                    className="text-accent group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm sm:text-base">{l.value}</span>
                </a>
              );
            })}
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
