const easeOut = [0, 0, 0.2, 1] as const;

export const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut, delay },
});

export const portraitPopIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
};
