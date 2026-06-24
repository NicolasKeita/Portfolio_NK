import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { contactItems } from '../data/portfolio';
import { MagicCard } from './ui/MagicCard';

export function ContactSection() {
  const { lang, t } = useLanguage();

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <section id="contact" className="py-16 px-8">
      <MagicCard asPanel className="max-w-[1100px] mx-auto p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">{t('contact.title')}</p>
            <h2
              className="font-display font-semibold text-white tracking-tight leading-tight mb-3.5"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}
            >
              {t('contact.tagline')}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('contact.sub1')}<br />
              {t('contact.sub2')}
            </p>
          </div>
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-3.5 m-0 p-0">
            {contactItems.map((item) => (
              <motion.li
                key={item.label}
                className="flex items-start gap-3"
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 3 }}
              >
                <div className="w-[34px] h-[34px] flex-shrink-0 flex items-center justify-center rounded-lg bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 transition-colors duration-200 hover:bg-cyan-400/20 hover:border-cyan-300/40">
                  <SvgIcon id={item.icon} className="w-[17px] h-[17px] stroke-current fill-none stroke-[1.75] stroke-linecap-round stroke-linejoin-round block" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                    {lang === 'en' && item.labelEn ? item.labelEn : item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-white no-underline hover:text-cyan-300 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-white">
                      {lang === 'en' && item.valueEn ? item.valueEn : item.value}
                      {item.sub && (
                        <><br /><span className="font-normal text-slate-500 text-xs">{lang === 'en' && item.subEn ? item.subEn : item.sub}</span></>
                      )}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </MagicCard>
    </section>
  );
}