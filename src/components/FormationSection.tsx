import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { formations } from '../data/portfolio';
import { MagicCard } from './ui/MagicCard';

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
    <section id="formation" className="py-16 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">{t('formation.label')}</p>
        <h2
          className={[
            'font-display font-bold text-white tracking-tight leading-tight mb-0',
            'drop-shadow-[0_0_28px_rgba(167,139,250,0.12)]',
          ].join(' ')}
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
        >
          {t('formation.title')}
        </h2>
        <MagicCard asPanel className="list-none mt-8 px-5 sm:px-7">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          {formations.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              className="py-7 border-b border-white/10 last:border-b-0"
            >
              <div className="font-display font-semibold text-lg text-white mb-1">
                {lang === 'en' && f.titleEn ? f.titleEn : f.title}
              </div>
              <div className="text-sm text-cyan-200/80 mb-2">
                {f.org}
              </div>
              <div className="text-sm text-slate-400 leading-relaxed">
                {lang === 'en' && f.descEn ? f.descEn : f.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
        </MagicCard>
      </div>
    </section>
  );
}
