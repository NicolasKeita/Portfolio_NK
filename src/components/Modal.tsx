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
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        ref={overlayRef}
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="bg-bg-card-light dark:bg-bg-card-dark border border-border-light dark:border-border-dark rounded-xl max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto p-8 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <button
            className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-muted-light dark:text-muted-dark w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-dark-light dark:hover:bg-bg-dark-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
            aria-label={t('modal.close')}
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark mb-4">{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}