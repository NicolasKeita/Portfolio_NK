import { useRef, useEffect, useMemo, useCallback } from 'react';

type LayoutPosition = { x: number; y: number };

interface NebulaConstellationProps {
  skillIds: string[];
  layoutPositions?: Record<string, LayoutPosition>;
  activeId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  isCenterHovered: boolean;
  onCenterHover: (v: boolean) => void;
  centerLabel: string;
  centerSub?: string;
}

const STAR_COUNT = 96;
const MAX_W = 1400;

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

function generateStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * w * 1.1,
      y: (Math.random() - 0.5) * h * 1.1,
      size: 0.6 + Math.random() * 1.4,
      alpha: 0.15 + Math.random() * 0.6,
    });
  }
  return stars;
}

interface Veil {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
}

const VEILS: Veil[] = [
  { x: -0.42, y: 0.25, radius: 0.5, color: '14, 165, 233', alpha: 0.07 },
  { x: 0.44, y: -0.22, radius: 0.6, color: '99, 102, 241', alpha: 0.06 },
  { x: 0.02, y: 0.06, radius: 0.4, color: '34, 211, 238', alpha: 0.045 },
];

const COLORS_RGB = {
  star: '125, 211, 252',
  lineDim: '30, 58, 95',
  lineActive: '96, 165, 250',
  radialDim: '51, 65, 85',
  radialActive: '103, 232, 249',
  nodeDim: '147, 197, 253',
  nodeActive: '103, 232, 249',
  haloDim: '96, 165, 250',
  haloActive: '34, 211, 238',
  centerCore: '103, 232, 249',
  centerRing: '165, 180, 252',
  centerGlow: '34, 211, 238',
} as const;

