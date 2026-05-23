"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Footer() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(uptime / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = uptime % 60;

  return (
    <footer className="border-t border-border py-6 md:pb-14 relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px bg-border overflow-hidden pointer-events-none"
        aria-hidden
      >
        <span className="packet" style={{ animationDelay: "0s" }} />
        <span className="packet green" style={{ animationDelay: "1.4s" }} />
        <span className="packet" style={{ animationDelay: "2.6s" }} />
      </div>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <span
              className="pulse-dot green"
              style={{ width: 6, height: 6 }}
            />
            <span className="text-positive uppercase tracking-[0.14em] text-[10px]">
              channel active
            </span>
          </span>
          <span className="text-mutedStrong">·</span>
          <span>
            uptime:{" "}
            <span className="text-fg tabular-nums">
              {pad(h)}:{pad(m)}:{pad(s)}
            </span>
          </span>
          <span className="text-mutedStrong hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            enc:{" "}
            <span className="text-fg">tls1.3</span>
          </span>
        </div>
        <div>© {new Date().getFullYear()} meher sudhakar abbireddi</div>
      </div>
    </footer>
  );
}
