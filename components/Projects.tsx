"use client";

import { useRef } from "react";
import { ExternalLink, Bot, ShieldAlert, Radar } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    name: "Pentigo",
    tagline: "Autonomous AI Penetration Testing Platform",
    icon: Bot,
    description:
      "A multi-agent orchestration system that autonomously chains reconnaissance, scanning, enumeration, exploitation, and post-exploitation phases. Each phase is gated on prior findings to mirror how a human pentester scopes follow-up. Standard pentest tooling (Nmap, Metasploit, sqlmap, ffuf) integrates through a unified tool-calling layer that passes findings between phases and triggers context-aware follow-up probes against intentionally vulnerable VMs and CTF targets.",
    highlights: ["Multi-agent orchestration", "Phase-gated chaining", "Context-aware follow-up"],
    stack: ["Python", "Nmap", "Metasploit", "sqlmap", "ffuf"],
  },
  {
    name: "AI Red-Team Testing",
    tagline: "Offensive harness against code-generation LLMs",
    icon: ShieldAlert,
    description:
      "An offensive testing harness against AI code-generation systems. Classified hundreds of working jailbreak variants into an attack taxonomy and demonstrated systematic guardrail-bypass paths aligned to OWASP LLM Top 10. Chained successful bypasses end-to-end across direct prompt injection, indirect context injection, and multi-turn escalation, delivering each as a reproducible attack scenario with paired mitigation paths for engineering teams.",
    highlights: ["Jailbreak taxonomy", "End-to-end bypass chains", "OWASP LLM Top 10"],
    stack: ["LLM", "Prompt Injection", "Red Team", "Python"],
  },
  {
    name: "ReconX",
    tagline: "Modular reconnaissance automation framework",
    icon: Radar,
    description:
      "A Python framework automating subdomain enumeration, port scanning, service fingerprinting, and HTTP probing across attack-surface engagements. Normalizes heterogeneous tool output into a structured schema feeding downstream analysis. Configurable scan profiles (passive, active, aggressive) and a plugin interface for new modules cut manual recon setup time across multi-service engagements while keeping per-engagement scoping flexible.",
    highlights: ["Plugin architecture", "Passive/active/aggressive", "Structured output schema"],
    stack: ["Python", "Nmap", "ffuf", "Subdomain Enum"],
  },
];

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const Icon = p.icon;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    // 3D tilt: map cursor → rotation (±8deg)
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${nx * 10}deg`);
    el.style.setProperty("--ry", `${-ny * 8}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="project-tilt card-glow group relative h-full border border-border rounded-lg p-6 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_20px_60px_-20px_rgba(239,68,68,0.35)]"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md border border-border flex items-center justify-center bg-bg group-hover:border-accent/60 group-hover:rotate-6 transition-all">
            <Icon size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="text-base font-medium text-fg">{p.name}</h3>
            <p className="text-xs font-mono text-muted mt-0.5">{p.tagline}</p>
          </div>
        </div>
        <ExternalLink
          size={14}
          className="text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all mt-2"
        />
      </div>

      <p className="text-sm text-muted leading-relaxed">{p.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.highlights.map((h) => (
          <span
            key={h}
            className="chip text-[10px] font-mono text-accent/90 bg-accent/5 border border-accent/20 rounded px-2 py-0.5 hover:border-accent/60"
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-x-4 gap-y-1">
        {p.stack.map((s) => (
          <span key={s} className="text-[11px] font-mono text-muted">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-3">
            projects
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-muted max-w-2xl mb-12">
            Selected offensive-security work spanning autonomous pentesting,
            adversarial AI, and reconnaissance automation.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 100}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
