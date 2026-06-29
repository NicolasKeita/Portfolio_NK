"use client";

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { clsx } from 'clsx';
import { ReactNode, useRef } from 'react';

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  asPanel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function MagicCard({ children, className = '', asPanel = false, onClick }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  };

  const spotlightBackground = useMotionTemplate`
    radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.06), transparent 40%)
  `;

  const baseClasses = asPanel
    ? clsx(
        'group relative rounded-2xl border border-white/10',
        'bg-gradient-to-br from-slate-900/80 to-slate-800/50',
        'shadow-[0_24px_80px_rgba(0,0,0,0.26)] md:backdrop-blur-lg overflow-hidden md:will-change-backdrop-filter'
      )
    : clsx(
        'group relative rounded-xl border border-white/[0.11]',
        'bg-gradient-to-br from-slate-900/80 to-[#141d33]/50',
        'shadow-[0_18px_60px_rgba(2,6,23,0.32)] overflow-hidden',
        'cursor-pointer transition-all duration-300 hover:-translate-y-1',
        'hover:border-cyan-400/45',
        'hover:shadow-[0_22px_80px_rgba(8,47,73,0.38),0_0_0_1px_rgba(34,211,238,0.08)]'
      );

  return (
    <motion.div
      ref={cardRef}
      className={clsx('magic-card', baseClasses, className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
      
      {!asPanel && (
        <motion.div
          className="pointer-events-none absolute -inset-px scale-0 origin-center transition-transform duration-500 md:group-hover:scale-100 will-change-transform"
          style={{ background: spotlightBackground }}
        />
      )}
    </motion.div>
  );
}