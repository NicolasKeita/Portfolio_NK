"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ComponentProps, ReactNode, useRef } from "react";
import { css, cx } from "../../../styled-system/css";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  asPanel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  "aria-label"?: string;
}

const styles = {
  panel: css({
    position: 'relative',
    rounded: '2xl',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    bg: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.5))',
    boxShadow: '0 24px 80px rgba(0,0,0,0.26)',
    md: {
      willChange: 'backdrop-filter',
    },
  }),

  card: css({
    position: 'relative',
    rounded: 'xl',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.11)',
    overflow: 'hidden',
    bg: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(20,29,51,0.5))',
    boxShadow: '0 18px 60px rgba(2,6,23,0.32)',
    cursor: 'pointer',
    transition: 'all 300ms ease',
    _hover: {
      transform: 'translateY(-4px)',
      borderColor: 'rgba(34,211,238,0.45)',
      boxShadow: '0 22px 80px rgba(8,47,73,0.38), 0 0 0 1px rgba(34,211,238,0.08)',
    },
  }),

  spotlight: css({
    pointerEvents: 'none',
    position: 'absolute',
    inset: '-1px',
    transform: 'scale(0)',
    transformOrigin: 'center',
    transition: 'transform 500ms ease',
    willChange: 'transform',
    md: {
      _groupHover: {
        transform: 'scale(1)',
      },
    },
  }),
};

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

  const baseClasses = asPanel ? styles.panel : styles.card;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent);
    }
  };

  const interactiveProps: ComponentProps<typeof motion.div> = {};

  if (onClick && !asPanel) {
    Object.assign(interactiveProps, {
      role: "button",
      tabIndex: 0,
      "aria-label": ariaLabel,
      onKeyDown: handleKeyDown,
    });
  }

  return (
    <motion.div
      ref={cardRef}
      className={cx("magic-card", "group", baseClasses, className)}
      {...interactiveProps}
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
          className={styles.spotlight}
          style={{ background: spotlightBackground }}
        />
      )}
    </motion.div>
  );
}
