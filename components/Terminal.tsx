"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare, X } from "lucide-react";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "muted" | "accent" | "positive" | "fg" };

const BANNER: Line[] = [
  { kind: "out", text: "╔══════════════════════════════════════════════╗", tone: "muted" },
  { kind: "out", text: "║  msa-shell v1.0 · meher@portfolio            ║", tone: "accent" },
  { kind: "out", text: "║  type 'help' for commands · ESC / exit close ║", tone: "muted" },
  { kind: "out", text: "╚══════════════════════════════════════════════╝", tone: "muted" },
  { kind: "out", text: "" },
];

const HELP = `available commands:
  help              show this menu
  whoami            profile summary
  ls                list sections
  cd <section>      scroll to a section (about, experience, projects...)
  cat <section>     print section contents
  nmap              run a scan on meher
  ping              latency check
  resume            open resume.pdf
  sudo hire         privilege escalation (to #contact)
  social            links
  date              current datetime
  history           command history
  clear             clear the screen
  exit              close terminal`;

const SECTIONS = [
  "about",
  "experience",
  "projects",
  "skills",
  "certs",
  "education",
  "contact",
];

const CONTENT: Record<string, string> = {
  about: `I find exploitable vulnerabilities through manual, adversary-driven
testing, then translate them into actionable remediation that
engineering teams actually ship.

currently: pentesting RAG/LLM apps · adversarial guardrail research · pursuing OSCP`,
  experience: `ENG-004 · Cybertrust America      · Cybersecurity Engineer   · Jun 2025 - Present · LIVE
ENG-003 · UMD College Park        · Security Analyst         · Aug 2024 - May 2025
ENG-002 · DXC Technology          · Security Engineer        · Jun 2022 - Aug 2023
ENG-001 · Verzeo                  · Web App Pentester        · Oct 2021 - Jun 2022`,
  projects: `→ Pentigo                   · Autonomous AI Pentest Platform   [Multi-agent / Python]
→ AI Red-Team Testing       · Code-Gen LLM Jailbreak Harness   [LLM / Red Team]
→ ReconX                    · Modular Recon Automation         [Python / Nmap / ffuf]`,
  skills: `offensive:  Burp · Metasploit · Nmap · sqlmap · ZAP · ffuf · gobuster · Hydra · Hashcat
ai/llm:     Prompt Injection · Denial-of-Wallet · Jailbreak Taxonomy · OWASP LLM Top 10
appsec:     STRIDE · SAST/DAST/SCA · Manual Code Review · OWASP Top 10
lang:       Python · JavaScript · PowerShell · Bash · C · C++ · SQL
cloud:      AWS (IAM, S3, EC2, Lambda) · Docker · MITRE ATT&CK · NIST CSF · SOC 2`,
  certs: `[ in progress ] OSCP    · Offensive Security
[ verified    ] eJPT    · INE
[ verified    ] CEH     · EC-Council
[ verified    ] Sec+    · CompTIA`,
  education: `M.Eng. Cybersecurity · University of Maryland, College Park
Aug 2023 - May 2025`,
  contact: `email     msabbi2022@gmail.com
phone     (240) 340-0064
linkedin  linkedin.com/in/meher-sudhakar
github    github.com/Mehersudhakar`,
};

const NMAP_OUT = `Starting nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for meher.portfolio (127.0.0.1)
Host is up (0.00043s latency).
PORT      STATE  SERVICE          VERSION
22/tcp    open   python           6 langs
80/tcp    open   offensive-tools  13 loaded
443/tcp   open   defensive-tools  5  monitoring
1337/tcp  open   reverse-eng      7  binaries
8443/tcp  open   platforms        7  environments
9001/tcp  open   domains          5  specialties
Service Info: OS: Linux; Kali; Disciplines: Red Team, AppSec, AI Security
Nmap done: 1 IP scanned in 0.42 seconds`;

