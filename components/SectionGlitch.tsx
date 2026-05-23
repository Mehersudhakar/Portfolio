"use client";

import { useEffect, useRef } from "react";

const IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "certifications",
  "education",
  "contact",
];

export default function SectionGlitch() {
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = () => {
      const probe = 160;
      let current: string | null = null;
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) current = id;
      }
      if (!current || current === activeRef.current) return;
      activeRef.current = current;

      const section = document.getElementById(current);
      if (!section) return;
      const target = section.querySelector<HTMLElement>(".section-heading") ?? section;
      target.classList.remove("section-glitch-in");
      void target.offsetWidth;
      target.classList.add("section-glitch-in");
      setTimeout(() => target.classList.remove("section-glitch-in"), 600);
    };

    window.addEventListener("scroll", trigger, { passive: true });
    trigger();
    return () => window.removeEventListener("scroll", trigger);
  }, []);

  return null;
}
