import { formations } from '../data/portfolio';

export function FormationSection() {
  return (
    <section id="formation" className="sec formation-sec">
      <div className="sec-inner">
        <p className="sec-label">Parcours Académique</p>
        <h2 className="sec-title" style={{ marginBottom: '0' }}>Formation</h2>
        <div className="formation-list">
          {formations.map((f, i) => (
            <div key={i} className="formation-item">
              <div className="formation-title">{f.title}</div>
              <div className="formation-org">{f.org}</div>
              <div className="formation-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}