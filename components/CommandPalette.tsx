"use client";

import {
  ArrowRight,
  Briefcase,
  Bug,
  Code2,
  Download,
  FileText,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Search,
  ShieldCheck,
  Terminal as TerminalIcon,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Action = {
  id: string;
  label: string;
  hint: string;
  group: "navigate" | "action" | "external";
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  keywords?: string[];
  run: () => void;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(
    () => [
      {
        id: "go-top",
        label: "Go to Home",
        hint: "#top",
        group: "navigate",
        icon: Home,
        keywords: ["hero", "start"],
        run: () => scrollToId("top"),
      },
      {
        id: "go-about",
        label: "Go to About",
        hint: "#about",
        group: "navigate",
        icon: User,
        run: () => scrollToId("about"),
      },
      {
        id: "go-experience",
        label: "Go to Experience",
        hint: "#experience",
        group: "navigate",
        icon: Briefcase,
        keywords: ["work", "jobs"],
        run: () => scrollToId("experience"),
      },
      {
        id: "go-research",
        label: "Go to CVE Research",
        hint: "#research",
        group: "navigate",
        icon: Bug,
        keywords: ["cve", "vulnerabilities", "disclosures", "security research"],
        run: () => scrollToId("research"),
      },
      {
        id: "go-projects",
        label: "Go to Projects",
        hint: "#projects",
        group: "navigate",
        icon: Code2,
        run: () => scrollToId("projects"),
      },
      {
        id: "go-skills",
        label: "Go to Skills",
        hint: "#skills",
        group: "navigate",
        icon: Wrench,
        keywords: ["tools", "tech"],
        run: () => scrollToId("skills"),
      },
      {
        id: "go-certs",
        label: "Go to Certifications",
        hint: "#certifications",
        group: "navigate",
        icon: ShieldCheck,
        keywords: ["certs", "oscp", "ceh"],
        run: () => scrollToId("certifications"),
      },
      {
        id: "go-education",
        label: "Go to Education",
        hint: "#education",
        group: "navigate",
        icon: GraduationCap,
        keywords: ["school", "umd"],
        run: () => scrollToId("education"),
      },
      {
        id: "go-contact",
        label: "Go to Contact",
        hint: "#contact",
        group: "navigate",
        icon: Mail,
        run: () => scrollToId("contact"),
      },
      {
        id: "copy-email",
        label: "Copy email",
        hint: "msabbi2022@gmail.com",
        group: "action",
        icon: Mail,
        keywords: ["clipboard"],
        run: () => {
          navigator.clipboard?.writeText("msabbi2022@gmail.com");
          setCopied("email");
          setTimeout(() => setCopied(null), 1200);
        },
      },
      {
        id: "open-resume",
        label: "Open resume.pdf",
        hint: "new tab",
        group: "action",
        icon: Download,
        keywords: ["cv", "download"],
        run: () => window.open("/Meher_Sudhakar_Abbireddi_Resume.pdf", "_blank"),
      },
      {
        id: "open-terminal",
        label: "Open shell",
        hint: "press `",
        group: "action",
        icon: TerminalIcon,
        keywords: ["cli", "console"],
        run: () => {
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "`" }));
        },
      },
      {
        id: "open-github",
        label: "GitHub",
        hint: "github.com/Mehersudhakar",
        group: "external",
        icon: Github,
        run: () => window.open("https://github.com/Mehersudhakar", "_blank"),
      },
      {
        id: "open-linkedin",
        label: "LinkedIn",
        hint: "linkedin.com/in/meher-sudhakar",
        group: "external",
        icon: Linkedin,
        run: () => window.open("https://linkedin.com/in/meher-sudhakar", "_blank"),
      },
      {
        id: "mailto",
        label: "Email me",
        hint: "mailto:msabbi2022@gmail.com",
        group: "external",
        icon: FileText,
        run: () => (window.location.href = "mailto:msabbi2022@gmail.com"),
      },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
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
    if (open) {
      setQ("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return actions;
    return actions.filter((a) => {
      const blob = (a.label + " " + (a.keywords?.join(" ") ?? "") + " " + a.hint).toLowerCase();
      return query.split(/\s+/).every((w) => blob.includes(w));
    });
  }, [q, actions]);

  useEffect(() => {
    if (cursor >= filtered.length) setCursor(Math.max(0, filtered.length - 1));
  }, [filtered, cursor]);

  if (!open) return null;

  const exec = (a: Action) => {
    a.run();
    if (a.group !== "action" || a.id === "open-resume" || a.id === "open-terminal") {
      setTimeout(() => setOpen(false), a.id === "copy-email" ? 700 : 200);
    }
  };

  const groups: Record<Action["group"], string> = {
    navigate: "navigate",
    action: "actions",
    external: "external",
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-bg/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-xl bg-panel border border-border rounded-lg overflow-hidden shadow-[0_20px_80px_-10px_rgba(239,68,68,0.25)]">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
          <Search size={15} className="text-accent shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(filtered.length - 1, c + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const a = filtered[cursor];
                if (a) exec(a);
              }
            }}
            placeholder="search actions, sections, links…"
            className="flex-1 bg-transparent outline-none text-sm text-fg placeholder:text-mutedStrong font-mono"
          />
          <kbd className="font-mono text-[10px] text-mutedStrong border border-border rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center font-mono text-xs text-mutedStrong">
              no results · try another query
            </div>
          )}
          {(["navigate", "action", "external"] as Action["group"][]).map((grp) => {
            const items = filtered.filter((a) => a.group === grp);
            if (!items.length) return null;
            return (
              <div key={grp} className="py-1">
                <div className="px-3 pt-1 pb-1 font-mono text-[10px] text-mutedStrong uppercase tracking-widest">
                  {groups[grp]}
                </div>
                {items.map((a) => {
                  const globalIdx = filtered.indexOf(a);
                  const active = globalIdx === cursor;
                  const Icon = a.icon;
                  const copiedHere = copied === "email" && a.id === "copy-email";
                  return (
                    <button
                      key={a.id}
                      onMouseEnter={() => setCursor(globalIdx)}
                      onClick={() => exec(a)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left font-mono text-[12.5px] transition-colors ${
                        active
                          ? "bg-accent/10 text-fg"
                          : "text-muted hover:text-fg"
                      }`}
                    >
                      <Icon
                        size={14}
                        className={active ? "text-accent" : "text-mutedStrong"}
                      />
                      <span className="flex-1 truncate">{a.label}</span>
                      <span className="text-[10.5px] text-mutedStrong truncate max-w-[180px]">
                        {copiedHere ? "copied ✓" : a.hint}
                      </span>
                      {active && <ArrowRight size={12} className="text-accent" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border font-mono text-[10px] text-mutedStrong">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="border border-border rounded px-1 py-0.5 text-fg">↑↓</kbd> nav
            </span>
            <span>
              <kbd className="border border-border rounded px-1 py-0.5 text-fg">↵</kbd> run
            </span>
          </div>
          <span>
            <kbd className="border border-border rounded px-1 py-0.5 text-fg">⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
}
