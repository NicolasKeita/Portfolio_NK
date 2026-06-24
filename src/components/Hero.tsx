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
    <section
      id="hero"
      className="overflow-hidden relative isolate before:content-[''] before:absolute before:inset-0 before:-z-10 before:pointer-events-none before:bg-[linear-gradient(90deg,rgba(34,211,238,0.04),transparent_28%,transparent_72%,rgba(167,139,250,0.04)),linear-gradient(180deg,rgba(5,8,22,0.12),rgba(5,8,22,0.36))]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center">
        <div className="w-full">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-8 mb-5">
              <motion.h1
                className="flex-1 min-w-0 font-display font-bold text-white leading-[0.95] tracking-tighter drop-shadow-[0_0_34px_rgba(34,211,238,0.16)]"
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
                <div className="w-[210px] h-[210px] rounded-full border-[2.5px] border-dashed border-amber bg-slate-950/70 cursor-pointer overflow-hidden relative flex items-center justify-center transition-all duration-300 shadow-[0_0_48px_rgba(34,211,238,0.18)] hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_0_8px_rgba(34,211,238,0.16),0_0_70px_rgba(34,211,238,0.24)] hover:scale-102">
                  <img src={photoProfil.src} alt="Nicolas Keita" className="w-full h-full object-cover absolute inset-0 rounded-full" />
                </div>
              </motion.div>
            </div>
            <motion.span
              className="inline-block font-display text-slate-100 border-b-[3px] border-amber pb-[3px] mb-5"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
              {...fadeSlideUp(0.1)}
            >
              {t('hero.role')}
            </motion.span>
            <motion.p
              className="font-display font-semibold text-cyan-200 leading-snug max-w-[620px] mb-7 p-3 pl-4 border-l-4 border-amber bg-slate-950/45 backdrop-blur-xl rounded-r-lg shadow-[0_12px_45px_rgba(2,6,23,0.24)]"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)' }}
              {...fadeSlideUp(0.2)}
            >
              {t('hero.tagline')}
            </motion.p>
            <motion.div className="flex gap-3.5 flex-wrap mb-10" {...fadeSlideUp(0.3)}>
              <a href="#projets" className="inline-block px-7 py-3 rounded-lg font-display font-semibold text-sm no-underline tracking-wide border-2 border-cyan-400/70 bg-cyan-500/90 text-slate-950 shadow-[0_0_0_2px_rgba(34,211,238,0.18),0_10px_32px_rgba(34,211,238,0.22)] transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.22),0_8px_30px_rgba(34,211,238,0.3)] hover:-translate-y-0.5">
                {t('hero.cta.work')}
              </a>
              <a href="#contact" className="inline-block px-7 py-3 rounded-lg font-display font-semibold text-sm no-underline tracking-wide border-2 border-white/12 bg-white/[0.03] text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan-300/60 hover:text-white hover:shadow-[0_0_0_2px_rgba(34,211,238,0.12)]">
                {t('hero.cta.contact')}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
            >
            {/*<SkillsMapPreview />*/}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
