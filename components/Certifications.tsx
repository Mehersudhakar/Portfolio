import { Award } from "lucide-react";
import Reveal from "./Reveal";

const certs = [
  {
    name: "OSCP",
    issuer: "Offensive Security",
    status: "In Progress",
    pursuing: true,
    hash: "0x8fe3",
  },
  {
    name: "eJPT · Junior Penetration Tester",
    issuer: "INE",
    status: "Certified",
    hash: "0x4a91",
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    status: "Certified",
    hash: "0xc20b",
  },
  {
    name: "CEH · Certified Ethical Hacker",
    issuer: "EC-Council",
    status: "Certified",
    hash: "0x71da",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-12">
            certifications
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {certs.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div
                className={`border rounded-lg p-5 flex items-start gap-4 bg-panel/30 transition-all hover:-translate-y-0.5 ${
                  c.pursuing
                    ? "border-accent/40 hover:border-accent hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.4)]"
                    : "border-border hover:border-fg/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                    c.pursuing
                      ? "bg-accent/10 text-accent"
                      : "bg-bg border border-border text-fg"
                  }`}
                >
                  <Award size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium text-fg">{c.name}</h3>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded inline-flex items-center gap-1.5 ${
                        c.pursuing
                          ? "bg-accent/10 text-accent border border-accent/30"
                          : "text-positive border border-positive/30 bg-positive/5"
                      }`}
                    >
                      {c.pursuing ? (
                        <span className="pulse-dot" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-positive" />
                      )}
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted mt-1">
                    {c.issuer}
                  </p>
                  <p className="text-[10px] font-mono text-mutedStrong mt-2">
                    sha: {c.hash}...{c.hash.slice(2).split("").reverse().join("")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
