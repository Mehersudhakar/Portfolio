"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import HexStat from "./HexStat";
import TerminalBoot from "./TerminalBoot";

export default function Hero() {
  const [booted, setBooted] = useState(false);
  // content reveals only after the terminal finishes typing (event-driven, not a fixed timer)
  const reveal = booted ? "animate-fadeUp" : "";

  return (
    <section
      id="top"
      className="relative min-h-[100vh] flex items-start overflow-hidden"
    >
      <div className="hero-glow" style={{ top: "-10%", left: "10%" }} />
      <div
        className="hero-glow"
        style={{
          bottom: "-20%",
          right: "0%",
          animationDelay: "-10s",
          opacity: 0.65,
        }}
      />

      <div className="absolute inset-0 grid-bg radial-fade pointer-events-none" />
      <div className="scanline" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 lg:pt-32 pb-28">
        <div className="animate-fadeUp mb-8">
          <TerminalBoot onDone={() => setBooted(true)} />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h1
              className={`text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] opacity-0 ${reveal}`}
            >
              <span className="glitch" data-text="Meher Sudhakar">
                Meher Sudhakar
              </span>
              <br />
              <span className="glitch" data-text="Abbireddi">
                Abbireddi
              </span>
            </h1>

            <p
              className={`mt-5 font-mono text-xs sm:text-[13px] text-mutedStrong opacity-0 ${reveal}`}
            >
              <span className="text-accent">//</span> your friendly
              neighborhood <span className="text-muted">pentester</span>
            </p>

            <p
              className={`mt-5 max-w-2xl text-base sm:text-lg text-muted leading-relaxed opacity-0 ${reveal}`}
            >
              Cybersecurity professional with{" "}
              <span className="text-fg">3+ years</span> in penetration
              testing, vulnerability exploitation, and AI/LLM red teaming.
              Currently pentesting RAG-based AI applications and hardening
              adversarial AI guardrails at{" "}
              <span className="text-fg">Cybertrust America</span>.
            </p>

            <div
              className={`mt-8 flex flex-wrap items-center gap-3 opacity-0 ${reveal}`}
            >
              <a
                href="#projects"
                className="shine group inline-flex items-center gap-2 bg-accent text-bg font-medium text-sm px-5 py-2.5 rounded-md hover:bg-accent/90 transition-colors"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  View Work
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </a>
              <a
                href="/Meher_Sudhakar_Abbireddi_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border hover:border-fg text-fg text-sm px-5 py-2.5 rounded-md transition-all hover:-translate-y-0.5"
              >
                <Download size={15} />
                Resume
              </a>
            </div>

            <div
              className={`mt-10 flex items-center gap-5 text-muted opacity-0 ${reveal}`}
            >
              <a
                href="https://github.com/Mehersudhakar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fg transition-all hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/meher-sudhakar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fg transition-all hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:msabbi2022@gmail.com"
                className="hover:text-fg transition-all hover:-translate-y-0.5"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <div
              className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl opacity-0 ${reveal}`}
            >
              {[
                { to: 3, suffix: "+", v: "years experience" },
                { to: 30, suffix: "+", v: "vulnerabilities surfaced" },
                { to: 4, suffix: "", v: "certifications" },
              ].map((s) => (
                <div key={s.v} className="border-l border-border pl-4">
                  <div className="text-2xl font-semibold text-fg">
                    <HexStat to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted font-mono mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
              <div className="border-l border-border pl-4">
                <div className="text-2xl font-semibold text-fg">M.Eng</div>
                <div className="text-xs text-muted font-mono mt-1">
                  UMD Cybersec
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-2 lg:pt-2">
            <div
              className={`relative max-w-[260px] sm:max-w-[320px] lg:max-w-[400px] mx-auto opacity-0 ${reveal}`}
            >
              <div className="relative aspect-[4/5] border border-border rounded-2xl overflow-hidden bg-panel/40 hero-photo-frame">
                <img
                  src="/profile.jpg"
                  alt="Meher Sudhakar Abbireddi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-10 opacity-0 ${reveal}`}
      >
        <a
          href="#about"
          aria-label="scroll to about"
          className="scroll-cue block text-muted hover:text-accent transition-colors"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
