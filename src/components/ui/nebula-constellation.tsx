import { useRef, useEffect, useMemo, useCallback } from 'react';
import type { Skill } from '../../types';

/* ─── Types ─── */
type LayoutPosition = { x: number; y: number };

interface NebulaConstellationProps {
  skills: Skill[];
  layoutPositions?: Record<string, LayoutPosition>;
  activeId: string | null;
  hoveredId: string | null;
  onSelect: (skill: Skill) => void;
  onHover: (id: string | null) => void;
  isCenterHovered: boolean;
  onCenterHover: (v: boolean) => void;
  centerLabel: string;
  centerSub?: string;
}

/* ─── Constantes ─── */
const STAR_COUNT = 133;
const MAX_W = 1400;

/* ─── Génération des étoiles ─── */
interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

function generateStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * w * 1.1,
      y: (Math.random() - 0.5) * h * 1.1,
      size: 0.6 + Math.random() * 1.4,
      alpha: 0.2 + Math.random() * 0.8,
      twinkleSpeed: 0.5 + Math.random() * 2.5,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }
  return stars;
}

/* ─── Nébuleuse (veils) ─── */
interface Veil {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
}

const VEILS: Veil[] = [
  { x: -0.42, y: 0.25, radius: 0.5, color: '#0ea5e9', alpha: 0.07 },
  { x: 0.44, y: -0.22, radius: 0.6, color: '#6366f1', alpha: 0.06 },
  { x: 0.02, y: 0.06, radius: 0.4, color: '#22d3ee', alpha: 0.045 },
];

/* ─── Couleurs ─── */
const COLORS = {
  star: '#7dd3fc',
  lineDim: '#1e3a5f',
  lineActive: '#60a5fa',
  radialDim: '#334155',
  radialActive: '#67e8f9',
  nodeDim: '#93c5fd',
  nodeActive: '#67e8f9',
  haloDim: '#60a5fa',
  haloActive: '#22d3ee',
  centerCore: '#67e8f9',
  centerRing: '#a5b4fc',
  centerGlow: '#22d3ee',
} as const;

