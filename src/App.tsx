'use client';

import { useEffect, useRef } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SvgSprite } from './components/SvgSprite';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { FormationSection } from './components/FormationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
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
      // Désactiver le scroll restoration du navigateur
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Forcer le scroll en haut de la page au chargement initial
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <LanguageProvider>
      <SvgSprite />
      <div className="relative z-0 min-h-screen">
        <SiteConstellationLayer />
        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
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