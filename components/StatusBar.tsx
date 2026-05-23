"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export default function StatusBar() {
  const [progress, setProgress] = useState(0);
  const [lat, setLat] = useState(23);
  const [uptime, setUptime] = useState(0);
  const [sid, setSid] = useState("------");
  const [active, setActive] = useState("HOME");

  useEffect(() => {
    setSid(
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));

      const probe = window.innerHeight * 0.35;
      let current = SECTIONS[0].label;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe) current = s.label;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const latInt = setInterval(
      () => setLat(18 + Math.floor(Math.random() * 14)),
      1600
    );
    const upStart = Date.now();
    const upInt = setInterval(
      () => setUptime(Math.floor((Date.now() - upStart) / 1000)),
      1000
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(latInt);
      clearInterval(upInt);
    };
  }, []);

  const mm = String(Math.floor(uptime / 60)).padStart(2, "0");
  const ss = String(uptime % 60).padStart(2, "0");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:flex items-center gap-5 px-4 h-7 bg-panel/85 backdrop-blur border-t border-border text-[10.5px] font-mono text-muted select-none">
      <div className="flex items-center gap-2">
        <span className="pulse-dot green" />
        <span>
          SEC:<span className="text-fg">{active}</span>
        </span>
      </div>

      <div className="flex-1 flex items-center gap-2 max-w-[360px]">
        <span className="text-mutedStrong">scan</span>
        <div className="relative flex-1 h-[3px] bg-border/70 rounded-sm overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute inset-y-0 w-px bg-fg/70"
            style={{ left: `${progress}%` }}
          />
        </div>
        <span className="text-fg tabular-nums w-8 text-right">
          {progress.toFixed(0).padStart(2, "0")}%
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <span>
          SID <span className="text-fg">0x{sid}</span>
        </span>
        <span>
          LAT{" "}
          <span className="text-fg tabular-nums">
            {String(lat).padStart(2, "0")}ms
          </span>
        </span>
        <span>
          UPT{" "}
          <span className="text-fg tabular-nums">
            {mm}:{ss}
          </span>
        </span>
      </div>

      <span className="flex items-center gap-1.5">
        <span className="pulse-dot green" />
        <span className="text-fg">TLS1.3</span>
      </span>
    </div>
  );
}
