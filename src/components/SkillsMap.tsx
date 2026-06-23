import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';

const easeOut = [0, 0, 0.2, 1] as const;

const pinVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut, delay: i * 0.05 },
  }),
};

export function SkillsMapPreview() {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-5 my-3">
      {skillsMap.map((skill, i) => (
        <motion.div
          key={skill.id}
          custom={i}
          variants={pinVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -3, scale: 1.1, transition: { duration: 0.2 } }}
          className="flex flex-col items-center cursor-default"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 ${
              skill.accent
                ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-amber-500/30'
                : 'bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 shadow-blue-500/30'
            }`}
          >
            <SvgIcon id={skill.icon} className="w-5 h-5 stroke-white fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round drop-shadow-sm" />
          </div>
          <span className="font-display text-xs font-semibold text-text-light dark:text-text-dark text-center mt-2 max-w-[80px] leading-tight">
            {lang === 'en' && skill.labelEn ? skill.labelEn : skill.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}