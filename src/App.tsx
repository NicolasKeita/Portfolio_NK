import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { SvgSprite } from './components/SvgSprite';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { FormationSection } from './components/FormationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './styles/portfolio.css';

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
    <>
      <SvgSprite />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Projects />
      <FormationSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default App;