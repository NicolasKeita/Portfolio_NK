import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EvervaultCardProps {
  text: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * EvervaultCard — A card inspired by Aceternity UI's Evervault effect.
 * On hover, a matrix rain of cryptographic characters falls in the background,
 * and a spotlight follows the cursor.
 */
export function EvervaultCard({ text, icon, className }: EvervaultCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // ── spotlight effect ──
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // ── matrix rain on canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let drops: number[] = [];

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      const cols = Math.floor(canvas.width / 14);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -canvas.height / 16));
    };
    resize();
    window.addEventListener('resize', resize);

    const charSet = 'アァイゥエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw rain if hovered (fade in/out)
      const alpha = isHovered ? 0.5 : 0;
      ctx.fillStyle = `rgba(0, 255, 200, ${alpha})`;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charSet[Math.floor(Math.random() * charSet.length)];
        ctx.fillText(char, i * 16, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
      onPointerMove={handlePointerMove}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30 backdrop-blur-sm group cursor-default ${className ?? ''}`}
      style={{ perspective: '600px' }}
    >
      {/* Canvas for matrix rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 200, 0.08), transparent 60%)`,
        }}
      />

      {/* Center content */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center gap-2"
      >
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <span className="font-display text-sm font-semibold text-white/80 tracking-wide text-center px-2">
          {text}
        </span>
      </motion.div>

      {/* Subtle border glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: `0 0 30px rgba(0, 255, 200, 0.1), inset 0 0 30px rgba(0, 255, 200, 0.03)`,
        }}
      />
    </div>
  );
}