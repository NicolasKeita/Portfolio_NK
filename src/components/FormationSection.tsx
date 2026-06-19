import { useLanguage } from '../context/LanguageContext';
import { formations } from '../data/portfolio';

export function FormationSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="formation" className="sec formation-sec">
      <div className="sec-inner">
        <p className="sec-label">{t('formation.label')}</p>
        <h2 className="sec-title" style={{ marginBottom: '0' }}>{t('formation.title')}</h2>
        <div className="formation-list">
          {formations.map((f, i) => (
            <div key={i} className="formation-item">
              <div className="formation-title">{lang === 'en' && f.titleEn ? f.titleEn : f.title}</div>
              <div className="formation-org">{f.org}</div>
              <div className="formation-desc">{lang === 'en' && f.descEn ? f.descEn : f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
