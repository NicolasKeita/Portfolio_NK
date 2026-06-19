import { SvgIcon } from './SvgSprite';

interface NavProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-logo" href="#hero">NK<span>.</span></a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#formation">Formation</a></li>
            <li><a href="#projets">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Changer de thème" title="Changer de thème">
            <SvgIcon id="#i-sun" className="theme-icon-sun" />
            <SvgIcon id="#i-moon" className="theme-icon-moon" />
          </button>
        </div>
      </div>
    </nav>
  );
}