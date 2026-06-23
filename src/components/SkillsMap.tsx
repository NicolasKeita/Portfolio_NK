import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';
import { EvervaultCard } from './ui/evervault-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const easeOut = [0, 0, 0.2, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export function SkillsMapPreview() {
  const { lang } = useLanguage();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto p-4"
    >
      {skillsMap.map((skill) => {
        const proofText = lang === 'en' ? skill.proofEn : skill.proof;
        const labelText = lang === 'en' && skill.labelEn ? skill.labelEn : skill.label;

        return (
          <motion.div
            key={skill.id}
            variants={cardVariants}
            className="group relative flex flex-col items-start p-4 border border-white/[0.08] bg-black/20 dark:bg-black/40 backdrop-blur-md rounded-2xl transition-colors duration-300 hover:border-white/[0.15]"
          >
            {/* Evervault card area */}
            <div className="w-full h-48 relative flex items-center justify-center mb-4">
              <EvervaultCard
                text={labelText}
                icon={<SvgIcon id={skill.icon} className="w-8 h-8 stroke-white fill-none stroke-[1.8] drop-shadow-sm" />}
              />
            </div>

            {/* Proof text — fades in on group hover */}
            <div className="opacity-50 group-hover:opacity-100 transition-all duration-400 ease-out">
              <p className="text-xs text-slate-400 italic leading-relaxed">
                {proofText || "Preuve d'efficacité en cours de rédaction..."}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}