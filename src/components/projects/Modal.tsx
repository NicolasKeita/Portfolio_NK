import { useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  const { t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, true, onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/78 backdrop-blur-xs flex items-center justify-center"
        ref={overlayRef}
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <motion.div
          ref={panelRef}
          className={`
            relative rounded-xl max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto p-8
            border border-white/10 bg-linear-to-br from-slate-900/80 to-slate-800/50
            shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          tabIndex={-1}
        >
          <button
            className={`
              absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer
              text-slate-400 w-8 h-8 flex items-center justify-center rounded-full
              hover:bg-white/6 hover:text-white transition-colors
            `}
            aria-label={t('modal.close')}
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-display text-2xl font-bold text-white mb-4">{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
