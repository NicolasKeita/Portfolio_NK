"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { clsx } from "clsx";
import { ReactNode, useRef } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  asPanel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  "aria-label"?: string;
}

export function MagicCard({
  children,
  className = "",
  asPanel = false,
  onClick,
  "aria-label": ariaLabel,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!rectRef.current) return;

    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  };

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(34,211,238,0.06),
      transparent 40%
    )
  `;

  const panelStructure = clsx(
    "group",
    "relative",
    "rounded-2xl",
    "border",
    "border-white/10",
    "overflow-hidden"
  );

  const panelBackground = clsx(
    "bg-linear-to-br",
    "from-slate-900/80",
    "to-slate-800/50"
  );

  const panelShadow = clsx(
    "shadow-[0_24px_80px_rgba(0,0,0,0.26)]"
  );

  const panelBackdropBlur = clsx(
    "md:backdrop-blur-lg"
  );

  const panelBackdropWillChange = clsx(
    "md:will-change-backdrop-filter"
  );

  const cardStructure = clsx(
    "group",
    "relative",
    "rounded-xl",
    "border",
    "border-white/11",
    "overflow-hidden"
  );

  const cardBackground = clsx(
    "bg-linear-to-br",
    "from-slate-900/80",
    "to-bg-card-dark/50"
  );

  const cardShadow = clsx(
    "shadow-[0_18px_60px_rgba(2,6,23,0.32)]"
  );

  const cardInteraction = clsx(
    "cursor-pointer",
    "transition-all",
    "duration-300",
    "hover:-translate-y-1",
    "hover:border-cyan-400/45",
    "hover:shadow-[0_22px_80px_rgba(8,47,73,0.38),0_0_0_1px_rgba(34,211,238,0.08)]"
  );

  const baseClasses = asPanel
    ? clsx(
        panelStructure,
        panelBackground,
        panelShadow,
        // panelBackdropBlur,
        panelBackdropWillChange
      )
    : clsx(
        cardStructure,
        cardBackground,
        cardShadow,
        cardInteraction
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={clsx("magic-card", baseClasses, className)}
      {...(onClick && !asPanel
        ? {
            role: "button",
            tabIndex: 0,
            "aria-label": ariaLabel,
            onKeyDown: handleKeyDown,
          }
        : {})}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}

      {!asPanel && (
        <motion.div
          className={[
            "pointer-events-none",
            "absolute",
            "-inset-px",
            "scale-0",
            "origin-center",
            "transition-transform",
            "duration-500",
            "md:group-hover:scale-100",
            "will-change-transform",
          ].join(" ")}
          style={{ background: spotlightBackground }}
        />
      )}
    </motion.div>
  );
}
