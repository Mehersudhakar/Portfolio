"use client";

import { useEffect, useState } from "react";

const lines = [
  { prompt: "~$", text: "establish --channel tls1.3 --target .", delay: 0, dur: 900 },
  { prompt: "→", text: "handshake [OK]   auth [OK]   verified", delay: 900, dur: 600 },
  { prompt: "~$", text: "./whoami --mode recruiter", delay: 1700, dur: 700 },
];

function useTyped(text: string, start: number, duration: number) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t0 = setTimeout(() => {
      const begin = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min((now - begin) / duration, 1);
        const n = Math.floor(p * text.length);
        setOut(text.slice(0, n));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDone(true);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, start);
    return () => clearTimeout(t0);
  }, [text, start, duration]);
  return { out, done };
}

export default function TerminalBoot() {
  const l1 = useTyped(lines[0].text, lines[0].delay, lines[0].dur);
  const l2 = useTyped(lines[1].text, lines[1].delay, lines[1].dur);
  const l3 = useTyped(lines[2].text, lines[2].delay, lines[2].dur);

  return (
    <div className="font-mono text-[11px] leading-relaxed">
      <div className={l1.done ? "text-muted" : "text-accent"}>
        <span className="text-accent">{lines[0].prompt}</span>{" "}
        <span>{l1.out}</span>
        {!l1.done && <span className="caret" />}
      </div>
      {l1.done && (
        <div className="text-muted">
          <span className="text-accent">{lines[1].prompt}</span>{" "}
          <span>
            {l2.out.replace(/\[OK\]/g, "")}
            {l2.out.includes("[OK]") && (
              <span>
                {l2.out.split("[OK]").map((seg, i, arr) => (
                  <span key={i}>
                    {seg}
                    {i < arr.length - 1 && (
                      <span className="text-positive">[OK]</span>
                    )}
                  </span>
                ))}
              </span>
            )}
          </span>
          {!l2.done && <span className="caret" />}
        </div>
      )}
      {l2.done && (
        <div className="text-accent">
          <span>{lines[2].prompt}</span> <span>{l3.out}</span>
          <span className="caret" />
        </div>
      )}
    </div>
  );
}
