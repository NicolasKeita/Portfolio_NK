import { css, cx } from '../../../../styled-system/css';

const cta = css({
  display: 'inline-block',
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
  transition: 'all 300ms ease',
  _hover: {
    transform: 'translateY(-2px)',
  },
});

export const profileStyles = {
  hero: css({
    overflow: 'hidden',
  }),

  container: css({
    maxW: '1280px',
    mx: 'auto',
    px: { base: '6', sm: '8' },
    py: { base: '0', md: '1' },
    minH: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),

  layout: css({
    width: '100%',
  }),

  stack: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),

  header: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    mb: '4',
  }),

  title: css({
    flex: '1',
    minW: '0',
    fontFamily: 'display',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '0.95',
    letterSpacing: '-0.05em',
    filter: 'drop-shadow(0 0 34px rgba(34,211,238,0.16))',
    fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
  }),

  portraitWrap: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  }),

  portraitFrame: css({
    width: { base: '140px', sm: '170px' },
    height: { base: '140px', sm: '170px' },
    rounded: 'full',
    borderWidth: '2.5px',
    borderStyle: 'dashed',
    borderColor: 'amber',
    bg: 'rgba(2, 6, 23, 0.7)',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 300ms ease',
    boxShadow: '0 0 48px rgba(34,211,238,0.18)',
    _hover: {
      borderColor: 'rgb(103, 232, 249)',
      bg: 'rgba(34, 211, 238, 0.1)',
      boxShadow: '0 0 0 8px rgba(34,211,238,0.16), 0 0 70px rgba(34,211,238,0.24)',
      transform: 'scale(1.02)',
    },
  }),

  portraitImage: css({
    objectFit: 'cover',
    rounded: 'full',
  }),

  role: css({
    display: 'block',
    w: 'full',
    alignSelf: 'stretch',
    fontFamily: 'display',
    color: 'slate-100',
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderColor: 'amber',
    pb: '3px',
    mb: '3',
  }),

  tagline: css({
    fontFamily: 'display',
    fontWeight: 'semibold',
    color: 'rgb(165, 243, 252)',
    lineHeight: 'snug',
    maxW: '620px',
    mb: '2',
    p: '2',
    pl: '4',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderColor: 'amber',
    bg: 'rgba(2, 6, 23, 0.45)',
    backdropFilter: 'blur(24px)',
    roundedRight: 'lg',
    boxShadow: '0 12px 45px rgba(2,6,23,0.24)',
    fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)',
  }),

  actions: css({
    display: 'flex',
    gap: '0.875rem',
    flexWrap: 'wrap',
    mb: '0',
  }),

  primaryCta: cx(
    cta,
    css({
      borderColor: 'rgba(34,211,238,0.7)',
      bg: 'rgba(6, 182, 212, 0.9)',
      color: 'slate-950',
      boxShadow: '0 0 0 2px rgba(34,211,238,0.18), 0 10px 32px rgba(34,211,238,0.22)',
      _hover: {
        boxShadow: '0 0 0 4px rgba(34,211,238,0.22), 0 8px 30px rgba(34,211,238,0.3)',
      },
    })
  ),

  secondaryCta: cx(
    cta,
    css({
      borderColor: 'rgba(255,255,255,0.12)',
      bg: 'rgba(255,255,255,0.03)',
      color: 'white',
      backdropFilter: 'blur(24px)',
      _hover: {
        bg: 'rgba(255,255,255,0.08)',
        borderColor: 'rgba(103,232,249,0.6)',
        color: 'white',
        boxShadow: '0 0 0 2px rgba(34,211,238,0.12)',
      },
    })
  ),
};
