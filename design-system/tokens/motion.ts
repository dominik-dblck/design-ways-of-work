/**
 * - `motion` · the easing and the durations, and their reduced motion
 */
import type { TokenGroup } from '../designTypes.ts';

const motion: readonly TokenGroup[] = [
  {
    title: 'MOTION · the DS’s ease-in-out, an entrance and the step between its parts (PM, 23 Oct)',
    intro: '',
    entries: [
      { name: '--motion-ease', light: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
      { name: '--motion-in', light: '320ms', reducedMotion: '0ms' },
      { name: '--motion-stagger', light: '70ms', reducedMotion: '0ms' },
      { name: '--motion-reveal', light: '700ms', reducedMotion: '0ms', why: 'a line written in, left to right' },
    ],
  },
];

export { motion };
