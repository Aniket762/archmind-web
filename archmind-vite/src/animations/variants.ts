import type { Variants, Transition } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeIn: Variants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.25, ease } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2, ease } },
};

export const fadeInUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease } },
});

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

export const pageTransition: Variants = {
  initial:  { opacity: 0, y: 8 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2, ease } },
};

export const scaleIn: Variants = {
  initial:  { opacity: 0, scale: 0.94 },
  animate:  { opacity: 1, scale: 1, transition: { duration: 0.2, ease } },
  exit:     { opacity: 0, scale: 0.94 },
};

export const slideInRight: Variants = {
  initial:  { opacity: 0, x: 40 },
  animate:  { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
  exit:     { opacity: 0, x: 40 },
};

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.22, ease: 'easeOut' } },
} as const;

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.18 } },
  whileTap:   { scale: 0.97 },
} as const;
