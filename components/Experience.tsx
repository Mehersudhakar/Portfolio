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
      "Strengthened a multi-tenant SaaS platform's session security before SOC 2 attestation by surfacing a high-severity JWT lifecycle flaw that survived logout, confirmed by replaying tokens in Burp Suite.",
      "Discovered 4+ high-severity findings in a production RAG-based AI application, including a novel Denial-of-Wallet attack class and LLM prompt injection, using Burp Suite and custom Python exploit scripts.",
      "Escalated one prompt-injection entry point into data exfiltration and privilege escalation by scripting multi-step PoCs in Python across production LLM orchestration and identity integration layers.",
      "Exposed client-side information disclosure in a SOC 2-aligned pentest of a production SaaS platform by auditing frontend assets (role-constant enumeration, admin-route references) in browser DevTools.",
      "Strengthened production LLM systems by designing adversarial test suites that proved guardrail-bypass paths, with hardening recommendations adopted by client engineering pre-deployment.",
      "Uncovered prompt-injection entry points, hardcoded credentials, and data-leakage vectors through source-level static analysis with Snyk across production LLM orchestration and agentic code.",
      "Accelerated client remediation by delivering penetration-test reports scoped to CVSS v3 and OWASP Top 10, pairing technical PoCs with step-by-step guidance adopted pre-production by engineering stakeholders.",
    ],
    tags: ["LLM Security", "Burp Suite", "Python", "RAG", "OWASP LLM Top 10", "OAuth/JWT", "Snyk"],
  },
  {
    company: "Handshake AI",
    title: "AI Red Team Engineer (Contract)",
    period: "Nov 2025 - Mar 2026",
    bullets: [
      "Discovered exploitable model behavior across production AI surfaces through indirect prompt injection, refusal-bypass, and context-leakage attacks scripted in Python over layered multi-turn prompts.",
      "Strengthened deployed models by turning confirmed bypasses across 4 attack classes into shipped guardrails, input filtering, output validation, and response-policy tuning.",
      "Improved automated risk classifiers by scoring model outputs against MITRE ATLAS and OWASP LLM Top 10 across exploitation, malware, and exfiltration misuse classes.",
      "Advanced model refusal on dual-use security prompts by authoring adversarial datasets paired with harm rationales, shipping refusal-policy mitigations across 3 cross-team review cycles.",
    ],
    tags: ["AI Red Team", "Prompt Injection", "MITRE ATLAS", "OWASP LLM Top 10", "Python"],
  },
  {
    company: "University of Maryland, College Park",
    title: "Offensive Security Analyst",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Exploited injection, broken authentication, and access-control flaws on production web apps through authenticated and unauthenticated pentests, with working payloads in Burp Suite and sqlmap for owners.",
      "Escalated access across enterprise Linux and Windows infrastructure by chaining service misconfigurations and credential exposure into multi-host pivot paths using Impacket and CrackMapExec.",
      "Uncovered cloud workload risk across public-bucket exposure, IAM misconfiguration, and over-scoped roles by auditing IAM policies and CloudTrail logs in production AWS, routing fixes by exploitability.",
      "Accelerated recurring engagements by building Python automation for attack-surface enumeration and exploit validation, cutting per-engagement setup time and standardizing reporting output.",
    ],
    tags: ["Web Pentest", "Linux/Windows", "AWS IAM", "Impacket", "CrackMapExec", "Python"],
  },
  {
    company: "DXC Technology",
    title: "Security Engineer",
    period: "Jun 2022 - Aug 2023",
    bullets: [
      "Discovered 25+ critical vulnerabilities across web, mobile, and API clients, spanning injection, broken access control (IDOR), and authentication bypass, contributing to a 35% reduction in production incidents.",
      "Escalated domain privileges across enterprise test Active Directory environments by enumerating attack paths with BloodHound and Kerberoasting and extracting credentials with Mimikatz.",
      "Compromised user-awareness and email-security controls through phishing simulations and pretext payloads in recurring red-team social engineering campaigns using GoPhish and Evilginx.",
      "Reduced critical-vulnerability detection-to-fix time 30% by running threat-emulation drills across 100+ Linux and Windows systems with Nessus, prioritizing remediation by CVSS score and exploitability.",
    ],
    tags: ["Active Directory", "BloodHound", "Mimikatz", "Nessus", "GoPhish", "Evilginx"],
  },
  {
    company: "Verzeo",
    title: "Web Application Penetration Tester",
    period: "Oct 2021 - Jun 2022",
    bullets: [
      "Exploited SQL injection, XSS, and IDOR on production web targets, proving each end-to-end with hand-crafted payloads in OWASP ZAP and sqlmap, driving risk-prioritized remediation.",
      "Identified input-validation, authentication, and authorization flaws that dynamic scanners missed through manual source code review with SonarQube across high-risk production modules.",
      "Reduced manual enumeration effort 30% by automating reconnaissance and attack-surface mapping with Nmap and custom Python tooling, expanding coverage across components and backend services.",
    ],
    tags: ["SQLi", "XSS", "IDOR", "OWASP ZAP", "sqlmap", "SonarQube", "Nmap"],
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
