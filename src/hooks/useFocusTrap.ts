import { useEffect, useRef, type RefObject } from 'react';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape: () => void,
): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelector =
      [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => el.tabIndex !== -1,
      );

    const focusFirstElement = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        container.focus();
      }
    };

    requestAnimationFrame(focusFirstElement);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, containerRef, onEscape]);
}
