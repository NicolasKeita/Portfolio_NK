import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { contactItems } from '../data/portfolio';

export function ContactSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="sec contact-sec">
      <div className="sec-inner">
        <div className="contact-grid">
          <div>
            <p className="sec-label">{t('contact.title')}</p>
            <h2 className="contact-tagline">{t('contact.tagline')}</h2>
            <p className="contact-sub">
              {t('contact.sub1')}<br />
              {t('contact.sub2')}
            </p>
          </div>
          <ul className="contact-list">
            {contactItems.map((item) => (
              <li key={item.label} className="c-item">
                <div className="c-icon">
                  <SvgIcon id={item.icon} className="icon-sm" />
                </div>
                <div>
                  <div className="c-label">{lang === 'en' && item.labelEn ? item.labelEn : item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="c-value">{item.value}</a>
                  ) : (
                    <span className="c-value">
                      {lang === 'en' && item.valueEn ? item.valueEn : item.value}
                      {item.sub && (
                        <><br /><span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '0.75rem' }}>{lang === 'en' && item.subEn ? item.subEn : item.sub}</span></>
                      )}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
