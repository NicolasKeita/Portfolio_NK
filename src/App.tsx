'use client';

import { useEffect, useRef } from 'react';
import { FpsCounter } from './components/debug/FpsCounter';
import { LanguageProvider } from './context/LanguageContext';
import { LangSetter } from './components/shared/LangSetter';
import { SvgSprite } from './components/shared/SvgSprite';
import { Nav } from './components/layout/Nav';
import { ProfileSection } from './components/sections/ProfileSection';
import { SkillsMap } from './components/sections/SkillsMap';
import { Projects } from './components/sections/Projects';
import { FormationSection } from './components/sections/FormationSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { SiteConstellationLayer } from './components/ui/site-constellation-layer';

function App() {
  const isFirstRender = useRef(true);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) =>
              a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
            );
          }
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <LanguageProvider>
      <LangSetter />
      {process.env.NODE_ENV === 'development' && <FpsCounter />}
      <SvgSprite />
      <div className="relative z-0 min-h-screen">
        <SiteConstellationLayer />
        <div className="relative z-10">
          <Nav />
          <main id="main-content">
            <div className="relative z-20">
              <ProfileSection />
            </div>
            <section id="competences" className="relative">
              <SkillsMap />
            </section>
            <Projects />
            <FormationSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
