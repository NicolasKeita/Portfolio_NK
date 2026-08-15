import { useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { css } from '../../../styled-system/css';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const styles = {
  overlay: css({
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    bg: 'rgba(0,0,0,0.78)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  panel: css({
    position: 'relative',
    rounded: 'xl',
    maxW: '2xl',
    w: '91.666667%',
    maxH: '90vh',
    overflowY: 'auto',
    p: '8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    bg: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.5))',
    boxShadow: '0 24px 80px rgba(0,0,0,0.26)',
    backdropFilter: 'blur(24px)',
  }),
  closeButton: css({
    position: 'absolute',
    top: '4',
    right: '4',
    bg: 'transparent',
    borderWidth: 0,
    fontSize: '2xl',
    cursor: 'pointer',
    color: 'slate.400',
    w: '8',
    h: '8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: 'full',
    transition: 'color 150ms ease, background-color 150ms ease',
    _hover: {
      bg: 'rgba(255,255,255,0.06)',
      color: 'white',
    },
  }),
  title: css({
    fontFamily: 'display',
    fontSize: '2xl',
    fontWeight: 'bold',
    color: 'white',
    mb: '4',
  }),
};

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
        className={styles.overlay}
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
          className={styles.panel}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          tabIndex={-1}
        >
          <button
            className={styles.closeButton}
            aria-label={t('modal.close')}
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className={styles.title}>{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
