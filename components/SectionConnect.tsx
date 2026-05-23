"use client";

import { useEffect, useRef, useState } from "react";

const MAP: Record<string, string> = {
  about: "about",
  experience: "experience",
  projects: "projects",
  skills: "skills",
  certifications: "certifications",
  education: "education",
  contact: "contact",
};

export default function SectionConnect() {
  const [text, setText] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const seenRef = useRef<Set<string>>(new Set());
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = () => {
      const probe = 120;
      let current: string | null = null;
      for (const id of Object.keys(MAP)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) current = id;
      }
      if (!current || current === activeRef.current) return;
      activeRef.current = current;
      if (seenRef.current.has(current)) return;
      seenRef.current.add(current);
      setText(`$ cd ~/${MAP[current]} && cat README.md`);
    };

    window.addEventListener("scroll", trigger, { passive: true });
    trigger();
    return () => window.removeEventListener("scroll", trigger);
  }, []);

  useEffect(() => {
    if (!text) return;
    setTyped("");
    let i = 0;
    const type = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(type);
    }, 28);
    const clear = setTimeout(() => setText(null), 2200);
    return () => {
      clearInterval(type);
      clearTimeout(clear);
    };
  }, [text]);

  return (
    <div
      aria-hidden
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[55] pointer-events-none hidden md:block transition-all duration-200 ${
        text ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="font-mono text-[12.5px] bg-panel/95 backdrop-blur border border-accent/40 rounded-md px-4 py-2 text-fg shadow-[0_10px_40px_-10px_rgba(239,68,68,0.55)]">
        <span className="text-accent">meher@portfolio</span>
        <span className="text-muted">:~$ </span>
        <span>{typed}</span>
        <span className="caret" />
      </div>
    </div>
  );
}
