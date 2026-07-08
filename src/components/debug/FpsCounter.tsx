'use client';

import { useEffect, useRef, useState } from 'react';

export function FpsCounter() {
  const [fps, setFps] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    function loop(now: number) {
      frames++;
      if (now - lastTime >= 1000) {
        setFps(frames);
        frames = 0;
        lastTime = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 99999,
        background: '#000',
        color: '#0f0',
        padding: '8px 12px',
        font: '14px monospace',
        borderRadius: 6,
      }}
    >
      {fps} FPS
    </div>
  );
}
