import { useEffect, useRef } from "react";

const GRID = 48;

export function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const series = [
      { color: "45,212,191", amp: 0.09, freq: 0.0065, speed: 0.35, base: 0.62, phase: 0 },
      { color: "96,165,250", amp: 0.07, freq: 0.009, speed: 0.22, base: 0.74, phase: 2 },
    ];
    const bars = Array.from({ length: 28 }, (_, i) => ({ seed: i * 1.7, h: 0 }));
    const points = Array.from({ length: 36 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8,
      c: Math.random() > 0.5 ? "45,212,191" : "251,191,36",
    }));

    let t = 0;
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(148,163,184,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const barW = w / bars.length;
      bars.forEach((b, i) => {
        const target = (0.08 + 0.12 * (0.5 + 0.5 * Math.sin(b.seed + t * 0.004))) * h;
        b.h += (target - b.h) * 0.05;
        const g = ctx.createLinearGradient(0, h - b.h, 0, h);
        g.addColorStop(0, "rgba(96,165,250,0.10)");
        g.addColorStop(1, "rgba(96,165,250,0)");
        ctx.fillStyle = g;
        ctx.fillRect(i * barW + barW * 0.2, h - b.h, barW * 0.6, b.h);
      });

      series.forEach((s) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y =
            h *
            (s.base +
              s.amp * Math.sin(x * s.freq + t * s.speed * 0.02 + s.phase) +
              s.amp * 0.4 * Math.sin(x * s.freq * 2.3 + s.phase));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${s.color},0.35)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.7)`;
        ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(148,163,184,${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      t += 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (reduceMotion) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none opacity-70"
    />
  );
}