function scrollToId(id: string) {
  const el = document.getElementById(id === "certs" ? "certifications" : id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (!typing && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (open && e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { kind: "cmd", text: raw }];

    if (!cmd) {
      setLines(next);
      return;
    }
    setHistory((h) => [...h, cmd]);
    setHistIdx(null);

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const push = (text: string, tone?: Line["tone"]) =>
      next.push({ kind: "out", text, tone });

    switch (head.toLowerCase()) {
      case "help":
        push(HELP, "muted");
        break;
      case "whoami":
        push(
          "meher sudhakar abbireddi · offensive security engineer · 3+ yrs",
          "fg"
        );
        push("certs: CEH · eJPT · Sec+ · OSCP(in progress)", "muted");
        break;
      case "ls":
        push(SECTIONS.map((s) => `./${s}`).join("  "), "accent");
        break;
      case "cd":
        if (!arg) {
          push("usage: cd <section>", "muted");
          break;
        }
        if (scrollToId(arg)) {
          push(`navigating to #${arg}...`, "positive");
          setTimeout(() => setOpen(false), 400);
        } else {
          push(`cd: no such section: ${arg}`, "accent");
        }
        break;
      case "cat":
        if (!arg || !CONTENT[arg]) {
          push(`cat: usage: cat <${SECTIONS.join("|")}>`, "muted");
          break;
        }
        CONTENT[arg].split("\n").forEach((l) => push(l, "fg"));
        break;
      case "nmap":
        NMAP_OUT.split("\n").forEach((l, i) =>
          push(l, i === 1 || i === 0 ? "muted" : i < 4 ? "accent" : "fg")
        );
        break;
      case "ping":
        push("PING meher.dev (127.0.0.1): 56 data bytes", "muted");
        push("64 bytes from 127.0.0.1: icmp_seq=0 time=0.031 ms", "fg");
        push("64 bytes from 127.0.0.1: icmp_seq=1 time=0.028 ms", "fg");
        push("--- stats: 0.0% packet loss, avg 0.029 ms ---", "positive");
        break;
      case "resume":
        push("opening Meher_Sudhakar_Abbireddi_Resume.pdf...", "positive");
        window.open("/Meher_Sudhakar_Abbireddi_Resume.pdf", "_blank");
        break;
      case "sudo":
        if (arg.startsWith("hire")) {
          push("[sudo] password for visitor: ********", "muted");
          push("privilege escalation successful. access granted.", "positive");
          push("→ opening #contact", "accent");
          setTimeout(() => {
            scrollToId("contact");
            setOpen(false);
          }, 600);
        } else {
          push(`sudo: ${arg || "<cmd>"}: command not permitted.`, "accent");
          push("try: sudo hire", "muted");
        }
        break;
      case "social":
        push("github    https://github.com/Mehersudhakar", "fg");
        push("linkedin  https://linkedin.com/in/meher-sudhakar", "fg");
        push("email     msabbi2022@gmail.com", "fg");
        break;
      case "date":
        push(new Date().toString(), "fg");
        break;
      case "history":
        history.forEach((h, i) => push(`${String(i + 1).padStart(3, " ")}  ${h}`, "muted"));
        break;
      case "clear":
      case "cls":
        setLines(BANNER);
        return;
      case "exit":
      case "q":
      case "quit":
        setOpen(false);
        return;
      case "echo":
        push(rest.join(" "), "fg");
        break;
      default:
        push(`msa-shell: command not found: ${head}`, "accent");
        push("type 'help' for available commands.", "muted");
    }

    setLines(next);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [head, arg] = input.split(/\s+/);
      if (!arg) return;
      const match = SECTIONS.find((s) => s.startsWith(arg));
      if (match) setInput(`${head} ${match}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="open terminal"
        className="fixed bottom-5 right-5 z-40 group inline-flex items-center gap-2 font-mono text-[11px] border border-border bg-bg/80 backdrop-blur text-muted hover:text-accent hover:border-accent px-3 py-2 rounded-md transition-colors shadow-lg"
      >
        <TerminalSquare size={14} />
        <span className="hidden sm:inline">
          press <kbd className="px-1 py-0.5 bg-panel border border-border rounded text-fg">`</kbd> for shell
        </span>
      </button>

      {open && (
        <div
          className="terminal-backdrop fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm flex items-end sm:items-center sm:justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="terminal-panel w-full sm:max-w-3xl sm:rounded-lg border-t sm:border border-border bg-panel shadow-[0_-20px_60px_-10px_rgba(239,68,68,0.2)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-panel/60">
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-positive/70" />
                </span>
                <span className="ml-3">meher@portfolio: ~</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="close"
                className="text-muted hover:text-accent transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="font-mono text-[12.5px] leading-relaxed h-[55vh] overflow-y-auto px-4 py-3"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) =>
                l.kind === "cmd" ? (
                  <div key={i} className="text-fg whitespace-pre-wrap">
                    <span className="text-accent">meher@portfolio</span>
                    <span className="text-muted">:~$ </span>
                    <span>{l.text}</span>
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      l.tone === "accent"
                        ? "text-accent"
                        : l.tone === "positive"
                        ? "text-positive"
                        : l.tone === "fg"
                        ? "text-fg"
                        : "text-muted"
                    }`}
                  >
                    {l.text}
                  </div>
                )
              )}

              <form onSubmit={onSubmit} className="flex items-center gap-1 mt-1">
                <span className="text-accent">meher@portfolio</span>
                <span className="text-muted">:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none text-fg caret-accent ml-1"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
