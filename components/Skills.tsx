"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const groups = [
  {
    label: "Offensive Security",
    port: "80",
    items: [
      "Manual Web/API Exploitation",
      "Network Pentesting",
      "Auth Bypass (OAuth/OIDC/JWT/SAML)",
      "Exploit Chains",
      "Exploit Dev",
      "Privilege Escalation",
      "Lateral Movement",
      "Attack-Surface Enum",
      "Post-Exploitation",
      "Social Engineering",
      "Phishing Simulation",
      "Bug Bounty / Responsible Disclosure",
    ],
  },
  {
    label: "AI Red Team & LLM Security",
    port: "1337",
    items: [
      "Prompt Injection (Direct/Indirect)",
      "Denial-of-Wallet Attack Design",
      "Multi-Step LLM Exploit Chaining",
      "Jailbreak Taxonomy",
      "Guardrail-Bypass Testing",
      "RAG Pipeline Attack Surface",
      "Agentic Access-Control Bypass",
      "Adversarial Test Design",
      "OWASP LLM Top 10",
      "MITRE ATLAS",
    ],
  },
  {
    label: "AppSec & Code Review",
    port: "8080",
    items: [
      "Manual Source Code Review",
      "STRIDE Threat Modeling",
      "SAST/DAST/SCA Integration",
      "CI/CD Security Gates",
      "Attack-Surface Analysis",
      "Vulnerability Triage",
      "OWASP Top 10",
      "OWASP API Security Top 10",
    ],
  },
  {
    label: "Programming",
    port: "22",
    items: [
      "Python",
      "JavaScript",
      "PowerShell",
      "Bash",
      "Unix Shell",
      "C",
      "C++",
      "SQL",
      "Exploit Scripting",
      "Automation Tooling",
      "JSON Schema Design",
    ],
  },
  {
    label: "Security Tools",
    port: "443",
    items: [
      "Burp Suite",
      "Nmap",
      "Nessus",
      "Metasploit",
      "sqlmap",
      "ffuf",
      "BloodHound",
      "Mimikatz",
      "Wireshark",
      "SonarQube",
      "Veracode",
      "Checkmarx",
    ],
  },
  {
    label: "Cloud, Infra & Standards",
    port: "9001",
    items: [
      "AWS (IAM, S3, EC2, Lambda)",
      "Active Directory",
      "Docker",
      "Linux (Kali, Ubuntu)",
      "Windows Server",
      "Jenkins",
      "GitHub Actions",
      "MITRE ATT&CK",
      "NIST CSF",
      "CVSS v3",
      "SOC 2",
      "PCI DSS",
      "HIPAA",
    ],
  },
];

function Group({
  g,
  index,
}: {
  g: (typeof groups)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const n = ref.current;
    if (!n) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !scanned) {
            setScanned(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(n);
    return () => io.disconnect();
  }, [scanned]);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-3">
        <div className="font-mono text-[11px] text-accent uppercase tracking-wider flex items-center gap-2">
          <span>{g.label}</span>
        </div>
        <div className="font-mono text-[10px] text-mutedStrong tabular-nums">
          port: {g.port} · {g.items.length} open
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {g.items.map((it, j) => (
          <li
            key={it}
            className="chip chip-magnet text-xs text-fg border border-border rounded px-2.5 py-1 hover:border-accent/60 hover:text-accent relative"
            style={
              scanned
                ? {
                    animation: `chipScan 0.35s ease-out ${
                      index * 80 + j * 45
                    }ms both`,
                  }
                : { opacity: 0 }
            }
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function useChipMagnet() {
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;
    const chips = Array.from(
      section.querySelectorAll<HTMLElement>(".chip-magnet")
    );
    if (!chips.length) return;

    let raf = 0;
    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = 0;
      chips.forEach((chip) => {
        const r = chip.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 160;
        if (dist < radius) {
          const f = 1 - dist / radius; // 0..1
          chip.style.setProperty("--f", f.toFixed(3));
          chip.style.transform = `scale(${1 + f * 0.15}) translate(${dx * f * 0.08}px, ${dy * f * 0.08}px)`;
          chip.style.borderColor = `rgba(239,68,68,${0.25 + f * 0.6})`;
          chip.style.color = `rgba(239,68,68,${0.4 + f * 0.6})`;
          chip.style.boxShadow = `0 0 ${f * 18}px rgba(239,68,68,${f * 0.5})`;
        } else {
          chip.style.transform = "";
          chip.style.borderColor = "";
          chip.style.color = "";
          chip.style.boxShadow = "";
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      chips.forEach((chip) => {
        chip.style.transform = "";
        chip.style.borderColor = "";
        chip.style.color = "";
        chip.style.boxShadow = "";
      });
    };
  }, []);
}

export default function Skills() {
  useChipMagnet();
  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-3">
            <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest">
              skills &amp; tooling
            </h2>
            <span className="font-mono text-[10px] text-mutedStrong">
              $ nmap -sV --open localhost
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-muted text-xs font-mono mb-10">
            <span className="text-positive">✓</span> scan complete ·{" "}
            {groups.reduce((n, g) => n + g.items.length, 0)} services discovered
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={i * 60}>
              <Group g={g} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
