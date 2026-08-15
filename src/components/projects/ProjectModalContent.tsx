import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Gallery } from './Gallery';
import type { ProjectYaml } from '../../data';
import { css, cx } from '../../../styled-system/css';

const styles = {
  linkWrap: css({
    mb: '5',
    mt: '4',
    position: 'relative',
  }),
  githubLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    px: '7',
    py: '3',
    rounded: 'lg',
    fontFamily: 'display',
    fontWeight: 'semibold',
    fontSize: 'sm',
    textDecoration: 'none',
    letterSpacing: '0.025em',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    bg: 'rgba(255,255,255,0.04)',
    color: 'white',
    transition: 'all 300ms ease',
    _hover: {
      bg: 'rgba(34,211,238,0.1)',
      borderColor: 'rgba(103,232,249,0.5)',
      color: 'white',
      boxShadow: '0 0 0 2px rgba(34,211,238,0.14)',
    },
  }),
  clickable: css({
    cursor: 'pointer',
  }),
  chevron: css({
    w: '4',
    h: '4',
    transition: 'transform 150ms ease',
  }),
  chevronOpen: css({
    transform: 'rotate(180deg)',
  }),
  dropdown: css({
    position: 'absolute',
    top: '100%',
    left: 0,
    mt: '1',
    w: '64',
    bg: 'slate.800',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    rounded: 'lg',
    boxShadow: 'xl',
    zIndex: 50,
    overflow: 'hidden',
  }),
  dropdownItem: css({
    display: 'block',
    w: 'full',
    textAlign: 'left',
    px: '4',
    py: '2.5',
    fontSize: 'sm',
    color: 'slate.200',
    textDecoration: 'none',
    transition: 'color 150ms ease, background-color 150ms ease',
    _hover: {
      bg: 'rgba(34,211,238,0.1)',
      color: 'white',
    },
    _first: {
      roundedTop: 'lg',
    },
    _last: {
      roundedBottom: 'lg',
    },
  }),
  sectionTitle: css({
    color: 'cyan.400',
    fontFamily: 'display',
    fontWeight: 'semibold',
    fontSize: 'lg',
    mb: '3',
    mt: '6',
    _first: {
      mt: 0,
    },
  }),
  overview: css({
    listStyleType: 'disc',
    listStylePosition: 'inside',
    color: 'slate.300',
    lineHeight: 'relaxed',
    mb: '4',
    '& > li + li': {
      mt: '1.5',
    },
  }),
  prologue: css({
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'medium',
    lineHeight: 'relaxed',
    mb: '4',
    pb: '4',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(255,255,255,0.1)',
    whiteSpace: 'pre-line',
  }),
  description: css({
    color: 'slate.300',
    lineHeight: 'relaxed',
    mb: '6',
    whiteSpace: 'pre-line',
  }),
  techList: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5',
  }),
  techBadge: css({
    fontFamily: 'mono',
    fontSize: 'xs',
    color: 'slate.300',
    bg: 'rgba(255,255,255,0.04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    rounded: 'sm',
    px: '1.5',
    py: '0.5',
  }),
};

interface ProjectModalContentProps {
  project: ProjectYaml;
  getImage: (path: string) => string;
}

export function ProjectModalContent({ project, getImage }: ProjectModalContentProps) {
  const { t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasPrologue = Boolean(project.prologue);
  const hasOverview = Boolean(project.overview && project.overview.length > 0);
  const hasDescription = Boolean(project.description);

  const hasDropdown = project.links && project.links.length > 0;

  return (
    <>
      <Gallery photos={project.photos.map(getImage)} title={project.title} />

      {hasDropdown ? (
        <div className={styles.linkWrap} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cx(styles.githubLink, styles.clickable)}
          >
            {t('modal.github')}
            <svg
              className={cx(styles.chevron, dropdownOpen && styles.chevronOpen)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              {project.links!.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : project.link && (
        <div className={styles.linkWrap}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            {t('modal.github')}
          </a>
        </div>
      )}

      {hasOverview && (
        <>
          <h3 className={styles.sectionTitle}>
            {t('modal.sectionOverview')}
          </h3>
          <ul className={styles.overview}>
            {project.overview!.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {hasPrologue && (
        <>
          <h3 className={styles.sectionTitle}>
            {t('modal.sectionChallenges')}
          </h3>
          <p className={styles.prologue}>
            {project.prologue}
          </p>
        </>
      )}

      {hasDescription && (
        <>
          <h3 className={styles.sectionTitle}>
            {t('modal.sectionDescription')}
          </h3>
          <div className={styles.description}>
            {project.description}
          </div>
        </>
      )}

      <div className={styles.techList}>
        {project.techs.map((tech) => (
          <span key={tech} className={styles.techBadge}>
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}