/* ─── Utilitaires ─── */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ─── Composant principal ─── */
export function NebulaConstellation(props: NebulaConstellationProps) {
  const {
    skills,
    layoutPositions,
    activeId,
    hoveredId,
    isCenterHovered,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dims = useRef({ w: 0, h: 0 });
  const stars = useRef<Star[]>([]);
  const frameId = useRef(0);

  /* Positions des skills en coordonnées relatives */
  const skillPositions = useMemo(() => {
    return skills.map((skill, i) => {
      const fallbackAngle = (i / skills.length) * Math.PI * 2;
      const fallback = {
        x: Math.cos(fallbackAngle) * 30,
        y: Math.sin(fallbackAngle) * 30,
      };
      const pos = layoutPositions?.[skill.id] ?? fallback;
      return { x: pos.x, y: pos.y };
    });
  }, [skills, layoutPositions]);

  /* Conversion coordonnées relatives → pixels canvas
     Doit correspondre au positionnement CSS : left: calc(50 + x)%, top: calc(50 + y)% */
  const toCanvas = useCallback((sx: number, sy: number): [number, number] => {
    const { w, h } = dims.current;
    return [((50 + sx) / 100) * w, ((50 + sy) / 100) * h];
  }, []);

  /* Redimensionnement du canvas */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const w = Math.min(canvas.parentElement.clientWidth, MAX_W);
    const h = Math.max(canvas.parentElement.clientHeight, 760);

    if (dims.current.w !== w || dims.current.h !== h) {
      dims.current = { w, h };
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      stars.current = generateStars(w, h);
      return true;
    }
    return false;
  }, []);

  /* Boucle de rendu */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = dims.current;
    const dpr = devicePixelRatio;
    const halfW = w / 2;
    const halfH = h / 2;
    const anyHL = isCenterHovered || hoveredId !== null;
    const now = performance.now() / 1000;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    /* ─── 1. Voiles de nébuleuse ─── */
    for (const veil of VEILS) {
      const vx = halfW + veil.x * w;
      const vy = halfH + veil.y * h;
      const vr = veil.radius * Math.max(w, h) * 0.5;
      const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
      const a = veil.alpha * (anyHL ? 1.4 : 1);
      grad.addColorStop(0, hexToRgba(veil.color, a));
      grad.addColorStop(0.5, hexToRgba(veil.color, a * 0.5));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(vx, vy, vr, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ─── 2. Étoiles scintillantes ─── */
    for (const star of stars.current) {
      const twinkle = Math.sin(now * star.twinkleSpeed + star.twinkleOffset);
      const a = star.alpha * (0.5 + 0.5 * twinkle);
      ctx.fillStyle = hexToRgba(COLORS.star, a);
      ctx.beginPath();
      ctx.arc(halfW + star.x, halfH + star.y, star.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ─── 3. Centre ─── */
    const [cx, cy] = toCanvas(0, 0);
    const centerActive = isCenterHovered || hoveredId !== null;
    const ringR = Math.min(w, h) * 0.012;

    // Glow externe
    const glowR = (centerActive ? 1.32 : 0.86) * Math.min(w, h) * 0.014;
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    glowGrad.addColorStop(0, hexToRgba(COLORS.centerGlow, centerActive ? 0.12 : 0.07));
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Anneau
    ctx.strokeStyle = hexToRgba(COLORS.centerRing, 0.42);
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
    ctx.stroke();

    // Noyau central
    const coreR = (centerActive ? 0.58 : 0.42) * Math.min(w, h) * 0.012;
    ctx.fillStyle = hexToRgba(COLORS.centerCore, centerActive ? 0.7 : 0.46);
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    /* ─── 4. Lignes + nœuds ─── */
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const [ex, ey] = toCanvas(skillPositions[i].x, skillPositions[i].y);
      const [nx, ny] = toCanvas(
        skillPositions[(i + 1) % skills.length].x,
        skillPositions[(i + 1) % skills.length].y
      );
      const hl = isCenterHovered || hoveredId === skill.id || activeId === skill.id;

      // Ligne entre nœuds adjacents
      ctx.strokeStyle = hexToRgba(
        hl || activeId === skills[(i + 1) % skills.length].id
          ? COLORS.lineActive
          : COLORS.lineDim,
        hl ? 0.3 : 0.1
      );
      ctx.lineWidth = hl ? 1.3 : 0.6;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      // Ligne radiale (centre → nœud)
      ctx.strokeStyle = hexToRgba(hl ? COLORS.radialActive : COLORS.radialDim, hl ? 0.76 : 0.17);
      ctx.lineWidth = hl ? 3.3 : 1.05;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      // Signal dot
      if (hl && activeId === skill.id) {
        ctx.fillStyle = hexToRgba('#67e8f9', 0.92);
        ctx.beginPath();
        ctx.arc(lerp(cx, ex, 0.62), lerp(cy, ey, 0.62), Math.min(w, h) * 0.003, 0, Math.PI * 2);
        ctx.fill();
      }

      // Halo du nœud
      const haloR = (hl ? 0.48 : 0.34) * Math.min(w, h) * 0.018;
      ctx.fillStyle = hexToRgba(hl ? COLORS.haloActive : COLORS.haloDim, hl ? 0.14 : 0.08);
      ctx.beginPath();
      ctx.arc(ex, ey, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Point du nœud
      const nodeR = (hl ? 0.22 : 0.16) * Math.min(w, h) * 0.018;
      ctx.fillStyle = hexToRgba(hl ? COLORS.nodeActive : COLORS.nodeDim, hl ? 0.86 : 0.48);
      ctx.beginPath();
      ctx.arc(ex, ey, nodeR, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ─── 5. Label du centre ─── */
    ctx.fillStyle = hexToRgba('#ffffff', centerActive ? 0.9 : 0.6);
    ctx.font = `bold ${Math.min(w, h) * 0.016}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(props.centerLabel, cx, cy + ringR + Math.min(w, h) * 0.015);

    if (props.centerSub) {
      ctx.fillStyle = hexToRgba('#94a3b8', centerActive ? 0.7 : 0.5);
      ctx.font = `${Math.min(w, h) * 0.01}px system-ui, sans-serif`;
      ctx.fillText(props.centerSub, cx, cy + ringR + Math.min(w, h) * 0.033);
    }

    // Continue l'animation
    frameId.current = requestAnimationFrame(render);
  }, [skills, skillPositions, hoveredId, activeId, isCenterHovered, toCanvas, props.centerLabel, props.centerSub]);

  /* ─── Mount / resize ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      resize();
    };

    resize();
    frameId.current = requestAnimationFrame(render);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener('resize', onResize);
    };
  }, [resize, render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 760,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}