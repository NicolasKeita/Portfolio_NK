'use client';

import { useEffect, useRef } from 'react';

const nodes = [
  { x: 9, y: 6, r: 1.1 },
  { x: 23, y: 11, r: 0.8 },
  { x: 39, y: 7, r: 1.4 },
  { x: 74, y: 9, r: 1.0 },
  { x: 88, y: 16, r: 0.9 },
  { x: 14, y: 26, r: 1.0 },
  { x: 31, y: 31, r: 0.75 },
  { x: 54, y: 24, r: 1.25 },
  { x: 79, y: 32, r: 0.95 },
  { x: 92, y: 39, r: 1.25 },
  { x: 8, y: 48, r: 0.8 },
  { x: 26, y: 54, r: 1.15 },
  { x: 46, y: 47, r: 0.9 },
  { x: 67, y: 56, r: 1.35 },
  { x: 84, y: 51, r: 0.85 },
  { x: 17, y: 70, r: 1.35 },
  { x: 36, y: 75, r: 0.85 },
  { x: 57, y: 69, r: 1.05 },
  { x: 73, y: 78, r: 0.9 },
  { x: 91, y: 72, r: 1.2 },
  { x: 11, y: 91, r: 0.95 },
  { x: 28, y: 86, r: 1.15 },
  { x: 51, y: 92, r: 0.8 },
  { x: 69, y: 88, r: 1.25 },
  { x: 89, y: 94, r: 0.9 },
];

const links = [
  [0, 1], [1, 2], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [10, 11], [11, 12], [12, 13], [13, 14],
  [15, 16], [16, 17], [17, 18], [18, 19],
  [20, 21], [21, 22], [22, 23], [23, 24],
  [2, 7], [7, 12], [12, 17], [17, 22],
  [4, 9], [9, 14], [14, 19], [19, 24],
] as const;

const clouds = [
  'left-[1%] top-[8%] h-[34rem] w-[34rem] bg-cyan-400/10',
  'right-[-6%] top-[27%] h-[42rem] w-[42rem] bg-indigo-500/10',
  'left-[8%] top-[54%] h-[38rem] w-[38rem] bg-sky-500/9',
  'right-[7%] top-[78%] h-[34rem] w-[34rem] bg-violet-500/8',
];

const NODE_COLORS = ['#67e8f9', '#93c5fd', '#c4b5fd'] as const;
const NODE_OPACITIES = [0.42, 0.24] as const;

export function SiteConstellationLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, document.documentElement.scrollHeight);
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Draw links
      for (let i = 0; i < links.length; i++) {
        const [a, b] = links[i];
        const x1 = (nodes[a].x / 100) * w;
        const y1 = (nodes[a].y / 100) * h;
        const x2 = (nodes[b].x / 100) * w;
        const y2 = (nodes[b].y / 100) * h;

        // Vary link opacity to match SVG gradient feel
        const alpha = i % 4 === 0 ? 0.18 : 0.10;
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw nodes with glow
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = (n.x / 100) * w;
        const cy = (n.y / 100) * h;
        const color = NODE_COLORS[i % 3];
        const opacity = NODE_OPACITIES[i % 2];

        // Glow effect using radial gradient (replaces SVG feGaussianBlur)
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r * 4);
        glowGrad.addColorStop(0, color + '30');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = color + Math.round(opacity * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        //ctx.arc(cx, cy, n.r, 0, Math.PI * 2);
        const wv = window.innerWidth;
        const hv = window.innerHeight;
        const scale = Math.min(wv, hv) / 100;
        const nodeSize = scale * 3;
        ctx.arc(cx, cy, n.r * nodeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener('resize', draw);

    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {clouds.map((className) => (
        <div
          key={className}
          className={`absolute rounded-full blur-3xl ${className}`}
        />
      ))}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}