/**
 * - `taglineSxOf`, `markRiseSxOf`, `wordSxOf`, `riseSxOf` · the entrance, by part
 * - the line written in, then the mark rises and the name closes up, then the rest
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { text } from '../../../../styles/tokenReads.ts';

const msOf = (key: 'motionIn' | 'motionReveal' | 'motionStagger'): number =>
  Number.parseFloat(text(key));
const ms = (millis: number): string => `${String(millis)}ms`;

const EASE = text('motionEase');
const IN = msOf('motionIn');
const REVEAL = msOf('motionReveal');
const STAGGER = msOf('motionStagger');

// tokens.css stills the motion for a reader who asked for less · tokens.ts is emitted without it
const STILL = {
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
} as const;

export const taglineSxOf = (shown: boolean): SxProps<Theme> => ({
  clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
  transition: `clip-path ${ms(REVEAL)} ${EASE}`,
  ...STILL,
});

export const markRiseSxOf = (shown: boolean): SxProps<Theme> => ({
  display: 'flex',
  opacity: shown ? 1 : 0,
  transform: shown ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.92)',
  transition: `opacity ${ms(IN)} ${EASE}, transform ${ms(IN * 1.6)} ${EASE}`,
  transitionDelay: ms(REVEAL),
  ...STILL,
});

export const wordSxOf = (shown: boolean): SxProps<Theme> => ({
  opacity: shown ? 1 : 0,
  letterSpacing: shown ? '0.08em' : '0.42em',
  transition: `opacity ${ms(IN)} ${EASE}, letter-spacing ${ms(REVEAL * 1.2)} ${EASE}`,
  transitionDelay: ms(REVEAL + STAGGER * 2),
  ...STILL,
});

/** The button rises a step after the name, the line under it a stagger later. */
export const riseSxOf = (shown: boolean, step: 2 | 3): SxProps<Theme> => ({
  opacity: shown ? 1 : 0,
  transform: shown ? 'translateY(0)' : 'translateY(10px)',
  transition: `opacity ${ms(IN)} ${EASE}, transform ${ms(IN)} ${EASE}`,
  transitionDelay: ms(REVEAL + IN + STAGGER * step),
  ...STILL,
});
