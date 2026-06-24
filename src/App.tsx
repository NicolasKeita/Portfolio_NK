'use client';

import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
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
  const { theme, toggleTheme } = useTheme();

  // useEffect(() => {
  //   const sections = document.querySelectorAll('section[id]');
  //   const links = document.querySelectorAll('.nav-links a');
  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((e) => {
  //         if (e.isIntersecting) {
  //           links.forEach((a) =>
  //             a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
  //           );
  //         }
  //       });
  //     },
  //     { threshold: 0.45 }
  //   );
  //   sections.forEach((s) => io.observe(s));
  //   return () => io.disconnect();
  // }, []);

  return (
    <LanguageProvider>
      <SvgSprite />
      <div className="relative z-0 min-h-screen">
        {/* <SiteConstellationLayer /> */}
        <div className="relative z-10">
          <Nav theme={theme} onToggleTheme={toggleTheme} />
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
