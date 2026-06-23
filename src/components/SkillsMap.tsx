import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

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
    <div className="flex flex-wrap gap-5 justify-center my-3">
      {skillsMap.map((skill, i) => (
        <HoverCard key={skill.id} openDelay={100} closeDelay={100}>
          <motion.div
            custom={i}
            variants={pinVariants}
            initial="hidden"
            animate="visible"
          >
            <HoverCardTrigger asChild>
              <button
                className={`group relative flex flex-col items-center cursor-default rounded-full p-3 transition-all duration-300 hover:scale-110 ${
                  skill.accent
                    ? 'bg-gradient-to-br from-amber-300/20 via-amber-500/20 to-amber-700/20 hover:shadow-lg hover:shadow-amber-500/30'
                    : 'bg-gradient-to-br from-blue-300/20 via-blue-500/20 to-blue-700/20 hover:shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg ${
                    skill.accent
                      ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-amber-500/30'
                      : 'bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 shadow-blue-500/30'
                  }`}
                >
                  <SvgIcon
                    id={skill.icon}
                    className="w-5 h-5 stroke-white fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round drop-shadow-sm"
                  />
                </div>
                <span className="font-display text-xs font-semibold text-text-light dark:text-text-dark text-center mt-2 max-w-[80px] leading-tight">
                  {lang === 'en' && skill.labelEn ? skill.labelEn : skill.label}
                </span>
              </button>
            </HoverCardTrigger>
          </motion.div>

          <HoverCardContent side="top" align="center">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  skill.accent
                    ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700'
                    : 'bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700'
                }`}
              >
                <SvgIcon
                  id={skill.icon}
                  className="w-4 h-4 stroke-white fill-none stroke-[1.8]"
                />
              </div>
              <h4 className="text-sm font-bold">
                {lang === 'en' && skill.labelEn ? skill.labelEn : skill.label}
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'en' && skill.proofEn ? skill.proofEn : skill.proof}
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}