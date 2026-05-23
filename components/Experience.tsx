"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
  tags: string[];
  active?: boolean;
};

const roles: Role[] = [
  {
    company: "Cybertrust America",
    title: "Cybersecurity Engineer",
    period: "Jun 2025 - Present",
    active: true,
    bullets: [
      "Led an authenticated web application penetration test on an OAuth-based multi-tenant SaaS platform, surfacing a high-severity JWT lifecycle flaw allowing sessions to persist beyond logout, validated with a working PoC and remediated pre-attestation.",
      "Designed and executed multi-phase penetration tests against a production RAG-based AI application, uncovering 4+ high-severity findings including a novel Denial-of-Wallet attack class, LLM prompt injection, and agentic access-control bypass using Burp Suite and custom Python exploits.",
      "Constructed multi-step attack chains from prompt injection through data exfiltration and privilege escalation, validating end-to-end exploitability via controlled PoCs against LLM orchestration, retrieval pipelines, and identity integration points.",
      "Conducted source-level review of LLM orchestration and agentic integration code to identify prompt-injection entry points, hardcoded credentials, and unsafe user-input handoffs feeding downstream attack chains.",
      "Ran AI red-team exercises against deployed LLM systems, designing adversarial test suites that proved guardrail-bypass paths and mapped them to OWASP LLM Top 10 categories with hardening recommendations adopted pre-deployment.",
      "Drafted client-facing penetration-test reports scoped to CVSS v3 and OWASP Top 10 with technical PoCs and step-by-step remediation guidance, partnering with engineering through fix verification and retest cycles.",
    ],
    tags: ["LLM Security", "Burp Suite", "Python", "RAG", "OWASP LLM Top 10", "OAuth/JWT"],
  },
  {
    company: "University of Maryland, College Park",
    title: "Security Analyst",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Executed authenticated and unauthenticated penetration tests against production business web applications, exploiting injection, broken authentication, and access-control flaws end-to-end with working PoC payloads delivered to application owners.",
      "Ran offensive scenarios against enterprise Linux and Windows infrastructure, chaining service misconfigurations and credential exposure into multi-host pivot paths documented for infrastructure stakeholders.",
      "Discovered cloud workload exposure across IAM misconfiguration, public-bucket exposure, and over-scoped role assumptions in production cloud environments, routing fix priorities to application owners by exploitability.",
      "Built Python tooling to automate enumeration and exploit-validation across recurring engagements, cutting per-engagement setup time and standardizing output flowing into client-facing reports.",
    ],
    tags: ["Web Pentest", "Linux/Windows", "Cloud", "IAM", "Python"],
  },
  {
    company: "DXC Technology",
    title: "Security Engineer",
    period: "Jun 2022 - Aug 2023",
    bullets: [
      "Performed adversarial threat modeling and attack-surface analysis across distributed product architectures, mapping exploitation paths and validating attacker-reachable flaws pre-production for engineering teams.",
      "Discovered 25+ critical vulnerabilities across web, mobile, API, and desktop clients including injection flaws (XSS, CSRF, SQLi) and authentication bypass in OAuth and JWT-based identity flows, contributing to a 35% reduction in production incidents.",
      "Executed social engineering campaigns including phishing simulations and pretext-based payload delivery to validate user-awareness controls and email-security filters during red-team engagements.",
      "Performed vulnerability scanning and threat-emulation drills on 100+ Linux and Windows systems using Nessus and Nmap, prioritizing remediation by CVSS score, asset criticality, and exploitability.",
      "Developed Python-based exploit-validation scripts and lightweight C tooling to accelerate attack-surface enumeration and deliver actionable PoCs during ongoing engagements.",
    ],
    tags: ["Threat Modeling", "Nessus", "Nmap", "OAuth/JWT", "Phishing", "Python/C"],
  },
  {
    company: "Verzeo",
    title: "Web Application Penetration Tester",
    period: "Oct 2021 - Jun 2022",
    bullets: [
      "Exploited SQL Injection, XSS, CSRF, and IDOR end-to-end on production web targets with working PoC payloads, delivering reproduction steps that drove risk-prioritized remediation across in-scope modules.",
      "Performed manual source code review during pentest engagements to surface input-validation, authentication, and authorization flaws missed by dynamic scanners, paired with PoC exploit payloads.",
      "Automated reconnaissance and attack-surface mapping using Nmap and custom Python tooling, reducing manual enumeration effort by 30% and expanding coverage across system components and backend services.",
    ],
    tags: ["SQLi", "XSS", "CSRF", "IDOR", "Code Review", "Nmap"],
  },
];

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineIn, setLineIn] = useState(false);

  useEffect(() => {
    const node = lineRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLineIn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-12">
            experience
          </h2>
        </Reveal>

        <div ref={lineRef} className="relative">
          <div
            className={`timeline-line absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent hidden sm:block ${
              lineIn ? "in" : ""
            }`}
            aria-hidden
          />

          <div className="space-y-14">
            {roles.map((r, i) => (
              <Reveal key={r.company} delay={i * 80}>
                <div className="relative sm:pl-10 group">
                  <div
                    className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-accent bg-bg hidden sm:block transition-all group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                    aria-hidden
                  />
                  {r.active && (
                    <span
                      className="absolute left-[-2px] top-[2px] pulse-dot hidden sm:block"
                      aria-hidden
                    />
                  )}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                    <h3 className="text-lg font-medium text-fg">
                      {r.title}{" "}
                      <span className="text-muted font-normal">
                        · {r.company}
                      </span>
                      {r.active && (
                        <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-positive border border-positive/40 bg-positive/5 rounded px-1.5 py-0.5 align-middle">
                          <span
                            className="pulse-dot green"
                            style={{ width: 5, height: 5 }}
                          />
                          live
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {r.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
                    {r.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent mt-1.5">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="chip text-[10px] font-mono text-muted border border-border rounded px-2 py-0.5 hover:border-accent/60 hover:text-fg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