function toRgba(rgb: string, alpha: number): string {
  return `rgba(${rgb},${alpha})`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function NebulaConstellation(props: NebulaConstellationProps) {
  const {
    skillIds,
    layoutPositions,
    activeId,
    hoveredId,
    isCenterHovered,
    centerLabel,
    centerSub,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dims = useRef({ w: 0, h: 0 });
  const stars = useRef<Star[]>([]);
  const veilGradients = useRef<CanvasGradient[] | null>(null);

  const skillPositions = useMemo(() => {
    return skillIds.map((id, i) => {
      const fallbackAngle = (i / skillIds.length) * Math.PI * 2;
      const fallback = {
        x: Math.cos(fallbackAngle) * 30,
        y: Math.sin(fallbackAngle) * 30,
      };
      const pos = layoutPositions?.[id] ?? fallback;
      return { x: pos.x, y: pos.y };
    });
  }, [skillIds, layoutPositions]);

  const toCanvas = useCallback((sx: number, sy: number): [number, number] => {
    const { w, h } = dims.current;
    return [((50 + sx) / 100) * w, ((50 + sy) / 100) * h];
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return false;

    const w = Math.min(canvas.parentElement.clientWidth, MAX_W);
    const h = canvas.parentElement.clientHeight;

    if (dims.current.w !== w || dims.current.h !== h) {
      dims.current = { w, h };
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      stars.current = generateStars(w, h);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        veilGradients.current = VEILS.map((veil) => {
          const vx = w / 2 + veil.x * w;
          const vy = h / 2 + veil.y * h;
          const vr = veil.radius * Math.max(w, h) * 0.5;
          const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
          grad.addColorStop(0, toRgba(veil.color, veil.alpha));
          grad.addColorStop(0.5, toRgba(veil.color, veil.alpha * 0.5));
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          return grad;
        });
      } else {
        veilGradients.current = null;
      }
      return true;
    }
    return false;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = dims.current;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const halfW = w / 2;
    const halfH = h / 2;
    const anyHL = isCenterHovered || hoveredId !== null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (veilGradients.current && veilGradients.current.length === VEILS.length) {
      for (let i = 0; i < VEILS.length; i++) {
        const veil = VEILS[i];
        const grad = veilGradients.current[i];
        const vx = halfW + veil.x * w;
        const vy = halfH + veil.y * h;
        const vr = veil.radius * Math.max(w, h) * 0.5;
        ctx.save();
        ctx.globalAlpha = anyHL ? 1.4 : 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(vx, vy, vr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (const star of stars.current) {
      ctx.fillStyle = toRgba(COLORS_RGB.star, star.alpha);
      ctx.beginPath();
      ctx.arc(halfW + star.x, halfH + star.y, star.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const [cx, cy] = toCanvas(0, 0);
    const centerActive = isCenterHovered || hoveredId !== null;
    const ringR = Math.min(w, h) * 0.012;

    const glowR = (centerActive ? 1.32 : 0.86) * Math.min(w, h) * 0.014;
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    glowGrad.addColorStop(0, toRgba(COLORS_RGB.centerGlow, centerActive ? 0.12 : 0.07));
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = toRgba(COLORS_RGB.centerRing, 0.42);
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
    ctx.stroke();

    const coreR = (centerActive ? 0.58 : 0.42) * Math.min(w, h) * 0.012;
    ctx.fillStyle = toRgba(COLORS_RGB.centerCore, centerActive ? 0.7 : 0.46);
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < skillIds.length; i++) {
      const id = skillIds[i];
      const [ex, ey] = toCanvas(skillPositions[i].x, skillPositions[i].y);
      const [nx, ny] = toCanvas(
        skillPositions[(i + 1) % skillIds.length].x,
        skillPositions[(i + 1) % skillIds.length].y
      );
      const hl = isCenterHovered || hoveredId === id || activeId === id;

      ctx.strokeStyle = toRgba(
        hl || activeId === skillIds[(i + 1) % skillIds.length]
          ? COLORS_RGB.lineActive
          : COLORS_RGB.lineDim,
        hl ? 0.3 : 0.1
      );
      ctx.lineWidth = hl ? 1.3 : 0.6;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      ctx.strokeStyle = toRgba(hl ? COLORS_RGB.radialActive : COLORS_RGB.radialDim, hl ? 0.76 : 0.17);
      ctx.lineWidth = hl ? 3.3 : 1.05;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      if (hl && activeId === id) {
        ctx.fillStyle = 'rgba(103, 232, 249, 0.92)';
        ctx.beginPath();
        ctx.arc(lerp(cx, ex, 0.62), lerp(cy, ey, 0.62), Math.min(w, h) * 0.003, 0, Math.PI * 2);
        ctx.fill();
      }

      const haloR = (hl ? 0.48 : 0.34) * Math.min(w, h) * 0.018;
      ctx.fillStyle = toRgba(hl ? COLORS_RGB.haloActive : COLORS_RGB.haloDim, hl ? 0.14 : 0.08);
      ctx.beginPath();
      ctx.arc(ex, ey, haloR, 0, Math.PI * 2);
      ctx.fill();

      const nodeR = (hl ? 0.22 : 0.16) * Math.min(w, h) * 0.018;
      ctx.fillStyle = toRgba(hl ? COLORS_RGB.nodeActive : COLORS_RGB.nodeDim, hl ? 0.86 : 0.48);
      ctx.beginPath();
      ctx.arc(ex, ey, nodeR, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = toRgba('255, 255, 255', centerActive ? 0.9 : 0.6);
    ctx.font = `bold ${Math.min(w, h) * 0.016}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerLabel, cx, cy + ringR + Math.min(w, h) * 0.015);

    if (centerSub) {
      ctx.fillStyle = toRgba('148, 163, 184', centerActive ? 0.7 : 0.5);
      ctx.font = `${Math.min(w, h) * 0.01}px system-ui, sans-serif`;
      ctx.fillText(centerSub, cx, cy + ringR + Math.min(w, h) * 0.033);
    }
  }, [skillIds, skillPositions, hoveredId, activeId, isCenterHovered, centerLabel, centerSub, toCanvas]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const onResize = () => {
      resize();
      draw();
    };

    resize();
    draw();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [resize, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
