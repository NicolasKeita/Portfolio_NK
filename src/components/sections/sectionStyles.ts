import { css } from '../../../styled-system/css';

export const sectionStyles = {
  section: css({
    py: '16',
    px: '8',
  }),

  compactSection: css({
    py: '4',
    px: '8',
  }),

  inner: css({
    maxW: '1100px',
    mx: 'auto',
  }),

  eyebrow: css({
    fontFamily: 'mono',
    fontSize: 'xs',
    fontWeight: 'semibold',
    color: 'amber',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    mb: '2.5',
  }),

  title: css({
    fontFamily: 'display',
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: '-0.025em',
    lineHeight: 'tight',
    mb: '7',
    filter: 'drop-shadow(0 0 28px rgba(34,211,238,0.12))',
    fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
  }),
};
