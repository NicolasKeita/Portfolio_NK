import { memo } from 'react';
import { MagicCard } from '../ui/MagicCard';
import type { ProjectYaml } from '../../data';
import { css, cx } from '../../../styled-system/css';

const TAG_COLORS: Record<string, string> = {
  'tag-py': css({ bg: 'blue.100', color: 'blue.800' }),
  'tag-sys': css({ bg: 'green.100', color: 'green.800' }),
  'tag-web': css({ bg: 'purple.100', color: 'purple.800' }),
  'tag-audit': css({ bg: 'amber.100', color: 'amber.800' }),
  'tag-data': css({ bg: 'indigo.100', color: 'indigo.800' }),
  'tag-mobile': css({ bg: 'cyan.100', color: 'cyan.800' }),
  'tag-ai': css({ bg: 'pink.100', color: 'pink.800' }),
  'tag-architecture': css({ bg: 'amber.100', color: 'amber.800' }),
  'tag-opensource': css({ bg: 'emerald.100', color: 'emerald.800' }),
  'tag-cpp': css({ bg: 'sky.100', color: 'sky.800' }),
};

const styles = {
  tag: css({
    fontFamily: 'mono',
    fontSize: 'xs',
    fontWeight: 'semibold',
    px: '2',
    py: '0.5',
    rounded: 'sm',
  }),
  tagList: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5',
  }),
  linkButton: css({
    w: '8',
    h: '8',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    rounded: 'lg',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'slate.400',
    fontSize: 'sm',
    transition: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease',
    _hover: {
      borderColor: 'rgba(103,232,249,0.6)',
      color: 'white',
      bg: 'rgba(34,211,238,0.1)',
    },
  }),
  techBadge: css({
    fontFamily: 'mono',
    fontSize: 'xs',
    color: 'white',
    bg: 'rgba(51,65,85,0.8)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.2)',
    rounded: 'sm',
    px: '1.5',
    py: '0.5',
  }),
  background: css({
    position: 'absolute',
    inset: 0,
    opacity: 1,
    pointerEvents: 'none',
  }),
  overlay: css({
    position: 'absolute',
    inset: 0,
    bg: 'rgba(15,23,42,0.3)',
    transition: 'all 500ms ease',
    zIndex: 1,
    _groupHover: {
      bg: 'rgba(15,23,42,0.55)',
    },
  }),
  header: css({
    px: '6',
    pt: '5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
    transition: 'all 500ms ease',
  }),
  linkList: css({
    display: 'flex',
    gap: '1.5',
  }),
  body: css({
    px: '6',
    pb: '6',
    pt: '5',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
  }),
  title: css({
    fontFamily: 'display',
    fontWeight: 'semibold',
    fontSize: 'md',
    color: 'white',
    mb: '2',
  }),
  details: css({
    opacity: 0,
    transition: 'all 500ms ease',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    bg: 'rgba(15,23,42,0.7)',
    rounded: 'lg',
    p: '3',
    mx: '-3',
    _groupHover: {
      opacity: 1,
    },
  }),
  overview: css({
    fontSize: 'sm',
    color: 'slate.200',
    lineHeight: 'relaxed',
    flex: 1,
    mb: '5',
    listStyleType: 'disc',
    listStylePosition: 'inside',
    '& > li + li': {
      mt: '1',
    },
  }),
  description: css({
    fontSize: 'sm',
    color: 'slate.200',
    lineHeight: 'relaxed',
    flex: 1,
    mb: '5',
    whiteSpace: 'pre-line',
  }),
};

function ProjectTag({ tagClass, tag }: { tagClass: string; tag: string }) {
  return (
    <span
      className={cx(TAG_COLORS[tagClass], styles.tag)}
    >
      {tag}
    </span>
  );
}

function ProjectTags({ tags }: { tags: { name: string; class: string }[] }) {
  return (
    <div className={styles.tagList}>
      {tags.map((t) => (
        <span
          key={t.name}
          className={cx(TAG_COLORS[t.class], styles.tag)}
        >
          {t.name}
        </span>
      ))}
    </div>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return <span className={styles.techBadge}>{tech}</span>;
}

interface ProjectCardProps {
  project: ProjectYaml;
  getImage: (path: string) => string;
  onOpen: () => void;
}

function ProjectCardBase({ project, getImage, onOpen }: ProjectCardProps) {
  return (
    <MagicCard onClick={onOpen} aria-label={`Voir le projet : ${project.title}`}>
      {project.bgImage && (
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${getImage(project.bgImage)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      <div className={styles.overlay} />

      <div className={styles.header}>
        {project.tags ? (
          <ProjectTags tags={project.tags} />
        ) : (
          <ProjectTag tagClass={project.tagClass} tag={project.tag} />
        )}

        <div className={styles.linkList}>
          {project.links ? (
            project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={styles.linkButton}
                title={link.label}
                onClick={(e) => e.stopPropagation()}
              >
                ↗
              </a>
            ))
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={styles.linkButton}
              title="Voir le projet"
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          {project.title}
        </h3>

        <div
          className={styles.details}
        >
          {project.overview && project.overview.length > 0 ? (
            <ul className={styles.overview}>
              {project.overview.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.description}>
              {project.prologue ?? project.description}
            </p>
          )}

          <div className={styles.tagList}>
            {project.techs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

export const ProjectCard = memo(ProjectCardBase);
