"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based falling-character rain.
 * Characters lean toward binary / hex / a few security glyphs so the feel is
 * "decrypting packets", not anime.
 */
export default function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const chars = "01 01 01 1f0a 0x7f a3 b8 2a cf e4 77 1d 80 c2".split(" ");
    let width = 0;
    let height = 0;
    const fontSize = 13;
    let columns = 0;
    let drops: number[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const frameMs = 55; // throttled for CPU + subtlety

    const readTrail = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--rain-trail")
        .trim() || "rgba(10, 10, 11, 0.16)";
    let trail = readTrail();
    const onTheme = () => {
      trail = readTrail();
    };
    window.addEventListener("themechange", onTheme);

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < frameMs) return;
      last = t;

      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, Menlo, monospace`;
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i];
        const glow = Math.random() > 0.97;
        ctx.fillStyle = glow
          ? "rgba(239, 68, 68, 0.95)"
          : "rgba(239, 68, 68, 0.55)";
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] = y + fontSize;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return <canvas ref={ref} className="binary-rain" aria-hidden />;
}
