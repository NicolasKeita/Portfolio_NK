"use client";

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  asPanel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function MagicCard({ children, className = '', asPanel = false, onClick }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  const baseClasses = asPanel
    ? [
        'group relative rounded-2xl border border-white/10',
        'bg-gradient-to-br from-slate-900/80 to-slate-800/50',
        'shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl overflow-hidden',
      ].join(' ')
    : [
        'group relative rounded-xl border border-white/[0.11]',
        'bg-gradient-to-br from-slate-900/80 to-[#141d33]/50',
        'shadow-[0_18px_60px_rgba(2,6,23,0.32)] overflow-hidden',
        'cursor-pointer transition-all duration-300 hover:-translate-y-1',
        'hover:border-cyan-400/45',
        'hover:shadow-[0_22px_80px_rgba(8,47,73,0.38),0_0_0_1px_rgba(34,211,238,0.08)]',
      ].join(' ');

  return (
    <motion.div
      ref={cardRef}
      className={`magic-card ${baseClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.06), transparent 40%)`,
        }}
      />
    </motion.div>
  );
}