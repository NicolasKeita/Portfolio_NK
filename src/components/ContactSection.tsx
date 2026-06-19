import { SvgIcon } from './SvgSprite';
import { contactItems } from '../data/portfolio';

export function ContactSection() {
  return (
    <section id="contact" className="sec contact-sec">
      <div className="sec-inner">
        <div className="contact-grid">
          <div>
            <p className="sec-label">Contact</p>
            <h2 className="contact-tagline">Prêt à relever<br />de nouveaux défis.</h2>
            <p className="contact-sub">
              Disponible pour des postes en CDI, CDD ou contrat public.<br />
              N'hésitez pas à me contacter pour discuter de votre besoin.
            </p>
          </div>
          <ul className="contact-list">
            {contactItems.map((item) => (
              <li key={item.label} className="c-item">
                <div className="c-icon">
                  <SvgIcon id={item.icon} className="icon-sm" />
                </div>
                <div>
                  <div className="c-label">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="c-value">{item.value}</a>
                  ) : (
                    <span className="c-value">
                      {item.value}
                      {item.sub && (
                        <><br /><span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '0.75rem' }}>{item.sub}</span></>
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