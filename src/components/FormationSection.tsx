import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { formations } from '../data/portfolio';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function FormationSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="formation" className="py-14 px-8 bg-bg-dark-light dark:bg-bg-dark-dark border-t border-b border-border-light dark:border-border-dark">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">{t('formation.label')}</p>
        <h2 className="font-display font-bold text-text-light dark:text-text-dark tracking-tight leading-tight mb-0" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
          {t('formation.title')}
        </h2>
        <motion.div
          className="list-none"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {formations.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="py-7 border-b border-border-light dark:border-border-dark last:border-b-0"
            >
              <div className="font-display font-semibold text-lg text-text-light dark:text-text-dark mb-1">
                {lang === 'en' && f.titleEn ? f.titleEn : f.title}
              </div>
              <div className="text-sm text-text-soft-light dark:text-text-soft-dark mb-2">
                {f.org}
              </div>
              <div className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                {lang === 'en' && f.descEn ? f.descEn : f.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}