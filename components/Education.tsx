import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";

const coursework = [
  "Hacking of C Programs & Unix Binaries",
  "Cloud Security",
  "Reverse Engineering",
  "Digital Forensics",
  "Cryptography",
  "Operating Systems",
  "Information Security",
  "Network Security",
  "Cloud Computing",
];

export default function Education() {
  return (
    <section id="education" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-10">
            education
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-border rounded-lg p-6 sm:p-8 bg-panel/30">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-md bg-accent/10 text-accent border border-accent/30 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium text-fg">
                    Master of Engineering, Cybersecurity
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    Aug 2023 - May 2025
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">
                  University of Maryland, College Park
                </p>
                <div className="mt-5">
                  <div className="font-mono text-[11px] text-accent uppercase tracking-wider mb-2">
                    Coursework
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((c) => (
                      <span
                        key={c}
                        className="text-xs text-fg border border-border rounded px-2.5 py-1"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
