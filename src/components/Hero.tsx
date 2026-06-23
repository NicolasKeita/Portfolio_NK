import { motion } from 'framer-motion';
import { SkillsMapPreview } from './SkillsMap';
import { useLanguage } from '../context/LanguageContext';
import photoProfil from '../assets/photo-profil.jpg';

const easeOut = [0, 0, 0.2, 1] as const;

const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay },
});

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero">
      <div className="max-w-[1100px] mx-auto px-8 py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center">
        <div className="w-full">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-8 mb-5">
              <motion.h1
                className="flex-1 min-w-0 font-display font-bold text-text-light dark:text-text-dark leading-[0.95] tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
                {...fadeSlideUp(0)}
              >
                Nicolas<br />Keita
              </motion.h1>
              <motion.div
                className="flex flex-col items-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
              >
                <div className="w-[210px] h-[210px] rounded-full border-[2.5px] border-dashed border-amber bg-bg-card-light dark:bg-bg-card-dark cursor-pointer overflow-hidden relative flex items-center justify-center transition-all duration-300 hover:border-blue hover:bg-blue/10 hover:shadow-[0_0_0_8px_rgba(59,130,246,0.2)] hover:scale-102">
                  <img src={photoProfil} alt="Nicolas Keita" className="w-full h-full object-cover absolute inset-0 rounded-full" />
                </div>
              </motion.div>
            </div>
            <motion.span
              className="inline-block font-display text-text-light dark:text-text-dark border-b-[3px] border-amber pb-[3px] mb-5"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
              {...fadeSlideUp(0.1)}
            >
              {t('hero.role')}
            </motion.span>
            <motion.p
              className="font-display font-semibold text-blue leading-snug max-w-[620px] mb-7 p-3 pl-4 border-l-4 border-amber bg-bg-card-light dark:bg-bg-card-dark rounded-r-lg"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)' }}
              {...fadeSlideUp(0.2)}
            >
              {t('hero.tagline')}
            </motion.p>
            <motion.div className="flex gap-3.5 flex-wrap mb-10" {...fadeSlideUp(0.3)}>
              <a href="#projets" className="inline-block px-7 py-3 rounded-lg font-display font-semibold text-sm no-underline tracking-wide border-2 border-blue bg-blue text-white shadow-[0_0_0_2px_rgba(59,130,246,0.2)] transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.3),0_8px_24px_rgba(59,130,246,0.25)] hover:-translate-y-0.5">
                {t('hero.cta.work')}
              </a>
              <a href="#contact" className="inline-block px-7 py-3 rounded-lg font-display font-semibold text-sm no-underline tracking-wide border-2 border-border-light dark:border-border-dark bg-transparent text-text-light dark:text-text-dark transition-all duration-300 hover:bg-bg-card-light dark:hover:bg-bg-card-dark/60 hover:border-blue hover:text-text-light dark:hover:text-white hover:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]">
                {t('hero.cta.contact')}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
            >
              <SkillsMapPreview />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}