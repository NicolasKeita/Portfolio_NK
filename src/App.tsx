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
import './styles/sections/reset.css';
import './styles/sections/nav.css';
import './styles/sections/hero.css';
import './styles/sections/buttons.css';
import './styles/sections/shared.css';
import './styles/sections/skills.css';
import './styles/sections/about.css';
import './styles/sections/formation.css';
import './styles/sections/projects.css';
import './styles/sections/contact.css';
import './styles/sections/footer.css';
import './styles/sections/gallery.css';
import './styles/sections/modal.css';
import './styles/sections/responsive.css';

function App() {
  const { theme, toggleTheme } = useTheme();

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

  return (
    <LanguageProvider>
      <SvgSprite />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Projects />
      <FormationSection />
      <ContactSection />
      <Footer />
    </LanguageProvider>
  );
}

export default App;