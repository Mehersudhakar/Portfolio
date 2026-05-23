"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function Konami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(key);
      if (buffer.length > SEQUENCE.length) buffer.shift();
      if (buffer.join("|") === SEQUENCE.join("|")) {
        setActive(true);
        buffer = [];
        setTimeout(() => setActive(false), 3600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div className="konami-overlay" aria-hidden>
      <div className="konami-scan" />
      <div className="konami-content">
        <div className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 opacity-0 konami-line">
          [ exploit successful ]
        </div>
        <div className="font-mono text-4xl sm:text-6xl font-bold text-fg tracking-tight opacity-0 konami-line konami-line-2">
          ACCESS GRANTED
        </div>
        <div className="mt-6 font-mono text-xs text-muted opacity-0 konami-line konami-line-3">
          &gt; root@meher: echo &quot;you found it. thanks for looking closely.&quot;
        </div>
      </div>
    </div>
  );
}
