"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#research", label: "cves" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#certifications", label: "certs" },
  { href: "#contact", label: "contact" },
];

const CRUMB: Record<string, string> = {
  "#about": "~/about",
  "#experience": "~/experience",
  "#research": "~/cve-research",
  "#projects": "~/projects",
  "#skills": "~/skills",
  "#certifications": "~/certs",
  "#education": "~/education",
  "#contact": "~/contact",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-border max-md:backdrop-blur-none max-md:bg-bg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <a href="#top" className="font-mono text-sm tracking-tight">
            <span className="text-accent">$</span> meher
            <span className="animate-blink text-accent">_</span>
          </a>
          <div className="flex items-center gap-2 pl-4 border-l border-border font-mono text-[10px] text-muted uppercase tracking-[0.14em]">
            <span className="pulse-dot green" style={{ width: 6, height: 6 }} />
            <span>secure</span>
          </div>
          <div className="hidden lg:flex items-center pl-3 border-l border-border font-mono text-[11px] text-mutedStrong">
            <span className="text-accent">path:</span>
            <span className="ml-1.5 text-fg">{CRUMB[active] ?? "~"}</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link hover:text-fg transition-colors ${
                active === l.href ? "active" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Meher_Sudhakar_Abbireddi_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="border border-border hover:border-accent hover:text-accent px-3 py-1.5 rounded transition-all hover:-translate-y-0.5"
          >
            resume.pdf
          </a>
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="font-mono text-xs text-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="toggle menu"
          >
            {open ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur">
          <div className="flex flex-col p-4 gap-3 font-mono text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-muted hover:text-fg ${
                  active === l.href ? "text-fg" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Meher_Sudhakar_Abbireddi_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              resume.pdf →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
