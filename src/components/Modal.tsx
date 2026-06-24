import { useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  const { t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/78 backdrop-blur-sm flex items-center justify-center"
        ref={overlayRef}
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="relative rounded-xl max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto p-8 border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <button
            className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-slate-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] hover:text-white transition-colors"
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
