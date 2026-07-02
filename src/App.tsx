'use client';

import { useEffect, useRef } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SvgSprite } from './components/SvgSprite';
import { Nav } from './components/Nav';
import { ProfileSection } from './components/ProfileSection';
import { SkillsMap } from './components/SkillsMap';
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
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
  let last = performance.now();
  let frames = 0;

  const div = document.createElement('div');
  div.style.cssText = `
    position:fixed;
    top:10px;
    right:10px;
    z-index:99999;
    background:#000;
    color:#0f0;
    padding:8px 12px;
    font:14px monospace;
    border-radius:6px;
  `;
  document.body.appendChild(div);

  let raf: number;

  function loop(now: number) {
    frames++;

    if (now - last >= 1000) {
      div.textContent = `${frames} FPS`;
      frames = 0;
      last = now;
    }

    raf = requestAnimationFrame(loop);
  }

  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    div.remove();
  };
}, []);

  return (
    <LanguageProvider>
      <SvgSprite />
      <div className="relative z-0 min-h-screen">
        <SiteConstellationLayer />
        {/* <div style={{ height: '10000px' }} /> */}
        <div className="relative z-10">
          <Nav />
          <main>
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
            {/* <div style={{ height: '10000px' }} /> */}
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;